import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TokenService } from '../../core/services/token.service';
import { SessionTimerService } from '../../core/services/session-timer.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css'],
})
export class MainLayoutComponent implements OnInit {
  constructor(
    private tokenService: TokenService,
    private router: Router,
    public sessionTimer: SessionTimerService
  ) {}

  ngOnInit(): void {
    this.sessionTimer.start();
  }

  @HostListener('document:click')
  @HostListener('document:keydown')
  onActivity(): void {
    this.sessionTimer.registerActivity();
  }

  logout(): void {
    this.tokenService.removeToken();
    this.router.navigate(['/login']);
  }

  postponeSession(): void {
    this.sessionTimer.postponeSession();
  }
}