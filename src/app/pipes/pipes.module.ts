import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoImgPipe } from './tipo-img.pipe';

@NgModule({
    declarations: [
      TipoImgPipe
    ],
    exports:[
      TipoImgPipe
    ],
    imports: [
      CommonModule,
    ]
  })
  export class PipesModule { }