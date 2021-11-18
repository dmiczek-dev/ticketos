import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { OfficeService } from 'src/app/services/office.service';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-office-view',
  templateUrl: './office-view.component.html',
  styleUrls: ['./office-view.component.scss'],
})
export class OfficeViewComponent implements OnInit, OnDestroy {
  today: Date | undefined;
  timerInterval: any;
  ticket: any;
  office: any;
  constructor(
    private _officeSrv: OfficeService,
    private _ticketSrv: TicketService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.timerInterval = setInterval(() => {
      this.today = new Date();
    }, 1000);

    this.office = parseInt(this._route.snapshot.paramMap.get('officeId')!);
    this.getOfficeById();
  }

  ngOnDestroy(): void {
    clearInterval(this.timerInterval);
  }

  getOfficeById() {
    this._officeSrv
      .getOfficeById(
        parseInt(this._route.snapshot.paramMap.get('officeId')!, 10)
      )
      .subscribe(
        (res) => {
          this.office = res[0];
          console.log(this.office);
        },
        (error) => {
          console.log(error);
        },
        () => {
          this.getCalledTicketForOffice();
        }
      );
  }

  getCalledTicketForOffice() {
    this._ticketSrv
      .getCalledTicketForOffice({
        officeId: this.office.officeId,
      })
      .subscribe((res) => {
        this.ticket = res[0];
      });
  }
}
