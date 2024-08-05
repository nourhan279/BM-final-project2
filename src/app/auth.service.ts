import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { user, User2 } from './profile.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://3.121.200.183/api';
  constructor(private http: HttpClient) {}
  registerUser(user: User2) {
    return this.http.post(`${this.baseUrl}/register`, user).pipe(
      catchError((error) => {
        console.error('Error occurred:', error);
        return throwError(error);
      })
    );
  }
}
