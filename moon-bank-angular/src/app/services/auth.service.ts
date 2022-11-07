import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private userService: UserService, private cookieService: CookieService) { }

  authLogin(loginForm: FormGroup) {
    return this.userService.login(loginForm).subscribe({
      next: (res: any) => {
        this.cookieService.set('token', res.access_token, {expires: 2});
        this.cookieService.set('roles', res.roles, {expires: 2})
        this.cookieService.set('refresh_token', res.refresh_token, {expires: 2})
        this.cookieService.set('username', res.username, {expires: 2})
      },
      error: (err: HttpErrorResponse) => {
        if(err.status === 403) {
          alert("Wrong username/password")
        }
      }      
  })
  }

}
