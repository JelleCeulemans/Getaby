import { Component, OnInit } from '@angular/core';
import { TrespassService } from 'src/app/services/trespass.service';
import { Trespass } from 'src/app/models/trespass.model';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-trespass',
  templateUrl: './trespass.component.html',
  styleUrls: ['./trespass.component.css']
})
export class TrespassComponent implements OnInit {
  trespassesNoArchive: Trespass[];
  url: string;
  searchDate: Date;

  constructor(
    private trespassService: TrespassService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.getTrespasses();
  }

  getTrespasses() {
    this.trespassService.getTrespassesWhereArchiveFalse().subscribe(res => {
      this.trespassesNoArchive = res;
      console.log(this.trespassesNoArchive);
    });
  }

  showImage(content, path: string) {
    this.url = environment.imageBaseUrl + path;
    this.modalService.open(content);
  }

  addToArchive(trespass: Trespass) {
    this.trespassService.addToArchive(trespass).subscribe(result => {
      console.log(result);
      this.getTrespasses();
    });
  }

  delete(id: number) {
    this.trespassService.getTrespass(id).subscribe(result => {
      if (confirm('Zeker dat je dit beeld wil verwijderen?')) {
        this.trespassService.deleteTrespass(id).subscribe(() => {
          // window.location.reload();
          this.getTrespasses();
        });
      }
    });
  }
}
