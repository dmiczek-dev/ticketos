import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/header/header.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { KioskSidebarComponent } from '../shared/kiosk-sidebar/kiosk-sidebar.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    KioskSidebarComponent,
  ],
  imports: [CommonModule, MaterialModule, FlexLayoutModule, RouterModule],
  exports: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    KioskSidebarComponent,
  ],
})
export class SharedModule {}
