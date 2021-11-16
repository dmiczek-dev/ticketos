import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private _ip = environment.api_address;
  _filterByGenre: string[];

  private filterByGenreSource = new Subject<any>();
  filterByGenreObservable = this.filterByGenreSource.asObservable();

  constructor(private http: HttpClient) {}

  get filterByGenre() {
    return this._filterByGenre;
  }
  set filterByGenre(value) {
    this._filterByGenre = value;
    this.filterByGenreSource.next(value);
  }

  getLiveTickets() {
    return this.http.get<any>(this._ip + '/live-tickets');
  }

  createTicket(ticket: any) {
    return this.http.post<any>(this._ip + '/create-ticket', ticket);
  }

  getNewestTicketsForCenter(center: any): Observable<any> {
    return this.http.post<any>(this._ip + '/newest-tickets-for-center', center);
  }

  confirmTicket(ticket: any) {
    return this.http.post<any>(this._ip + '/confirm-ticket', ticket);
  }

  deleteTicket(ticket: any) {
    return this.http.post<any>(this._ip + '/delete-ticket', ticket);
  }
}
