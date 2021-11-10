import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TicketTypeService } from 'src/app/services/ticket-type.service';

export interface DialogData {
  ticketTypeId: number;
  name: string;
  mark: string;
  action: string;
}

@Component({
  selector: 'app-ticket-type',
  templateUrl: './ticket-type.component.html',
  styleUrls: ['./ticket-type.component.scss'],
})
export class TicketTypeComponent implements OnInit {
  ticketTypes = [];
  ticketTypeId: number | undefined;
  name: string | undefined;
  mark: string | undefined;
  action: string | undefined;

  displayedColumns: string[] = ['ticketTypeId', 'name', 'mark', 'options'];
  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _ticketTypeSrv: TicketTypeService
  ) {}

  ngOnInit(): void {
    this.getTicketTypes();
  }

  getTicketTypes() {
    this._ticketTypeSrv.getTicketTypes().subscribe((res) => {
      this.ticketTypes = res;
    });
  }

  addTicketType(data: any) {
    this.ticketTypeId = undefined;
    this.name = undefined;
    this.mark = undefined;
    this.action = data.action;
    this.openDialog();
  }
  editTicketType(data: any) {
    this.ticketTypeId = data.ticketTypeId;
    this.name = data.name;
    this.mark = data.mark;
    this.action = data.action;
    this.openDialog();
  }
  deleteTicketType(data: any) {
    this.ticketTypeId = data.ticketTypeId;
    this.action = data.action;
    this.openDialog();
  }
  openDialog() {
    const dialogRef = this.dialog.open(TicketTypeDialogComponent, {
      width: '350px',
      data: {
        ticketTypeId: this.ticketTypeId,
        name: this.name,
        mark: this.mark,
        action: this.action,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        switch (result.action) {
          case 'add':
            this._ticketTypeSrv
              .addTicketType({
                name: result.name,
                mark: result.mark,
              })
              .subscribe(
                (res) => {
                  this._snackBar.open('Bilet został utworzony', '', {
                    duration: 5000,
                    verticalPosition: 'top',
                    horizontalPosition: 'right',
                    panelClass: ['green-snackbar'],
                  });
                },
                (error) => {
                  this._snackBar.open('Błąd podczas tworzenia biletu', '', {
                    duration: 5000,
                    verticalPosition: 'top',
                    horizontalPosition: 'right',
                    panelClass: ['red-snackbar'],
                  });
                },
                () => {
                  this.getTicketTypes();
                }
              );
            break;
          case 'edit':
            this._ticketTypeSrv
              .editTicketType({
                ticketTypeId: result.ticketTypeId,
                name: result.name,
                mark: result.mark,
              })
              .subscribe(
                (res) => {
                  this._snackBar.open('Bilet został edytowany', '', {
                    duration: 5000,
                    verticalPosition: 'top',
                    horizontalPosition: 'right',
                    panelClass: ['green-snackbar'],
                  });
                },
                (error) => {
                  this._snackBar.open('Błąd podczas edycji biletu', '', {
                    duration: 5000,
                    verticalPosition: 'top',
                    horizontalPosition: 'right',
                    panelClass: ['red-snackbar'],
                  });
                },
                () => {
                  this.getTicketTypes();
                }
              );
            break;
          case 'delete':
            this._ticketTypeSrv
              .deleteTicketType({ ticketTypeId: result.ticketTypeId })
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
                  this.getTicketTypes();
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
  selector: 'app-ticket-type-dialog',
  templateUrl: './ticket-type-dialog-component.html',
})
export class TicketTypeDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<TicketTypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
