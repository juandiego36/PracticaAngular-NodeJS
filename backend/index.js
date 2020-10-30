'use strict'

//conectar a la base de datos 

var mongoose = require('mongoose') // carga el modulo de mongoose
mongoose.set('useFindAndModify', false);

var app = require('./app')
var DB = require('./config/db')
var properties = require('./config/properties')


DB();
app.listen( properties.PORT, ()=>{
    console.log("Servidor corriendo en "+properties.PORT)
})










