import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

/**
 * GET /incidents/:id
 * Retrieves a specific incident by its database ID.
 * Returns 200 OK with the incident if found, otherwise 404 Not Found.
 */
const getIncidentById = async (req: Request, res: Response) => {
    const prisma = new PrismaClient({
        datasourceUrl: process.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const requestedId = parseInt(req.params.id, 10);

        if (isNaN(requestedId) || requestedId <= 0) {
            return res.status(400).json({ error: 'Invalid incident ID' });
        }

        // Fetch the incident by database ID
        const incident = await prisma.incident.findUnique({
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
    } catch (error) {
        console.error('Error retrieving incident:', error);
        return res.status(404).json({ error: 'Internal server error - Not found' });
    } finally {
        await prisma.$disconnect();
    }
};

export default getIncidentById;