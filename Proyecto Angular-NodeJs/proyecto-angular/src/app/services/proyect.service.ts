import {Injectable} from '@angular/core'
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable} from 'rxjs'

import {Project} from '../models/project.model'
import {Global} from './global.service'


@Injectable()
export class ProyectService{
    public url:string
    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url
    }

    saveProject(project:Project):Observable<any>{
        let params = JSON.stringify(project) // me lo transforma en un JSON
        let header = new HttpHeaders().set('Content-Type','application/json')
        return this._http.post(this.url+'/save-project', params, {headers : header})
    }

    getProyects(name:string):Observable<any>{
        var header = new HttpHeaders().set('Content-Type','application/json') 
        if(name){
            return this._http.get(this.url+'/get-projects/'+name, {headers: header})
        }else{
            return this._http.get(this.url+'/get-projects', {headers: header})
        }  
    }

    getProyect(id:string):Observable<any>{
        var header = new HttpHeaders().set('Content-Type','application/json')
        return this._http.get(this.url+'/get-project/'+id, {headers: header})
    }

    deleteProyect(id:string):Observable<any>{
        var header = new HttpHeaders().set('Content-Type','application/json')
        return this._http.delete(this.url+'/delete-project/'+id, {headers: header})
    }

    editProyect(id:string, project:Project):Observable<any>{
        let params = JSON.stringify(project) // me lo transforma en un JSON
        var header = new HttpHeaders().set('Content-Type','application/json')
        return this._http.put(this.url+'/update-project/'+id, params, {headers: header})
    }

}