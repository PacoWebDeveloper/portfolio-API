'use strict'

import { mongoose } from 'mongoose';

var Schema = mongoose.Schema;
var projectSchema = Schema({
    name: {type: String, required: true},
    description: {type: String},
    technologies: {type: Array, required: true},
    uploadDate: {type: String, required: true},
    imageUrl: {type: String},
    repository: {type: String}
})

export const projects_model = mongoose.model('Projects', projectSchema);