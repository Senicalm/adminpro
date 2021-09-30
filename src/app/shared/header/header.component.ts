import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public usuario:Usuario;

  constructor(private usuarioService:UsuarioService,private router:Router) { 

   
    this.usuario = this.usuarioService.usuario;
   // console.log(this.imgUrl);

  }

  ngOnInit(): void {
  }

  logout(){
    this.usuarioService.logout();
  }

  buscar(termino:string){

    if(termino.length === 0){
      
      this.router.navigateByUrl('/dashboard');

    }else{

      this.router.navigateByUrl(`/dashboard/buscar/${termino}`);
      
    }
    
  }
}
