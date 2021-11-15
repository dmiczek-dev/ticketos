import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfficeService } from 'src/app/services/office.service';
import { TicketTypeService } from 'src/app/services/ticket-type.service';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-register-panel',
  templateUrl: './register-panel.component.html',
  styleUrls: ['./register-panel.component.scss'],
})
export class RegisterPanelComponent implements OnInit, OnDestroy {
  today: Date | undefined;
  timerInterval: any;
  ticketTypes: any[] = [];
  tickets: any[] = [];
  office: any;
  constructor(
    private _ticketTypeSrv: TicketTypeService,
    private _officeSrv: OfficeService,
    private _ticketSrv: TicketService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.timerInterval = setInterval(() => {
      this.today = new Date();
    }, 1000);

    this.office = parseInt(this._route.snapshot.paramMap.get('officeId')!);

    this.getTicketTypes();
    this.getOfficeById();
  }

  ngOnDestroy(): void {
    clearInterval(this.timerInterval);
  }

  //TODO: Optional, get ticket types based on center
  getTicketTypes() {
    this._ticketTypeSrv.getTicketTypes();
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
          this.getNewestTicketsForCenter();
        }
      );
  }

  getNewestTicketsForCenter() {
    this._ticketSrv
      .getNewestTicketsForCenter({ centerId: this.office.centerId })
      .subscribe((res) => {
        this.tickets = res;
        console.log(this.tickets);
      });
  }

  confirm(ticket: any) {}
}
