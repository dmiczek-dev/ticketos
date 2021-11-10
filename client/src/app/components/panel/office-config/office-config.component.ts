import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketTypeService } from 'src/app/services/ticket-type.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-office-config',
  templateUrl: './office-config.component.html',
  styleUrls: ['./office-config.component.scss'],
})
export class OfficeConfigComponent implements OnInit {
  officeId: any;
  pinnedTicketTypes: any;
  unpinnedTicketTypes: any;

  constructor(
    private route: ActivatedRoute,
    private _ticketTypesSrv: TicketTypeService
  ) {}

  ngOnInit(): void {
    this.officeId = this.route.snapshot.paramMap.get('id');
    this.getPinnedTicketTypes();
    this.getUnpinnedTicketTypes();
  }

  getPinnedTicketTypes() {
    this._ticketTypesSrv
      .getPinnedTicketTypesByOfficeId({ officeId: this.officeId })
      .subscribe((res) => {
        console.log(res);

        this.pinnedTicketTypes = res;
      });
  }

  getUnpinnedTicketTypes() {
    this._ticketTypesSrv
      .getUnpinnedTicketTypesByOfficeId({ officeId: this.officeId })
      .subscribe((res) => {
        this.unpinnedTicketTypes = res;
      });
  }

  drop(event: CdkDragDrop<string[]>, action: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      const data = JSON.parse(
        JSON.stringify(event.container.data[event.currentIndex])
      );
      if (action === 'update') {
        this._ticketTypesSrv
          .optimizeSequenceInOffice({
            officeId: this.officeId,
            ticketTypeId: data.ticketTypeId,
            sequence: event.currentIndex,
            prevSequence: event.previousIndex,
          })
          .subscribe();
      }
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      const data = JSON.parse(
        JSON.stringify(event.container.data[event.currentIndex])
      );
      if (action === 'update') {
        this._ticketTypesSrv
          .addTicketTypeToOffice({
            officeId: this.officeId,
            ticketTypeId: data.ticketTypeId,
            sequence: event.currentIndex,
          })
          .subscribe();
      }
      if (action === 'delete') {
        this._ticketTypesSrv
          .removeTicketTypeFromOffice({
            officeId: this.officeId,
            ticketTypeId: data.ticketTypeId,
            sequence: event.previousIndex,
          })
          .subscribe();
      }
    }
  }
}
