import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User2 } from './profile.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://3.70.134.143/api';

  constructor(private http: HttpClient, private router: Router) {}

  register(user: User2): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user).pipe(
      catchError((error) => {
        console.error('Error occurred:', error);
        return throwError(error);
      })
    );
  }

  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const payload = JSON.stringify({ email, password });
    return this.http
      .post<{ token: string }>(`${this.baseUrl}/login`, payload, { headers })
      .pipe(
        tap((response) => {
          // Save the token to localStorage
          localStorage.setItem('authToken', response.token);
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Login error:', error);
          if (error.status === 401) {
            console.error('Unauthorized: Invalid credentials');
          } else {
            console.error('An unexpected error occurred:', error);
          }
          return throwError(error);
        })
      );
  }

  getToken() {
    return localStorage.getItem('authToken');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
