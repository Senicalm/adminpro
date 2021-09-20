import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter,map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnInit,OnDestroy {

  public titulo:string;
  public titulaSubs:Subscription;

  constructor(private router:Router) {
    
    this.titulaSubs = this.argumentoDeRuta().subscribe(data =>{

      this.titulo = data.titulo;
      //console.log(data.titulo);
    });

  }
  ngOnDestroy(): void {
    this.titulaSubs.unsubscribe();
  }

  ngOnInit(): void {
  }

  argumentoDeRuta(){
   return this.router.events.pipe(

      filter((event:any) => event instanceof(ActivationEnd)),
      filter((event:ActivationEnd) => event.snapshot.firstChild === null),
      map((event:ActivationEnd) => event.snapshot.data)

    );
  }

}
