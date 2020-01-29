import { MatTableModule, MatButtonModule, MatIconModule, MatMenuModule } from '@angular/material';
import { UserBackendComponent } from './user.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: UserBackendComponent
  }
];

@NgModule({
  declarations: [
    UserBackendComponent
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
    UserBackendComponent
  ]
})
export class UserBackendModule { }
