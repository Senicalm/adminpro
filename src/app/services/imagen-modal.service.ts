import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImagenModalService {

  private _ocultarModal = true;
  public tipo: 'usuarios' | 'hospitales' | 'medicos';
  public id:string;
  public img:string;

  public imgenEvent:EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  get ocultarModal(){
    return this._ocultarModal;
  }

  abrirModal(tipo: 'usuarios' | 'hospitales' | 'medicos', id:string, img:string = ''){

    this.tipo = tipo;
    this.id = id;
    this.img = img;
    this._ocultarModal = false;

  }
  cerrarModal(){

    this._ocultarModal = true;

  }

  
}
