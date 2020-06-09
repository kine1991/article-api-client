import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface ICredentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  signIn(credentials: ICredentials) {
    return this.http.post(`${environment.url}/users/sign-in`, credentials, {
      withCredentials: true
    });
  }

  signUp(credentials: ICredentials) {
    return this.http.post(`${environment.url}/users/sign-up`, credentials, {
      withCredentials: true
    });
  }

  checkAuth() {
    // return this.http.get(`${environment.url}/users/current-user`, {
    return this.http.get(`${environment.url}/users/check-auth`, {
      withCredentials: true
    });
  }

  logout() {
    return this.http.get(`${environment.url}/users/logout`, {
      withCredentials: true
    });
  }
}