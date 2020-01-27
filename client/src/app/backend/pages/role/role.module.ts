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
    RouterModule.forChild(routes)
  ],
  exports: [
    RoleBackendComponent
  ]
})
export class RoleBackendModule { }
