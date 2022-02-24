import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SomedService {

  constructor(private http: HttpClient) {}

  private _ip = environment.oracle_api_address;

  getScheduleByOffice(data: any) {
    return this.http.post<any>(this._ip + '/schedule', data);
  }

}
