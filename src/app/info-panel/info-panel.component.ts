import { Component, OnInit } from '@angular/core';
import { AttractionService } from '../attraction.service';
import { Attraction } from '../attraction';

@Component({
  selector: 'app-info-panel',
  templateUrl: './info-panel.component.html',
  styleUrls: ['./info-panel.component.scss'],
})
export class InfoPanelComponent implements OnInit {
  public selectedAttraction: Attraction;

  constructor(private readonly attractionService: AttractionService) {}

  ngOnInit(): void {
    this.attractionService.selectedAttraction$.subscribe((attraction) => {
      this.selectedAttraction = attraction;
    });
  }
}
