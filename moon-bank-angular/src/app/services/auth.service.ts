import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private userService: UserService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  authLogin(loginForm: FormGroup) {
    return this.userService.login(loginForm).subscribe({
      next: (res: any) => {
        const expiry = this.getExpiredDate();
        this.cookieService.set('token', res.access_token, { expires: expiry });
        this.cookieService.set('roles', res.roles, { expires: expiry });
        this.cookieService.set('refresh_token', res.refresh_token, {
          expires: expiry,
        });
        this.cookieService.set('username', res.username, { expires: expiry });
        if (this.getRoles()!.includes('ROLE_ADMIN')) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/user']);
        }
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 403) {
          alert('Wrong username/password');
        }
      },
    });
  }

  //? date object
  // https://stackoverflow.com/questions/1197928/how-to-add-30-minutes-to-a-javascript-date-object
  getExpiredDate() {
    let oldDateObj = new Date();
    let newDateObj = new Date(oldDateObj.getTime() + 30 * 60000);
    // console.log(oldDateObj)
    // console.log(newDateObj)
    // let test = new Date("2022-11-07 23:01:21:238")
    return newDateObj;
  }

  getRolesString() {
    return this.cookieService.get('roles');
  }

  parseRolesToArray(roles: string): string[] | null {
    let arrayRoles = [];
    roles = roles.slice(1, -1);
    arrayRoles = roles.split(',');

    for (let i = 0; i < arrayRoles.length; i++) {
      arrayRoles[i] = arrayRoles[i].trim();
    }

    // console.log(arrayRoles)
    if (arrayRoles.length === 0) {
      return null;
    } else {
      return arrayRoles;
    }
  }

  getRoles() {
    return this.parseRolesToArray(this.getRolesString());
  }

  matchRoles(allowedRoles: string[]): boolean {
    const userRoles = this.getRoles();

    for (let i = 0; i < allowedRoles.length; i++) {
      for (let j = 0; j < userRoles!.length; j++) {
        if (allowedRoles[i] === userRoles![j]) {
          return true;
        }
        return false;
      }
    }
    return false;
  }

  logout() {
    this.clearAllCookies();
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    if (
      this.cookieService.check('token') &&
      this.cookieService.check('roles')
    ) {
      return true;
    } else {
      return false;
    }
  }

  getToken() {
    return this.cookieService.get('token');
  }

  clearAllCookies() {
    this.cookieService.deleteAll('localhost');
  }
}
