import { Component, Input } from '@angular/core';

import * as Projection from 'ol/proj';

import { Attraction } from '../attraction';
import { MapService } from '../map.service';

@Component({
  selector: 'app-attraction-card',
  templateUrl: './attraction-card.component.html',
  styleUrls: ['./attraction-card.component.scss'],
})
export class AttractionCardComponent {
  @Input() image: string;
  @Input() description: string;
  @Input() attraction: Attraction;

  constructor(private readonly mapService: MapService) {}

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
  }
}
