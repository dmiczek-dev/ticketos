import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OfficeService {
  private _ip = environment.api_address;

  constructor(private http: HttpClient) {}

  getOffices() {
    return this.http.get<any>(this._ip + '/offices');
  }

  getOfficeById(id: number) {
    return this.http.get<any>(this._ip + '/offices/' + id);
  }

  addOffice(office: any) {
    return this.http.post<any>(this._ip + '/create-office', office);
  }

  editOffice(office: any) {
    return this.http.post<any>(this._ip + '/edit-office', office);
  }

  deleteOffice(office: any) {
    return this.http.post<any>(this._ip + '/delete-office', office);
  }
}
