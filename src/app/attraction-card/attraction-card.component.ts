import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';
import { Attraction } from '../attraction';

@Component({
  selector: 'app-attraction-card',
  templateUrl: './attraction-card.component.html',
  styleUrls: ['./attraction-card.component.scss'],
})
export class AttractionCardComponent implements OnInit {
  @Input() index: number;

  public attraction: Attraction;

  constructor(private dataService: DataService) {}

  async ngOnInit(): Promise<void> {
    const data = await this.dataService.getAttractionsJson();
    this.attraction = data[this.index];

    console.log(this.attraction);
  }
}
