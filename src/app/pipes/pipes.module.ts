import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioImgPipe } from '../pipes/usuario-img.pipe';

@NgModule({
    declarations: [
      UsuarioImgPipe
    ],
    exports:[
      UsuarioImgPipe
    ],
    imports: [
      CommonModule,
    ]
  })
  export class PipesModule { }