import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SessionMessageService {
  message = signal<string | null>(null);

  show(text: string, durationMs = 4000): void {
    this.message.set(text);
    setTimeout(() => {
      if (this.message() === text) {
        this.message.set(null);
      }
    }, durationMs);
  }

  clear(): void {
    this.message.set(null);
  }
}