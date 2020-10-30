//importo librerias para rutas
import {ModuleWithProviders, Component} from '@angular/core'
import {Routes, RouterModule} from '@angular/router'

//importo mis componentes 
import { AboutComponent } from './components/about/about.component';
import { ProyectsComponent } from './components/proyects/proyects.component';
import { CreateProyectsComponent } from './components/create-proyects/create-proyects.component';
import { ContactComponent } from './components/contact/contact.component';
import { ErrorComponent } from './components/error/error.component';
import { DetailComponent } from './components/detail/detail.component';
import { MessageComponent } from './components/message/message.component';

//se crea un array con todas las rutas de la pagina 
const routes:Routes = [
    {path: '', component: AboutComponent},
    {path: 'sobre-mi', component: AboutComponent},
    {path: 'proyectos', component: ProyectsComponent},
    {path: 'crear-proyectos', component: CreateProyectsComponent},
    {path: 'contacto', component: ContactComponent},
    {path: 'proyecto/:id', component: DetailComponent},
    {path: 'mensaje', component: MessageComponent},
    {path: '**', component: ErrorComponent}
]


//exporto la configuracion de rutas 
export const appRoutingProviders:any [] = [];
export const routing:ModuleWithProviders<any> = RouterModule.forRoot(routes);