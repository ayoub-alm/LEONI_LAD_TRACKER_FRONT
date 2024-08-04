import {Component, } from '@angular/core';
import {AuthServiceService} from "../services/auth-service.service";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm = this.formBuilder.group({
    matriculate: [''],
    password: [''],
  });

  constructor(private formBuilder: FormBuilder,
              private authService: AuthServiceService,
              private router: Router,
              private snackBar: MatSnackBar,
            ) {}

  /**
   * Handles the login action.
   */
  login(): void {
    const { matriculate, password } = this.loginForm.getRawValue();
    if (matriculate && password) {
      this.authService.login(matriculate, password).subscribe({
        next: (response) => {
          console.log(response.token);
          // Handle successful login
          if (response.user.role === "admin"){
              this.router.navigateByUrl('admin')
          }
          else {
            this.router.navigateByUrl('picker/scan')
          }
          localStorage.setItem("token", response.token);
          localStorage.setItem("user", response.user);
        }
          ,
        error: (error) => {
           this.snackBar.open('Matriculate or password not correct!', 'error');
        }
      });
    } else {
      console.error('Email and password are required.');
    }
  }



}
