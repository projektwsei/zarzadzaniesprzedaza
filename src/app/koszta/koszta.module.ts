import { Routes, RouterModule } from '@angular/router';
import { KosztaComponent } from './koszta.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
export const routes: Routes = [
  { path: '', component: KosztaComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [KosztaComponent],
  exports: [KosztaComponent]
})
export class KosztaModule { }
