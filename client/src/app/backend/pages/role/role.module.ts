import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule, MatButtonModule, MatIconModule, MatMenuModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule } from '@angular/material';
import { RoleBackendComponent } from './role.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionsComponent } from './actions/actions.component';

const routes: Routes = [
  {
    path: '',
    component: RoleBackendComponent
  }
];

@NgModule({
  declarations: [
    RoleBackendComponent,
    ActionsComponent
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
    MatProgressSpinnerModule
  ],
  exports: [
    RoleBackendComponent
  ],
  entryComponents: [ ActionsComponent ]
})
export class RoleBackendModule { }
