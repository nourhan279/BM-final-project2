import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoaderService } from '../loader/loader.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public LoaderService: LoaderService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Email control with validation
      password: ['', [Validators.required, Validators.minLength(8)]], // Password control with validation
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form Submitted', this.loginForm.value);
      this.authService.logout().subscribe({
        next: (response: string) => {
          console.log('Logout successful', response);
          localStorage.removeItem('authToken'); // Remove token from local storage
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Logout failed', error);
        },
      });
    } else {
      console.log('Form Invalid');
    }
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        console.log('Logout successful');
        localStorage.removeItem('authToken'); // Remove token from local storage
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Logout failed', error);
      },
    });
  }
}
