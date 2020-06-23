import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

@NgModule({
  exports: [
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatSnackBarModule,
  ],
})
export class MaterialModule {}
