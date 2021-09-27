
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  
  constructor() { }

  async actualizarFoto(
    archivo:File, 
    tipo:'usuarios' | 'hospitales' | 'medicos', 
    id:string){

    try {
      //Una altre manera de fer http, pero aquest metode es propi de javascript
      const url = `${base_url}/uploads/${tipo}/${id}`;

      const formData = new FormData();
      formData.append('imagen',archivo);

      const resp = await fetch(url,{
        method:'PUT',
        headers:{
          'x-token': localStorage.getItem('token') || ''
        },
        body:formData
      });

      //console.log(resp.json());
      const data = await resp.json();

      return data;

    } catch (error) {

      // const erro = await error;
      // console.log(erro);
      return error;  

    }

  }

}
