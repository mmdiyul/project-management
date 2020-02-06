import { MatButtonModule, MatDialogModule } from '@angular/material';
import { RemoveDialogComponent } from './remove-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [RemoveDialogComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule
  ],
  entryComponents: [RemoveDialogComponent]
})
export class RemoveDialogModule { }
