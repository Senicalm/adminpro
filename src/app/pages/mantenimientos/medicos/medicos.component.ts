import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { Medico } from '../../../models/medico.model';

import { ImagenModalService } from '../../../services/imagen-modal.service';
import { MedicoService } from '../../../services/medico.service';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit,OnDestroy {

  cargando:boolean = false;

  public termino:string = '';

  imgSubscripcion:Subscription;

  paginaAnterior:number = 1;
  paginaActual:number = 1;
  paginaSiguiente:number = 1;
  totalPaginas:number = 1;
  totalUsuarios:number = 0;

  medicos:Medico[] = [];

  constructor(private medicoService:MedicoService ,private modalImageService:ImagenModalService,private busquedaService:BusquedasService) { }

 

  ngOnInit(): void {

    this.cargarPagina();

    this.imgSubscripcion = this.modalImageService.imgenEvent.subscribe(resp=>{
       
      const medi = this.medicos.find( x => x._id === this.modalImageService.id)||undefined;
     
      if(medi){
       
        medi.img = resp||'';
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

  cargarPagina(tipoPagina?: 'siguiente' | 'anterior' | 'actual'){

    this.cargando = true;

    let paginaCargar:number;

    if(tipoPagina === 'siguiente'){

      paginaCargar = this.paginaSiguiente;

    }else if(tipoPagina === 'anterior'){

      paginaCargar = this.paginaAnterior;

    }else{

      paginaCargar = this.paginaActual

    }
   
    if(this.termino === ''){
       this.medicoService.cargarMedicos(paginaCargar).subscribe((resp:any) =>{
        
            this.paginaAnterior = resp.backPage;
            this.paginaActual = resp.actualPage;
            this.paginaSiguiente = resp.nextPage;
            this.totalUsuarios = resp.total;
            this.medicos = resp.medicos;
            this.totalPaginas = resp.totalPages;
           // console.log(resp);
      
            this.cargando = false;
      
          });
    }else{

        this.busquedaService.buscar('medicos',this.termino,paginaCargar).subscribe((resp:any) =>{

         // console.log(resp);
            this.paginaAnterior = resp.backPage;
            this.paginaActual = resp.actualPage;
            this.paginaSiguiente = resp.nextPage;
            this.totalUsuarios = resp.total;
            this.medicos = resp.coleccion;
            this.totalPaginas = resp.totalPages;
           // console.log(resp);
      
            this.cargando = false;
        });

    }
   
  }

  guardarCambios(medico:Medico, elemento?:HTMLElement){

    if(elemento){
      elemento.blur();
    }
    this.medicoService.actualizarMedico(medico._id||'',medico.nombre,medico.hospital?._id||'').subscribe((resp:any) =>{

      if(resp.ok){

      Swal.fire(
        'Actualizado!',
        'El registro ha sido actualizado.',
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


  abrirModal(medico:Medico){
    
    this.modalImageService.abrirModal('medicos', medico._id? medico._id:'',medico.img);
    
  }

  borrarMedico(medico:Medico){

    Swal.fire({
      title: 'Borrar Medico?',
      text: `Esta a punto de borrar ${medico.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.medicoService.borrarMedico(medico._id||'').subscribe((resp:any) =>{

          if(resp.ok){
    
            const index = this.medicos.indexOf(medico, 0);
            if (index > -1) {
              this.medicos.splice(index, 1);
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
}
