// === TypeScript imports ===
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import v1Router from './routes/v1/v1.router';
import cors from 'cors';
// ==========================

// ============ .env =================
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';
// ==================================

const app = express();

// == Middleware setup =====
app.use(express.json());
app.use(cors()); // Allow all origins
// =========================

// ======== Routes ===
app.use('/api/v1', v1Router);
// =========================

// Error handling
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
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