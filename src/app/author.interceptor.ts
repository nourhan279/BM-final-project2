// auth.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Replace 'YOUR_TOKEN_HERE' with the actual token
    const authToken =
      'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJubm5ubm5AZW1haWwuY29tIiwiaWF0IjoxNzIyOTAxMjYwLCJleHAiOjE3MjI5MDQ4NjB9.QXmbBERo6DecoWpxca4PshtX7DLWEV_jWwSyknE5g94';

    // Clone the request and set the new header
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    // Pass on the cloned request instead of the original request
    return next.handle(authReq);
  }
}