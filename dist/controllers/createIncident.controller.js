"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const extension_accelerate_1 = require("@prisma/extension-accelerate");
// Allowed severity values
const ALLOWED_SEVERITIES = ['Low', 'Medium', 'High'];
// POST /incidents: Log a new incident to the database
const createIncident = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prisma = new client_1.PrismaClient({
        datasourceUrl: process.env.DATABASE_URL,
    }).$extends((0, extension_accelerate_1.withAccelerate)());
    try {
        // Extract request body
        const { title, description, severity } = req.body;
        // Validation: Check for required fields
        if (!title || !description || !severity) {
            return res.status(400).json({
                error: 'Missing required fields: title, description, and severity are required',
            });
        }
        // Validation: Check if severity is valid
        if (!ALLOWED_SEVERITIES.includes(severity)) {
            return res.status(400).json({
                error: `Invalid severity. Must be one of: ${ALLOWED_SEVERITIES.join(', ')}`,
            });
        }
        // Create incident in the database
        const incident = yield prisma.incident.create({
            data: {
                title,
                description,
                severity,
                // reported_at is set automatically by Prisma (default: now())
            },
        });
        // Return 201 Created with the new incident
        return res.status(201).json(incident);
    }
    catch (error) {
        // Handle unexpected errors (e.g., database issues)
        console.error('Error creating incident:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
    finally {
        // Disconnect Prisma Client to prevent connection leaks
        yield prisma.$disconnect();
    }
});
exports.default = createIncident;
