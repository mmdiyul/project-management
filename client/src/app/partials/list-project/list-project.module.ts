import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProjectComponent } from './list-project.component';

import {MatCardModule, MatCardActions} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { Routes, RouterModule } from '@angular/router';
import { ListFiturComponent } from '../list-fitur/list-fitur.component';

const routes: Routes = [
  {
    path: '',
    component: ListProjectComponent
  }
];

@NgModule({
  declarations: [ListProjectComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatCardModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    ListProjectComponent
  ]
})
export class ListProjectModule { }
