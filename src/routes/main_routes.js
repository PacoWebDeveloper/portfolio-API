'use strict'
import express from 'express';
import { controller } from '../controllers/projectsControllers.js';

//------------- Middleware to upload images -----------------
import multer from 'multer';

const storage = multer.diskStorage({
    destination(req, file = {}, cb) {
        cb(null, './src/uploads');
    },
    filename(req, file = {}, cb) {
        cb(null, file.originalname.toLowerCase());
    }
})

var upload = multer({
  storage: storage
});

//-------------- Middleware ends -----------------------------
const { test, getProjects, getProjectByName, getProjectById, createProject, editProject, uploadImage, getImageFile, deleteProject, deleteImage } = controller;

var router = express.Router();

router.get('/test', test);
router.get('/projects', getProjects);
router.get('/projectbyname', getProjectByName);
router.get('/projectbyid/:id', getProjectById);
router.post('/createProject', createProject);
router.put('/edit-project', editProject);
router.post('/upload-image/:id', [upload.single('upload_image')], uploadImage);
router.get('/getImage/:name', getImageFile);
router.delete('/delete/:id', deleteProject);
router.delete('/delete-image/:name', deleteImage);

export const _router = router;