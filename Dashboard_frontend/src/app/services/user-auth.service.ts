import { environment } from '../../../src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trespass } from '../models/trespass.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class UserAuthService {
  baseURL = environment.baseURL;


  constructor(
    private http: HttpClient) {
  }

  authenticate(user: User) {
    return this.http.post<User>(this.baseURL + '/user/login', user);
  }
}
