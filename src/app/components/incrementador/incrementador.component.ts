import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';



@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

  //@Input() progreso = 40;
  @Input('valor') progreso = 40;
  @Input() btnClass:string = 'btn-primary'

  @Output() valorChange:EventEmitter<number> = new EventEmitter();
  @ViewChild('txt_valor') txt_valor: ElementRef<any>;
   
  constructor() { }

  ngOnInit(): void {

    this.btnClass = `btn ${this.btnClass}`;

  }

  
  cambiarValor(valor:number){

    this.progreso+= valor;

    if(this.progreso >= 100){
      this.progreso = 100;
      
    }
    if(this.progreso <= 0){
      this.progreso = 0;
      
    }

    this.valorChange.emit(this.progreso);

  }

  onChange(valor:number){

    this.progreso = valor;

    if(this.progreso >= 100){

      this.progreso = 100;
      this.txt_valor.nativeElement.blur();
    }
    if(this.progreso <= 0){

      this.progreso = 0;
      
    }

    this.valorChange.emit(this.progreso);

    console.log(this.progreso);

  }

}
