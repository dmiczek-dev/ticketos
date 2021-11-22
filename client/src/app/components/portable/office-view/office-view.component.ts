import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { OfficeService } from 'src/app/services/office.service';
import { TicketService } from 'src/app/services/ticket.service';
import io from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { GoogleService } from 'src/app/services/google.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-office-view',
  templateUrl: './office-view.component.html',
  styleUrls: ['./office-view.component.scss'],
})
export class OfficeViewComponent implements OnInit, OnDestroy {
  today: Date | undefined;
  timerInterval: any;
  ticket: any;
  office: any;
  private socket: any;
  res: any;

  constructor(
    private _officeSrv: OfficeService,
    private _ticketSrv: TicketService,
    private _route: ActivatedRoute,
    private _googleSrv: GoogleService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.socket = io(environment.socket_address);
    this.timerInterval = setInterval(() => {
      this.today = new Date();
    }, 1000);

    this.office = parseInt(this._route.snapshot.paramMap.get('officeId')!);
    this.getOfficeById();
  }

  ngOnDestroy(): void {
    clearInterval(this.timerInterval);
  }

  ngAfterViewInit(): void {
    this.socket.on('reloadCalledTickets', () => {
      this.getCalledTicketForOffice();
    });
  }

  getOfficeById() {
    this._officeSrv
      .getOfficeById(
        parseInt(this._route.snapshot.paramMap.get('officeId')!, 10)
      )
      .subscribe(
        (res) => {
          this.office = res[0];
          console.log(this.office);
        },
        (error) => {
          console.log(error);
        },
        () => {
          this.getCalledTicketForOffice();
        }
      );
  }

  audioEnded() {
    this.res = undefined;
  }

  getCalledTicketForOffice() {
    this._ticketSrv
      .getCalledTicketForOffice({
        officeId: this.office.officeId,
      })
      .subscribe(
        (res) => {
          this.ticket = res[0];
        },
        (error) => console.log(error),
        () => {
          console.log('before-tts');
          if (this.ticket != undefined) {
            console.log('tts');
            const textToSpeech = `Zapraszamy pacjenta z biletem, ${
              this.ticket?.mark + this.ticket?.number
            }.`;

            this._googleSrv
              .googleSpeech(textToSpeech)
              .subscribe((data: any) => {
                this.res = this.sanitizer.bypassSecurityTrustResourceUrl(
                  'data:audio/mp3;base64,' + data['audioContent']
                );
              });
          }
        }
      );
  }
}
