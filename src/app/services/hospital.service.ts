import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

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

  cargarHospitales(pagina:number = 1, limit:number = 5){
   
    return this.http.get(`${base_url}/hospitales?page=${pagina}&limit=${limit}`,this.headers);

  }

  crearHospital( nombre:string){
   
    return this.http.post(`${base_url}/hospitales`,{nombre: nombre},this.headers);

  }

  actualizarHospital(_id:string, nombre:string){
   
    return this.http.put(`${base_url}/hospitales/${_id}`,{nombre: nombre},this.headers);

  }

  borrarHospital(_id:string){

    return this.http.delete(`${base_url}/hospitales/${_id}`,this.headers);

  }
}
