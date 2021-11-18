import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { OfficeService } from 'src/app/services/office.service';
import { TicketService } from 'src/app/services/ticket.service';
import io from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-office-panel',
  templateUrl: './office-panel.component.html',
  styleUrls: ['./office-panel.component.scss'],
})
export class OfficePanelComponent implements OnInit, OnDestroy {
  today: Date | undefined;
  timerInterval: any;
  tickets$: Observable<any[]>;
  activeTicket: any;
  office: any;
  private socket: any;

  constructor(
    private _officeSrv: OfficeService,
    private _ticketSrv: TicketService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.socket = io(environment.socket_address);
    this.timerInterval = setInterval(() => {
      this.today = new Date();
    }, 1000);

    this.office = parseInt(this._route.snapshot.paramMap.get('officeId')!);
    this.getOfficeById();
  }

  ngOnDestroy(): void {
    clearInterval(this.timerInterval);
  }

  ngAfterViewInit(): void {
    this.socket.on('newConfirmedTicketAppear', () => {
      this.getConfirmedTicketsForCenter();
    });
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
          this.getConfirmedTicketsForCenter();
        }
      );
  }

  getConfirmedTicketsForCenter() {
    this.tickets$ = this._ticketSrv.getConfirmedTicketsForCenter({
      centerId: this.office.centerId,
    });
    console.log(this.tickets$);
  }

  selectTicket(ticket: any) {}

  pushCurrent() {}
  missing() {}
  recall() {}
  break() {}
}
