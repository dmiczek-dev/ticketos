import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PrinterSettingService } from 'src/app/services/printer-setting.service';

export interface DialogData {
  printerSettingId: number;
}

@Component({
  selector: 'app-printer-settings',
  templateUrl: './printer-settings.component.html',
  styleUrls: ['./printer-settings.component.scss'],
})
export class PrinterSettingsComponent implements OnInit {
  printerSettings = [];
  printerSettingId: number | undefined;

  displayedColumns: string[] = [
    'printerSettingId',
    'title',
    'subtitle',
    'statement',
    'options',
  ];

  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _printerSettingSrv: PrinterSettingService
  ) {}

  ngOnInit(): void {
    this.getPrinterSettings();
  }

  getPrinterSettings() {
    this._printerSettingSrv.getPrinterSettings().subscribe((res) => {
      this.printerSettings = res;
    });
  }

  deletePrinterSetting(data: any) {
    this.printerSettingId = data.printerSettingId;
    this.openDialog();
  }

  openDialog() {
    const dialogRef = this.dialog.open(PrinterSettingDialogComponent, {
      width: '350px',
      data: {
        printerSettingId: this.printerSettingId,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._printerSettingSrv
          .deletePrinterSetting({
            centprinterSettingIderId: result.printerSettingId,
          })
          .subscribe(
            (res) => {
              this._snackBar.open('Ustawienia zostały usunięte', '', {
                duration: 5000,
                verticalPosition: 'top',
                horizontalPosition: 'right',
                panelClass: ['green-snackbar'],
              });
            },
            (error) => {
              this._snackBar.open('Błąd podczas usuwania ustawień', '', {
                duration: 5000,
                verticalPosition: 'top',
                horizontalPosition: 'right',
                panelClass: ['red-snackbar'],
              });
            },
            () => {
              this.getPrinterSettings();
            }
          );
      }
    });
  }
}

// Dialog Component
@Component({
  selector: 'app-printer-setting-dialog',
  templateUrl: './printer-setting-dialog.component.html',
})
export class PrinterSettingDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<PrinterSettingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
