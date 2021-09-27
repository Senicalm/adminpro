import { HttpClient} from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from '../../environments/environment';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';


declare const gapi:any;

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  public auth2:any;

  constructor(private http:HttpClient,private router:Router,private ngZone:NgZone) { 
    this.googleInit();
  }

  crearUsuario(formData:RegisterForm){
    
   return this.http.post(`${base_url}/usuarios`,formData).pipe(
    tap((resp:any) =>{
      localStorage.setItem('token',resp.token);
    })
  );

  }

  login(formData:LoginForm){

    return this.http.post(`${base_url}/login`,formData).pipe(
      tap((resp:any) =>{
        localStorage.setItem('token',resp.token);
      })
    );

  }

  loginGoogle(token:string){

    return this.http.post(`${base_url}/login/google`,{token}).pipe(
      tap((resp:any) =>{
        localStorage.setItem('token',resp.token);
      })
    );

  }

  validarToken():Observable<boolean>{
      const token = localStorage.getItem('token')|| '';

      console.log(token);
      
      return this.http.get(`${base_url}/login/renew`,{
        headers:{
          'x-token': token
        }
      }).pipe(
        tap((resp:any) =>{
          console.log('localstorage');
          localStorage.setItem('token',resp.token);
        }),
        map(resp=>true),
        catchError(error => of(false))
      );

  }

  googleInit(){

    return new Promise<void>(resolve =>{

      gapi.load('auth2', ()=>{
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '943871267843-84f1ds8sarj5smm9mcg0tecpl2j82205.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });

        resolve();
   
      });
      
    });

  }

  logout(){
    localStorage.removeItem('token');
   
    this.auth2.signOut().then(() => {
      this.ngZone.run(()=>{
        this.router.navigateByUrl('/login');
      })      
    });
  }
}
