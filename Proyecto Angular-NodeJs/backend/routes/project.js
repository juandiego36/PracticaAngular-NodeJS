//importamos los modelos 
var express = require('express')
var projectController = require('../controllers/project')

var router = express.Router();


//midleware se ejecuta antes de la accion del controlador 

var multiparty = require('connect-multiparty')
var multiparty_middleware = multiparty({ uploadDir: './uploads/projects'})

router.post('/save-project',projectController.saveProject)
router.post('/upload-image/:id?',multiparty_middleware, projectController.uploadImage)
router.put('/update-project/:id?',projectController.updateProject)
router.delete('/delete-project/:id?',projectController.deleteProject)
router.delete('/delete-image/:image?',projectController.deleteImage)
router.get('/get-project/:id?',projectController.getProject) // si le pongo ? al final el parameetro es opcional 
router.get('/get-projects/:name?',projectController.getProjects)
router.get('/get-image/:image?', projectController.getImage)

module.exports = router


