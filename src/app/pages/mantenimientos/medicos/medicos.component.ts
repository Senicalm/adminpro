import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit {

  cargando:boolean = false;

  public termino:string = '';

  imgSubscripcion:Subscription;

  constructor() { }

  ngOnInit(): void {
  }

}
