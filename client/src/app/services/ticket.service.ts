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

  createTicket(ticket: any) {
    return this.http.post<any>(this._ip + '/create-ticket', ticket);
  }

  getNewestTicketsForCenter(center: any) {
    return this.http.post<any>(this._ip + '/newest-tickets-for-center', center);
  }
}
