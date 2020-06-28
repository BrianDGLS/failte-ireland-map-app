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

  public shareClicked = false;

  share() {
    const nav = navigator as any;
    if (nav.share) {
      nav.share({
        title: document.title,
        url: window.location.href,
      });
    } else {
      const el = document.createElement('textarea');
      el.value = window.location.href;
      el.setAttribute('readonly', '');
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      this.shareClicked = true;
      setTimeout(() => {
        this.shareClicked = false;
      }, 2000);
    }
  }
}
