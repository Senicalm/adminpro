import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';


declare function customInitFunctions():any; 
//declarem la funcio de custom.js en scrip de index.html, i la cridem per que reinisii ja que pasar de login a dashbord perd l´oremus o reseteja js.

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  

  constructor(private settingsService:SettingsService) { }

  ngOnInit(): void {
    customInitFunctions();
  }

}
