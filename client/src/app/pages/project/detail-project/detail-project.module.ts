import { MatCardActions } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DetailProjectComponent } from './detail-project.component';
import { MatButtonModule, MatPaginatorModule, MatProgressBarModule, MatCardModule } from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: DetailProjectComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatCardModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    DetailProjectComponent
  ]
})
export class DetailProjectModule { }
