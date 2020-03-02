import { AuthGuard } from './../../../services/auth.guard';
import { MatTableModule, MatButtonModule, MatIconModule, MatMenuModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, MatProgressSpinnerModule, MatPaginatorModule } from '@angular/material';
import { UserBackendComponent } from './user.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UserActionsComponent } from './user-actions/user-actions.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: UserBackendComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [
    UserBackendComponent,
    UserActionsComponent
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
    MatOptionModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatPaginatorModule
  ],
  exports: [
    UserBackendComponent
  ],
  entryComponents: [
    UserActionsComponent
  ]
})
export class UserBackendModule { }
