import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MobileInfoPanelComponent } from './mobile-info-panel/mobile-info-panel.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'failte-ireland-map-app';

  get isLargeScreen(): boolean {
    return window.innerWidth > 960;
  }

  constructor(private _bottomSheet: MatBottomSheet) {}

  openBottomSheet(): void {
    this._bottomSheet.open(MobileInfoPanelComponent);
  }
}
