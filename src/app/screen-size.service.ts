import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScreenSizeService {
  public smallScreenBreakPoint = 960;

  get isSmallScreen(): boolean {
    return window.innerWidth < this.smallScreenBreakPoint;
  }

  get isLargeScreen(): boolean {
    return !this.isSmallScreen;
  }
}
