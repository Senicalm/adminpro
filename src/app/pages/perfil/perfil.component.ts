import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UsuarioService } from '../../services/usuario.service';
import { FileUploadService } from '../../services/file-upload.service';
import { Usuario } from '../../models/usuario.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm:FormGroup;
  public usuario:Usuario;
  public imagenSubir:File;
  public imgTmp:any ='';

  constructor(public usuarioService:UsuarioService,private fileUploadService:FileUploadService) { 

    this.usuario = usuarioService.usuario;

  }

  ngOnInit(): void {
    this.perfilForm = new FormGroup({
      nombre: new FormControl(this.usuarioService.usuario.nombre, Validators.compose([Validators.required])),
      email: new FormControl(this.usuarioService.usuario.email, Validators.compose([Validators.required , Validators.email])),
    })
  }

  actualizarPerfil(){

    const {nombre, email} = this.perfilForm.value;
    const user = new Usuario(nombre,email,'','',this.usuario.google,this.usuario.role,this.usuario.uid);
    
    

    this.usuarioService.actualizarUsuario(user).subscribe(resp=>{

     // console.log(resp);
     Swal.fire('Guardado','Cambios guardados','success');

    },(err)=>{
      Swal.fire('Error',err.error.msg,'error');
    });
    
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

    this.fileUploadService.actualizarFoto(this.imagenSubir,'usuarios',this.usuario.uid || '').then(resp=>{
      
      if(resp.ok){

         this.usuarioService.usuario.img = resp.nombreArchivo;
         Swal.fire('Guardado','Imagen guardada','success');
         
      }else{

        Swal.fire('Error',resp.msg,'error');

      }

    });

  }

}
