import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authSrv: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authSrv.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['/zaloguj']);
      return false;
    }
  }
}
