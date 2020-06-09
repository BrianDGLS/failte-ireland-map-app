import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileInfoPanelComponent } from './mobile-info-panel.component';

describe('MobileInfoPanelComponent', () => {
  let component: MobileInfoPanelComponent;
  let fixture: ComponentFixture<MobileInfoPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileInfoPanelComponent ]
    })
    .compileComponents();
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
