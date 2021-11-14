import { Component, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-kiosk-sidebar',
  templateUrl: './kiosk-sidebar.component.html',
  styleUrls: ['./kiosk-sidebar.component.scss'],
})
export class KioskSidebarComponent implements OnInit {
  centerShortcut = null;
  constructor(private router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof ActivationEnd) {
        if (val.snapshot.params.shortcut !== undefined) {
          this.centerShortcut = val.snapshot.params.shortcut;
        }
      }
    });
  }

  ngOnInit(): void {}
}
