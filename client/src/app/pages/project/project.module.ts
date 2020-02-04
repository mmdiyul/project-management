import { MatCardActions, MatCard, MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material';
import { ProjectComponent } from './project.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ListProjectModule } from './../../partials/list-project/list-project.module';
import { DetailProjectComponent } from './detail-project/detail-project.component';
import { ProjectActionsComponent } from './project-actions/project-actions.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'detail',
        component: DetailProjectComponent,
      },
      {
        path: 'project-action',
        component: ProjectActionsComponent
      }
    ]
  },
];

@NgModule({
  declarations: [ProjectComponent, DetailProjectComponent, ProjectActionsComponent],
  imports: [
    CommonModule,
    ListProjectModule,
    MatSliderModule,
    MatCardModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    ProjectComponent
  ]
})
export class ProjectModule { }
