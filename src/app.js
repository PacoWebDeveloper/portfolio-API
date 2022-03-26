'use strict'
import express from 'express';

import cors from 'cors';

var app = express();

// --- Route files ---
import { _router } from './routes/main_routes.js';

// --- Middlewares ---
app.use(express.json());
app.use(express.urlencoded({extended:false}))//Ambas lineas son necesarias para enviar datos por el metodo POST y poderlos recibir como body
// --- CORS ---
app.use(cors());

// --- Routes ---
app.use('/api', _router);

export const App = app;