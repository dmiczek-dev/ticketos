import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SomedOfficeComponent } from '../components/somed/somed-office/somed-office.component';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxMarqueeModule } from 'ngx-marquee';
import { SomedMultiqueueComponent } from '../components/somed/somed-multiqueue/somed-multiqueue.component';



@NgModule({
  declarations: [
    SomedOfficeComponent,
    SomedMultiqueueComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    NgxMarqueeModule
  ]
})
export class SomedModule { }
