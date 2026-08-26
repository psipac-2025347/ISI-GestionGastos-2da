import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../core/services/token.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  constructor(private tokenService: TokenService, private router: Router) {}

  logout(): void {
    this.tokenService.removeToken();
    this.router.navigate(['/login']);
  }
}