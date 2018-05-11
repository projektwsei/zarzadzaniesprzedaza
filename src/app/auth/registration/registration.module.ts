import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration.component';
import { Routes, RouterModule} from '@angular/router';

export const routes: Routes = [
  { path: '', component: RegistrationComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [RegistrationComponent]
})
export class RegistrationModule { }
