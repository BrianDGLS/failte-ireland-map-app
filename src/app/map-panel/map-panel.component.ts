import { Component, OnInit } from '@angular/core';

import Map from 'ol/Map';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import * as Layer from 'ol/layer';
import * as Projection from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import * as Interaction from 'ol/interaction';
import { Icon, Style, Fill, Stroke, Circle } from 'ol/style';

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

  private _activeStyle: Style;
  public get activeStyle(): Style {
    if (!this._activeStyle) {
      const fill = new Fill({ color: 'rgba(255,255,255,0.4)' });
      const stroke = new Stroke({ color: '#9933CC', width: 1.25 });
      const image = new Circle({ fill: fill, stroke: stroke, radius: 5 });
      this._activeStyle = new Style({ image, fill, stroke });
    }
    return this._activeStyle;
  }

  private _defaultStyle: Style;
  public get defaultStyle(): Style {
    if (!this._defaultStyle) {
      const fill = new Fill({ color: 'rgba(255,255,255,0.4)' });
      const stroke = new Stroke({ color: '#3399CC', width: 1.25 });
      const image = new Circle({ fill: fill, stroke: stroke, radius: 5 });
      this._defaultStyle = new Style({ image, fill, stroke });
    }
    return this._defaultStyle;
  }

  public activeFeature: Feature;

  async ngOnInit(): Promise<void> {
    const data = await this.dataService.getAttractionsJson();

    // const iconStyle = new Style({
    //   image: new Icon({
    //     anchor: [0.5, 1],
    //     anchorXUnits: 'fraction',
    //     anchorYUnits: 'pixels',
    //     src: '/assets/icons/default-icon.svg',
    //   }),
    // });

    const features = [];
    const source = new VectorSource({ features });
    const vectorLayer = new Layer.Vector({ source });
    const osmLayer = new Layer.Tile({ source: new OSM() });
    const map = new Map({
      target: 'map',
      layers: [osmLayer, vectorLayer],
      view: new View({ center: Projection.fromLonLat(this.center), zoom: 7 }),
      interactions: Interaction.defaults().extend([
        new Interaction.DragRotateAndZoom(),
      ]),
    });

    for (const [index, attraction] of data.entries()) {
      if (attraction.Longitude && attraction.Latitude) {
        const feature = new Feature({
          index,
          geometry: new Point(
            Projection.fromLonLat([attraction.Longitude, attraction.Latitude])
          ),
        });

        // feature.setStyle(iconStyle);
        source.addFeature(feature);
      }
    }

    const displayFeatureInfo = (pixel) => {
      const features = map.getFeaturesAtPixel(pixel);
      var feature = features.length ? features[0] : undefined;
      if (feature) {
        feature.setStyle(this.activeStyle);

        if (this.activeFeature) {
          this.activeFeature.setStyle(this.defaultStyle);
        }

        this.activeFeature = feature;
        const index = feature.values_.index;
        if (index in data) {
          this.attractionService.selectedAttraction$.next(data[index]);
        }
      }
    };

    map.on('click', (e) => {
      displayFeatureInfo(e.pixel);
    });

    map.on('pointermove', (e) => {
      map.getTargetElement().style.cursor = map.hasFeatureAtPixel(e.pixel)
        ? 'pointer'
        : '';
    });
  }
}
