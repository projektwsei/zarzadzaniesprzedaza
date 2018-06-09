import { KosztaDodajComponent } from './koszta/koszta-dodaj/koszta-dodaj.component';
import { KlienciDodajComponent } from './klienci/klienci-dodaj/klienci-dodaj.component';
import { MagazynDodajComponent } from './magazyn/magazyn-dodaj/magazyn-dodaj.component';
import { FakturaDodajComponent } from './faktury/faktura-dodaj/faktura-dodaj.component';
import { KosztaComponent } from './koszta/koszta.component';
import { UstawieniaComponent } from './ustawienia/ustawienia.component';
import { MagazynComponent } from './magazyn/magazyn.component';
import { LoginComponent } from './auth/login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoadingComponent } from './loading/loading.component';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './auth/registration/registration.component';
import { KlienciComponent } from './klienci/klienci.component';
import { FakturyComponent } from './faktury/faktury.component';


const appRoutes: Routes = [
    {
        path: '', component: LoadingComponent,
        // canActivate: [AuthGuard]
    },
    { path: 'home', component: HomePageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegistrationComponent },

    { path: 'kontrahenci', component: KlienciComponent },
    { path: 'kontrachenci/dodaj/:id', component: KlienciDodajComponent },

    { path: 'magazyn', component: MagazynComponent },
    { path: 'magazyn/dodaj/:id', component: MagazynDodajComponent },

    { path: 'ustawienia', component: UstawieniaComponent },

    { path: 'faktury', component: FakturyComponent },
    { path: 'faktury/dodaj/:id', component: FakturaDodajComponent },

    { path: 'koszty', component: KosztaComponent },
    { path: 'koszty/dodaj/:id', component: KosztaDodajComponent },

    // otherwise redirect to HomePageComponent
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

