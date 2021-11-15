import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CenterComponent } from './components/panel/center/center.component';
import { DashboardComponent } from './components/panel/dashboard/dashboard.component';
import { LabComponent } from './components/panel/lab/lab.component';
import { LiveTicketComponent } from './components/panel/live-ticket/live-ticket.component';
import { LoginComponent } from './components/panel/login/login.component';
import { OfficeConfigComponent } from './components/panel/office-config/office-config.component';
import { OfficeComponent } from './components/panel/office/office.component';
import { PrinterSettingCreateComponent } from './components/panel/printer-setting-create/printer-setting-create.component';
import { PrinterSettingEditComponent } from './components/panel/printer-setting-edit/printer-setting-edit.component';
import { PrinterSettingsComponent } from './components/panel/printer-settings/printer-settings.component';
import { TicketTypeComponent } from './components/panel/ticket-type/ticket-type.component';
import { RegisterPanelComponent } from './components/portable/register-panel/register-panel.component';
import { TicketComponent } from './components/portable/ticket/ticket.component';
import { KioskComponent } from './layouts/kiosk/kiosk.component';
import { PanelComponent } from './layouts/panel/panel.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'zaloguj',
    pathMatch: 'full',
  },
  {
    path: 'zaloguj',
    component: LoginComponent,
  },
  {
    path: 'panel',
    component: PanelComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      { path: 'podmioty-medyczne', component: CenterComponent },
      {
        path: 'gabinety',
        component: OfficeComponent,
      },
      { path: 'gabinety/:id', component: OfficeConfigComponent },
      { path: 'rodzaje-biletow', component: TicketTypeComponent },
      { path: 'pracownie', component: LabComponent },
      { path: 'ustawienia-wydruku', component: PrinterSettingsComponent },
      {
        path: 'ustawienia-wydruku/utworz',
        component: PrinterSettingCreateComponent,
      },
      {
        path: 'ustawienia-wydruku/:id',
        component: PrinterSettingEditComponent,
      },
      { path: 'bilety-live', component: LiveTicketComponent },
    ],
  },
  {
    path: 'kiosk/:centerId',
    component: KioskComponent,
    children: [
      {
        path: 'pobierz-bilet',
        component: TicketComponent,
      },
    ],
  },
  {
    path: 'widok',
    children: [
      {
        path: 'panel-rejestracja/:officeId',
        component: RegisterPanelComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
