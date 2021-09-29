import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

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

  buscar(tipo:'usuarios' | 'medicos' | 'hospitales',termino:string,pagina:number = 1, limit:number = 5){
    // /todo/usuarios/ser?limit=5&page=1
    return this.http.get(`${base_url}/todo/${tipo}/${termino}?page=${pagina}&limit=${limit}`,this.headers);

  }
}
