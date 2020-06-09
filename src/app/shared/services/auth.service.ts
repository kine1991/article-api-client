import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

export interface ICredentials {
  name?: string;
  email: string;
  password: string;
  passwordConfirm?: string;
  photo?: string;

}

export interface User {
  email: string,
  id: string,
  name: string,
  photo?: string,
  role: string,
  _id: string,
}

export interface CheckAuthResponse {
  status: string,
  data: {
    user?: User
  }
}

export interface LogoutResponse {
  status: string,
  data: {
    user: null
  }
}

export interface SignResponse {
  status: string,
  token?: string,
  data: {
    user?: User
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user$ = new BehaviorSubject(null);

  constructor(
    private http: HttpClient
  ) { }

  signIn(credentials: ICredentials) {
    return this.http.post<SignResponse>(`${environment.url}/users/sign-in`, credentials, {
      withCredentials: true
    });
  }

  signUp(credentials: ICredentials) {
    return this.http.post<SignResponse>(`${environment.url}/users/sign-up`, credentials, {
      withCredentials: true
    });
  }

  checkAuth() {
    // return this.http.get(`${environment.url}/users/current-user`, {
    return this.http.get<CheckAuthResponse>(`${environment.url}/users/check-auth`, {
      withCredentials: true
    });
  }

  logout() {
    return this.http.get<LogoutResponse>(`${environment.url}/users/logout`, {
      withCredentials: true
    });
  }
}