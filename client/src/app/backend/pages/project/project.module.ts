import { MatMenuModule, MatIconModule, MatButtonModule, MatTableModule } from '@angular/material';
import { Routes, RouterModule } from '@angular/router';
import { ProjectBackendComponent } from './project.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectActionComponent } from './project-action/project-action.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectBackendComponent
  }
];

@NgModule({
  declarations: [
    ProjectBackendComponent,
    ProjectActionComponent
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
    ProjectBackendComponent
  ]
})
export class ProjectBackendModule { }
