import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

import { ScreenSizeService } from '../screen-size.service';
import { MobileInfoPanelComponent } from '../mobile-info-panel/mobile-info-panel.component';

@Component({
  selector: 'app-default-view',
  templateUrl: './default-view.component.html',
  styleUrls: ['./default-view.component.scss'],
})
export class DefaultViewComponent implements OnInit {
  get isLargeScreen(): boolean {
    return this.screenSizeService.isLargeScreen;
  }

  constructor(
    private route: ActivatedRoute,
    private readonly $bottomSheet: MatBottomSheet,
    private readonly screenSizeService: ScreenSizeService
  ) {}

  ngOnInit() {
    this.route.url.subscribe((update) => {
      if (update && update[0]) console.log(update[0].path);
    });
  }

  openBottomSheet(): void {
    this.$bottomSheet.open(MobileInfoPanelComponent);
  }
}
