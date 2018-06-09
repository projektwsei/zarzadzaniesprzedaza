import { Routes, RouterModule } from '@angular/router';
import { KlienciComponent } from './klienci.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
export const routes: Routes = [
  { path: '', component: KlienciComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [KlienciComponent],
  exports: [KlienciComponent]
})
export class KlienciModule { }
