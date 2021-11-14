import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private _ip = environment.api_address;

  constructor(private http: HttpClient) {}

  getLiveTickets() {
    return this.http.get<any>(this._ip + '/live-tickets');
  }
}
