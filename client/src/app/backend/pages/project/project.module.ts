import { Routes, RouterModule } from '@angular/router';
import { ProjectBackendComponent } from './project.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: ProjectBackendComponent
  }
];

@NgModule({
  declarations: [
    ProjectBackendComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    ProjectBackendComponent
  ]
})
export class ProjectBackendModule { }
