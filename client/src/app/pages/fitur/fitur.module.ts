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
import { MatSliderModule, MatFormFieldModule, MatLabel, MatInputModule, MatSelectModule, MatDialogModule } from '@angular/material';
import { FiturActionsComponent } from './fitur-actions/fitur-actions.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './detail-fitur/edit/edit.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'detail/:id',
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
  declarations: [FiturComponent, DetailFiturComponent, FiturActionsComponent, EditComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    ListFiturModule,
    MatButtonModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatCardModule,
    MatSelectModule,
    MatSliderModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    FiturComponent
  ],
  entryComponents: [
    EditComponent
  ]
})
export class FiturModule {  }
