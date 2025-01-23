import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  isLoginMode = true; // Track whether the user is in login or register mode
  username = '';
  password = '';
  email = ''; // Only needed for registration

  constructor(
    private http: HttpClient,
     private router: Router 
  ) {}

  // Toggle between login and register modes
  toggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
    this.clearFields();
  }

  // Handle login or registration based on mode
  onSubmit(): void {
    if (this.isLoginMode) {
      this.login();
    } else {
      this.register();
    }
  }

  // Call the login API
  login(): void {
    this.http
      .post('http://localhost:3000/api/users/login', { username: this.username, password: this.password })
      .subscribe(
        (response: any) => {
          console.log('Login successful:', response);
          localStorage.setItem('user', JSON.stringify(response.user));

          this.router.navigate(['/']);
        },
        (error:any) => {
          console.error('Login error:', error);
          alert('Invalid username or password');
        }
      );
  }

  // Call the register API
  register(): void {
    this.http
      .post('http://localhost:3000/api/users/register', {
        username: this.username,
        password: this.password,
        email: this.email,
      })
      .subscribe(
        (response: any) => {
          console.log('Registration successful:', response);
          alert('Registration successful. Please login.');
          this.toggleMode(); // Switch to login mode after registration
        },
        (error:any) => {
          console.error('Registration error:', error);
          alert('Registration failed. Please try again.');
        }
      );
  }

  // Clear input fields
  private clearFields(): void {
    this.username = '';
    this.password = '';
    this.email = '';
  }
}
