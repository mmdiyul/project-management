import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule, MatMenuModule, MatIconModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSpinner, MatPaginatorModule, MatProgressSpinnerModule, MatSelectModule, MatOptionModule } from '@angular/material';
import { FiturBackendComponent } from './fitur.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiturActionComponent } from './fitur-action/fitur-action.component';

const routes: Routes = [
  {
    path: '',
    component: FiturBackendComponent
  }
];

@NgModule({
  declarations: [
    FiturBackendComponent,
    FiturActionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSelectModule,
    MatOptionModule
  ],
  exports: [
    FiturBackendComponent
  ],
  entryComponents: [
    FiturActionComponent
  ]
})
export class FiturBackendModule { }
