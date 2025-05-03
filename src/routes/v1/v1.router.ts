import express from 'express';
import humanChainRouter from './human_chain.router';

// =================================================

const v1Router = express.Router();
v1Router.use('/humanchain', humanChainRouter);
// =================================================

export default v1Router;