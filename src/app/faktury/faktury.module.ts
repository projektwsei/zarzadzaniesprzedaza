import { FakturyComponent } from './faktury.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export const routes: Routes = [
  { path: '', component: FakturyComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [FakturyComponent],
  exports: [FakturyComponent]
})
export class FakturyModule { }
