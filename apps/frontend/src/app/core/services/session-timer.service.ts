import { Injectable, signal, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { TokenService } from './token.service';
import { SessionMessageService } from './session-message.service';

const WARNING_BEFORE_MS = 60_000;

@Injectable({ providedIn: 'root' })
export class SessionTimerService {
  showWarning = signal(false);
  secondsLeft = signal(0);

  private warningTimer: any;
  private countdownTimer: any;
  private logoutTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenService,
    private sessionMessage: SessionMessageService,
    private zone: NgZone
  ) {}

  start(): void {
    this.resetTimers();
  }

  registerActivity(): void {
    if (this.showWarning()) return;
    this.resetTimers();
  }

  private resetTimers(): void {
    this.clearTimers();
    this.showWarning.set(false);

    const exp = this.getTokenExpiration();
    if (!exp) return;

    const msUntilExpiry = exp - Date.now();
    const msUntilWarning = msUntilExpiry - WARNING_BEFORE_MS;

    this.zone.runOutsideAngular(() => {
      if (msUntilWarning > 0) {
        this.warningTimer = setTimeout(() => this.zone.run(() => this.showWarningModal()), msUntilWarning);
      } else {
        this.zone.run(() => this.showWarningModal());
      }
    });
  }

  private showWarningModal(): void {
    const exp = this.getTokenExpiration();
    if (!exp) return;

    this.showWarning.set(true);
    this.tickCountdown();

    const msLeft = exp - Date.now();
    this.logoutTimer = setTimeout(() => this.forceLogout(), Math.max(msLeft, 0));
  }

  private tickCountdown(): void {
    const exp = this.getTokenExpiration();
    if (!exp) return;

    const update = () => {
      const secs = Math.max(0, Math.round((exp - Date.now()) / 1000));
      this.secondsLeft.set(secs);
      if (secs > 0 && this.showWarning()) {
        this.countdownTimer = setTimeout(update, 1000);
      }
    };
    update();
  }

  postponeSession(): void {
    this.http.post<{ token: string }>(`${environment.apiUrl}/auth/refresh`, {}).subscribe({
      next: (res) => {
        this.tokenService.saveToken(res.token);
        this.showWarning.set(false);
        this.resetTimers();
      },
      error: () => {
        this.forceLogout();
      },
    });
  }

  private forceLogout(): void {
    this.clearTimers();
    this.showWarning.set(false);
    this.tokenService.removeToken();
    this.sessionMessage.show('Tu sesión ha expirado');
    this.router.navigate(['/login']);
  }

  private getTokenExpiration(): number | null {
    const token = this.tokenService.getToken();
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000;
    } catch {
      return null;
    }
  }

  private clearTimers(): void {
    clearTimeout(this.warningTimer);
    clearTimeout(this.countdownTimer);
    clearTimeout(this.logoutTimer);
  }
}