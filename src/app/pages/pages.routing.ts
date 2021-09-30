import { Routes, RouterModule, CanActivate } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
//MANTENIMIENTOS
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../guards/admin.guard';


const routes: Routes = [
        {path:'dashboard',component:PagesComponent,canActivate:[AuthGuard],children:[
            {path:'',component: DashboardComponent, data:{titulo:'Dashboard'}},
            {path:'progress',component:ProgressComponent, data:{titulo:'Progress'}},
            {path:'grafica1',component: Grafica1Component, data:{titulo:'Grafica #1'}},
            {path:'account-settings',component: AccountSettingsComponent, data:{titulo:'Settings'}},
            {path:'buscar/:termino',component: BusquedaComponent, data:{titulo:'Buscar'}},
            {path:'promesas',component: PromesasComponent, data:{titulo:'Promesas'}},
            {path:'rxjs',component: RxjsComponent, data:{titulo:'Rxjs'}},
            {path:'perfil',component: PerfilComponent, data:{titulo:'Perfil'}},
            
            //MANTENIMIENTOS
            {path:'hospitales/:termino',component: HospitalesComponent, data:{titulo:'Hospitales'}},
            {path:'hospitales',component: HospitalesComponent, data:{titulo:'Hospitales'}},
            {path:'medicos',component: MedicosComponent, data:{titulo:'Medicos'}},
            {path:'medico/:id',component: MedicoComponent, data:{titulo:'Medico'}},
            ////admin
            {path:'usuarios/:termino',component: UsuariosComponent, canActivate:[AdminGuard], data:{titulo:'Usuarios'}},
            {path:'usuarios',component: UsuariosComponent, canActivate:[AdminGuard], data:{titulo:'Usuarios'}},
           
          ]},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
