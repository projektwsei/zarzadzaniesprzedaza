import { UstawieniaComponent } from './ustawienia.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
export const routes: Routes = [
  { path: '', component: UstawieniaComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [UstawieniaComponent],
  exports: [UstawieniaComponent]
})
export class UstawieniaModule { }
