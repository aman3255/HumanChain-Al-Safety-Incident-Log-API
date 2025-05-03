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
 * GET /incidents
 *
 * Retrieves all incidents currently stored in the database.
 * Returns a 200 OK with a JSON array of incident objects.
 */
const getAllIncidents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Initialize Prisma client with Accelerate extension
    const prisma = new client_1.PrismaClient({
        datasourceUrl: process.env.DATABASE_URL,
    }).$extends((0, extension_accelerate_1.withAccelerate)());
    try {
        // Query the database for all incidents (oldest first)
        const incidents = yield prisma.incident.findMany({
            orderBy: {
                reported_at: 'asc', // Oldest incidents first
            },
        });
        // Map results to include database ID
        const formattedIncidents = incidents.map((incident) => ({
            id: incident.id,
            title: incident.title,
            description: incident.description,
            severity: incident.severity,
            reported_at: incident.reported_at,
        }));
        return res.status(200).json(formattedIncidents);
    }
    catch (error) {
        console.error('Error retrieving incidents:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.default = getAllIncidents;
