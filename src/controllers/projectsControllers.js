'use strict'

import { projects_model } from "../models/project.js";
var projects_controller = {
    test: (req, res) => {
        return res.status(200).send({message: "Hi i am projects controller"});
    },
    getProjects: async (req, res) => {
        const results = await projects_model.find({});
        
        if (!results) return res.status(404).send({message: 'Can not get projects'});
        if (results) return res.status(200).send({message: 'Projects found', results});
    }
}

export const controller = projects_controller;