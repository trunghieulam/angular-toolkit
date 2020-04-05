import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import decode from 'jwt-decode';

import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const token = this.auth.getTokenString();
    const tokenPayload = decode(token);
    const expectedRoles = next.data.expectedRoles;
    if (
      !this.auth.isAuthenticated() || 
      (expectedRoles && expectedRoles.length && expectedRoles.includes(tokenPayload.role))
    ) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

}
