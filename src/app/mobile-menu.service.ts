import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AppComponent } from './app.component';

@Injectable({
  providedIn: 'root',
})
export class MobileMenuService {
  public mobileMenuRef$: Subject<
    MatBottomSheetRef<AppComponent>
  > = new Subject();
}
