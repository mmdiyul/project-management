import { MatTableModule, MatButtonModule, MatIconModule, MatMenuModule } from '@angular/material';
import { RoleBackendComponent } from './role.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: RoleBackendComponent
  }
];

@NgModule({
  declarations: [
    RoleBackendComponent
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
    RoleBackendComponent
  ]
})
export class RoleBackendModule { }
