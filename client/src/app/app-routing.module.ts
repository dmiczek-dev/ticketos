import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CenterComponent } from './components/panel/center/center.component';
import { DashboardComponent } from './components/panel/dashboard/dashboard.component';
import { LabComponent } from './components/panel/lab/lab.component';
import { LoginComponent } from './components/panel/login/login.component';
import { OfficeConfigComponent } from './components/panel/office-config/office-config.component';
import { OfficeComponent } from './components/panel/office/office.component';
import { TicketTypeComponent } from './components/panel/ticket-type/ticket-type.component';
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
