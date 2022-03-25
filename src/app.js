'use strict'
import express from 'express';

import cors from 'cors';

var app = express();

// --- Route files ---
import { _router } from './routes/main_routes.js';

// --- Middlewares ---
// --- CORS ---
app.use(cors());

// --- Routes ---
app.use('/api', _router);

export const App = app;