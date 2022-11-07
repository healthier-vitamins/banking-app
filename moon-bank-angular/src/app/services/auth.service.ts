import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private userService: UserService, private cookieService: CookieService, private router: Router) { }

  authLogin(loginForm: FormGroup) {
    return this.userService.login(loginForm).subscribe({
      next: (res: any) => {
        this.cookieService.set('token', res.access_token, {expires: 2});
        this.cookieService.set('roles', res.roles, {expires: 2})
        this.cookieService.set('refresh_token', res.refresh_token, {expires: 2})
        this.cookieService.set('username', res.username, {expires: 2})
        if(this.parseRoles(res.roles)?.includes("ROLE_ADMIN")) {
          this.router.navigate(['/admin'])
        } else {
          this.router.navigate(['/user'])
        }
      },
      error: (err: HttpErrorResponse) => {
        if(err.status === 403) {
          alert("Wrong username/password")
        }
      }      
  })
  }

  parseRoles(roles: string): string[] | null{
    let arrayRoles = []
    roles = roles.slice(1, -1);
    arrayRoles = roles.split(",")

    for(let i = 0; i < arrayRoles.length; i++) {
      arrayRoles[i] = arrayRoles[i].trim()
    }

    console.log(arrayRoles)
    if(arrayRoles.length === 0) { 
      return null
    } else {
      return arrayRoles
    }
  }
}
