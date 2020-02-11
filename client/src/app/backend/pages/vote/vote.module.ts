import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule, MatIconModule, MatButtonModule, MatTableModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatPaginatorModule, MatSelectModule, MatOptionModule } from '@angular/material';
import { VoteBackendComponent } from './vote.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { VoteActionComponent } from './vote-action/vote-action.component';

const routes: Routes = [
  {
    path: '',
    component: VoteBackendComponent
  }
];

@NgModule({
  declarations: [
    VoteBackendComponent,
    VoteActionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSelectModule,
    MatOptionModule
  ],
  exports: [
    VoteBackendComponent
  ],
  entryComponents: [
    VoteActionComponent
  ]
})
export class VoteBackendModule { }
