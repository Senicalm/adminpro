import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { retry,take,map,filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit,OnDestroy {

  public intervalSubs: Subscription;


  constructor() { }

  ngOnDestroy(): void {

    this.intervalSubs.unsubscribe();

  }

  ngOnInit(): void {

    

    // this.getObservable().pipe(
    //   retry() //aixo es com un try catch, al arribar 2 peta, pero el pipe retry fa continuar 
    //           //sense llençar el error(reinicia el observable, pero com que la variable ja esta en 2 pasa el 3 i continua)
    //           //Al retry se li pot dir els intents, retry(2) = serien 2 intents, si no te numero, es ilimitat.
    // ).subscribe(
    //   valor =>{

    //   console.log(valor);

    // },error =>{

    //   console.warn('Aqui el error, arriba a 2'); //No salta per que hi ha el retry
      
    // },() =>{
    //   //cuando se ha clompletado
    //   console.log('Completado');

    // });

    this.intervalSubs = this.getIntervalo().subscribe((valor)=>{

      console.log(valor);

    });

  }


  getIntervalo(){
    //$ al final de la variable es per que la gent vegi que es un observable, pero no influeix en res.
    const intervalo$ = interval(500).pipe(  //500 es cada cuan ejecuta, mitg segon en aquest cas.

     // take(10),  //take es que el interval fara 10 voltes
      map(resp =>{
        return resp+=1;
      }),
      filter(valor =>{  //Volem que retorni els que son pars, el filter retornem true o false su volem que pasi o no.
        if(valor % 2 === 0){
          return true;
        }else{
          return false;
        }
      })
    ); 
    
    return intervalo$;
  }


  getObservable(){
    let i:number = -1;

    return new Observable<number>(observer =>{

      const intervalo = setInterval(()=>{

       i++;
       observer.next(i);
      
       if(i===4){
         clearInterval(intervalo);
         observer.complete();
       }

       if(i === 2){
         observer.error('i llego al valor 2')
       }

      },1000);
    });

  }

}
