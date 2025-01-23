import { Component } from '@angular/core';
import { WebSocketService } from '../services/web-socket.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isLoggedIn = false;
  notifications: string[] = [];
  user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;

  constructor(
    private webSocketService: WebSocketService,
    private router: Router 
  ) { }

  ngOnInit(): void {
    // Listen for notifications from the WebSocket
    this.webSocketService.onMessage((data) => {
      if (data.type === 'notification') {
        this.notifications.push(data.message);
      }
    });
  }

  logout(): void {
    localStorage.removeItem('user');
    this.user = null; // Clear user data locally
    this.router.navigate(['/login']); 
  }

  login(): void {
    this.router.navigate(['/login']); 
  }
}