import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TicketService } from 'src/app/services/ticket.service';

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
    'office',
    'center',
  ];

  tickets = [];
  dataSource = new MatTableDataSource<any>();
  private socket: any;

  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.getLiveTickets();
  }

  ngOnDestroy(): void {
    this.socket.removeAllListeners();
  }

  ngAfterViewInit(): void {
    this.socket.on('subscribe', () => {});
    this.socket.on('refreshTicketQueue', () => {
      this.getLiveTickets();
    });
  }

  getLiveTickets() {
    this.ticketService.getLiveTickets().subscribe(
      (res) => {
        this.dataSource.data = res;
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
