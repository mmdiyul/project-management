import { ListFiturComponent } from './list-fitur.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';


@NgModule({
  declarations: [ListFiturComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatCardModule
  ],
  exports: [
    ListFiturComponent
  ]
})
export class ListFiturModule { }
