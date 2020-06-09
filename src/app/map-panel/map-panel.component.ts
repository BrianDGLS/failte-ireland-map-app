import {
  OnInit,
  ViewChild,
  Component,
  ElementRef,
  AfterViewInit,
} from '@angular/core';

import { Attraction } from '../attraction';
import { MapService } from '../map.service';

@Component({
  selector: 'app-map-panel',
  templateUrl: './map-panel.component.html',
  styleUrls: ['./map-panel.component.scss'],
})
export class MapPanelComponent implements AfterViewInit, OnInit {
  @ViewChild('popup') $popup: ElementRef;

  public attraction: Attraction;

  constructor(private readonly mapService: MapService) {}

  ngOnInit() {
    this.mapService.selectedFeature$.subscribe((feature) => {
      this.attraction = feature ? feature.get('attraction') : undefined;
    });
  }

  async ngAfterViewInit(): Promise<void> {
    await this.mapService.createMap(this.$popup);
  }
}
