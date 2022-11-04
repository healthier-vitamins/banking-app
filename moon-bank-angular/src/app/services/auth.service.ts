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
      next: (res) => {
        
      }
  })
  }

  setRoles() {

  }

  setUsername() {

  }

  setToken() {
    
  }

}
