import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthResponse, User } from '../models/user.model';
import { TokenService } from './token.service';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private currentUser: User | null = null;

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((res) => {
        this.tokenService.saveToken(res.token);
        this.currentUser = res.user;
      })
    );
  }

  logout(): void {
    this.tokenService.removeToken();
    this.currentUser = null;
  }

  isAuthenticated(): boolean {
    return this.tokenService.hasToken();
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }
}