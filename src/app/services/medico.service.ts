import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(private http:HttpClient) { }

  get token():string{

    return localStorage.getItem('token')|| '';

  }

  get headers(){
    return {
      headers:{
        'x-token': this.token
      }
    };
  }

  cargarMedico(id:string){

    return this.http.get(`${base_url}/medicos/${id}`,this.headers);

  }

  cargarMedicos(pagina:number = 1, limit:number = 5){
   
    return this.http.get(`${base_url}/medicos?page=${pagina}&limit=${limit}`,this.headers);

  }

  crearMedico( nombre:string, hospital:string){
   
    return this.http.post(`${base_url}/medicos`,{nombre: nombre,hospital: hospital},this.headers);

  }

  actualizarMedico(_id:string, nombre:string,hospital:string){
   
    return this.http.put(`${base_url}/medicos/${_id}`,{nombre: nombre,hospital:hospital},this.headers);

  }

  borrarMedico(_id:string){

    return this.http.delete(`${base_url}/medicos/${_id}`,this.headers);

  }
}
