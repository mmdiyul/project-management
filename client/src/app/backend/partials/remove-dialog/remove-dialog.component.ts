import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-remove-dialog',
  templateUrl: './remove-dialog.component.html',
  styleUrls: ['./remove-dialog.component.scss']
})
export class RemoveDialogComponent {

  message: string;

  constructor(public dialogRef: MatDialogRef<RemoveDialogComponent>,  @Inject(MAT_DIALOG_DATA) public md: any) {
    this.message = (this.md && this.md.message) ? this.md.message : 'Yakin ingin mengapus?';
  }
  cancel() {
    this.dialogRef.close();
  }
  submit() {
    this.dialogRef.close(true);
  }

}
