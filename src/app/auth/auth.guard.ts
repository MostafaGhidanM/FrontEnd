// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      return true; // User authenticated, allow access
    } else {
      this.router.navigate(['/auth']); // Redirect to login page
      return false;
    }
  }
}
