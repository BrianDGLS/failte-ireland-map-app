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
import { AttractionService } from '../attraction.service';

@Component({
  selector: 'app-map-panel',
  templateUrl: './map-panel.component.html',
  styleUrls: ['./map-panel.component.scss'],
})
export class MapPanelComponent implements OnInit {
  public center: number[] = [-8.001, 53.537];

  constructor(
    private readonly dataService: DataService,
    private readonly attractionService: AttractionService
  ) {}

  async ngOnInit(): Promise<void> {
    const data = await this.dataService.getAttractionsJson();

    const iconStyle = new Style({
      image: new Icon({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: 'https://openlayers.org/en/v4.6.5/examples/data/icon.png',
      }),
    });

    const features = [];

    const source = new VectorSource({ features });
    const vectorLayer = new VectorLayer({ source });
    const map = new Map({
      interactions: defaultInteractions().extend([new DragRotateAndZoom()]),
      layers: [new TileLayer({ source: new OSM() }), vectorLayer],
      target: 'map',
      view: new View({
        center: fromLonLat(this.center),
        zoom: 7,
      }),
    });

    for (const [index, attraction] of data.entries()) {
      if (attraction.Longitude && attraction.Latitude) {
        const feature = new Feature({
          index,
          geometry: new Point(
            fromLonLat([attraction.Longitude, attraction.Latitude])
          ),
        });

        // feature.setStyle(iconStyle);
        source.addFeature(feature);
      }
    }

    const displayFeatureInfo = (pixel) => {
      vectorLayer.getFeatures(pixel).then((features) => {
        var feature = features.length ? features[0] : undefined;
        if (feature) {
          const index = feature.values_.index;
          if (index in data) {
            this.attractionService.selectedAttraction$.next(data[index]);
          }
        }
      });
    };

    map.on('click', (evt) => {
      displayFeatureInfo(evt.pixel);
    });
  }
}
