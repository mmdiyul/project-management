import { MyPipesModule } from './../../my-pipes/my-pipes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListFiturComponent } from './list-fitur.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { Routes, RouterModule } from '@angular/router';
import { DetailFiturComponent } from 'src/app/pages/fitur/detail-fitur/detail-fitur.component';
import { MatProgressSpinnerModule } from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: ListFiturComponent
  }
];

@NgModule({
  declarations: [
    ListFiturComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatCardModule,
    RouterModule.forChild(routes),
    FormsModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MyPipesModule
  ],
  exports: [
    ListFiturComponent
  ]
})
export class ListFiturModule { }
