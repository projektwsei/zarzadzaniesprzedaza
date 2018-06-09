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
import { InvoiceListComponent } from './invoice/invoice-list/invoice-list.component';
import { InvoiceAddComponent } from './invoice/invoice-add/invoice-add.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoadingComponent,
    MenuComponent,
    InvoiceListComponent,
    InvoiceAddComponent
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

