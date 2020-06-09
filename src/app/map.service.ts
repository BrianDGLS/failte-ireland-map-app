import { Subject } from 'rxjs';
import { Injectable, ElementRef } from '@angular/core';

import Map from 'ol/Map';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import Overlay from 'ol/Overlay';
import Point from 'ol/geom/Point';
import * as Layer from 'ol/layer';
import * as Projection from 'ol/proj';
import Collection from 'ol/Collection';
import VectorSource from 'ol/source/Vector';
import * as Interaction from 'ol/interaction';
import { Icon, Style, Fill, Stroke, Circle } from 'ol/style';

import { Attraction } from './attraction';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  public map: Map;
  public popup: Overlay;
  public features: Collection;
  public activeFeature: Feature;
  public attraction: Attraction;
  public center: number[] = [-8.001, 53.537];
  public selectedFeature$: Subject<Feature> = new Subject();

  get zoom(): number {
    return this.map.getView().getZoom();
  }

  set zoom(value: number) {
    const view = this.map.getView();
    view.setZoom(value);
  }

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

  constructor(private readonly dataService: DataService) {}

  public registerPopup($popup: ElementRef) {
    this.popup = new Overlay({
      element: $popup.nativeElement,
      positioning: 'bottom-center',
      stopEvent: false,
      offset: [0, -10],
    });
    this.map.addOverlay(this.popup);
  }

  public async getFeatures(): Promise<Feature[]> {
    const data = await this.dataService.getAttractionsJson();
    const features = [];
    for (const attraction of data) {
      const { Longitude, Latitude } = attraction;
      const projection = Projection.fromLonLat([Longitude, Latitude]);
      const geometry = new Point(projection);
      features.push(new Feature({ attraction, geometry }));
    }
    return features;
  }

  public async createMap($popup: ElementRef): Promise<void> {
    this.features = new Collection(await this.getFeatures());
    const source = new VectorSource({ features: this.features });
    const vectorLayer = new Layer.Vector({ source });
    const osmLayer = new Layer.Tile({ source: new OSM() });
    const center = Projection.fromLonLat(this.center);
    const view = new View({ center, zoom: 7 });
    const dragAndRotate = new Interaction.DragRotateAndZoom();
    const interactions = Interaction.defaults().extend([dragAndRotate]);
    const layers = [osmLayer, vectorLayer];
    this.map = new Map({ target: 'map', layers, view, interactions });

    this.registerPopup($popup);
    this.registerInputEvents();
    this.subscribeToSelectedFeature();
  }

  private subscribeToSelectedFeature() {
    this.selectedFeature$.subscribe((feature) => {
      if (!feature && this.activeFeature) {
        this.activeFeature.setStyle(this.defaultStyle);
        return;
      }

      feature.setStyle(this.activeStyle);
      this.activeFeature = feature;
      const coordinates = feature.getGeometry().getCoordinates();
      this.popup.setPosition(coordinates);
    });
  }

  private registerInputEvents() {
    this.mapClickHandler();
    this.mapMoveEndHandler();
    this.mapPointerMoveHandler();
  }

  private mapClickHandler() {
    this.map.on('click', (e) => {
      const features = this.map.getFeaturesAtPixel(e.pixel);
      this.selectedFeature$.next(features.length ? features[0] : undefined);
    });
  }

  private mapMoveEndHandler() {
    this.map.on('moveend', () => {
      const newZoom = this.map.getView().getZoom();
      if (this.zoom != newZoom) this.zoom = newZoom;
    });
  }

  private mapPointerMoveHandler() {
    this.map.on('pointermove', (e) => {
      const target = this.map.getTargetElement();
      const hasFeatureAtPixel = this.map.hasFeatureAtPixel(e.pixel);
      target.style.cursor = hasFeatureAtPixel ? 'pointer' : '';
    });
  }
}
