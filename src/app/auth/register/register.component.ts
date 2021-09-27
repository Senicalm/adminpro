import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  
  public formSubmitted = false;

  public registerForm = new FormGroup({
    nombre: new FormControl('Sergi3', Validators.compose([Validators.required,Validators.minLength(3)])),
    email: new FormControl('sernicalm3@gmail.com', Validators.compose([Validators.required,Validators.email])),
    password: new FormControl('1234', Validators.compose([Validators.required,Validators.minLength(4)])),
    password2: new FormControl('1234', Validators.compose([Validators.required,Validators.minLength(4)])),
    terminos: new FormControl(true, Validators.compose([Validators.required]))
  },{
    validators: this.passworsIguales
  });

  
  constructor(private fb:FormBuilder,private usuarioService:UsuarioService,private router:Router) { }

  ngOnInit(): void {}

  crearUsuario(){

    this.formSubmitted=true;
   // console.log(this.registerForm.value);
    if(this.registerForm.valid && this.registerForm.get('terminos')?.value){

      this.usuarioService.crearUsuario(this.registerForm.value).subscribe(resp =>{

        this.router.navigateByUrl('dashboard');

      },(err) =>{

        Swal.fire('Error',err.error.msg,'error');
        
        
      });

    }
  }


  campoNoValido(campo:string):boolean{

    if(this.registerForm.get(campo)?.invalid && this.formSubmitted){
      return true;
    }else {
      return false;
    }

  }
  
  contrasenasNoValidas():boolean{

    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    if((pass1 !== pass2) && this.formSubmitted){
      return true;
    }else{
      return false;
    }
  }

  aceptaTerminos():boolean{
    return !this.registerForm.get('terminos')?.value && this.formSubmitted;
  }

  passworsIguales(control: AbstractControl){

      const pass1 = control.get('password');
      const pass2 = control.get('password2');

      if(pass1?.value === pass2?.value){
        return null;
      }else{
        return  {noEsIgual:true}
      }

  }

}
