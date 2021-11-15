import {
  AfterViewInit,
  Directive,
  HostBinding,
  OnDestroy,
} from '@angular/core';

@Directive({
  selector: '[print-section]',
})
export class PrintSectionDirective implements AfterViewInit, OnDestroy {
  @HostBinding('class.print-section') private printSection = true;
  private style!: HTMLStyleElement;

  constructor() {}

  public ngAfterViewInit() {
    this.style = document.createElement('style');
    this.style.type = 'text/css';
    this.style.innerText = `
    .print-section {
      display: none;
    }
    @media print {
      body * {
        visibility: hidden;
      }
      .print-section, .print-section * {
        display: block;
        visibility: visible;
      }
      .print-section {
          position:absolute !important;
          left:0 !important;
          top:0 !important;
          z-index: 100;
      }
    }`;
    document.head.appendChild(this.style);
  }

  public ngOnDestroy() {
    document.head.removeChild(this.style);
  }
}
