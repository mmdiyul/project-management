import { FiturComponent } from './fitur.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ListFiturModule } from './../../partials/list-fitur/list-fitur.module';
import { DetailFiturComponent } from './detail-fitur/detail-fitur.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ListFiturComponent } from 'src/app/partials/list-fitur/list-fitur.component';
import { MatSliderModule } from '@angular/material';
import { FiturActionsComponent } from './fitur-actions/fitur-actions.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'detail',
        component: DetailFiturComponent,
      },
      {
        path: 'fitur-action',
        component: FiturActionsComponent
      }
    ]
  },
];


@NgModule({
  declarations: [FiturComponent, DetailFiturComponent, FiturActionsComponent],
  imports: [
    CommonModule,
    ListFiturModule,
    MatButtonModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatCardModule,
    MatSliderModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    FiturComponent
  ]
})
export class FiturModule {  }
