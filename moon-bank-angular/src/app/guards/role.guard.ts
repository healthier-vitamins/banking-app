import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if(this.authService.isLoggedIn()) {
      
      const allowedRoles = route.data['roles'] as Array<string>
      const hasRole = this.authService.matchRoles(allowedRoles);

      if(hasRole) return true
      this.router.navigate(['forbidden'])
      return false
    } 
    this.router.navigate(['/']);
    return false
  }

}
