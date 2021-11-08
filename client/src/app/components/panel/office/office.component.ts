import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CenterService } from 'src/app/services/center.service';
import { OfficeService } from 'src/app/services/office.service';

export interface DialogData {
  officeId: number;
  name: string;
  mask: boolean;
  centerId: number;
  action: string;
  centers: any;
}

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.scss'],
})
export class OfficeComponent implements OnInit {
  offices = [];
  centers = [];
  action: string | undefined;
  name: string | undefined;
  mask: boolean | undefined;
  officeId: number | undefined;
  centerId: number | undefined;

  displayedColumns: string[] = [
    'officeId',
    'name',
    'mask',
    'centerId',
    'options',
  ];
  constructor(
    public dialog: MatDialog,
    private _officeSrv: OfficeService,
    private _centerSrv: CenterService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getOffices();
    this.getCenters();
  }

  getOffices() {
    this._officeSrv.getOffices().subscribe((res) => {
      this.offices = res;
    });
  }

  getCenters() {
    this._centerSrv.getCenters().subscribe((res) => {
      this.centers = res;
    });
  }

  addOffice(data: any) {
    this.officeId = undefined;
    this.name = undefined;
    this.mask = undefined;
    this.centerId = undefined;
    this.action = data.action;
    this.openDialog();
  }
  editOffice(data: any) {
    this.officeId = data.officeId;
    this.name = data.name;
    this.mask = data.mask;
    this.centerId = data.centerId;
    this.action = data.action;
    this.openDialog();
  }
  deleteOffice(data: any) {
    this.officeId = data.officeId;
    this.action = data.action;
    this.openDialog();
  }

  openDialog() {
    const dialogRef = this.dialog.open(OfficeDialogComponent, {
      width: '350px',
      data: {
        officeId: this.officeId,
        name: this.name,
        mask: this.mask,
        centerId: this.centerId,
        action: this.action,
        centers: this.centers,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        switch (result.action) {
          case 'add':
            console.log(result);
            this._officeSrv
              .addOffice({
                name: result.name,
                mask: result.mask,
                centerId: result.centerId,
              })
              .subscribe(
                (res) => {
                  this._snackBar.open('Gabinet został utworzony', '', {
                    duration: 5000,
                    verticalPosition: 'top',
                    horizontalPosition: 'right',
                    panelClass: ['green-snackbar'],
                  });
                },
                (error) => {
                  this._snackBar.open('Błąd podczas tworzenia gabinetu', '', {
                    duration: 5000,
                    verticalPosition: 'top',
                    horizontalPosition: 'right',
                    panelClass: ['red-snackbar'],
                  });
                },
                () => {
                  this.getOffices();
                }
              );
            break;
          case 'edit':
            this._officeSrv
              .editOffice({
                officeId: result.officeId,
                name: result.name,
                mask: result.mask,
                centerId: result.centerId,
              })
              .subscribe(
                (res) => {
                  this._snackBar.open('Gabinet został edytowany', '', {
                    duration: 5000,
                    verticalPosition: 'top',
                    horizontalPosition: 'right',
                    panelClass: ['green-snackbar'],
                  });
                },
                (error) => {
                  this._snackBar.open('Błąd podczas edycji gabinetu', '', {
                    duration: 5000,
                    verticalPosition: 'top',
                    horizontalPosition: 'right',
                    panelClass: ['red-snackbar'],
                  });
                },
                () => {
                  this.getOffices();
                }
              );
            break;
          case 'delete':
            this._officeSrv
              .deleteOffice({ officeId: result.officeId })
              .subscribe(
                (res) => {
                  this._snackBar.open('Gabinet został usunięty', '', {
                    duration: 5000,
                    verticalPosition: 'top',
                    horizontalPosition: 'right',
                    panelClass: ['green-snackbar'],
                  });
                },
                (error) => {
                  this._snackBar.open('Błąd podczas usuwania gabinetu', '', {
                    duration: 5000,
                    verticalPosition: 'top',
                    horizontalPosition: 'right',
                    panelClass: ['red-snackbar'],
                  });
                },
                () => {
                  this.getOffices();
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
  selector: 'app-office-dialog',
  templateUrl: './office-dialog-component.html',
})
export class OfficeDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<OfficeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
