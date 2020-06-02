import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-map-panel',
  templateUrl: './map-panel.component.html',
  styleUrls: ['./map-panel.component.scss'],
})
export class MapPanelComponent implements OnInit {
  constructor(private readonly dataService: DataService) {}

  async ngOnInit(): Promise<void> {
    const data = await this.dataService.getAttractionsJson();
    // console.log(data);
  }
}
