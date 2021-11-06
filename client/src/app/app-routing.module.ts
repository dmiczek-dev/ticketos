import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CenterComponent } from './components/panel/center/center.component';
import { DashboardComponent } from './components/panel/dashboard/dashboard.component';
import { LoginComponent } from './components/panel/login/login.component';
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
