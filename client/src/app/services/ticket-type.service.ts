import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TicketTypeService {
  private _ip = environment.api_address;

  constructor(private http: HttpClient) {}

  getTicketTypes() {
    return this.http.get<any>(this._ip + '/ticket-types');
  }

  addTicketType(ticketType: any) {
    return this.http.post<any>(this._ip + '/create-ticket-type', ticketType);
  }

  editTicketType(ticketType: any) {
    return this.http.post<any>(this._ip + '/edit-ticket-type', ticketType);
  }

  deleteTicketType(ticketType: any) {
    return this.http.post<any>(this._ip + '/delete-ticket-type', ticketType);
  }

  //Tickets config for office
  getUnpinnedTicketTypesByOfficeId(officeId: any) {
    return this.http.post<any>(this._ip + '/unpinned-ticket-types', officeId);
  }

  getPinnedTicketTypesByOfficeId(officeId: any) {
    return this.http.post<any>(this._ip + '/pinned-ticket-types', officeId);
  }

  optimizeSequenceInOffice(data: any) {
    return this.http.post<any>(this._ip + '/optimize-sequence-in-office', data);
  }

  addTicketTypeToOffice(data: any) {
    return this.http.post<any>(this._ip + '/add-ticket-type-to-office', data);
  }

  removeTicketTypeFromOffice(data: any) {
    return this.http.post<any>(
      this._ip + '/remove-ticket-type-from-office',
      data
    );
  }

  getTicketTypesByCenterId(id: number) {
    return this.http.get<any>(this._ip + '/ticket-types-by-center/' + id);
  }
}
