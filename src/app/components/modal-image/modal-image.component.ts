import { Component, OnInit } from '@angular/core';
import { ImagenModalService } from '../../services/imagen-modal.service';
import { UsuarioService } from '../../services/usuario.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styles: [
  ]
})
export class ModalImageComponent implements OnInit {

  public imagenSubir:File;
  public imgTmp:any ='';
 
  constructor(public imagenModalService:ImagenModalService,private fileUploadService:FileUploadService) { }

  ngOnInit(): void {
  }

  cerrarModal(){
    this.imgTmp = null;
    this.imagenModalService.cerrarModal();
  }

  cambiarImagen(event:any){
  
    this.imagenSubir = event.target.files[0];

    if(!this.imagenSubir){
      
       this.imgTmp = null;
      return;
    }

    const reader = new FileReader();
    const url64 = reader.readAsDataURL(this.imagenSubir);

    reader.onload = ()=>{

      this.imgTmp = reader.result;
     

    };
  }

  subirImagen(){

    this.fileUploadService.actualizarFoto(this.imagenSubir,this.imagenModalService.tipo,this.imagenModalService.id || '').then(resp=>{
      
      if(resp.ok){

         this.imagenModalService.imgenEvent.emit(resp.nombreArchivo)

         this.cerrarModal();
         
         Swal.fire('Guardado','Imagen guardada','success');
         
      }else{

        Swal.fire('Error',resp.msg,'error');

      }

    });

  }

}
