'use strict'
/* var express = require('express'); */
import express from 'express';

/* var cors = require('cors'); */
import cors from 'cors';

var app = express();

// --- Route files ---
/* var main_routes = require('./routes/main_routes'); */
import { _router } from './routes/main_routes.js';

// --- Middlewares ---
// --- CORS ---
app.use(cors());

// --- Routes ---
app.use('/api', _router);

/* module.exports = app; */
export const App = app;