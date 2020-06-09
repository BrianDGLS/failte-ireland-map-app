import { Injectable } from '@angular/core';
import { CsvToJsonService } from './csv-to-json.service';
import { Attraction } from './attraction';

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
    return attractions.filter((_) => _.Longitude && _.Latitude);
  }

  public async getAttractionsCsv(): Promise<string> {
    if (this._attractionsCsv) return this._attractionsCsv;

    const request = await fetch('/assets/data/attractions.csv');
    if (request.ok) {
      return await request.text();
    }

    throw new Error(request.statusText);
  }
}
