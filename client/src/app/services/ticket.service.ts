import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  getNewestTicketsForCenter(center: any): Observable<any> {
    return this.http.post<any>(this._ip + '/newest-tickets-for-center', center);
  }

  getConfirmedTicketsForCenter(data: any): Observable<any> {
    return this.http.post<any>(
      this._ip + '/confirmed-tickets-for-center',
      data
    );
  }

  getCalledTicketForOffice(office: any) {
    return this.http.post<any>(this._ip + '/called-ticket-for-office', office);
  }

  confirmTicket(ticket: any) {
    return this.http.post<any>(this._ip + '/confirm-ticket', ticket);
  }

  deleteTicket(ticket: any) {
    return this.http.post<any>(this._ip + '/delete-ticket', ticket);
  }

  callTicket(ticket: any) {
    return this.http.post<any>(this._ip + '/call-ticket', ticket);
  }

  serviceTicket(ticket: any) {
    return this.http.post<any>(this._ip + '/service-ticket', ticket);
  }

  serviceTicketAndBreak(ticket: any) {
    return this.http.post<any>(this._ip + '/service-ticket-and-break', ticket);
  }
}
