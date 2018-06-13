import { UstawieniaComponent } from './ustawienia/ustawienia.component';
import { KlienciComponent } from './klienci/klienci.component';
import { FakturyComponent } from './faktury/faktury.component';
import { MagazynComponent } from './magazyn/magazyn.component';
import { AuthModule } from './auth/auth.module';
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


//services:
import { AuthService } from './services/auth.service';
import { DaneFirmyService } from './services/danefirmy.service';
import { DatabaseService } from './services/database.service';
import { FakturyService } from './services/faktury.service';
import { FirebaseService } from './services/firebase.service';
import { KontrahenciService } from './services/kontrahenci.service';
import { MagazynService } from './services/magazyn.service';
import { UsersService } from './services/users.service';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoadingComponent,
    MenuComponent,
    MagazynComponent,
    MagazynDodajComponent,
    FakturyComponent,
    FakturaDodajComponent,
    KlienciComponent,
    KlienciDodajComponent,
    UstawieniaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
  ],
  providers: [AuthGuard, AuthService, DaneFirmyService, DatabaseService, FakturyService, FirebaseService, KontrahenciService, MagazynService, UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }

