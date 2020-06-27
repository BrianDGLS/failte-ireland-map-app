import * as Projection from 'ol/proj';
import { Component, Input, AfterViewInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

import { Attraction } from '../attraction';
import { MapService } from '../map.service';
import { AppComponent } from '../app.component';
import { MobileMenuService } from '../mobile-menu.service';
import { ScreenSizeService } from '../screen-size.service';

@Component({
  selector: 'app-attraction-card',
  templateUrl: './attraction-card.component.html',
  styleUrls: ['./attraction-card.component.scss'],
})
export class AttractionCardComponent implements AfterViewInit {
  @Input() image: string;
  @Input() description: string;
  @Input() attraction: Attraction;

  public mobileMenuRef: MatBottomSheetRef<AppComponent>;

  get smallScreen(): boolean {
    return this.screenSizeService.isSmallScreen;
  }

  get largeScreen(): boolean {
    return this.screenSizeService.isLargeScreen;
  }

  constructor(
    private readonly mapService: MapService,
    private readonly mobileMenuService: MobileMenuService,
    private readonly screenSizeService: ScreenSizeService
  ) {}

  ngAfterViewInit() {
    this.mobileMenuService.mobileMenuRef$.subscribe((ref) => {
      this.mobileMenuRef = ref;
    });
  }

  public viewAttractionOnMap(attraction: Attraction) {
    this.mapService.viewAttractionOnMap(attraction);

    if (this.screenSizeService.isSmallScreen && this.mobileMenuRef) {
      this.mobileMenuRef.dismiss();
    }
  }

  public concatenatedURL(attraction: Attraction): string {
    const { Url } = attraction;
    const maxLength = this.smallScreen ? 25 : 30;
    return Url.length > maxLength ? Url.slice(0, maxLength) + '...' : Url;
  }
}
