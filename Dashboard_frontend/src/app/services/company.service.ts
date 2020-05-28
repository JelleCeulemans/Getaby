import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../models/company.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})

export class CompanyService {
  baseURL = environment.baseURL;


  constructor(
    private http: HttpClient,
    private localstorageService: LocalStorageService) {
  }

  getAllCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this.baseURL + '/company');
  }

  getCompanyFromToken() {
    const userID = this.localstorageService.getUserId();
    return this.http.get<Company>(this.baseURL + '/company/byUserID?userID=' + userID);
  }
}
