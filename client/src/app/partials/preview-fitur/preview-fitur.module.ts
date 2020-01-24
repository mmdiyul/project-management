import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreviewFiturComponent } from './preview-fitur.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [PreviewFiturComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule
  ],
  exports: [
    PreviewFiturComponent
  ]
})
export class PreviewFiturModule { }
