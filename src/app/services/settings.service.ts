import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  public elemento = document.querySelector('#theme');

  constructor() {

    this.aplicarTema();

  }

  aplicarTema(){
    
    const theme  = localStorage.getItem('theme');
    this.elemento?.setAttribute("hRef",theme || "./assets/css/colors/default-dark.css");
  
  }

  changeTheme(theme:string){

    const url = `./assets/css/colors/${theme}.css`;
    this.elemento?.setAttribute("hRef",url);
    localStorage.setItem('theme',url);

    this.checkCurrentTheme();
    
  }

  checkCurrentTheme(){

    const links:NodeListOf<Element> = document.querySelectorAll('.selector');

    links.forEach(elemento => {

      elemento.classList.remove('working');
      const btnTheme = elemento.getAttribute('data-theme');
      const urlTheme =  `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.elemento?.getAttribute('hRef');

      if (urlTheme === currentTheme){

        elemento.classList.add('working');

      }
    });
  }
}
