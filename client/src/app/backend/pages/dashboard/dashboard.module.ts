import { Routes, RouterModule } from '@angular/router';
import { DashboardBackendComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: DashboardBackendComponent
  }
];

@NgModule({
  declarations: [
    DashboardBackendComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    DashboardBackendComponent
  ]
})
export class DashboardBackendModule { }
