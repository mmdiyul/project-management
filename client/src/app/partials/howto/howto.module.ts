import { HowtoComponent } from './howto.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [HowtoComponent],
  imports: [
    CommonModule
  ],
  exports: [
    HowtoComponent
  ]
})
export class HowtoModule { }
