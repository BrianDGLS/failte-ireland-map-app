import { Component, OnInit, Input } from '@angular/core';
import { Attraction } from '../attraction';

@Component({
  selector: 'app-attraction-card',
  templateUrl: './attraction-card.component.html',
  styleUrls: ['./attraction-card.component.scss'],
})
export class AttractionCardComponent {
  @Input() attraction: Attraction;
}
