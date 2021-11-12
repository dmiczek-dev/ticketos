import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PrinterSettingService {
  private _ip = environment.api_address;

  constructor(private http: HttpClient) {}

  getPrinterSettings() {
    return this.http.get<any>(this._ip + '/printer-settings');
  }

  getPrinterSettingById(printerSettingId: number) {
    return this.http.get<any>(
      this._ip + '/printer-settings/' + printerSettingId
    );
  }

  addPrinterSetting(printerSetting: any) {
    return this.http.post<any>(
      this._ip + '/create-printer-setting',
      printerSetting
    );
  }

  editPrinterSetting(printerSetting: any) {
    return this.http.post<any>(
      this._ip + '/edit-printer-setting',
      printerSetting
    );
  }

  deletePrinterSetting(printerSetting: any) {
    return this.http.post<any>(
      this._ip + '/delete-printer-setting',
      printerSetting
    );
  }
}
