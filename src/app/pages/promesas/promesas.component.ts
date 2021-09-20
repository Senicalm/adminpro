import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    // const promesa = new Promise((resolve,reject) =>{

    //   if(false){
 
    //     resolve("hola mundo");

    //   }else{

    //     reject("algo fallo")

    //   }
    
    
    // });

    // promesa.then((mensaje)=>{
    //   //resolve
    //   console.log(mensaje);
    //   console.log("Resuelto");

    // }).catch(error =>{
    //   //reject
    //   console.log(error);

    // });

    // console.log("Fin del init");


    this.getUsuarios().then(usuarios =>{
      console.log(usuarios);
    });

  }

  getUsuarios(){

    return new Promise(resolve =>{

      fetch('https://reqres.in/api/users')
      .then(res=>{

        return res.json();

      })
      .then(res2 =>{

        resolve(res2.data);

      });

    });
    
  }

}
