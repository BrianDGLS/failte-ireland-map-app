import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Attraction } from '../attraction';
import { DataService } from '../data.service';

@Component({
  selector: 'app-info-panel',
  templateUrl: './info-panel.component.html',
  styleUrls: ['./info-panel.component.scss'],
})
export class InfoPanelComponent implements OnInit {
  public attractions: Attraction[] = [];

  constructor(private readonly dataService: DataService) {}

  async ngOnInit(): Promise<void> {
    const data = await this.dataService.getAttractionsJson();

    this.attractions.push(data[3225]);
    this.attractions.push(data[508]);
    this.attractions.push(data[600]);
  }
}
