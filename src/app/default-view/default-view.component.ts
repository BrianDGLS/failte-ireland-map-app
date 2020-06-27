import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

import { ScreenSizeService } from '../screen-size.service';
import { MobileInfoPanelComponent } from '../mobile-info-panel/mobile-info-panel.component';

@Component({
  selector: 'app-default-view',
  templateUrl: './default-view.component.html',
  styleUrls: ['./default-view.component.scss'],
})
export class DefaultViewComponent {
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
