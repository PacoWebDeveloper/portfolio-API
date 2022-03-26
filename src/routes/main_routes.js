'use strict'
import express from 'express';
import { controller } from '../controllers/projectsControllers.js';

const { test, getProjects, getProjectByName, createProject } = controller;

var router = express.Router();

router.get('/test', test);
router.get('/projects', getProjects);
router.get('/projectbyname', getProjectByName);
router.post('/createProject', createProject);

export const _router = router;