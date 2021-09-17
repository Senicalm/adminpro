import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//MODULOS
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

//COMPONENTES
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
  ],
  exports:[
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ]
})
export class AuthModule { }
