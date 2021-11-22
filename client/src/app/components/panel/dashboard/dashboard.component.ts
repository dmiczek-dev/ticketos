import { Component, OnInit } from '@angular/core';
import { CenterService } from 'src/app/services/center.service';
import { OfficeService } from 'src/app/services/office.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  centers: any;
  offices: any;
  href: string;

  constructor(
    private centerSrv: CenterService,
    private officeSrv: OfficeService
  ) {}

  ngOnInit(): void {
    this.href = window.location.origin;

    this.getCenters();
    this.getOffices();
  }

  getCenters() {
    this.centerSrv.getCenters().subscribe((res) => {
      this.centers = res;
    });
  }

  getOffices() {
    this.officeSrv.getOffices().subscribe((res) => {
      this.offices = res;
    });
  }
}
