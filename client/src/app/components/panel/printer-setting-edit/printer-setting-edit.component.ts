import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CenterService } from 'src/app/services/center.service';
import { PrinterSettingService } from 'src/app/services/printer-setting.service';

@Component({
  selector: 'app-printer-setting-edit',
  templateUrl: './printer-setting-edit.component.html',
  styleUrls: ['./printer-setting-edit.component.scss'],
})
export class PrinterSettingEditComponent implements OnInit {
  today: Date | undefined;
  centers: any[] = [];
  printerSettings = {
    id: 0,
    title: '',
    subtitle: '',
    statement: '',
    centerId: 0,
  };

  constructor(
    private _route: ActivatedRoute,
    private _printerSettingSrv: PrinterSettingService,
    private _centerSrv: CenterService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.printerSettings.id = parseInt(
      this._route.snapshot.paramMap.get('id')!
    );

    this.today = new Date();
    this.getPrinterSettingById(this.printerSettings.id);
    this.getCenters();
  }

  getPrinterSettingById(id: number) {
    this._printerSettingSrv.getPrinterSettingById(id).subscribe((res) => {
      this.printerSettings = res[0];
      console.log(this.printerSettings);
    });
  }

  getCenters() {
    this._centerSrv.getCenters().subscribe((res) => {
      this.centers = res;
    });
  }

  //TODO: zapisywanie do bazy
  onSubmit() {
    this._printerSettingSrv.editPrinterSetting(this.printerSettings).subscribe(
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
