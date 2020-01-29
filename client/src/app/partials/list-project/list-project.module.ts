import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProjectComponent } from './list-project.component';

import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';



@NgModule({
  declarations: [ListProjectComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatCardModule
  ],
  exports: [
    ListProjectComponent
  ]
})
export class ListProjectModule { }
