import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

//MODULOS
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';



//MODULOS
import { AuthModule } from './auth/auth.module';


//COMPONENTES
import { NopagefoundComponent } from './nopagefound/nopagefound.component';


@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
