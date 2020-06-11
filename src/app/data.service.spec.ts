import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a string when getting csv data', async () => {
    const csvData = await service.getAttractionsCsv();
    expect(typeof csvData).toBe('string');
  });

  it('should return an array when getting json data', async () => {
    const jsonData = await service.getAttractionsJson();
    expect(Array.isArray(jsonData)).toBeTrue();
  });
});
