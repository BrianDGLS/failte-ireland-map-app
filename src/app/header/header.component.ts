import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { HelpBarComponent } from '../help-bar/help-bar.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  durationInSeconds = 5;

  constructor(private _helpBar: MatSnackBar) {}

  openHelpBar() {
    this._helpBar.openFromComponent(HelpBarComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }
}
