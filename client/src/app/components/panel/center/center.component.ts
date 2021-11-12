import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CenterService } from 'src/app/services/center.service';

export interface DialogData {
  centerId: number;
  name: string;
  shortcut: string;
  action: string;
}

@Component({
  selector: 'app-center',
  templateUrl: './center.component.html',
  styleUrls: ['./center.component.scss'],
})
export class CenterComponent implements OnInit {
  centers = [];
  action: string | undefined;
  name: string | undefined;
  shortcut: string | undefined;
  centerId: number | undefined;

  displayedColumns: string[] = ['centerId', 'name', 'shortcut', 'options'];
  constructor(
    public dialog: MatDialog,
    private _centerSrv: CenterService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getCenters();
  }

  getCenters() {
    this._centerSrv.getCenters().subscribe((res) => {
      this.centers = res;
    });
  }

  addCenter(data: any) {
    this.centerId = undefined;
    this.name = undefined;
    this.shortcut = undefined;
    this.action = data.action;
    this.openDialog();
  }
  editCenter(data: any) {
    this.centerId = data.centerId;
    this.name = data.name;
    this.shortcut = data.shortcut;
    this.action = data.action;
    this.openDialog();
  }
  deleteCenter(data: any) {
    this.centerId = data.centerId;
    this.action = data.action;
    this.openDialog();
  }

  openDialog() {
    const dialogRef = this.dialog.open(CenterDialogComponent, {
      width: '350px',
      data: {
        centerId: this.centerId,
        name: this.name,
        shortcut: this.shortcut,
        action: this.action,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        switch (result.action) {
          case 'add':
            this._centerSrv
              .addCenter({ name: result.name, shortcut: result.shortcut })
              .subscribe(
                (res) => {
                  this._snackBar.open('Podmiot został utworzony', '', {
                    duration: 5000,
                    verticalPosition: 'top',
                    horizontalPosition: 'right',
                    panelClass: ['green-snackbar'],
                  });
                },
                (error) => {
                  this._snackBar.open('Błąd podczas tworzenia podmiotu', '', {
                    duration: 5000,
                    verticalPosition: 'top',
                    horizontalPosition: 'right',
                    panelClass: ['red-snackbar'],
                  });
                },
                () => {
                  this.getCenters();
                }
              );
            break;
          case 'edit':
            this._centerSrv
              .editCenter({
                centerId: result.centerId,
                name: result.name,
                shortcut: result.shortcut,
              })
              .subscribe(
                (res) => {
                  this._snackBar.open('Podmiot został edytowany', '', {
                    duration: 5000,
                    verticalPosition: 'top',
                    horizontalPosition: 'right',
                    panelClass: ['green-snackbar'],
                  });
                },
                (error) => {
                  this._snackBar.open('Błąd podczas edycji podmiotu', '', {
                    duration: 5000,
                    verticalPosition: 'top',
                    horizontalPosition: 'right',
                    panelClass: ['red-snackbar'],
                  });
                },
                () => {
                  this.getCenters();
                }
              );
            break;
          case 'delete':
            this._centerSrv
              .deleteCenter({ centerId: result.centerId })
              .subscribe(
                (res) => {
                  this._snackBar.open('Podmiot został usunięty', '', {
                    duration: 5000,
                    verticalPosition: 'top',
                    horizontalPosition: 'right',
                    panelClass: ['green-snackbar'],
                  });
                },
                (error) => {
                  this._snackBar.open('Błąd podczas usuwania podmiotu', '', {
                    duration: 5000,
                    verticalPosition: 'top',
                    horizontalPosition: 'right',
                    panelClass: ['red-snackbar'],
                  });
                },
                () => {
                  this.getCenters();
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
  selector: 'app-center-dialog',
  templateUrl: './center-dialog.component.html',
})
export class CenterDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CenterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
