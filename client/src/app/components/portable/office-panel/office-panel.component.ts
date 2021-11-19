import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  tickets: any[];
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
    this.socket.on('reloadConfirmedTickets', () => {
      this.getConfirmedTicketsForCenter();
    });

    this.socket.on('reloadCalledTickets', () => {
      this.getCalledTicketForOffice();
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
        },
        (error) => {
          console.log(error);
        },
        () => {
          this.getConfirmedTicketsForCenter();
          this.getCalledTicketForOffice();
        }
      );
  }

  getConfirmedTicketsForCenter() {
    this._ticketSrv
      .getConfirmedTicketsForCenter({
        centerId: this.office.centerId,
      })
      .subscribe((res) => {
        this.tickets = res;
      });
  }

  getCalledTicketForOffice() {
    this._ticketSrv
      .getCalledTicketForOffice({ officeId: this.office.officeId })
      .subscribe((res) => {
        this.activeTicket = res[0];
      });
  }

  selectTicket(ticket: any) {
    if (this.activeTicket == null) {
      this.activeTicket = ticket;
      this._ticketSrv.callTicket({
        ticketId: this.activeTicket.ticketId,
        officeId: this.office.officeId,
      });
    } else {
      this._ticketSrv
        .serviceTicket({ ticketId: this.activeTicket.ticketId })
        .subscribe(
          () => {},
          (error) => console.log(error),
          () => {
            this.activeTicket = ticket;
            this._ticketSrv
              .callTicket({
                ticketId: this.activeTicket.ticketId,
                officeId: this.office.officeId,
              })
              .subscribe(
                () => {},
                (error) => console.log(error),
                () => this.getConfirmedTicketsForCenter()
              );
          }
        );
    }
  }

  nextTicket() {
    if (this.activeTicket == null) {
      this.activeTicket = this.tickets[0];
      this._ticketSrv.callTicket({
        ticketId: this.activeTicket.ticketId,
        officeId: this.office.officeId,
      });
    } else {
      this._ticketSrv
        .serviceTicket({ ticketId: this.activeTicket.ticketId })
        .subscribe(
          () => {},
          (error) => console.log(error),
          () => {
            this.activeTicket = this.tickets[0];
            this._ticketSrv
              .callTicket({
                ticketId: this.activeTicket.ticketId,
                officeId: this.office.officeId,
              })
              .subscribe(
                () => {},
                (error) => console.log(error),
                () => this.getConfirmedTicketsForCenter()
              );
          }
        );
    }
  }

  missing() {
    if (this.activeTicket != null) {
      this._ticketSrv
        .deleteTicket({ ticketId: this.activeTicket.ticketId })
        .subscribe();
    }
  }

  break() {
    if (this.activeTicket != null) {
      this._ticketSrv
        .serviceTicket({ ticketId: this.activeTicket.ticketId })
        .subscribe();
    }
  }

  // Google cloud integration with voice api
  recall() {}
}
