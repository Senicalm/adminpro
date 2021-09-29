import { HttpClient} from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { Usuario } from '../models/usuario.model';
import { CargarUsuarios } from '../interfaces/cargar-usuarios.interface';


declare const gapi:any;

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  public auth2:any;
  public usuario:Usuario;

  constructor(private http:HttpClient,private router:Router,private ngZone:NgZone) { 
    this.googleInit();
  }

  get token():string{

    return localStorage.getItem('token')|| '';

  }

  get uid():string{
    return this.usuario.uid || '';
  }

  get headers(){
    return {
      headers:{
        'x-token': this.token
      }
    };
  }


  crearUsuario(formData:RegisterForm){
    
    return this.http.post(`${base_url}/usuarios`,formData).pipe(
      tap((resp:any) =>{
        localStorage.setItem('token',resp.token);
      })
    );

  }

  actualizarUsuario(data:Usuario){ //{nombre:string,email:string,role:string}

    // data ={
    //   ...data,
    //   role: this.usuario.role || ''
    // }

    return this.http.put(`${base_url}/usuarios/${this.uid}`,data,this.headers).pipe(
      map((resp:any)=>{
        const {nombre,email,role} = resp.usuario;
        this.usuario.nombre = nombre;
        this.usuario.email = email;
        this.usuario.role = role
        return resp;
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
            
      return this.http.get(`${base_url}/login/renew`,this.headers).pipe(
        map((resp:any) =>{

          const {nombre, email, img = '', google, role, uid} = resp.usuario;
         
          this.usuario = new Usuario(nombre, email, '', img, google, role, uid);

          localStorage.setItem('token',resp.token);

          return true;
        }),
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

  cargarUsuarios(pagina:number = 1, limit:number = 5){
    //http://localhost:3000/api/usuarios?page=1&limit=5
    return this.http.get<CargarUsuarios>(`${base_url}/usuarios?page=${pagina}&limit=${limit}`,this.headers).pipe(
      map(resp=>{

        const usuarios = resp.usuarios.map( 
          user => new Usuario(user.nombre,user.email,'',user.img,user.google,user.role,user.uid));

          //aqui hem transformat usuarios en instancies per poder accedir a les seves fincions o metodes
        return {
          total:resp.total,
          usuarios,
          backPage:resp.backPage,
          actualPage:resp.actualPage,
          nextPage:resp.nextPage,
          limit:resp.limit,
          totalPages:resp.totalPages
        }  
        return resp;
      })
    );

  }

  eliminarUsuario(usuario:Usuario){

     return this.http.delete(`${base_url}/usuarios/${usuario.uid}`,this.headers);

  }
}
