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
import { AuthorInterceptor } from './author.interceptor';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://3.70.134.143/api';

  constructor(private http: HttpClient, private router: Router) {}

  getUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user`);
  }
  getbalance(): Observable<string> {
    return this.http.get(`${this.apiUrl}/balance`, { responseType: 'text' });
  }

  updateUser(updatedFields: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/user`, updatedFields);
  }

  updatePassword(passwordData: {
    currentPassword: string;
    newPassword: string;
  }): Observable<any> {
    return this.http.put(`${this.apiUrl}/password`, passwordData);
  }

  gethistory(): Observable<any> {
    return this.http.get(`${this.apiUrl}/transactions`);
  }

  //>>>>>>>>>>>login and register>>>>>>>>>>>>>>>>>>>>>

  register(user: User2): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user).pipe(
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
      .post<{ token: string }>(`${this.apiUrl}/login`, payload, { headers })
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

  logout(): Observable<string> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<string>(
      `${this.apiUrl}/logout`,
      {},
      { headers, responseType: 'text' as 'json' }
    );
  }
}
