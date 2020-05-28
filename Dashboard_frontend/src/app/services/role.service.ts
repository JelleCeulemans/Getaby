import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../models/role.model';

@Injectable({
  providedIn: 'root'
})

export class RoleService {
  baseURL = environment.baseURL;


  constructor(
    private http: HttpClient) {
  }

  public getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.baseURL + '/role');
  }
}
