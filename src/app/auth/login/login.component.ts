import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

declare const gapi:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {

  public formSubmitted = false;

  public auth2:any;

  public loginForm = new FormGroup({
    email: new FormControl(localStorage.getItem('email')||'', Validators.compose([Validators.required , Validators.email])),
    password: new FormControl('', Validators.compose([Validators.required , Validators.minLength(4)])),
    remember: new FormControl(localStorage.getItem('email')?true:false)
  });

  constructor(private router:Router,private usuarioService:UsuarioService,private ngZone:NgZone) { }

  ngOnInit(): void {
    this.renderButton();
  }

  login(){
    //console.log( this.loginForm.value);
    this.usuarioService.login(this.loginForm.value).subscribe(resp => {
      
      if(this.loginForm.get('remember')?.value){
        localStorage.setItem('email',this.loginForm.get('email')?.value)
      }else{
        localStorage.removeItem('email');
      }

     // console.log(resp);

      this.router.navigateByUrl('dashboard');

    },(err) =>{

      Swal.fire("Error",err.error.msg,'error');

    }); 
  

  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark'
    });

    this.startAppGoogle();
  }

  async startAppGoogle () {

    await this.usuarioService.googleInit();
    this.auth2 = this.usuarioService.auth2;

    this.attachSignin(document.getElementById('my-signin2'));

  };

  attachSignin(element:HTMLElement|null) {
    
    this.auth2.attachClickHandler(element, {},
        (googleUser:any) => {
         
          const id_token = googleUser.getAuthResponse().id_token;

          this.usuarioService.loginGoogle(id_token).subscribe(resp =>{

           this.ngZone.run(()=>{
             this.router.navigateByUrl('dashboard');
           })

          },(err)=>{

            Swal.fire("Error",err.error.msg,'error');

          });

        }, (error:any) => {
          alert(JSON.stringify(error, undefined, 2));
        });
  }
}
