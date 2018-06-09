import { MagazynComponent } from './magazyn.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
export const routes: Routes = [
  { path: '', component: MagazynComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [MagazynComponent],
  exports: [MagazynComponent]
})
export class MagazynModule { }
