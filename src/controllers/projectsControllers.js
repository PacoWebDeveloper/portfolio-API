'use strict'

import { projects_model } from "../models/project.js";
var { Projects } = projects_model;

var projects_controller = {
    test: (req, res) => {
        return res.status(200).send({message: "Hi i am projects controller"});
    },
    /* getProjects: (req, res) => {
        projects_model.find((err, projects) => {
            if (err) return res.status(500).send({message: "Error to get projects"});

            if (!projects) return res.status(404).send({message: "Projects not found"});

            return res.status(200).send({message: "Projects found successfull", projects});
        })
    } */
    getProjects: async (req, res) => {
        
        const results = await projects_model.find({
            name: 'Test'
        });
        
        if (!results) return res.status(404).send({message: 'Can not get projects'});
        if (results) return res.status(200).send({message: 'Projects found', results});
    }
}

/* module.exports = controller; */
export const controller = projects_controller;