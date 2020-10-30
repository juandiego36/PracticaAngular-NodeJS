//configuracion de express

'use strict'

//cargo los modulos
var express = require('express') 
var bodyParser = require('body-parser') 

var app = express()// ejecuto express

//cargar archivos rutas

var project_routes = require('./routes/project')
var log_routes = require('./routes/auth')



//app es el objeto de express
app.use(bodyParser.urlencoded({ extended: false})) 
app.use(bodyParser.json()) //combierte to lo que le llegue a json 

//CORS
//nos permite el acceso de un dominio a otro 
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
//rutas
app.use('/project',project_routes)
app.use('/',log_routes)

//exportar -- esto es un modulo de node.js que luego puedo importar

module.exports = app


