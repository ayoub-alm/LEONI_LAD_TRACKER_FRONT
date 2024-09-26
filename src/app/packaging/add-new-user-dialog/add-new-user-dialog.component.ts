import { DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UserModel } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-add-new-user-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule, CommonModule
  ],
  templateUrl: './add-new-user-dialog.component.html',
  styleUrl: './add-new-user-dialog.component.css'
})
export class AddNewUserDialogComponent {
  addUserForm: FormGroup;
  constructor(private fb: FormBuilder, 
    public dialogRef: MatDialogRef<AddNewUserDialogComponent>,
    private userService: UserService,
   private snackBar: MatSnackBar)
  {
    this.addUserForm = this.fb.group({
      userName:['', Validators.required],
      matriculate:['', Validators.required],
      password:['', Validators.required],
      passwordConfirm:['', Validators.required],
      role:['', Validators.required]
    }) }

addNewUser(){
  this.addUserForm.markAllAsTouched()
  if(this.addUserForm.valid){
    if (this.addUserForm.get('password')?.value === this.addUserForm.get('passwordConfirm')?.value){
      let user: UserModel = new UserModel(
        0,
        this.addUserForm.get('userName')?.value,
        this.addUserForm.get('matriculate')?.value,
        this.addUserForm.get('password')?.value,
        this.addUserForm.get('role')?.value,
      )
      this.userService.createUser(user).pipe(
        tap(data => {
          this.snackBar.open("user created with success","Close",{duration:300})
          window.location.reload()
        }),
        catchError(error => {
          this.snackBar.open(error.error,"Close",{duration:300})
          return of(null); 
        })
      ).subscribe()
    }else {
      this.snackBar.open('password not correct', "Ok", {duration:3000})
    }
  }
  this.logFormErrors();
}


logFormErrors() {
  Object.keys(this.addUserForm.controls).forEach(key => {
    const controlErrors = this.addUserForm.get(key)?.errors;
    if (controlErrors) {
      console.log('Key:', key, 'Errors:', controlErrors);
    }
  });
}

closeDialog(): void {
    this.dialogRef.close();
  }
}
