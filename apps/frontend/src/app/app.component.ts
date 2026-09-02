import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SessionMessageService } from './core/services/session-message.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(public sessionMessage: SessionMessageService) {}
}