import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

/**
 * GET /incidents
 *
 * Retrieves all incidents currently stored in the database.
 * Returns a 200 OK with a JSON array of incident objects.
 */
const getAllIncidents = async (req: Request, res: Response) => {
    // Initialize Prisma client with Accelerate extension
    const prisma = new PrismaClient({
        datasourceUrl: process.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        // Query the database for all incidents (oldest first)
        const incidents = await prisma.incident.findMany({
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
    } catch (error) {
        console.error('Error retrieving incidents:', error);
        return res.status(500).json({ error: 'Internal server error' });
    } finally {
        await prisma.$disconnect();
    }
};

export default getAllIncidents;