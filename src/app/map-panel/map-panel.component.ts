import { Component, OnInit } from '@angular/core';

import Map from 'ol/Map';
import View from 'ol/View';
import {
  defaults as defaultInteractions,
  DragRotateAndZoom,
} from 'ol/interaction';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Icon, Style } from 'ol/style';
import VectorSource from 'ol/source/Vector';
import { DataService } from '../data.service';

@Component({
  selector: 'app-map-panel',
  templateUrl: './map-panel.component.html',
  styleUrls: ['./map-panel.component.scss'],
})
export class MapPanelComponent implements OnInit {
  public center: number[] = [-8.001, 53.537];

  constructor(private readonly dataService: DataService) {}

  async ngOnInit(): Promise<void> {
    const data = await this.dataService.getAttractionsJson();

    const subset = data
      .filter((_) => _.Url && _.Longitude && _.Latitude)
      .slice(0, 20);
    const features = [];

    for (const sub of subset) {
      const feature = new Feature({
        name: sub.Name,
        geometry: new Point(fromLonLat([sub.Longitude, sub.Latitude])),
      });
      var iconStyle = new Style({
        image: new Icon({
          anchor: [0.5, 46],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          src: 'https://openlayers.org/en/v4.6.5/examples/data/icon.png',
        }),
      });

      feature.setStyle(iconStyle);
      features.push(feature);
    }

    const source = new VectorSource({ features });
    const vectorLayer = new VectorLayer({ source });

    const map = new Map({
      interactions: defaultInteractions().extend([new DragRotateAndZoom()]),
      layers: [new TileLayer({ source: new OSM() }), vectorLayer],
      target: 'map',
      view: new View({
        center: fromLonLat(this.center),
        zoom: 8,
      }),
    });
  }
}
