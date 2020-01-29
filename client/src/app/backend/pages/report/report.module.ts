import { MatMenuModule, MatIconModule, MatButtonModule, MatTableModule } from '@angular/material';
import { ReportBackendComponent } from './report.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: ReportBackendComponent
  }
];

@NgModule({
  declarations: [
    ReportBackendComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ],
  exports: [
    ReportBackendComponent
  ]
})
export class ReportBackendModule { }
