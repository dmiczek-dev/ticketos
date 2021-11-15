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
import { RegisterPanelComponent } from '../components/portable/register-panel/register-panel.component';

@NgModule({
  declarations: [
    KioskComponent,
    TicketComponent,
    PrintSectionDirective,
    RegisterPanelComponent,
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
