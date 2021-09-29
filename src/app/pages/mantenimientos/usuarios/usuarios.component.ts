import { Component, OnInit, OnDestroy } from '@angular/core';

import Swal from 'sweetalert2';

import { Usuario } from 'src/app/models/usuario.model';

import { UsuarioService } from '../../../services/usuario.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { ImagenModalService } from 'src/app/services/imagen-modal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit,OnDestroy {

  paginaAnterior:number = 1;
  paginaActual:number = 1;
  paginaSiguiente:number = 1;
  totalPaginas:number = 1;
  totalUsuarios:number = 0;

  usuarios:Usuario[] = [];

  cargando:boolean = false;

  public termino:string = '';

  imgSubscripcion:Subscription;
  
  constructor(private usuarioService:UsuarioService,private busquedaService:BusquedasService,private modalImageService:ImagenModalService) {  

  }
 

  ngOnInit(): void {
      this.cargarPagina();

      this.imgSubscripcion = this.modalImageService.imgenEvent.subscribe(resp=>{
       
        const user = this.usuarios.find( x => x.uid === this.modalImageService.id)||undefined;
       
        if(user){
         
          user.img = resp||'';
        }
        
      });

  }

  ngOnDestroy(): void {
    this.imgSubscripcion.unsubscribe();
  }
  resetearPaginacion(){
    this.paginaAnterior = 1;
    this.paginaActual = 1;
    this.paginaSiguiente = 1;
    this.totalPaginas = 1;
    this.totalUsuarios = 0;

    this.cargarPagina('siguiente');
  }

 cargarPagina(tipoPagina:string ='siguiente' || 'anterior'){

    this.cargando = true;

    let paginaCargar:number;

    if(tipoPagina === 'siguiente'){

      paginaCargar = this.paginaSiguiente;

    }else{

      paginaCargar = this.paginaAnterior;

    }
   
    if(this.termino === ''){
       this.usuarioService.cargarUsuarios(paginaCargar).subscribe((resp) =>{
        
            this.paginaAnterior = resp.backPage;
            this.paginaActual = resp.actualPage;
            this.paginaSiguiente = resp.nextPage;
            this.totalUsuarios = resp.total;
            this.usuarios = resp.usuarios;
            this.totalPaginas = resp.totalPages;
           // console.log(resp);
      
            this.cargando = false;
      
          });
    }else{

        this.busquedaService.buscar('usuarios',this.termino,paginaCargar).subscribe((resp:any) =>{

          console.log(resp);
            this.paginaAnterior = resp.backPage;
            this.paginaActual = resp.actualPage;
            this.paginaSiguiente = resp.nextPage;
            this.totalUsuarios = resp.total;
            this.usuarios = resp.coleccion;
            this.totalPaginas = resp.totalPages;
           // console.log(resp);
      
            this.cargando = false;
        });

    }
   
  }

  eliminarUsuario(usuario:Usuario){

    if(usuario.uid === this.usuarioService.uid){

      Swal.fire('No puede borrar este usuario','','warning');
      return ;

    }

    Swal.fire({
      title: 'Borrar usuario?',
      text: `Esta a punto de borrar ${usuario.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(usuario).subscribe((resp:any) =>{

          if(resp.ok){

            const index = this.usuarios.indexOf(usuario, 0);
            if (index > -1) {
              this.usuarios.splice(index, 1);
            }
            Swal.fire(
              'Borrado!',
              'El registro ha sido borrado.',
              'success'
            );
          }else{
            Swal.fire(
              'Error!',
              resp.msg,
              'error'
            );
          }
         
         

        });
       
      }
    })
  }

  cambiarRole(usuario:Usuario){

    this.usuarioService.actualizarUsuario(usuario).subscribe(resp =>{
      //console.log(resp);
    })
    
  }

  abrirModal(usuario:Usuario){
    
    this.modalImageService.abrirModal('usuarios', usuario.uid? usuario.uid:'',usuario.img);
    
  }


}
