import { AuthGuard } from './auth/guard.auth';
import { FakturaPodgladComponent } from './faktury/faktura-podglad/faktura-podglad.component';
import { KlienciDodajComponent } from './klienci/klienci-dodaj/klienci-dodaj.component';
import { MagazynDodajComponent } from './magazyn/magazyn-dodaj/magazyn-dodaj.component';
import { FakturaDodajComponent } from './faktury/faktura-dodaj/faktura-dodaj.component';
import { UstawieniaComponent } from './ustawienia/ustawienia.component';
import { MagazynComponent } from './magazyn/magazyn.component';
import { LoginComponent } from './auth/login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { Routes, Router, RouterModule } from '@angular/router';
import { RegistrationComponent } from './auth/registration/registration.component';
import { KlienciComponent } from './klienci/klienci.component';
import { FakturyComponent } from './faktury/faktury.component';
import { EdytujProfilComponent } from './ustawienia/edytuj-profil/edytuj-profil.component';

const appRoutes: Routes = [
    {
        path: '', component: HomePageComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'home', component: HomePageComponent, canActivate: [AuthGuard]
    },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegistrationComponent },

    {
        path: 'kontrahenci', component: KlienciComponent, canActivate: [AuthGuard]
    },
    {
        path: 'kontrahenci/dodaj/:id', component: KlienciDodajComponent, canActivate: [AuthGuard]
    },

    {
        path: 'magazyn', component: MagazynComponent, canActivate: [AuthGuard]
    },
    {
        path: 'magazyn/dodaj/:id', component: MagazynDodajComponent, canActivate: [AuthGuard]
    },

    {
        path: 'ustawienia', component: UstawieniaComponent, canActivate: [AuthGuard]
    },
    {
        path: 'edytujprofil', component: EdytujProfilComponent, canActivate: [AuthGuard]
    },

    {
        path: 'faktury', component: FakturyComponent, canActivate: [AuthGuard]
    },
    {
        path: 'faktury/dodaj/:id', component: FakturaDodajComponent, canActivate: [AuthGuard]
    },
    {
        path: 'faktury/:id', component: FakturaPodgladComponent, canActivate: [AuthGuard]
    },

    // otherwise redirect to HomePageComponent
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

