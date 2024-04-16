import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from './login/context/DTOs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseApi = "http://localhost:8000/api"

  constructor(private http: HttpClient) {
  }
  login(model: Login) {
    return this.http.post(this.baseApi + '/handleLogin', model)
  }
  logout(token: any) {
    return this.http.post(this.baseApi + '/logout', token)
  }

}
