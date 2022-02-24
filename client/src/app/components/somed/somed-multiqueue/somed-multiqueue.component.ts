import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Multiqueue } from '../multiqueue.model';
import io from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { GoogleService } from 'src/app/services/google.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SomedService } from 'src/app/services/somed.service';

@Component({
  selector: 'app-somed-multiqueue',
  templateUrl: './somed-multiqueue.component.html',
  styleUrls: ['./somed-multiqueue.component.scss'],
})
export class SomedMultiqueueComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  today: Date;
  timerInterval: any;
  room: string;
  marqueeList: string[];
  ticketList: any[];
  settings = {
    audio: true
  }
  textToSpeech: any;
  res: any;
  audioList: any[];
  isSpeaking = false;
  somedQueue:any [];

  private socket: any;

  constructor(public _route: ActivatedRoute, private somedService: SomedService, private cdr:ChangeDetectorRef, private googleService: GoogleService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.socket = io(environment.oracleSocketAddress);

    this.timerInterval = setInterval(() => {
      this.today = new Date();
    }, 1000);

    this.marqueeList = [
      'May be... but',
      'you can organically update the marquee on the fly!',
      "Why don't you try...",
      "Press 'Add message' button",
    ];
    this.room = this._route.snapshot.paramMap.get('room')!.toUpperCase();

    // this.somedService
    //   .getSettingsByCenter(this.multiQueueData.center)
    //   .subscribe((res) => {
    //     this.settings = res[0] ? res[0] : [];
    //     this.settingsLoaded = Promise.resolve(true);
    //   });

  }

  ngOnDestroy(): void {
    clearInterval(this.timerInterval);
  }

  ngAfterViewInit(): void {
    this.socket.on('reloadSomedTickets', (data: any) => {
      this.ticketList = data.filter((el: any) => el.room === this.room);

      // Dopasowanie aktualnego i kolejnego do jednego rekordu
      const filteredList = this.ticketList.filter(
        (item, index, self) =>
          // Usuwanie duplikatów i uzupełnianie kolejnego
          index ===
          self.findIndex((el) => {
            if (el.doctor === item.doctor) {
              if (el.next === null && item.next !== null) {
                el.next = item.next;
              }
              if (el.current === null && item.current !== null) {
                el.current = item.current;
              }
              return true;
            } else return false;
          })
      );

      console.log(filteredList)

      if (this.settings.audio) {
        const speechList = [];
        for (const tl of this.ticketList) {
          for (const fl of filteredList) {
            if (
              tl.doctor === fl.doctor &&
              tl.active !== fl.active &&
              fl.active
            ) {
              speechList.push({ active: fl.active, office: fl.office });
            }
          }
        }

        for (const speech of speechList) {
          // this.googleSpeech(speech);
          const textToSpeech = `Zapraszamy pacjenta z biletem o kodzie. ${speech.active},
          do gabinetu numer, ${speech.office}`;

          this.googleService.googleSpeech(textToSpeech).subscribe((data:any) => {
            console.log(speech);
            if (!this.isSpeaking) {
              this.res = this.sanitizer.bypassSecurityTrustResourceUrl(
                'data:audio/mp3;base64,' + data['audioContent']
              );
              this.isSpeaking = true;
            }
            this.audioList.push(
              this.sanitizer.bypassSecurityTrustResourceUrl(
                'data:audio/mp3;base64,' + data['audioContent']
              )
            );
          });
        }
      }

      this.somedQueue = filteredList;
      const element = {
        doctor: 'lek. MAŁGORZATA MACHOWSKA',
        office: 20,
        current: '0bcd',
        next: '0abc'
      }
      for(let i=0; i<2; i++) {
        this.somedQueue.push(element)
      }


      this.cdr.detectChanges();
    });
  }

  audioEnded() {
    this.res = undefined;
    this.cdr.detectChanges();
    this.audioList.shift();
    if (this.audioList.length > 0) {
      this.res = this.audioList[0];
    } else {
      this.isSpeaking = false;
    }
  }
}
