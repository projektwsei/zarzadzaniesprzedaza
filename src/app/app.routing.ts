import { HomePageComponent } from './home-page/home-page.component';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';


const appRoutes: Routes = [
    {
        path: '', component: HomePageComponent,
        // canActivate: [AuthGuard]
    },
    { path: 'login', loadChildren: './auth/login/login.module#LoginModule' },
    {
        path: 'register',
        loadChildren: './auth/registration/registration.module#RegistrationModule'
    },
    // otherwise redirect to HomePageComponent
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
