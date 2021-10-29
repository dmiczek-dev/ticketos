import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/header/header.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [HeaderComponent, SidebarComponent, FooterComponent],
  imports: [CommonModule, MaterialModule],
  exports: [HeaderComponent, SidebarComponent, FooterComponent],
})
export class SharedModule {}
