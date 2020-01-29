import { MatMenuModule, MatIconModule, MatButtonModule, MatTableModule } from '@angular/material';
import { VoteBackendComponent } from './vote.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: VoteBackendComponent
  }
];

@NgModule({
  declarations: [
    VoteBackendComponent
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
    VoteBackendComponent
  ]
})
export class VoteBackendModule { }
