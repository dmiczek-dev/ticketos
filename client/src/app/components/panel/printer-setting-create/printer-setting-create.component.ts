import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CenterService } from 'src/app/services/center.service';
import { PrinterSettingService } from 'src/app/services/printer-setting.service';

@Component({
  selector: 'app-printer-setting-create',
  templateUrl: './printer-setting-create.component.html',
  styleUrls: ['./printer-setting-create.component.scss'],
})
export class PrinterSettingCreateComponent implements OnInit {
  printerSettings = {
    title: '',
    subtitle: '',
    statement: '',
    centerId: null,
  };
  today: Date | undefined;
  centers: any[] = [];

  constructor(
    private _printerSettingsSrv: PrinterSettingService,
    private _centerSrv: CenterService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.today = new Date();
    this.getCenters();
  }

  getCenters() {
    this._centerSrv.getCenters().subscribe((res) => {
      this.centers = res;
    });
  }

  onSubmit() {
    this._printerSettingsSrv.addPrinterSetting(this.printerSettings).subscribe(
      (res) => {
        this._snackBar.open('Ustawienia zostały dodane', '', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: ['green-snackbar'],
        });
      },
      (error) => {
        this._snackBar.open('Błąd podczas dodawania ustawień', '', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: ['red-snackbar'],
        });
      }
    );
  }
}
