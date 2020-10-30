import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project.model' 
import { ProyectService } from '../../services/proyect.service'
import { UploadService } from '../../services/file.service'
import { Global } from '../../services/global.service'

@Component({
  selector: 'app-create-proyects',
  templateUrl: './create-proyects.component.html',
  styleUrls: ['./create-proyects.component.css'],
  providers: [ProyectService, UploadService]
})
export class CreateProyectsComponent implements OnInit {

  
  public title:string
  public project:Project
  public filesToUpload: Array<File>
  public message:string 
  public id:string


  constructor(
    private _projectService: ProyectService,
    private _uploadService: UploadService
  ) { 
    
    this.title = 'Crear proyecto'
    this.project = new Project('','','','','',[],'')
  }

  ngOnInit(): void {
  }


  onSubmit(form){ // se activa cuando se apreta el boton submit
    this.message = ''
    this._projectService.saveProject(this.project).subscribe(

      (response) =>{

        if(response.project){// si el proyecto existe 

          if(this.filesToUpload && this.filesToUpload.length > 0){// validacion si hay una imagen
            this._uploadService.makeFileRequest( Global.url+'/upload-image/'+response.project._id, [], this.filesToUpload, 'image').then( // realiza la promesa 
              (result) =>{ // si la promesa funciona

              },
              (error)=>{              
                this.message += ' pero no se pudo guardar su imagen'
              })
          }// termina validacion 

          this.id = response.project._id
          this.message += 'El proyecto fue enviado exitosamente' // para poner en pantalla que si funciono 
          form.reset() // resetea el form

        }else{ // si el proyecto no existe
          this.message += 'No se pudo enviar el proyect, intentelo mas tarde'
        }

      },
      (error) =>{// si aparece un error
        this.message += 'No se pudo enviar el proyect, intentelo mas tarde'
      }
    )
  }

  
  fileChangeEvent(fileInput:any){ //Se activa cuando ocurre un cambio en el file de la imagen 
    this.filesToUpload =<Array<File>> fileInput.target.files;
  }

}
