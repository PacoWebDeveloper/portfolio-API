'use strict'
/* var express = require('express'); */
import express from 'express';
/* var projectsController = require('../controllers/projectsControllers'); */
import { controller } from '../controllers/projectsControllers.js';
const { test, getProjects } = controller;

var router = express.Router();

router.get('/test', test);
router.get('/projects', getProjects);

/* module.exports = router; */
export const _router = router;