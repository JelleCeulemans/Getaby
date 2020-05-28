import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {
  baseURL = environment.baseURL;

  constructor() { }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  removeToken() {
    localStorage.removeItem('token');
  }

  getTokenObject() {
    const token = this.getToken();
    if (token) {
      const jwtData = this.getToken().split('.')[1];
      const decodedJwt = window.atob(jwtData);
      return JSON.parse(decodedJwt);
    } else {
      return null;
    }
  }

  getUserId() {
    const token = this.getToken();
    if (token) {
      const jwtData = this.getToken().split('.')[1];
      const decodedJwt = window.atob(jwtData);
      return JSON.parse(decodedJwt).UserID;
    } else {
      return null;
    }
  }
}
