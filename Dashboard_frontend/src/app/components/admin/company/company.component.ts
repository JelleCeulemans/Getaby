import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from 'src/app/models/company.model';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  company: Company;

  constructor(
    private companyService: CompanyService
  ) { }

  ngOnInit() {
    this.companyService.getCompanyFromToken().subscribe(company => {
      this.company = company;
    });
  }

}
