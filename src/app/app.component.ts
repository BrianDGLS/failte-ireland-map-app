import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

import { ScreenSizeService } from './screen-size.service';
import { MobileInfoPanelComponent } from './mobile-info-panel/mobile-info-panel.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  get isLargeScreen(): boolean {
    return this.screenSizeService.isLargeScreen;
  }

  constructor(
    private readonly $bottomSheet: MatBottomSheet,
    private readonly screenSizeService: ScreenSizeService
  ) {}

  openBottomSheet(): void {
    this.$bottomSheet.open(MobileInfoPanelComponent);
  }
}
