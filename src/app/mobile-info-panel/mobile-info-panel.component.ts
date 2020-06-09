import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-mobile-info-panel',
  templateUrl: './mobile-info-panel.component.html',
  styleUrls: ['./mobile-info-panel.component.scss'],
})
export class MobileInfoPanelComponent {
  constructor(private _bottomSheetRef: MatBottomSheetRef<AppComponent>) {}

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
