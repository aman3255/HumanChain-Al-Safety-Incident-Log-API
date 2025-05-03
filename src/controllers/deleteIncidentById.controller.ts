import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

/**
 * DELETE /incidents/:id
 * Deletes an incident by its original database ID.
 * Responds with 200 OK if deleted, or 404 Not Found if it doesn't exist.
 */
const deleteIncidentById = async (req: Request, res: Response) => {
    const prisma = new PrismaClient({
        datasourceUrl: process.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const requestedId = parseInt(req.params.id, 10);

        // Validate ID
        if (isNaN(requestedId) || requestedId <= 0) {
            return res.status(400).json({ error: 'Invalid incident ID' });
        }

        // Check if the incident exists
        const incident = await prisma.incident.findUnique({
            where: {
                id: requestedId,
            },
        });

        if (!incident) {
            return res.status(404).json({ error: 'Incident not found' });
        }

        // Delete the incident
        await prisma.incident.delete({
            where: {
                id: requestedId,
            },
        });

        // Return 200 OK with confirmation message
        return res.status(200).json({ message: `Incident with ID ${requestedId} deleted successfully` });
    } catch (error) {
        console.error('Error deleting incident:', error);
        return res.status(404).json({ error: 'Internal server error - Not Found' });
    } finally {
        await prisma.$disconnect();
    }
};

export default deleteIncidentById;