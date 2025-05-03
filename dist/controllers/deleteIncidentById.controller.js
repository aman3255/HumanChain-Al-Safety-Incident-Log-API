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
 * DELETE /incidents/:id
 * Deletes an incident by its original database ID.
 * Responds with 200 OK if deleted, or 404 Not Found if it doesn't exist.
 */
const deleteIncidentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prisma = new client_1.PrismaClient({
        datasourceUrl: process.env.DATABASE_URL,
    }).$extends((0, extension_accelerate_1.withAccelerate)());
    try {
        const requestedId = parseInt(req.params.id, 10);
        // Validate ID
        if (isNaN(requestedId) || requestedId <= 0) {
            return res.status(400).json({ error: 'Invalid incident ID' });
        }
        // Check if the incident exists
        const incident = yield prisma.incident.findUnique({
            where: {
                id: requestedId,
            },
        });
        if (!incident) {
            return res.status(404).json({ error: 'Incident not found' });
        }
        // Delete the incident
        yield prisma.incident.delete({
            where: {
                id: requestedId,
            },
        });
        // Return 200 OK with confirmation message
        return res.status(200).json({ message: `Incident with ID ${requestedId} deleted successfully` });
    }
    catch (error) {
        console.error('Error deleting incident:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.default = deleteIncidentById;
