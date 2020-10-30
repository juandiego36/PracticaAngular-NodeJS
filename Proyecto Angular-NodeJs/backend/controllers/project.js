'use strict'

var Project = require('../models/project')// carga el modelo project
var fs = require('fs')
var path = require('path')

var controller = {
    saveProject: function(req, res){
        var project = new Project();
        var params = req.body

        project.name = params.name
        project.category = params.category
        project.description = params.description
        project.langs.push(params.langs)
        project.year = params.year
        project.image = 'none.png'

        //se guarda en la base de datos con el save()
        project.save((err, success)=>{

            //validacion de errores
            if(err){
                return res.status(500).send({
                    message : 'Error',
                    error : err
                })
            }
            if(!success){
                return res.status(404).send({
                    message : 'No se ha podido guardar el proyecto'
                })
            }

            return res.status(200).send({
                message : 'Save',
                project: success
            })
        })

        

    },
    getProject: function (req, res){

        var projectId = req.params.id

        if(!projectId) return res.status(404).send({
            message: 'Id no existe'
        })

        Project.findById(projectId ,(err, project)=>{ //utilizo proyect en ves de una nueva instancia como en el de arriba 
            

            if(!project) return res.status(404).send({ message: 'Proyecto no existe'})
            if(err) return res.status(500).send({ message: 'Error al devolver los datos '})
            
     
            return res.status(200).send({ 
                message: 'Exito',
                project: project
            })

        })
    },
    getProjects: function(req, res){

        var name = req.params.name 
        if(!name){
            Project.find({}).exec((err,projects)=>{ // si nombre existe hacemos esto

                if(!projects) return res.status(404).send({ message: 'No hay proyectos'})
                if(err) return res.status(500).send({ message: 'Error', error: err})
                
    
                return res.status(200).send({
                    message: 'Exito',
                    success: projects
                })
            })
        }else{
            Project.find( { name: {"$regex" : name } }).exec((err,projects)=>{ // si nombre existe hacemos esto

                if(!projects) return res.status(404).send({ message: 'No hay proyectos'})
                if(err) return res.status(500).send({ message: 'Error', error: err})
                
    
                return res.status(200).send({
                    message: 'Exito',
                    success: projects,
                    name: name
                })
            })
        }

    },

    updateProject: function(req, res){

        var projectId = req.params.id
        var body = req.body 

        if(!projectId) return res.status(404).send({
            message: 'Id no existe'
        })

        Project.findByIdAndUpdate( projectId, body ,(err , success)=>{

            if(err) return res.status(500).send({ message : 'error', error: err})
            if(!success) return res.status(404).send({ message : 'no se pudo encontrar', error: success})

            return res.status(200).send({
                message:'exito',
                success: success
            })

        })
    },

    deleteProject: function(req, res){

        var projectId = req.params.id
        if(!projectId) return res.status(404).send({
            message: 'Id no existe'
        })

        Project.findByIdAndDelete(projectId, (err, success)=>{

            if(err) return res.status(500).send({ message : 'error', error: err})
            if(!success) return res.status(404).send({ message : 'no se pudo encontrar', error: success})

            return res.status(200).send({
                message:'exito',
                success: success
            })
        })

    },
    uploadImage: function(req, res){

        var projectId = req.params.id
        var file_name = 'Imagen no subida...' 

        var image = req.files //connect-multiparty nos permite usar esto ya que req.files usualmente no existe



        if(!image){

            return res.status(200).send({
                image: file_name
            })
        }

        var filePath = req.files.image.path

        var fileSplit = filePath.split('\\')
        var fileName = fileSplit[2]

        //verificar que el archivo se subio
        var extSplit = fileName.split('\.')
        var extension = extSplit[1]

        if(extension == "jpg" || extension == "png" || extension == "jpeg"){


            //subo la imagen
            Project.findByIdAndUpdate(projectId, {$set:{image:fileName}}, {new: true} , (err, success)=>{ // el new true es para que me devuelva la version actualizada 

                if(err) return res.status(500).send({ message : 'error', error: err})
                if(!success) return res.status(404).send({ message : 'no se encontro', error: success})
    
                return res.status(200).send({
                    image: success,
                    file: fileName,
                    message: 'works'
                })
    
            })

        }else{
        // si no se tiene la imagen se borra lo que sea que se subio 
            fs.unlink(filePath, (err)=>{
                return res.status(200).send({
                    err: err,
                    message: 'la extension no es valida'
            
                })
            })
        }


    },
    getImage: function(req, res){

        var file = req.params.image
        console.log(file)
        if(!file){// cambio el nombre del file por si no se envia ninguno 
            file = 'none.png'
        }
        var path_file = './uploads/projects/'+file

        fs.exists(path_file, (exist)=>{
            console.log(exist)

            if(exist){
                return res.sendFile(path.resolve(path_file))

            }else{  // si no se encuentra la imagen 

                fs.exists('../uploads/projects/none.png', (exist)=>{
                    return res.sendFile(path.resolve('../uploads/projects/none.png'))
                })
                
            }    
            
        })
    },
    deleteImage : function(req, res){
        var file = req.params.image

        if(!file || file === 'none.png'){// cambio el nombre del file por si no se envia ninguno 
            return res.status(404).send({
                message: 'No se encontro la imagen'
        
            })
        }

        fs.unlink(filePath, 
            (success)=>{
                return res.status(200).send({
                    success: success,
                    message: 'la extension no es valida'
            
                })
            },
            (error)=>{
                return res.status(500).send({
                    error: error,
                    message: 'Ocurrio un error'
            
                })
            }
        )
    }

}

module.exports = controller