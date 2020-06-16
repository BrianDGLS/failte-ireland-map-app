import { Injectable } from '@angular/core';

import { Attraction } from './attraction';
import { CsvToJsonService } from './csv-to-json.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private readonly csvToJsonService: CsvToJsonService) {}

  private _attractionsCsv: string;
  private _attractionsJson: Attraction[];

  public async getAttractionsJson(): Promise<Attraction[]> {
    if (this._attractionsJson) return this._attractionsJson;

    const csvData = await this.getAttractionsCsv();
    const attractions: Attraction[] = this.csvToJsonService.convert(csvData);
    this._attractionsJson = attractions.filter(
      (_) => _.Longitude && _.Latitude
    );

    return this._attractionsJson;
  }

  public async getAttractionsCsv(): Promise<string> {
    if (this._attractionsCsv) return this._attractionsCsv;

    const request = await fetch('/assets/data/attractions.csv');
    if (request.ok) {
      this._attractionsCsv = await request.text();
      return this._attractionsCsv;
    } else {
      throw new Error(request.statusText);
    }
  }
}
