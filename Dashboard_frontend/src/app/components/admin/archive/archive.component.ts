import { Component, OnInit } from '@angular/core';
import { TrespassService } from 'src/app/services/trespass.service';
import { Trespass } from 'src/app/models/trespass.model';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {
  trespassesArchive: Trespass[];

  constructor(
    private trespassService: TrespassService) { }

  ngOnInit() {
    this.getTrespasses();
  }

  getTrespasses() {
    this.trespassService.getTrespassesWhereArchiveTrue().subscribe(res => {
      this.trespassesArchive = res;
      console.log(this.trespassesArchive);
    });


  }

  delete(id: number) {
    this.trespassService.getTrespass(id).subscribe(result => {
      if (confirm("Zeker dat je dit beeld wil verwijderen?")) {
        this.trespassService.deleteTrespass(id).subscribe(result => {
          //window.location.reload();
          this.getTrespasses();
        });
      }
    });
  }
}
