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
    RouterModule.forChild(routes)
  ],
  exports: [
    UserBackendComponent
  ]
})
export class UserBackendModule { }
