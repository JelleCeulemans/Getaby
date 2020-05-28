import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trespass } from '../models/trespass.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  baseURL = environment.baseURL;


  constructor(
    private http: HttpClient) {
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseURL + '/user');
  }

  addUser(user: User) {
    return this.http.post<User>(this.baseURL + '/user', user);
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(this.baseURL + '/user/' + id);
  }

  // updateUser(userID: number, user: User) {
  //   return this.http.put<User>(this.baseURL + '/user/' + userID.toString(), user);
  // }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.baseURL + '/user/' + id);
  }

  getUserById(userID: string) {
    return this.http.get<User>(this.baseURL + '/user/' + userID);
  }

  updateUser(user: User) {
    return this.http.put<User>(this.baseURL + '/user' , user);
  }

  getUsersByCompany(companyID: number): Observable<User[]> {
    return this.http.get<User[]>(this.baseURL + '/user/company/' + companyID);
  }
}
