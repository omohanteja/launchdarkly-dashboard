import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenTimerService {
  private timer: any; // Variable to hold the timeout reference

  constructor(private router: Router) {}

  startTokenTimer(expirationTime: number): void {
    // Clear any existing timer
    if (this.timer) {
      clearTimeout(this.timer);
    }

    // Start the timer
    const remainingTime = expirationTime - new Date().getTime();
    if (remainingTime > 0) {
      this.timer = setTimeout(() => {
        this.clearToken();
      }, remainingTime);
    } else {
      this.clearToken(); // If token is already expired
    }
  }

  clearToken(): void {
    // Remove token and handle logout
    localStorage.removeItem('authToken');
    localStorage.removeItem('authTokenExpiry');
    console.log('Token expired and removed');
    this.router.navigate(['/login']); // Redirect to login page
  }
}
