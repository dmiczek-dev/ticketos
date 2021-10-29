import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
})
export class PanelComponent implements OnInit {
  sideBarVisible = true;

  constructor() {}

  ngOnInit(): void {}

  sideBarToggler(event: any) {
    this.sideBarVisible = !this.sideBarVisible;
  }
}
