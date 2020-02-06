import { RemoveDialogModule } from './partials/remove-dialog/remove-dialog.module';
import { Routes, RouterModule } from '@angular/router';
import { SidenavModule } from './partials/sidenav/sidenav.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardBackendModule } from './pages/dashboard/dashboard.module';
import { FiturBackendModule } from './pages/fitur/fitur.module';
import { OrganizationBackendModule } from './pages/organization/organization.module';
import { ProjectBackendModule } from './pages/project/project.module';
import { ReportBackendModule } from './pages/report/report.module';
import { RoleBackendModule } from './pages/role/role.module';
import { UserBackendModule } from './pages/user/user.module';
import { VoteBackendModule } from './pages/vote/vote.module';
import { RemoveDialogComponent } from './partials/remove-dialog/remove-dialog.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardBackendModule)
  },
  {
    path: 'fitur',
    loadChildren: () => import('./pages/fitur/fitur.module').then(m => m.FiturBackendModule)
  },
  {
    path: 'project',
    loadChildren: () => import('./pages/project/project.module').then(m => m.ProjectBackendModule)
  },
  {
    path: 'vote',
    loadChildren: () => import('./pages/vote/vote.module').then(m => m.VoteBackendModule)
  },
  {
    path: 'report',
    loadChildren: () => import('./pages/report/report.module').then(m => m.ReportBackendModule)
  },
  {
    path: 'role',
    loadChildren: () => import('./pages/role/role.module').then(m => m.RoleBackendModule)
  },
  {
    path: 'organization',
    loadChildren: () => import('./pages/organization/organization.module').then(m => m.OrganizationBackendModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./pages/user/user.module').then(m => m.UserBackendModule)
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardBackendModule,
    FiturBackendModule,
    OrganizationBackendModule,
    ProjectBackendModule,
    ReportBackendModule,
    RoleBackendModule,
    UserBackendModule,
    VoteBackendModule,
    RouterModule.forChild(routes),
    RemoveDialogModule
  ],
  exports: [
    SidenavModule,
    RemoveDialogModule
  ],
  entryComponents: [
    RemoveDialogComponent
  ]
})
export class BackendModule { }
