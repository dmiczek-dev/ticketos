import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from 'src/app/components/panel/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardComponent } from '../components/panel/dashboard/dashboard.component';
import { SharedModule } from './shared.module';
import { PanelComponent } from '../layouts/panel/panel.component';
import { RouterModule } from '@angular/router';
import {
  CenterComponent,
  CenterDialogComponent,
} from '../components/panel/center/center.component';
import {
  OfficeComponent,
  OfficeDialogComponent,
} from '../components/panel/office/office.component';
import { TicketComponent } from '../components/panel/ticket/ticket.component';

@NgModule({
  declarations: [
    PanelComponent,
    LoginComponent,
    DashboardComponent,
    CenterComponent,
    CenterDialogComponent,
    OfficeComponent,
    OfficeDialogComponent,
    TicketComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    FlexLayoutModule,
    SharedModule,
    RouterModule,
  ],
})
export class PanelModule {}
