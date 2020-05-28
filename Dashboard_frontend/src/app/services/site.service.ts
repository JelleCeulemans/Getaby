import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Site } from '../models/site.model';
import { CompanyService } from './company.service';

@Injectable({
  providedIn: 'root'
})

export class SiteService {
  baseURL = environment.baseURL;


  constructor(
    private http: HttpClient,
    private companyService: CompanyService) {
  }

  getAllSites(): Observable<Site[]> {
    return this.http.get<Site[]>(this.baseURL + '/site');
  }

  getAllSitesFromCompany(companyID: number) {
    return this.http.get<Site[]>(this.baseURL + '/site/whereCompany?companyID=' + companyID);
  }

  addSite(site: Site) {
    return this.http.post<Site>(this.baseURL + '/site', site);
  }

  updateSite(site: Site) {
    return this.http.put<Site>(this.baseURL + '/site', site);
  }

  deleteSite(siteID: number) {
    return this.http.delete<Site>(this.baseURL + '/site/' + siteID);
  }
}
