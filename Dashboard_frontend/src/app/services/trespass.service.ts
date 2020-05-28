import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trespass } from '../models/trespass.model';

@Injectable({
  providedIn: 'root'
})

export class TrespassService {
  baseURL = environment.baseURL;


  constructor(
    private http: HttpClient) {
  }

  getAllTrespasses(): Observable<Trespass[]> {
    return this.http.get<Trespass[]>(this.baseURL + '/trespass');
  }

  getTrespass(id: number): Observable<Trespass> {
    return this.http.get<Trespass>(this.baseURL + '/trespass/' + id);
  }

  insertTrespass(trespass: Trespass) {
    return this.http.post<Trespass>(this.baseURL + '/trespass', trespass);
  }

  deleteTrespass(id: number): Observable<Trespass[]> {
    return this.http.delete<Trespass[]>(this.baseURL + '/trespass/' + id);
  }

  getTrespassesWhereArchiveFalse(): Observable<Trespass[]> {
    return this.http.get<Trespass[]>(this.baseURL + '/trespass/whereArchiveFalse');
  }

  getTrespassesWhereArchiveTrue(): Observable<Trespass[]> {
    return this.http.get<Trespass[]>(this.baseURL + '/trespass/whereArchiveTrue');
  }

  addToArchive(trespass: Trespass) {
    return this.http.put<Trespass>(this.baseURL + '/trespass', trespass);
  }

  getCountCountYear() {
    return this.http.get<number>(this.baseURL + '/trespass/countYear');
  }

  getCountCountMonth() {
    return this.http.get<number>(this.baseURL + '/trespass/countMonth');
  }

  getCountCountDay() {
    return this.http.get<number>(this.baseURL + '/trespass/countDay');
  }

  getCountEachMonth(year: string) {
    return this.http.get<any>(this.baseURL + '/trespass/countEachMonth?year=' + year);
  }

  getCountEachMonthFilter(year: string, siteID: number) {
    return this.http.get<any>(this.baseURL + '/trespass/countEachMonthFilter?year=' + year + '&siteID=' + siteID);
  }

  getCountEachHour(year: string) {
    return this.http.get<any>(this.baseURL + '/trespass/countEachHour?year=' + year);
  }

  getCountEachHourFilter(year: string, siteID: number) {
    return this.http.get<any>(this.baseURL + '/trespass/countEachHourFilter?year=' + year + '&siteID=' + siteID);
  }

  getDistinctYear() {
    return this.http.get<number[]>(this.baseURL + '/trespass/getDistinctYear');
  }

  getEveryMonthOfYear(year: number) {
    return this.http.get<number[]>(this.baseURL + '/trespass/everyMonthOfYear?year=' + year);
  }

  getByYearAndMonth(year: number, month: number) {
    return this.http.get<Trespass[]>(this.baseURL + '/trespass/byYearAndMonth?year=' + year + '&month=' + month);
  }

}
