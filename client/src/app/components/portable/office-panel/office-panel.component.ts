import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfficeService } from 'src/app/services/office.service';
import { TicketService } from 'src/app/services/ticket.service';
import io from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-office-panel',
  templateUrl: './test.html',
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
    this.socket.removeAllListeners();
    clearInterval(this.timerInterval);
  }

  ngAfterViewInit(): void {
    this.socket.on('reloadNewestTickets', () => {
      this.getNewestTicketsForCenter();
    });

    this.socket.on('reloadCalledTickets', () => {
      this.getCalledTicketForOffice();
    });

    this.socket.on('refreshScreens', () => {
      window.location.reload();
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
          this.getNewestTicketsForCenter();
          this.getCalledTicketForOffice();
        }
      );
  }

  getNewestTicketsForCenter() {
    this._ticketSrv
      .getNewestTicketsForCenter({
        centerId: this.office.centerId,
        officeId: this.office.officeId,
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
      this._ticketSrv
        .callTicket({
          ticketId: ticket.ticketId,
          officeId: this.office.officeId,
        })
        .subscribe();
    } else {
      this._ticketSrv
        .serviceTicket({ ticketId: this.activeTicket.ticketId })
        .subscribe(
          () => {},
          (error) => console.log(error),
          () => {
            this._ticketSrv
              .callTicket({
                ticketId: ticket.ticketId,
                officeId: this.office.officeId,
              })
              .subscribe(
                () => {},
                (error) => console.log(error),
                () => this.getNewestTicketsForCenter()
              );
          }
        );
    }
  }

  nextTicket() {
    console.log('nextTicket');

    if (this.activeTicket == null) {
      console.log('activeTicket = null');
      this._ticketSrv
        .callTicket({
          ticketId: this.tickets[0].ticketId,
          officeId: this.office.officeId,
        })
        .subscribe();
    } else {
      this._ticketSrv
        .serviceTicket({ ticketId: this.activeTicket.ticketId })
        .subscribe(
          () => {},
          (error) => console.log(error),
          () => {
            this._ticketSrv
              .callTicket({
                ticketId: this.tickets[0].ticketId,
                officeId: this.office.officeId,
              })
              .subscribe(
                () => {},
                (error) => console.log(error),
                () => this.getNewestTicketsForCenter()
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

  recall() {
    if (this.activeTicket != null) {
      this._ticketSrv
        .recallTicket({ ticketId: this.activeTicket.ticketId })
        .subscribe();
    }
  }
}
