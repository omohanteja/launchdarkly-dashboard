import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const tokenExpiry = parseInt(localStorage.getItem('authTokenExpiry') || '0', 10);
    const isLoggedIn = !!localStorage.getItem('authToken');
    if (!isLoggedIn) {
      this.router.navigate(['/login']);
      return false;
    } else if (new Date().getTime() > tokenExpiry) {
        console.log('Token expired');
        localStorage.removeItem('authToken');
        localStorage.removeItem('authTokenExpiry');
        this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
