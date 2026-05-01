import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.createForm();       // ✅ use semicolon
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember: [false]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = {
        username: this.loginForm.value.email.trim(),
        email: this.loginForm.value.email.trim(),
        password: this.loginForm.value.password.trim()
      };
      console.log("Sending login data:", loginData);

      this.authService.login(loginData).subscribe({
        next: (response) => {
          console.log("Login Success", response);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error("Login Error", err);
          alert(err.error || "Login failed. Please check your credentials.");
        }
      });
    } else {
      console.log("VALID FALSE");
      console.log("Form Errors:", this.loginForm.errors);
      console.log("Email Errors:", this.loginForm.get('email')?.errors);
      console.log("Password Errors:", this.loginForm.get('password')?.errors);
    }
  }
}
//HAI