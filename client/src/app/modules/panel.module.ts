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
import {
  TicketTypeComponent,
  TicketTypeDialogComponent,
} from '../components/panel/ticket-type/ticket-type.component';
import { OfficeConfigComponent } from '../components/panel/office-config/office-config.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {
  LabComponent,
  LabDialogComponent,
} from '../components/panel/lab/lab.component';
import {
  PrinterSettingDialogComponent,
  PrinterSettingsComponent,
} from '../components/panel/printer-settings/printer-settings.component';
import { PrinterSettingCreateComponent } from '../components/panel/printer-setting-create/printer-setting-create.component';
import { PrinterSettingEditComponent } from '../components/panel/printer-setting-edit/printer-setting-edit.component';
import { LiveTicketComponent } from '../components/panel/live-ticket/live-ticket.component';

@NgModule({
  declarations: [
    PanelComponent,
    LoginComponent,
    DashboardComponent,
    CenterComponent,
    CenterDialogComponent,
    OfficeComponent,
    OfficeDialogComponent,
    OfficeConfigComponent,
    TicketTypeComponent,
    TicketTypeDialogComponent,
    LabComponent,
    LabDialogComponent,
    PrinterSettingsComponent,
    PrinterSettingDialogComponent,
    PrinterSettingCreateComponent,
    PrinterSettingEditComponent,
    LiveTicketComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    FlexLayoutModule,
    SharedModule,
    RouterModule,
    DragDropModule,
  ],
})
export class PanelModule {}
