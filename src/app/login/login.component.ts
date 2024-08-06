import { Component, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { LoaderService } from '../loader/loader.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  loginForm: FormGroup;
  loginSubscription: Subscription | undefined;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public loaderService: LoaderService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;
    this.login(email, password); // Call the login method
  }

  login(email: string, password: string) {
    this.loginSubscription = this.authService.login(email, password).subscribe({
      next: (response: any) => {
        console.log('Login successful:', response);
        localStorage.setItem('authToken', response.token);
        this.router.navigate(['/my-account']);
      },
      error: (error) => {
        console.error('Login failed:', error);
      },
    });
  }
  ngOnDestroy() {
    console.log('LoginComponent is being destroyed');
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
      console.log('Unsubscribed from loginSubscription');
    }
  }
}
