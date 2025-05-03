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
function deleteAllIncidents() {
    return __awaiter(this, void 0, void 0, function* () {
        const prisma = new client_1.PrismaClient({
            datasourceUrl: process.env.DATABASE_URL,
        }).$extends((0, extension_accelerate_1.withAccelerate)());
        try {
            // Delete all incidents using deleteMany
            yield prisma.incident.deleteMany({});
            // Reset the auto-increment sequence (PostgreSQL)
            // await prisma.$executeRaw`ALTER SEQUENCE "Incidents_id_seq" RESTART WITH 1;`;
            console.log('All incidents deleted and sequence reset.');
        }
        catch (error) {
            console.error('Error deleting incidents:', error);
            throw error; // Allow callers to handle errors
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
exports.default = deleteAllIncidents;
