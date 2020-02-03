import { MatMenuModule, MatIconModule, MatButtonModule, MatTableModule } from '@angular/material';
import { OrganizationBackendComponent } from './organization.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: OrganizationBackendComponent
  }
];

@NgModule({
  declarations: [
    OrganizationBackendComponent
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
    OrganizationBackendComponent
  ]
})
export class OrganizationBackendModule { }