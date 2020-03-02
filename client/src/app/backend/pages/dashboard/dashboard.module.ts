import { AuthGuard } from './../../../services/auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { DashboardBackendComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: DashboardBackendComponent,
    canActivate: [AuthGuard]
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
