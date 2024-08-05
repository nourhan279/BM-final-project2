// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private apiUrl = 'http://localhost:3000';

//   constructor(private http: HttpClient) {}

//   ggetUser(): Observable<any> {
//     return this.http.get(`${this.apiUrl}/user`);
//   }

//   updateUser(updatedFields: any): Observable<any> {
//     return this.http.put(`${this.apiUrl}/user/4299`, updatedFields);
//   }

//   verifyCurrentPassword(password: string): Observable<any> {
//     return this.http.post(`${this.apiUrl}/verify-password`, { password });
//   }

//   updatePassword(passwordData: {
//     currentPassword: string;
//     newPassword: string;
//   }): Observable<any> {
//     return this.http.put(`${this.apiUrl}/password`, passwordData);
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://3.70.134.143/api';

  constructor(private http: HttpClient) {}

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
}
