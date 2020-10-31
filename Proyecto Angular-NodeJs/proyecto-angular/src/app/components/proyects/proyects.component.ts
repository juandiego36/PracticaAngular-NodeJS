import { Component, OnInit } from '@angular/core';
import { ProyectService } from '../../services/proyect.service'
import { Project } from '../../models/project.model' 
import { Global } from '../../services/global.service'
import { MatDialog } from '@angular/material/dialog'
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-proyects',
  templateUrl: './proyects.component.html',
  styleUrls: ['./proyects.component.css'],
  providers: [ ProyectService ]

})
export class ProyectsComponent implements OnInit {

  public name:string
  public projects:Array<Project>
  public url:string
  
  constructor(
    private _proyectService:ProyectService,
    private _dialog:MatDialog
  ) 
  {
    this.projects = []
    this.url = Global.url
  }

  ngOnInit(): void {
    this.getProyects()
  }

  getProyects(){
    this._proyectService.getProyects(this.name).subscribe(
      (response)=>{
        
          if(response.success){
            this.projects = response.success
            console.log(response)
          }else{
            this.projects = response.success
          }
      },
      (error)=>{
        this.doDialog("Ocurrio un error, no se pudieron cargar los proyectos")
      }
    )
  }

  doDialog(message:string):void{
    const dialogRef = this._dialog.open(MessageComponent,{
      data: message,
      
    })
    dialogRef.afterClosed().subscribe((res=>{
      
    }))
  }  

}
