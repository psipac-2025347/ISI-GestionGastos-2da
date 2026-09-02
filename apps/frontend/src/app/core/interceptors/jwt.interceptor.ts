import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TokenService } from '../services/token.service';
import { SessionMessageService } from '../services/session-message.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private sessionExpiredShown = false;

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private sessionMessage: SessionMessageService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.tokenService.getToken();
    if (token) {
      req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    }

    const isAuthEndpoint = req.url.includes('/auth/login') || req.url.includes('/auth/register');

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !isAuthEndpoint && !this.sessionExpiredShown) {
          this.sessionExpiredShown = true;
          this.tokenService.removeToken();
          this.router.navigate(['/login']);
          this.sessionMessage.show('Tu sesión ha expirado');
          setTimeout(() => { this.sessionExpiredShown = false; }, 3000);
        }
        return throwError(() => error);
      })
    );
  }
}