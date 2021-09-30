import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Medico } from '../../../models/medico.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospital.model';
import { MedicoService } from '../../../services/medico.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public hospitales:Hospital[] = [];
  public hospitalSeleccionado:Hospital|undefined;
  public id:string;
  public medico:Medico;
  public medicoForm:FormGroup; 

  constructor(private activatedRouter:ActivatedRoute,
              private hospitalService:HospitalService,
              private medicoService:MedicoService,
              private router:Router) { 

  }

  ngOnInit(): void {

    this.activatedRouter.params.subscribe(resp =>{
      
      this.id = resp.id;

    });

    this.medicoForm = new FormGroup({
      nombre: new FormControl('',[Validators.required]),
      hospital: new FormControl('',[Validators.required])
    });

    this.medicoForm.get('hospital')?.valueChanges.subscribe(resp=>{

      this.cargarHospitalImg(resp);

    });

    this.cargarHospitales();

    this.cargarMedico();   
  
  }

  cargarMedico(){

    if(this.id === 'nuevo'){

      this.medico = new Medico('',this.id,''||undefined,''||undefined,'');

    }else{

      this.medicoService.cargarMedico(this.id).subscribe((resp:any) =>{
      
        if(resp.ok){
  
          this.medico = resp.medico;
  
          this.medicoForm.get('nombre')?.setValue(this.medico.nombre);
          this.medicoForm.get('hospital')?.setValue(this.medico.hospital?._id);
          //ó
          //this.medicoForm.setValue({nombre:this.medico.nombre,hospital:this.medico._id});

          this.cargarHospitalImg(this.medico.hospital?._id || '');
          
        }
  
      });

    }  
  }

  cargarHospitalImg(_idHospital:string){
 
      const hosp = this.hospitales.find(x => x._id === _idHospital);

      if(hosp){
        
        this.hospitalSeleccionado = hosp;

      }else{

        this.hospitalSeleccionado = undefined ;

      }

  }

  cargarHospitales(){
    this.hospitalService.cargarHospitales().subscribe((resp:any) =>{

      this.hospitales =  resp.hospitales;

    });
  }

  guardarMedico(){

    
    const {nombre,hospital} = this.medicoForm.value;

    if(this.medico._id === 'nuevo'){
      
      this.medicoService.crearMedico(nombre,hospital).subscribe((resp:any)=>{
      
        if(resp.ok){
          this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`)
        }
        
        
      });

    }else{

      this.medicoService.actualizarMedico(this.medico._id||'',nombre,hospital).subscribe((resp:any)=>{
        
        if(resp.ok){
          this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`)
        }
      
      });

    }
   

  }

}
