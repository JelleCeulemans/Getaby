import { Component, OnInit } from '@angular/core';
import { Site } from 'src/app/models/site.model';
import { SiteService } from 'src/app/services/site.service';
import { CompanyService } from 'src/app/services/company.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Company } from 'src/app/models/company.model';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css']
})
export class SiteComponent implements OnInit {
  sites: Site[];
  site: Site;
  modalButton: string;
  modalTitle: string;
  editing: boolean;
  company: Company;

  constructor(
    private siteService: SiteService,
    private companyService: CompanyService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.companyService.getCompanyFromToken().subscribe(company => {
      this.company = company;
      this.siteService.getAllSitesFromCompany(company.companyID).subscribe(sites => {
        this.sites = sites;
      });
    });
  }

  deleteSite() {
    this.siteService.deleteSite(this.site.siteID).subscribe(result => {
      console.log(result);
      const index = this.sites.findIndex(s => s.siteID === result.siteID);
      this.sites.splice(index, 1);
    });
  }

  open(content, site: Site) {
    this.site = site ? site : new Site(0, '', this.company, null);
    this.modalService.open(content);
  }

  onEditSite() {
    this.modalTitle = 'Site wijzigen';
    this.modalButton = 'Site wijzigen';
    this.editing = true;
  }

  onSubmitModal() {
    if (this.editing) {
      this.siteService.updateSite(this.site).subscribe(result => {
        console.log(result);
      });
    } else {
      this.siteService.addSite(this.site).subscribe(result => {
        console.log(result);
        this.sites.push(result);
      });
    }
  }

  addSite() {
    this.modalTitle = 'Site aanmaken';
    this.modalButton = 'Site opslaan';
    this.editing = false;
  }

}
