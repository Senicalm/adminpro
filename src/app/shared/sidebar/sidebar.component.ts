import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

 // menu:any[] = [];
  public usuario:Usuario;

  constructor(public sidebarService:SidebarService,private usuarioService:UsuarioService) { 

    this.usuario = this.usuarioService.usuario;
  //  this.menu = this.sidebarService.menu;
    
   
  }

  ngOnInit(): void {
  }

  logout(){
    this.usuarioService.logout();
  }

}
