import { AppRoutingModule } from './app.routing';
import { AuthGuard } from './auth/guard.auth';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoadingComponent } from './loading/loading.component';
import { MenuComponent } from './shared/menu/menu.component';
import { MagazynDodajComponent } from './magazyn/magazyn-dodaj/magazyn-dodaj.component';
import { FakturaDodajComponent } from './faktury/faktura-dodaj/faktura-dodaj.component';
import { KlienciDodajComponent } from './klienci/klienci-dodaj/klienci-dodaj.component';
import { KosztaDodajComponent } from './koszta/koszta-dodaj/koszta-dodaj.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoadingComponent,
    MenuComponent,
    MagazynDodajComponent,
    FakturaDodajComponent,
    KlienciDodajComponent,
    KosztaDodajComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

