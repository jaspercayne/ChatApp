import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {


  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isLoggedIn) {
        return true;
    }

    // navigate to login page
    this.router.navigate(['/home']);
    // you can save redirect url so after authing we can move them back to the page they requested
    return false;
  }

}