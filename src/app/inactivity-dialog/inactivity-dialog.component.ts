import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-inactivity-dialog',
  templateUrl: './inactivity-dialog.component.html',
  styleUrls: ['./inactivity-dialog.component.scss'],
})
export class InactivityDialogComponent {
  constructor(public dialogRef: MatDialogRef<InactivityDialogComponent>) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
