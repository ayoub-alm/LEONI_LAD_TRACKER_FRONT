import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { StorageService } from '../services/storage.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-line-display-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule, CommonModule
  ],
  templateUrl: './line-display-dialog.component.html',
  styleUrls: ['./line-display-dialog.component.css']
})
export class LineDisplayDialogComponent implements OnInit {
  confForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<LineDisplayDialogComponent>
  ) {
    this.confForm = this.formBuilder.group({
      line_disply_operatores: [
        this.storageService.getItem('line_disply_operatores'),
        Validators.required
      ],
      line_disply_rangeTime: [
        this.storageService.getItem('line_disply_rangeTime'),
        Validators.required
      ],
      line_disply_target: [
        this.storageService.getItem('line_disply_target'),
        Validators.required
      ],
      line_disply_efficiency: [
        this.storageService.getItem('line_disply_efficiency'),
        Validators.required
      ]
    });
  }

  ngOnInit() {
  
  }

  updateData() {
    if (this.confForm.valid) {
      const rangeTimeValue = this.confForm.get('line_disply_rangeTime')?.value;
      const operatorsValue = this.confForm.get('line_disply_operatores')?.value;
      const efficiency = parseInt(this.confForm.get('line_disply_efficiency')?.value);
      const target = this.confForm.get('line_disply_target')?.value;
      this.storageService.setItem('line_disply_rangeTime', rangeTimeValue);
      this.storageService.setItem('line_disply_operatores', operatorsValue);
      this.storageService.setItem('line_disply_target', target);
      this.storageService.setItem('line_disply_efficiency', efficiency);
      window.location.reload();
      this.dialogRef.close();
    } else {
      this.logFormErrors();
      this.snackBar.open('Please enter correct data', 'OK', { duration: 3000 });
    }
  }

  logFormErrors() {
    Object.keys(this.confForm.controls).forEach(key => {
      const controlErrors = this.confForm.get(key)?.errors;
      if (controlErrors) {
        console.log('Key:', key, 'Errors:', controlErrors);
      }
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
