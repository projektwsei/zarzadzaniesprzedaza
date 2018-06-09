import { AppRoutingModule } from './app.routing';
import { AuthGuard } from './auth/guard.auth';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';




import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoadingComponent } from './loading/loading.component';
import { HeaderComponent } from './header/header.component';
import { FakturyComponent } from './faktury/faktury.component';
import { DodajComponent } from './faktury/dodaj/dodaj.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoadingComponent,
    HeaderComponent,
    FakturyComponent,
    DodajComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

