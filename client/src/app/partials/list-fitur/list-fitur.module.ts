import { ListFiturComponent } from './list-fitur.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [ListFiturComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule
  ],
  exports: [
    ListFiturComponent
  ]
})
export class ListFiturModule { }
