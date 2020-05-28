import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { TrespassService } from 'src/app/services/trespass.service';
import { SiteService } from 'src/app/services/site.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Company } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company.service';
import { Site } from 'src/app/models/site.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  countYear: number;
  countMonth: number;
  countWeek: number;
  countDay: number;
  eachMonthArray: number[];
  currentYear: string;
  sites: Site[];
  years: number[];
  selectedYearMonth: string;
  selectedSiteIdMonth: number;
  selectedYearHours: string;
  selectedSiteIdHours: number;

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabelsMonth: Label[] = [
    'Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni',
    'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'];
  public barChartLabelsHours: Label[] = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12',
    '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartDataMoths: ChartDataSets[] = [
    { data: [], label: 'Overtredingen per maand' }
  ];

  public barChartDataHours: ChartDataSets[] = [
    { data: [], label: 'Overtredingen per uur' }
  ];

  constructor(
    private trespassService: TrespassService,
    private siteService: SiteService,
    private companyService: CompanyService) { }

  ngOnInit() {
    this.currentYear = (new Date()).getFullYear().toString();
    this.selectedYearMonth = this.currentYear;
    this.selectedYearHours = this.currentYear;
    this.trespassService.getCountCountYear().subscribe(result => {
      this.countYear = result;
    });
    this.trespassService.getCountCountMonth().subscribe(result => {
      this.countMonth = result;
    });
    this.trespassService.getCountCountDay().subscribe(result => {
      this.countDay = result;
    });
    this.allTrespassMonth(this.currentYear);
    this.allTrespassHour(this.currentYear);
    this.companyService.getCompanyFromToken().subscribe(company => {
      this.siteService.getAllSitesFromCompany(company.companyID).subscribe(sites => {
        console.log(sites);
        this.sites = sites;
      });
    });
    this.trespassService.getDistinctYear().subscribe(result => {
      this.years = result;
    });
  }

  allTrespassMonth(year: string) {
    this.trespassService.getCountEachMonth(year).subscribe(result => {
      this.barChartDataMoths[0].data = result;
    });
  }

  allTrespassHour(year: string) {
    this.trespassService.getCountEachHour(year).subscribe(result => {
      this.barChartDataHours[0].data = result;
    });
  }

  changeYearMonth(event: any) {
    console.log(event.target.value);
    this.selectedYearMonth = event.target.value;
    this.updateMonth();
  }

  changeYearHours(event: any) {
    console.log(event.target.value);
    this.selectedYearHours = event.target.value;
    this.updateHour();
  }

  changeSiteMonth(event: any) {
    if (+event.target.value === 0) {
      this.allTrespassMonth(this.selectedYearMonth);
    } else {
      this.selectedSiteIdMonth = event.target.value;
      this.updateMonth();
    }
  }

  changeSiteHour(event: any) {
    if (+event.target.value === 0) {
      this.allTrespassHour(this.selectedYearHours);
    }
    this.selectedSiteIdHours = event.target.value;
    this.updateHour();
  }

  updateHour() {
    if (!this.selectedSiteIdHours) {
      this.allTrespassHour(this.selectedYearHours);
    } else {
      this.trespassService.getCountEachHourFilter(this.selectedYearHours, this.selectedSiteIdHours).subscribe(result => {
        this.barChartDataHours[0].data = result;
      });
    }
  }

  updateMonth() {
    if (!this.selectedSiteIdMonth) {
      this.allTrespassMonth(this.selectedYearMonth);
    } else {
      this.trespassService.getCountEachMonthFilter(this.selectedYearMonth, this.selectedSiteIdMonth).subscribe(result => {
        this.barChartDataMoths[0].data = result;
      });
    }
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
}
