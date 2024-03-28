import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate { // Use class syntax for clarity

  constructor(private cookieService: CookieService,
              private authService: AuthService,
              private router: Router) {} // Inject services in constructor

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const user = this.authService.getUser();

    // Check for JWT token
    let token = this.cookieService.get('Authorization');

    if (token && user) {
      token = token.replace('Bearer', '');
      const decodedToken: any = jwtDecode(token);

      // Check if token has expired
      const expirationDate = decodedToken.exp * 1000;
      const currentTime = new Date().getTime();

      if (expirationDate < currentTime) {
        // Token expired - logout and redirect
        this.authService.logout();
        return this.router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
      } else {
        // Token valid - check for writer role
        if (user.roles.includes('Writer')) {
          return true; // Allow access
        } else {
          alert('Unauthorized');
          return false; // Deny access
        }
      }

    } else {
      // No token or user - logout and redirect
      this.authService.logout();
      return this.router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
    }
  }
}
