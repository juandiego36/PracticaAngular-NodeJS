import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ProyectService } from '../../services/proyect.service'
import { Project } from '../../models/project.model' 
import { Global } from '../../services/global.service'
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'
import { MessageComponent } from '../message/message.component';


declare var Jquery:any;// Ya hay una variable jquery y $, con declare le decimos al compilador que ya existen y que las busque por que son de una fuente externa 
declare var $:any;


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [ProyectService] 

})

export class DetailComponent implements OnInit, AfterViewInit {

  public project:Project
  public id:string
  public url:string
  public ifEdit:boolean
  public editInput:any

  @ViewChild('edit') buttonEdit:ElementRef;        


  constructor(
    private _projectService:ProyectService,
    private _activatedRoute: ActivatedRoute,
    private _router:Router,
    private _dialog:MatDialog
  ) { 
    this.project = new Project('','','','','',[],'');
    this.url = Global.url
    this.ifEdit = false;
  }

  ngOnInit():void{
    this.id = this._activatedRoute.snapshot.paramMap.get("id")// obtiene el id del url
  }


  ngAfterViewInit():void{
    this.getProject()
  }

  doDialog(message:string):void{
    const dialogRef = this._dialog.open(MessageComponent,{
      data: message,
      
    })
    dialogRef.afterClosed().subscribe((res=>{
      console.log("res")
    }))
  }
  
  //carga el elemento en el url
  getProject():void{
    this._projectService.getProyect(this.id).subscribe(
      (success)=>{

        if(success.project){
          this.project = success.project
        }else{
         this.doDialog('no se pudo cargar el documento, intentelo mas tarde')
        }
    },
    (error)=>{
     this.doDialog('no se pudo cargar el documento, intentelo mas tarde')
    })
  

  }

  //elimina un elemento
  deleteProject():void{
    if(confirm("Are you sure to delete "+this.project.name)) {
      this._projectService.deleteProyect(this.project._id).subscribe(
        (success)=>{
          this.doDialog('Se elimino el proyecto exitosamente')
          this._router.navigate(['/proyectos'])
        },
        (error)=>{
         this.doDialog('no se pudo borrar el documento, intentelo mas tarde')
        }
      )
    }
  }

  editProject():void{
    if(!this.ifEdit){
      this.editInput = {
        project : this.project,
        id: this.id
      }
      this.ifEdit = true
      this.buttonEdit.nativeElement.innerText = 'Cancelar'
    }else{
      this.ifEdit = false
      this.buttonEdit.nativeElement.innerText = 'Editar'
    }
  }

  editOutput(event):void{
    this.doDialog(event.message)
    this.ifEdit = false
    this.buttonEdit.nativeElement.innerText = 'Editar'
  }


}
