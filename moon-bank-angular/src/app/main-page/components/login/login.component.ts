import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isSubmitted: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {}

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    this.isSubmitted = true;
    if (this.loginForm.valid) this.authService.authLogin(this.loginForm);
  }

  isInvalid(controlName: string) {
    let formControl = this.loginForm.get(controlName);
    return {
      'is-invalid': this.isSubmitted && formControl?.hasError('required'),
    };
  }
}
