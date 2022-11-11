import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.headers.get('No-Auth') === 'True') return next.handle(request);

    const token = this.authService.getToken();
    request = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`),
    });
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          alert('Please login');
          this.authService.clearAllCookies();
          this.router.navigate(['/']);
        } else if (err.status === 403) {
          this.router.navigate(['/forbidden']);
        } else if (err.status === 504) {
          alert('Session has timed out, please login again');
          this.authService.clearAllCookies();
          location.reload();
          this.router.navigate(['/']);
        }
        return throwError(() => new Error());
      })
    );
  }
}

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};
