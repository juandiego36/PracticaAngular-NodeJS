'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var projectSchema = new Schema({
    name: String,
    description: String,
    category: String,
    langs: [String],
    image: String,
    year: String
})

module.exports = mongoose.model('Project', projectSchema)// el primer parametro es el nombre de mi entidad