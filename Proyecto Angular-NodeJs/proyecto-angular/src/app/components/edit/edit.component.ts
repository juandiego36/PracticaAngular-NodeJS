import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProyectService } from '../../services/proyect.service'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  @Input() editInput:any
  @Output() editOutput:any
  constructor(
    private _projectService:ProyectService
  ) { 
    this.editOutput = new EventEmitter()
  }

  ngOnInit(): void {
  }

  
  onSubmit(proyect:any):void{
    this._projectService.editProyect(this.editInput.id, this.editInput.project).subscribe(
      (result)=>{
        if(result){
          this.outputEvent('Se cambio el proyecto exitosamente')


        }else{
          this.outputEvent('No se pudo cambiar el proyecto, intentelo denuevo mas tarde')
        }
      },
      (error)=>{
        console.log(error)
       this.outputEvent( 'No se pudo cambiar el proyecto, intentelo denuevo mas tarde')
      }
    )
  }

  outputEvent(message):any{

    this.editOutput.emit({
      message: message
    })
  }


}
