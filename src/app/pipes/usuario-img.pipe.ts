import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Pipe({
  name: 'usuarioImg'
})
export class UsuarioImgPipe implements PipeTransform {

  transform(imagen: string | undefined,tipo: 'usuarios' | 'hospitales' | 'medicos'): string {
    if(!imagen){

      return `${base_url}/uploads/${tipo}/no-image`;
      
    }
  
    if(imagen?.includes('https')){
      // console.log(imagen);
        return imagen;
       
    }
  
    if(imagen){
  
        return `${base_url}/uploads/${tipo}/${imagen}`;
  
    }else{
  
        return `${base_url}/uploads/${tipo}/no-image`;
  
    }
  }

}
