import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private _ip = environment.api_address;

  constructor(private http: HttpClient) {}

  refreshScreens() {
    return this.http.get<any>(this._ip + '/refresh-screens');
  }
}
