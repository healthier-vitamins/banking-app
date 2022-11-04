import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly API_PATH = `http://localhost:8080/api`

  constructor(private http: HttpClient) { }

  login(loginForm: FormGroup) {
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True' });
    return this.http.post(`http://localhost:8080/login`, JSON.stringify(loginForm.getRawValue()), {headers: reqHeader})
  }

}
