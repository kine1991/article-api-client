import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface GetUsersResponse {
  status: string
  results: number,
  allResults: number,
  data: {
    users: [User]
  },
}

export interface GetUserResponse {
  status: string
  data: {
    user: User
  },
}

export interface User {
  id: string
  role: string,
  name: string,
  email: string,
  photo: string,
  _id: string,
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  updateMe({ name, email, photo }) {
    let formData;
    if(typeof(photo) === 'object') {
      formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("photo", photo);
    } else {
      formData = {
        name,
        email,
        photo
      }
    }

    return this.http.patch<GetUserResponse>(`${environment.url}/users/me`, formData, {
      withCredentials: true
    })
  }

  changePassword(data) {
    return this.http.patch(`${environment.url}/users/change-password`, data, {
      withCredentials: true
    })
  }
}
