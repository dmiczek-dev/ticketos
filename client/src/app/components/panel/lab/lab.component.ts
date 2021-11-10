import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CenterService } from 'src/app/services/center.service';
import { LabService } from 'src/app/services/lab.service';
import { OfficeDialogComponent } from '../office/office.component';

export interface DialogData {
  labId: number;
  name: string;
  description: string;
  centerId: number;
  centers: any;
  action: string;
}

@Component({
  selector: 'app-lab',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.scss'],
})
export class LabComponent implements OnInit {
  labs = [];
  centers = [];
  action: string | undefined;
  name: string | undefined;
  description: boolean | undefined;
  labId: number | undefined;
  centerId: number | undefined;

  displayedColumns: string[] = [
    'labId',
    'name',
    'description',
    'centerId',
    'options',
  ];

  constructor(
    private _centerSrv: CenterService,
    private _labSrv: LabService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getLabs();
    this.getCenters();
  }

  getLabs() {
    this._labSrv.getLabs().subscribe((res) => {
      this.labs = res;
    });
  }

  getCenters() {
    this._centerSrv.getCenters().subscribe((res) => {
      this.centers = res;
    });
  }

  addLab(data: any) {
    this.labId = undefined;
    this.name = undefined;
    this.description = undefined;
    this.centerId = undefined;
    this.action = data.action;
    this.openDialog();
  }
  editLab(data: any) {
    this.labId = data.labId;
    this.name = data.name;
    this.description = data.description;
    this.centerId = data.centerId;
    this.action = data.action;
    this.openDialog();
  }
  deleteLab(data: any) {
    this.labId = data.labId;
    this.action = data.action;
    this.openDialog();
  }

  openDialog() {
    const dialogRef = this.dialog.open(LabDialogComponent, {
      width: '350px',
      data: {
        labId: this.labId,
        name: this.name,
        description: this.description,
        centerId: this.centerId,
        action: this.action,
        centers: this.centers,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        switch (result.action) {
          case 'add':
            this._labSrv
              .addLab({
                name: result.name,
                description: result.description,
                centerId: result.centerId,
              })
              .subscribe(
                (res) => {
                  this._snackBar.open('Pracownia został utworzona', '', {
                    duration: 5000,
                    verticalPosition: 'top',
                    horizontalPosition: 'right',
                    panelClass: ['green-snackbar'],
                  });
                },
                (error) => {
                  this._snackBar.open('Błąd podczas tworzenia pracowni', '', {
                    duration: 5000,
                    verticalPosition: 'top',
                    horizontalPosition: 'right',
                    panelClass: ['red-snackbar'],
                  });
                },
                () => {
                  this.getLabs();
                }
              );
            break;
          case 'edit':
            this._labSrv
              .editLab({
                labId: result.labId,
                name: result.name,
                description: result.description,
                centerId: result.centerId,
              })
              .subscribe(
                (res) => {
                  this._snackBar.open('Pracownia została edytowana', '', {
                    duration: 5000,
                    verticalPosition: 'top',
                    horizontalPosition: 'right',
                    panelClass: ['green-snackbar'],
                  });
                },
                (error) => {
                  this._snackBar.open('Błąd podczas edycji pracowni', '', {
                    duration: 5000,
                    verticalPosition: 'top',
                    horizontalPosition: 'right',
                    panelClass: ['red-snackbar'],
                  });
                },
                () => {
                  this.getLabs();
                }
              );
            break;
          case 'delete':
            this._labSrv.deleteLab({ labId: result.labId }).subscribe(
              (res) => {
                this._snackBar.open('Pracownia została usunięta', '', {
                  duration: 5000,
                  verticalPosition: 'top',
                  horizontalPosition: 'right',
                  panelClass: ['green-snackbar'],
                });
              },
              (error) => {
                this._snackBar.open('Błąd podczas usuwania pracowni', '', {
                  duration: 5000,
                  verticalPosition: 'top',
                  horizontalPosition: 'right',
                  panelClass: ['red-snackbar'],
                });
              },
              () => {
                this.getLabs();
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
  selector: 'app-lab-dialog',
  templateUrl: './lab-dialog.component.html',
})
export class LabDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<LabDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
