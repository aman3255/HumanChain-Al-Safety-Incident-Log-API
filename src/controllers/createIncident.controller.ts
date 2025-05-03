import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

// Allowed severity values
const ALLOWED_SEVERITIES = ['Low', 'Medium', 'High'];

// POST /incidents: Log a new incident to the database
const createIncident = async (req: Request, res: Response) => {
    const prisma = new PrismaClient({
        datasourceUrl: process.env.DATABASE_URL,
    }).$extends(withAccelerate());
    
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
        const incident = await prisma.incident.create({
            data: {
                title,
                description,
                severity,
                // reported_at is set automatically by Prisma (default: now())
            },
        });

        // Return 201 Created with the new incident
        return res.status(201).json(incident);
    } catch (error) {
        // Handle unexpected errors (e.g., database issues)
        console.error('Error creating incident:', error);
        return res.status(400).json({ error: 'Internal server error - Bad request response' });
    } finally {
        // Disconnect Prisma Client to prevent connection leaks
        await prisma.$disconnect();
    }
};

export default createIncident;