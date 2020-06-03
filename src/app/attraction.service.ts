import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Attraction } from './attraction';

@Injectable({
  providedIn: 'root',
})
export class AttractionService {
  public selectedAttraction$: Subject<Attraction> = new Subject();
}
