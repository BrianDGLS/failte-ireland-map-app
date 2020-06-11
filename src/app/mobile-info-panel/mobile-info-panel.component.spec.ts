import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';

import { MobileInfoPanelComponent } from './mobile-info-panel.component';

describe('MobileInfoPanelComponent', () => {
  let component: MobileInfoPanelComponent;
  let fixture: ComponentFixture<MobileInfoPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MobileInfoPanelComponent],
      providers: [
        { provide: MatBottomSheetRef, useValue: {} },
        { provide: MAT_BOTTOM_SHEET_DATA, useValue: {} },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileInfoPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
