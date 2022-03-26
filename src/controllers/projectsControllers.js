'use strict'

import { projects_model } from "../models/project.js";
var projects_controller = {
    test: (req, res) => {
        return res.status(200).send({message: "Hi i am projects controller"});
    },
    getProjects: async (req, res) => {
        const results = await projects_model.find({});
        
        if (results.length == 0) return res.status(404).send({message: 'Can not get projects'});
        return res.status(200).send({message: 'Projects found', results});
    },
    getProjectByName: async (req, res) => {
        const { name } = req.query;

        const query = { name };
        const results = await projects_model.find(query);

        if (results.length == 0) return res.status(404).send({message: `Project "${name}" not found`});

        if (results.length !== 0) return res.status(200).send({message: 'Project found', results});
    },
    createProject: async (req, res) => {
        const { name, description, technologies, uploadDate, imageUrl } = req.body;
        const project = {
            name,
            description,
            technologies,
            uploadDate,
            imageUrl
        }
        
        projects_model.create(project, (err, results) => {
            if (err) return res.status(500).send({message: err})
            return res.status(200).send({message: 'Project saved', results});
        });
    }
}

export const controller = projects_controller;