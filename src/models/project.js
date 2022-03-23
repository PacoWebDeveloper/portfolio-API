'use strict'
/* var mongoose = require('mongoose'); */
import { mongoose } from 'mongoose';

var Schema = mongoose.Schema;
var projectSchema = Schema({
    name: {type: String, required: true},
    description: {type: String},
    technologies: {type: String, required: true},
    uploadDate: {type: Date, required: true},
    imageUrl: {type: String}
})

/* module.exports = mongoose.model('Projects', projectSchema); */
export const projects_model = mongoose.model('Projects', projectSchema);