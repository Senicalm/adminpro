import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'
  ]
})
export class ProgressComponent implements OnInit {

  progreso1:number = 20;
  progreso2:number = 35;

  ngOnInit(): void {

  }

  get getProgreso1(){

    return `${this.progreso1}%`;

  }

  get getProgreso2(){

    return `${this.progreso2}%`;

  }

  cambioValor1(valor:number){

    this.progreso1 = valor;

  }
  cambioValor2(valor:number){

    this.progreso2 = valor;
    
  }

  

  

}
