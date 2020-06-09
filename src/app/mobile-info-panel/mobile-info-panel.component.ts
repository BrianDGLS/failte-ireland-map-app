import { Component, AfterViewInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AppComponent } from '../app.component';
import { MobileMenuService } from '../mobile-menu.service';

@Component({
  selector: 'app-mobile-info-panel',
  templateUrl: './mobile-info-panel.component.html',
  styleUrls: ['./mobile-info-panel.component.scss'],
})
export class MobileInfoPanelComponent implements AfterViewInit {
  constructor(
    private readonly mobileMenuService: MobileMenuService,
    private _bottomSheetRef: MatBottomSheetRef<AppComponent>
  ) {}

  ngAfterViewInit() {
    this.mobileMenuService.mobileMenuRef$.next(this._bottomSheetRef);
  }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
