import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './components/panel/dashboard/dashboard.component';
import { LoginComponent } from './components/panel/login/login.component';
import { PanelComponent } from './layouts/panel/panel.component';

const routes: Routes = [
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
