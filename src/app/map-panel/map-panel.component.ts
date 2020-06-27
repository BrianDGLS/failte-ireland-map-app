import {
  OnInit,
  ViewChild,
  Component,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import slugify from 'slugify';
import { Location } from '@angular/common';

import { Attraction } from '../attraction';
import { MapService } from '../map.service';
import { ScreenSizeService } from '../screen-size.service';

@Component({
  selector: 'app-map-panel',
  templateUrl: './map-panel.component.html',
  styleUrls: ['./map-panel.component.scss'],
})
export class MapPanelComponent implements AfterViewInit, OnInit {
  @ViewChild('popup') $popup: ElementRef;

  public attraction: Attraction;

  get showButtonControls(): boolean {
    return this.screenSizeService.isSmallScreen;
  }

  constructor(
    private readonly location: Location,
    private readonly mapService: MapService,
    private readonly screenSizeService: ScreenSizeService
  ) {}

  ngOnInit() {
    this.mapService.selectedFeature$.subscribe((feature) => {
      this.attraction = feature ? feature.get('attraction') : undefined;

      if (this.attraction) {
        this.location.replaceState(slugify(this.attraction.Name));
      } else {
        this.location.replaceState('/');
      }
    });
  }

  async ngAfterViewInit(): Promise<void> {
    const slug = slugify(this.location.path());
    await this.mapService.createMap(this.$popup, slug);
  }

  closePopup() {
    this.mapService.selectedFeature$.next();
  }

  share(attraction: Attraction) {}
}
