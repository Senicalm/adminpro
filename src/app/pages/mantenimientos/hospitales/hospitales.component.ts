import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { Hospital } from '../../../models/hospital.model';

import { BusquedasService } from '../../../services/busquedas.service';
import { HospitalService } from '../../../services/hospital.service';
import { ImagenModalService } from '../../../services/imagen-modal.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {

  cargando:boolean = false;

  public termino:string = '';

  imgSubscripcion:Subscription;

  paginaAnterior:number = 1;
  paginaActual:number = 1;
  paginaSiguiente:number = 1;
  totalPaginas:number = 1;
  totalUsuarios:number = 0;

  hospitales:Hospital[] = [];

  constructor(private hospitalService:HospitalService,private busquedaService:BusquedasService,private modalImageService:ImagenModalService) { }

  ngOnInit(): void {

    this.cargarPagina();

    this.imgSubscripcion = this.modalImageService.imgenEvent.subscribe(resp=>{
       
      const hospi = this.hospitales.find( x => x._id === this.modalImageService.id)||undefined;
     
      if(hospi){
       
        hospi.img = resp||'';
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
       this.hospitalService.cargarHospitales(paginaCargar).subscribe((resp:any) =>{
        
            this.paginaAnterior = resp.backPage;
            this.paginaActual = resp.actualPage;
            this.paginaSiguiente = resp.nextPage;
            this.totalUsuarios = resp.total;
            this.hospitales = resp.hospitales;
            this.totalPaginas = resp.totalPages;
           // console.log(resp);
      
            this.cargando = false;
      
          });
    }else{

        this.busquedaService.buscar('hospitales',this.termino,paginaCargar).subscribe((resp:any) =>{

          console.log(resp);
            this.paginaAnterior = resp.backPage;
            this.paginaActual = resp.actualPage;
            this.paginaSiguiente = resp.nextPage;
            this.totalUsuarios = resp.total;
            this.hospitales = resp.coleccion;
            this.totalPaginas = resp.totalPages;
           // console.log(resp);
      
            this.cargando = false;
        });

    }
   
  }

  async crearHospital(){
    const { value } = await Swal.fire<string>({
      title:'Crear hospital',
      input: 'text',
      inputLabel: 'Hospital',
      inputPlaceholder: 'Nuevo hospital...',  
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value.trim().length > 0) {
            resolve(null);
          } else {
            resolve('No puede quedar el texto vacío!!');
          }
        });
      }
    });
    
    if (value) {

      this.hospitalService.crearHospital(value).subscribe(resp =>{

        this.cargarPagina('actual');

      });

    }
  }

  abrirModal(hospital:Hospital){
    
    this.modalImageService.abrirModal('hospitales', hospital._id? hospital._id:'',hospital.img);
    
  }

  guardarCambios(hospital:Hospital, elemento?:HTMLElement){

    if(elemento){
      elemento.blur();
    }
    this.hospitalService.actualizarHospital(hospital._id||'',hospital.nombre).subscribe((resp:any) =>{

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

  borrarHospital(hospital:Hospital){

    Swal.fire({
      title: 'Borrar hospital?',
      text: `Esta a punto de borrar ${hospital.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.hospitalService.borrarHospital(hospital._id||'').subscribe((resp:any) =>{

          if(resp.ok){
    
            const index = this.hospitales.indexOf(hospital, 0);
            if (index > -1) {
              this.hospitales.splice(index, 1);
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
