import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LabService {
  private _ip = environment.api_address;

  constructor(private http: HttpClient) {}

  getLabs() {
    return this.http.get<any>(this._ip + '/labs');
  }

  addLab(lab: any) {
    return this.http.post<any>(this._ip + '/create-lab', lab);
  }

  editLab(lab: any) {
    return this.http.post<any>(this._ip + '/edit-lab', lab);
  }

  deleteLab(lab: any) {
    return this.http.post<any>(this._ip + '/delete-lab', lab);
  }
}
