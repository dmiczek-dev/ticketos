import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared.module';
import { TicketComponent } from '../components/portable/ticket/ticket.component';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { KioskComponent } from '../layouts/kiosk/kiosk.component';
import { PrintSectionDirective } from '../directives/print-section.directive';
import {
  ConfirmDialogComponent,
  RegisterPanelComponent,
} from '../components/portable/register-panel/register-panel.component';
import { TicketService } from '../services/ticket.service';
import { OfficePanelComponent } from '../components/portable/office-panel/office-panel.component';
import { OfficeViewComponent } from '../components/portable/office-view/office-view.component';

@NgModule({
  declarations: [
    KioskComponent,
    TicketComponent,
    PrintSectionDirective,
    RegisterPanelComponent,
    ConfirmDialogComponent,
    OfficePanelComponent,
    OfficeViewComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    FlexLayoutModule,
    SharedModule,
    RouterModule,
  ],
})
export class PortableModule {}
