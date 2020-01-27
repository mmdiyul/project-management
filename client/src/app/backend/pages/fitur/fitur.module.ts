import { FiturBackendComponent } from './fitur.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: FiturBackendComponent
  }
];

@NgModule({
  declarations: [
    FiturBackendComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    FiturBackendComponent
  ]
})
export class FiturBackendModule { }
