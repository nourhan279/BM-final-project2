import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router for navigation
import { AuthService } from '../auth.service';
import { LoaderService } from '../loader/loader.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent {
  // Define the form group for handling login form
  loginForm: FormGroup;

  // Inject FormBuilder, AuthService, and Router in the constructor
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public LoaderService: LoaderService
  ) {
    // Initialize the form with email and password controls
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Email control with validation
      password: ['', [Validators.required, Validators.minLength(8)]], // Password control with validation
    });
  }

  // Method to handle form submission
  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form Submitted', this.loginForm.value);
      this.authService.logout().subscribe({
        next: (response: string) => {
          console.log('Logout successful', response); // Response is a string here
          localStorage.removeItem('authToken'); // Remove token from local storage
          this.router.navigate(['/']); // Navigate to the login page
        },
        error: (error) => {
          console.error('Logout failed', error);
        },
      });
    } else {
      console.log('Form Invalid');
    }
  }
  // Method to handle logout
  logout() {
    this.authService.logout().subscribe({
      next: () => {
        console.log('Logout successful');
        localStorage.removeItem('authToken'); // Remove token from local storage
        this.router.navigate(['/']); // Navigate to the login page
      },
      error: (error) => {
        console.error('Logout failed', error);
      },
    });
  }
}
