import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule, MatIconModule, MatButtonModule, MatTableModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatPaginatorModule, MatOptionModule, MatSelectModule } from '@angular/material';
import { ReportBackendComponent } from './report.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportActionComponent } from './report-action/report-action.component';

const routes: Routes = [
  {
    path: '',
    component: ReportBackendComponent
  }
];

@NgModule({
  declarations: [
    ReportBackendComponent,
    ReportActionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatOptionModule,
    MatSelectModule
  ],
  exports: [
    ReportBackendComponent
  ],
  entryComponents: [
    ReportActionComponent
  ]
})
export class ReportBackendModule { }
