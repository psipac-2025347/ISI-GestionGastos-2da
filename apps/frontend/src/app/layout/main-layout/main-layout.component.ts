import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TokenService } from '../../core/services/token.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css'],
})
export class MainLayoutComponent {
  constructor(private tokenService: TokenService, private router: Router) {}

  logout(): void {
    this.tokenService.removeToken();
    this.router.navigate(['/login']);
  }
}