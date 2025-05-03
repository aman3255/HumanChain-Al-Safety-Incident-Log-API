"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// ===== Import your controllers =====
const createIncident_controller_1 = __importDefault(require("./../../controllers/createIncident.controller"));
const getAllIncidents_controller_1 = __importDefault(require("./../../controllers/getAllIncidents.controller"));
const getIncidentById_controller_1 = __importDefault(require("./../../controllers/getIncidentById.controller"));
const deleteIncidentById_controller_1 = __importDefault(require("./../../controllers/deleteIncidentById.controller"));
// import deleteAllIncidents from './../../controllers/deleteAllIncidents';
// ====================================
const humanChainRouter = express_1.default.Router();
// =================================================
//@ts-ignore
humanChainRouter.post('/incidents', createIncident_controller_1.default); // Log a new incident to the database
// @ts-ignore
humanChainRouter.get('/incidents', getAllIncidents_controller_1.default); // Retrieve all incidents
//@ts-ignore
humanChainRouter.get('/incidents/:id', getIncidentById_controller_1.default); // Retrieve a specific incident by ID
//@ts-ignore
humanChainRouter.delete('/incidents/:id', deleteIncidentById_controller_1.default); // Delete a specific incident by ID
//@ts-ignore
// humanChainRouter.delete('/incidents/all', deleteAllIncidents); // Delete all incidents
// =================================================
exports.default = humanChainRouter;
