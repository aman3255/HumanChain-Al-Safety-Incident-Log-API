"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// === TypeScript imports ===
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const v1_router_1 = __importDefault(require("./routes/v1/v1.router"));
const cors_1 = __importDefault(require("cors"));
// ==========================
// ============ .env =================
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';
// ==================================
const app = (0, express_1.default)();
// == Middleware setup =====
app.use(express_1.default.json());
app.use((0, cors_1.default)()); // Allow all origins
// =========================
// ======== Routes ===
app.use('/api/v1', v1_router_1.default);
// =========================
// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});
// =================================
const startServer = () => {
    const server = app.listen(PORT, () => {
        console.log(`Server is running in ${NODE_ENV} mode on port ${PORT}`);
    });
    server.on('error', (err) => {
        console.error(`Failed to start server: ${err.message}`);
        process.exit(1);
    });
};
// =================================
startServer();
