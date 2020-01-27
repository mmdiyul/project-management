import { FiturComponent } from './fitur.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ListFiturModule } from './../../partials/list-fitur/list-fitur.module';

const routes: Routes = [
  {
    path: '',
    component: FiturComponent
  }
];


@NgModule({
  declarations: [FiturComponent],
  imports: [
    CommonModule,
    ListFiturModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    FiturComponent
  ]
})
export class FiturModule { }
