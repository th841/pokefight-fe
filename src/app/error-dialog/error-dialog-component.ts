import { Component, Inject } from '@angular/core';
import { MatDialogContent, MatDialogActions, MAT_DIALOG_DATA, MatDialogClose, MatDialogTitle } from "@angular/material/dialog";
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-error-dialog',
  template: `
    <h2 mat-dialog-title>Error</h2>
    <mat-dialog-content>{{ data.message }}</mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>OK</button>
    </mat-dialog-actions>
  `,
  imports: [MatDialogContent, MatDialogActions, MatButtonModule, MatDialogClose, MatDialogTitle]
})
export class ErrorDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) { }
}

