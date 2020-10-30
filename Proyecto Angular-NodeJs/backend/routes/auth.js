//importamos los modelos 

var logController = require('../controllers/auth')
var express = require('express')
var router = express.Router();


    router.post('/register',logController.createUser)
    router.post('/login',logController.loginUser)

    module.exports = router