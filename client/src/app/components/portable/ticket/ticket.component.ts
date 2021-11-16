import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PrinterSettingService } from 'src/app/services/printer-setting.service';
import { TicketTypeService } from 'src/app/services/ticket-type.service';
import { ActivationEnd, Router } from '@angular/router';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
})
export class TicketComponent implements OnInit {
  ticketTypes: any[] = [];
  printerSettings: any;
  today: Date | undefined;
  next: string | undefined;
  centerId: any;
  timerInterval: any;

  constructor(
    private _ticketTypeSrv: TicketTypeService,
    private _printerSettingSrv: PrinterSettingService,
    private _ticketSrv: TicketService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {
    router.events.subscribe((val) => {
      if (val instanceof ActivationEnd) {
        if (val.snapshot.params.centerId !== undefined) {
          this.centerId = val.snapshot.params.centerId;
        }
      }
    });
  }

  ngOnInit(): void {
    this._ticketTypeSrv
      .getTicketTypesByCenterId(this.centerId)
      .subscribe((res) => {
        this.ticketTypes = res;
      });
    this._printerSettingSrv
      .getPrinterSettingByCenterId(this.centerId)
      .subscribe((res) => {
        this.printerSettings = res[0];
      });

    this.timerInterval = setInterval(() => {
      this.today = new Date();
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timerInterval);
  }

  print(ticketType: any) {
    this._ticketSrv.filterByGenre = ['this.options', 'test'];
    this._ticketSrv
      .createTicket({
        ticketTypeId: ticketType.ticketTypeId,
        centerId: this.centerId,
      })
      .subscribe(
        (res) => {
          this.next = res[0].number + ticketType.mark;
          this.cdr.detectChanges();
        },
        (error) => {
          console.log(error);
        },
        () => {
          window.print();
        }
      );
  }
}
