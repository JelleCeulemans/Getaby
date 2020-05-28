import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../models/role.model';
import { Camera } from '../models/camera.model';

@Injectable({
  providedIn: 'root'
})

export class CameraService {
  baseURL = environment.baseURL;


  constructor(
    private http: HttpClient) {
  }

  public getAllCamerasFromCompany(companyID: number) {
    return this.http.get<Camera[]>(this.baseURL + '/camera/whereCompany?companyID=' + companyID);
  }

  public updateCamera(camera: Camera) {
    return this.http.put<Camera>(this.baseURL + '/camera', camera);
  }

  public addCamera(camera: Camera) {
    return this.http.post<Camera>(this.baseURL + '/camera', camera);
  }

  public deleteCamera(cameraID: number) {
    return this.http.delete<Camera>(this.baseURL + '/camera/' + cameraID);
  }
}
