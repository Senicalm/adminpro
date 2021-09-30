import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../models/usuario.model';
import { Hospital } from '../../models/hospital.model';
import { Medico } from '../../models/medico.model';
import { BusquedasService } from '../../services/busquedas.service';


@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  public usuarios:Usuario[] = [];
  public hospitales:Hospital[] = [];
  public medicos:Medico[] = [];

  constructor(private activatedRoute:ActivatedRoute,private busquedasService:BusquedasService,private router:Router) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(resp =>{

      const {termino} =  resp;
      
      this.busquedasService.buscarGlobal(termino).subscribe((resp:any) =>{

       // console.log(resp);
        const {ok,usuarios,hospitales,medicos} = resp;
        
        if(ok){

          this.usuarios = usuarios;
          this.hospitales = hospitales;
          this.medicos = medicos;

        }else{

          this.usuarios = [];
          this.hospitales = [];
          this.medicos = [];

        }


      });

    });
  }

  abrirUsuario(usuario:Usuario){

    this.router.navigate([`dashboard/usuarios/`,usuario.nombre]);

  }

  abrirHospital(hospital:Hospital){

    this.router.navigate([`dashboard/hospitales/`,hospital.nombre]);

  }

  abrirMedico(medico:Medico){

    this.router.navigate([`dashboard/medico/`,medico._id]);

  }

}
