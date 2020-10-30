import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';


//Hacer peticiones AJAX
import {HttpClientModule} from '@angular/common/http'
//Para usar 2wayDataBinding
import {FormsModule} from '@angular/forms' 

//configuracion de rutas
import {appRoutingProviders, routing} from './app.routing'

//para poder usar materials
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog' // si no eescribo el path entero me da error 
import { MatButtonModule } from '@angular/material/button' // si no eescribo el path entero me da error 

//modulos
import { AboutComponent } from './components/about/about.component';
import { ProyectsComponent } from './components/proyects/proyects.component';
import { CreateProyectsComponent } from './components/create-proyects/create-proyects.component';
import { ContactComponent } from './components/contact/contact.component';
import { ErrorComponent } from './components/error/error.component';
import { DetailComponent } from './components/detail/detail.component';
import { MessageComponent } from './components/message/message.component';
import { EditComponent } from './components/edit/edit.component';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ProyectsComponent,
    CreateProyectsComponent,
    ContactComponent,
    ErrorComponent,
    DetailComponent,
    MessageComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule
  ],
  entryComponents: [
    MessageComponent
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
