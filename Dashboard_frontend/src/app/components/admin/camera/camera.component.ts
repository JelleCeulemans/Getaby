import { Component, OnInit } from '@angular/core';
import { SiteService } from 'src/app/services/site.service';
import { CompanyService } from 'src/app/services/company.service';
import { Site } from 'src/app/models/site.model';
import { Camera } from 'src/app/models/camera.model';
import { CameraService } from 'src/app/services/camera.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {
  sites: Site[];
  cameras: Camera[];
  camera: Camera;
  modalButton: string;
  editing: boolean;

  constructor(
    private siteService: SiteService,
    private companyService: CompanyService,
    private cameraService: CameraService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.companyService.getCompanyFromToken().subscribe(company => {
      this.siteService.getAllSitesFromCompany(company.companyID).subscribe(sites => {
        this.sites = sites;
        console.log(sites);
      });
      this.cameraService.getAllCamerasFromCompany(company.companyID).subscribe(cameras => {
        this.cameras = cameras;
      });
    });
  }

  deleteCamera() {
    this.cameraService.deleteCamera(this.camera.cameraID).subscribe(result => {
      console.log(result);
      const index = this.cameras.findIndex(c => c.cameraID === result.cameraID);
      this.cameras.splice(index, 1);
    });
  }

  open(content, camera: Camera) {
    this.camera = camera;
    this.modalService.open(content);
  }

  onEditCamera() {
   this.modalButton = 'Configuratie wijzigen';
   this.editing = true;
  }

  onSubmitModal() {
    if (this.editing) {
      this.cameraService.updateCamera(this.camera).subscribe(result => {
        console.log(result);
      });
    } else {
      this.cameraService.addCamera(this.camera).subscribe(result => {
        console.log(result);
        this.cameras.push(result);
      });
    }
  }

  onChangeSite(event) {
    this.camera.site = this.sites.find(s => s.siteID === +event.target.value);
  }

  addCamera() {
    this.camera = new Camera(0, this.sites[0], '', '', null);
    this.modalButton = 'Configuratie opslaan';
    this.editing = false;
  }
}
