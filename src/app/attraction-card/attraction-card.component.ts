import { Component, Input, AfterViewInit } from '@angular/core';

import * as Projection from 'ol/proj';

import { Attraction } from '../attraction';
import { MapService } from '../map.service';
import { AppComponent } from '../app.component';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
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
    const { Name } = attraction;
    const { map, features } = this.mapService;
    const feature = features.getArray().find((feature) => {
      return feature.get('attraction').Name === Name;
    });

    const view = map.getView();
    const { Latitude, Longitude } = attraction;
    const center = Projection.fromLonLat([Longitude, Latitude]);

    view.setCenter(center);
    view.setZoom(10);

    this.mapService.selectedFeature$.next(feature);

    if (this.screenSizeService.isSmallScreen && this.mobileMenuRef) {
      this.mobileMenuRef.dismiss();
    }
  }
}
