"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const human_chain_router_1 = __importDefault(require("./human_chain.router"));
// =================================================
const v1Router = express_1.default.Router();
v1Router.use('/humanchain', human_chain_router_1.default);
// =================================================
exports.default = v1Router;
