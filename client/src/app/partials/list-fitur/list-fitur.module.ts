import { ListFiturComponent } from './list-fitur.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ListFiturComponent
  }
];

@NgModule({
  declarations: [ListFiturComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatCardModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    ListFiturComponent
  ]
})
export class ListFiturModule { }
