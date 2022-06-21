'use strict'

import { projects_model } from "../models/project.js";
import fs from 'fs';
import { existsSync } from "fs";
import path from "path";

var projects_controller = {
    test: (req, res) => {
        return res.status(200).send({message: "Hi i am projects controller"});
    },
    getProjects: async (req, res) => {
        const results = await projects_model.find({});
        
        if (results.length == 0) return res.status(404).send({message: 'Projects not found'});

        return res.status(200).send({message: 'Projects found', results});
    },
    getProjectByName: async (req, res) => {
        const { name } = req.query;

        const query = { name };
        const results = await projects_model.find(query);

        if (results.length == 0) return res.status(404).send({message: `Project not found: ${name}`});

        return res.status(200).send({message: 'Project found', results});
    },

    getProjectById: async (req, res) => {
        const { id } = req.params;

        const filter = {_id: id};
        let results = [];
        try{
            results = await projects_model.find(filter);

            if (results.length == 0) return res.status(404).send({message: 'Projects not found'});

            return res.status(200).send({message: 'Project found', results});

        } catch(e) {
            return res.status(500).send({message: 'No id received'});
        }
    },

    createProject: async (req, res) => {
        const { name, description, technologies, uploadDate, imageUrl, repository } = req.body;
        const project = {
            name,
            description,
            technologies,
            uploadDate,
            imageUrl,
            repository
        }

        const results = await projects_model.create(project);

        if (!results) return res.status(500).send({message: 'Error saving project'});

        return res.status(200).send({message: 'Project saved', results});
    },
    editProject: async (req, res) => {
        const { id, projectData } = req.body;
        const filter = {_id: id};

        const results = await projects_model.findOneAndUpdate(filter, projectData, {new: true});

        if (!results) return res.status(404).send({message: 'Error updating project'});

        return res.status(200).send({message: 'Project updated', results});
    },
    uploadImage: async (req, res) => {
        
        if (req.file) {
            const { id } = req.params;
            const filter = {_id: id};

            const { path, mimetype, originalname } = req.file;

            const update = {imageUrl: originalname.toLowerCase()};
            
            if (mimetype == 'image/png' || mimetype == 'image/jpg' || mimetype == 'image/jpeg' || mimetype == 'image/gif') {
                const results = await projects_model.findOneAndUpdate(filter, update, {new: true});
    
                if(results) {
                    return res.status(200).send({message: 'Image uploaded and matched with a project'});
                } else {
                    fs.unlink(path, (err) => {
                        return res.status(404).send({message: 'No project matches with image'});
                    });                    
                }
    
            } else {
                fs.unlink(path, (err) => {
                    return res.status(200).send({message: 'File type not valid'});
                })
            }              
        } else return res.status(500).send({message: 'Image not loaded'});
    },

    getImageFile: (req, res) => {
		const { name } = req.params;
		let path_file = 'src/uploads/' + name;
        
        if (existsSync(path_file)) {
            /* console.log('Picture exists'); */
            return res.sendFile(path.resolve(path_file));
        }
        else {
            /* console.log('Picture not exists'); */
            return res.status(404).send({message: 'Image not found'});
        }
	},

    deleteProject: async (req, res) => {
        const { id } = req.params;
        const filter = {_id: id};
        const results = await projects_model.deleteMany(filter);
        if (results.deletedCount === 0) return res.status(500).send({message: 'Cannot delete the project. '});
        return res.status(200).send({message: 'Project deleted'});
    },

    deleteImage: (req, res) => {
        const { name } = req.params;
        let path_file = 'src/uploads/' + name;
        
        if (existsSync(path_file)) {
            /* console.log('Picture exists'); */
            fs.unlink(path_file, (err) => {
                if (err) throw err;
                /* console.log('Image was deleted'); */
                res.status(200).send({message: 'Image was deleted'});
            })
        } else res.status(500).send({message: 'Images does not exist'});
    }
}

export const controller = projects_controller;