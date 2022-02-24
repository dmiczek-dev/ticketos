import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { MarqueeAnimation, MarqueeDirection } from 'ngx-marquee';
import { CenterService } from 'src/app/services/center.service';
import { SomedService } from 'src/app/services/somed.service';

@Component({
  selector: 'app-somed-office',
  templateUrl: './somed-office.component.html',
  styleUrls: ['./somed-office.component.scss'],
})

export class SomedOfficeComponent implements OnInit, OnDestroy {
  today: Date | undefined;
  timerInterval: any;
  center: any;
  schedule: any;
  weekDays:any = [];
  marqueeList: string[] = [];

  constructor(
    private _somedSrv: SomedService,
    private _centerSrv: CenterService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.timerInterval = setInterval(() => {
      this.today = new Date();
    }, 1000);

    this.getCenterById();

    //marquee
    this.marqueeList = [
      "May be... but",
      "you can organically update the marquee on the fly!",
      "Why don't you try...",
      "Press 'Add message' button"
    ];

  }

  ngOnDestroy(): void {
    clearInterval(this.timerInterval);
  }

  getCenterById() {
    this._centerSrv
      .getCenterById(
        parseInt(this._route.snapshot.paramMap.get('centerId')!, 10)
      )
      .subscribe(
        (res) => {
          this.center = res[0];
          console.log(this.center);
        },
        (error) => {
          console.log(error);
        },
        () => {
          this.getScheduleByOffice();
        }
      );
  }

  getScheduleByOffice() {
    this._somedSrv
      .getScheduleByOffice({
        center: this.center.shortcut,
        office: this._route.snapshot.paramMap.get('office'),
      })
      .subscribe((res) => {
        this.convertDataForTable(res);
        this.buildWeekDayList(res);
      });
  }

  buildWeekDayList(data:any) {
    const series = data.map((el:any) => {
      return { day: el.DZIEN.trim() };
    });

    this.weekDays = series.filter(
      (item:any, index:any, self:any) =>
        index ===
        self.findIndex((el:any) => {
          return el.day === item.day;
        })
    );
    console.log(this.weekDays)
  }

  convertDataForTable(data: any) {
    this.schedule = data.map((el:any) => {
      return {
        data: el.DATA,
        day: el.DZIEN.trim(),
        start: new Date(el.DATA + el.GODZINAOD),
        end: new Date(el.DATA + el.GODZINADO),
        office: el.NRGABINETU,
        center: el.PODMIOTSKROT,
        doctor: el.PRACOWNIK,
        doctorId: el.PRACOWNIKID,
        clinic: el.PORADNIA,
      };
    });

  }

}
