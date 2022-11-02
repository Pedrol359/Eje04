import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { InfoAlumnoPage } from './info-alumno/info-alumno.page';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent, InfoAlumnoPage],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    RouterModule.forRoot([
    { path: '', component: AppComponent },
    { path: 'info-alumno', component: InfoAlumnoPage },
  ])],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
