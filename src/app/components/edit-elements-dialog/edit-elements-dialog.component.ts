import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { PeriodicElement } from '../../shared/types/elements.types';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit-elements-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './edit-elements-dialog.component.html',
  styleUrl: './edit-elements-dialog.component.css',
})
export class EditElementsDialogComponent {
  private _dialogRef = inject(MatDialogRef<EditElementsDialogComponent>);
  public elementData: PeriodicElement = inject(MAT_DIALOG_DATA);

  onSave(): void {
    this._dialogRef.close(this.elementData);
  }

  onCancel(): void {
    this._dialogRef.close();
  }
}
