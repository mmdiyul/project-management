import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule, MatIconModule, MatButtonModule, MatTableModule, MatDialogModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { OrganizationBackendComponent } from './organization.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationActionComponent } from './organization-action/organization-action.component';

const routes: Routes = [
  {
    path: '',
    component: OrganizationBackendComponent
  }
];

@NgModule({
  declarations: [
    OrganizationBackendComponent,
    OrganizationActionComponent
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
    MatInputModule
  ],
  exports: [
    OrganizationBackendComponent
  ],
  entryComponents: [
    OrganizationActionComponent
  ]
})
export class OrganizationBackendModule { }
