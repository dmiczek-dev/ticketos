import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TicketService } from 'src/app/services/ticket.service';
import { environment } from 'src/environments/environment';
import io from 'socket.io-client';

@Component({
  selector: 'app-live-ticket',
  templateUrl: './live-ticket.component.html',
  styleUrls: ['./live-ticket.component.scss'],
})
export class LiveTicketComponent implements OnInit {
  displayedColumns: string[] = [
    'numberAndMark',
    'printDate',
    'confirmDate',
    'callDate',
    'officeName',
    'centerName',
  ];

  tickets = [];
  dataSource = new MatTableDataSource<any>();
  private socket: any;

  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.socket = io(environment.socket_address);
    this.getLiveTickets();
  }

  ngOnDestroy(): void {
    this.socket.removeAllListeners();
  }

  ngAfterViewInit(): void {
    this.socket.on('reloadConfirmedTickets', () => {
      this.getLiveTickets();
    });
    this.socket.on('reloadCalledTickets', () => {
      this.getLiveTickets();
    });
    this.socket.on('reloadNewestTickets', () => {
      this.getLiveTickets();
    });
    this.socket.on('refreshScreens', () => {
      window.location.reload();
    });
  }

  getLiveTickets() {
    this.ticketService.getLiveTickets().subscribe(
      (res) => {
        this.dataSource.data = res;
        console.log(res);
      },
      (error) => {
        console.log(error);
      },
      () => {
        this.dataSource.paginator = this.paginator;
      }
    );
  }
}
