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
/**
 * GET /incidents/:id
 * Retrieves a specific incident by its database ID.
 * Returns 200 OK with the incident if found, otherwise 404 Not Found.
 */
const getIncidentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prisma = new client_1.PrismaClient({
        datasourceUrl: process.env.DATABASE_URL,
    }).$extends((0, extension_accelerate_1.withAccelerate)());
    try {
        const requestedId = parseInt(req.params.id, 10);
        if (isNaN(requestedId) || requestedId <= 0) {
            return res.status(400).json({ error: 'Invalid incident ID' });
        }
        // Fetch the incident by database ID
        const incident = yield prisma.incident.findUnique({
            where: {
                id: requestedId,
            },
        });
        if (!incident) {
            return res.status(404).json({ error: 'Incident not found' });
        }
        // Format response with database ID
        const formattedIncident = {
            id: incident.id,
            title: incident.title,
            description: incident.description,
            severity: incident.severity,
            reported_at: incident.reported_at,
        };
        return res.status(200).json(formattedIncident);
    }
    catch (error) {
        console.error('Error retrieving incident:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.default = getIncidentById;
