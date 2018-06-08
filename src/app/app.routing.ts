import { HomePageComponent } from './home-page/home-page.component';
import { LoadingComponent } from './loading/loading.component';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { InvoiceAddComponent } from './invoice/invoice-add/invoice-add.component';


const appRoutes: Routes = [
    {
        path: '', component: LoadingComponent,
        // canActivate: [AuthGuard]
    },
    { path: 'home', component: HomePageComponent },
    { path: 'login', loadChildren: './auth/login/login.module#LoginModule' },
    { path: 'register', loadChildren: './auth/registration/registration.module#RegistrationModule' },
    { path: 'invoice-add', component: InvoiceAddComponent },
    // otherwise redirect to HomePageComponent
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

