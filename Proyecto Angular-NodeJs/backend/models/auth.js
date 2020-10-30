'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema

const logSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
},{
    timestamps: true // guarda la fecha de creacion y actualizacion 
}
)

module.exports  = mongoose.model('Users', logSchema);