import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { TrespassService } from 'src/app/services/trespass.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-pdf-generator',
  templateUrl: './pdf-generator.component.html',
  styleUrls: ['./pdf-generator.component.css']
})
export class PdfGeneratorComponent implements OnInit {
  pdfRows: any[];
  years: number[];
  showMonth: boolean;
  showButton: boolean;
  monthsText = ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'];
  monthsNumbers: number[];
  selectedMonth: number;
  selectedYear: number;

  constructor(private trespassService: TrespassService, private datepipe: DatePipe) { }

  ngOnInit() {
    this.showMonth = false;
    this.showButton = false;
    this.trespassService.getDistinctYear().subscribe(result => {
      console.log(result);
      this.years = result;
    });
  }

  changeYear(event: any) {
    const year = +event.target.value;
    if (year > 0) {
      this.selectedYear = year;
      this.trespassService.getEveryMonthOfYear(year).subscribe(result => {
        this.monthsNumbers = result.sort();
        this.showMonth = true;
      });
    } else {
      this.showMonth = false;
    }
  }

  changeMonth(event: any) {
    const month = +event.target.value;
    if (month > 0) {
      this.selectedMonth = month;
      this.showButton = true;
    } else {
      this.showButton = false;
    }
  }

  generate() {
    this.trespassService.getByYearAndMonth(this.selectedYear, this.selectedMonth).subscribe(async result => {
      console.log(result);
      this.pdfRows = new Array<any>();
      result.forEach(trespass => {
        const trespassRow = [
          trespass.trespassID,
          this.datepipe.transform(trespass.moment, 'dd/MM/yyyy HH:mm:ss'),
          trespass.camera.name,
          trespass.camera.site.name,
          trespass.archive];
        this.pdfRows.push(trespassRow);
      });
      await this.createPdf();
    });
  }

  async createPdf() {
    const doc = new jsPDF();
    const col = ['TrespassID', 'Moment', 'Camera', 'Site', 'Gearchiveerd'];

    doc.autoTable(col, this.pdfRows
    //   , {
    //   styles: {
    //     fontSize: 8,
    //     cellPadding : 1,
    //   },
    //   columnStyles: {
    //     0: { cellWidth: 20 },
    //     1: { cellWidth: 30 },
    //     2: { cellWidth: 20 },
    //     3: { cellWidth: 15 },
    //     4: { cellWidth: 182 }
    //   }
    // }
    );
    doc.save(this.monthsText[this.selectedMonth - 1] + '-' + this.selectedYear + '.pdf');
  }
}
