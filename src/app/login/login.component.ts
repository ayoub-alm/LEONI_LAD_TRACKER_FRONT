import {Component, } from '@angular/core';
import {AuthServiceService} from "../services/auth-service.service";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm = this.formBuilder.group({
    email: [''],
    password: [''],
  });

  constructor(private formBuilder: FormBuilder,
              private authService: AuthServiceService,
              private router: Router
            ) {}

  /**
   * Handles the login action.
   */
  login(): void {
    const { email, password } = this.loginForm.getRawValue();
    if (email && password) {
      this.authService.login(email, password).subscribe({
        next: (response) => {
          console.log(response.token);
          // Handle successful login
          if (response.user.role === "admin"){
              this.router.navigateByUrl('admin/job-goals')
          }
          localStorage.setItem("token", response.token);
          localStorage.setItem("user", response.user);
        }
          ,
        error: (error) => {
          console.log(error)
        }
      });
    } else {
      console.error('Email and password are required.');
    }
  }



}
