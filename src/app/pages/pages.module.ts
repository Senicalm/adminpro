import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//MODULOS
import { FormsModule } from '@angular/forms';

//MODULOS PROPIOS
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router'; //aixo pilla les rutes de la memoria en app.module
import { ComponentsModule } from '../components/components.module';


//COMPONENTES
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent
  ],
  exports:[
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule,
    ComponentsModule,
  ]
})
export class PagesModule { }
