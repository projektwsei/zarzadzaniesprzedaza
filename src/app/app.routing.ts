import { HomePageComponent } from './home-page/home-page.component';
import { LoadingComponent } from './loading/loading.component';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';


const appRoutes: Routes = [
    {
        path: '', component: LoadingComponent,
        // canActivate: [AuthGuard]
    },
    { path: 'home', component: HomePageComponent },
    { path: 'login', loadChildren: './auth/login/login.module#LoginModule' },
    { path: 'register', loadChildren: './auth/registration/registration.module#RegistrationModule' },
    
    { path: 'kontrahenci', loadChildren: './klienci/klienci.module#KlienciModule' },

    { path: 'magazyn', loadChildren: './magazyn/magazyn.module#MagazynModule'},

    { path: 'ustawienia', loadChildren: './ustawienia/ustawienia.module#UstawieniaModule'},

    { path: 'faktury', loadChildren: './faktury/faktury.module#FakturyModule'},
    //{ path: 'faktury/dodaj', 

    { path: 'koszty', loadChildren: './koszta/koszta.module#KosztaModule'},

    // otherwise redirect to HomePageComponent
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

