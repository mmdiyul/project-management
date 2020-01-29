import { ProjectComponent } from './project.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ListProjectModule } from './../../partials/list-project/list-project.module';

const routes: Routes = [
  {
    path: '',
    component: ProjectComponent
  }
];

@NgModule({
  declarations: [ProjectComponent],
  imports: [
    CommonModule,
    ListProjectModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    ProjectComponent
  ]
})
export class ProjectModule { }
