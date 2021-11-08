import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CenterComponent } from './components/panel/center/center.component';
import { DashboardComponent } from './components/panel/dashboard/dashboard.component';
import { LoginComponent } from './components/panel/login/login.component';
import { OfficeComponent } from './components/panel/office/office.component';
import { TicketComponent } from './components/panel/ticket/ticket.component';
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
      { path: 'gabinety', component: OfficeComponent },
      { path: 'rodzaje-biletow', component: TicketComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
