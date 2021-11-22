import {
  AfterViewInit,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { OfficeService } from 'src/app/services/office.service';
import { TicketTypeService } from 'src/app/services/ticket-type.service';
import { TicketService } from 'src/app/services/ticket.service';
import io from 'socket.io-client';
import { environment } from 'src/environments/environment';

export interface DialogData {
  ticketId: number;
  ticketTypeId: number;
  ticketTypes: any;
  number: number;
  mark: string;
}

@Component({
  selector: 'app-register-panel',
  templateUrl: './register-panel.component.html',
  styleUrls: ['./register-panel.component.scss'],
})
export class RegisterPanelComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  today: Date | undefined;
  timerInterval: any;
  ticketTypes: any[] = [];
  tickets$: Observable<any[]>;
  office: any;
  private socket: any;

  constructor(
    private _ticketTypeSrv: TicketTypeService,
    private _officeSrv: OfficeService,
    private _ticketSrv: TicketService,
    private _route: ActivatedRoute,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
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
    this.socket.on('reloadNewestTickets', () => {
      this.getNewestTicketsForCenter();
    });
  }

  getTicketTypesForOffice() {
    this._ticketTypeSrv
      .getPinnedTicketTypesByOfficeId({ officeId: this.office.officeId })
      .subscribe((res) => {
        this.ticketTypes = res;
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
          this.getTicketTypesForOffice();
        }
      );
  }
  getNewestTicketsForCenter() {
    this.tickets$ = this._ticketSrv.getNewestTicketsForCenter({
      centerId: this.office.centerId,
    });
  }

  confirm(ticket: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        ticketId: ticket.ticketId,
        ticketTypeId: ticket.ticketTypeId,
        ticketTypes: this.ticketTypes,
        number: ticket.number,
        mark: ticket.mark,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        switch (result.action) {
          case 'confirm':
            this._ticketSrv
              .confirmTicket({
                ticketId: result.ticketId,
                ticketTypeId: result.ticketTypeId,
              })
              .subscribe(
                (res) => {
                  this._snackBar.open('Bilet został potwierdzony', '', {
                    duration: 5000,
                    verticalPosition: 'top',
                    horizontalPosition: 'right',
                    panelClass: ['green-snackbar'],
                  });
                },
                (error) => {
                  this._snackBar.open('Błąd podczas autoryzacji biletu', '', {
                    duration: 5000,
                    verticalPosition: 'top',
                    horizontalPosition: 'right',
                    panelClass: ['red-snackbar'],
                  });
                },
                () => {
                  this.getNewestTicketsForCenter();
                }
              );
            break;
          case 'delete':
            this._ticketSrv
              .deleteTicket({
                ticketId: result.ticketId,
              })
              .subscribe(
                (res) => {
                  this._snackBar.open('Bilet został usunięty', '', {
                    duration: 5000,
                    verticalPosition: 'top',
                    horizontalPosition: 'right',
                    panelClass: ['green-snackbar'],
                  });
                },
                (error) => {
                  this._snackBar.open('Błąd podczas usuwania biletu', '', {
                    duration: 5000,
                    verticalPosition: 'top',
                    horizontalPosition: 'right',
                    panelClass: ['red-snackbar'],
                  });
                },
                () => {
                  this.getNewestTicketsForCenter();
                }
              );
            break;
        }
      }
    });
  }
}

// Dialog Component
@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}
}
