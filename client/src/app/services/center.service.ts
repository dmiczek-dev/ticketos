import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CenterService {
  private _ip = environment.api_address;

  constructor(private http: HttpClient) {}

  getCenters() {
    return this.http.get<any>(this._ip + '/centers');
  }

  addCenter(center: any) {
    return this.http.post<any>(this._ip + '/create-center', center);
  }

  editCenter(center: any) {
    return this.http.post<any>(this._ip + '/edit-center', center);
  }

  deleteCenter(center: any) {
    return this.http.post<any>(this._ip + '/delete-center', center);
  }
}
