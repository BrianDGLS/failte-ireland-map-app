import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InfoPanelComponent } from './info-panel/info-panel.component';
import { MaterialModule } from './material-module';
import { HeaderComponent } from './header/header.component';
import { MapPanelComponent } from './map-panel/map-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    InfoPanelComponent,
    HeaderComponent,
    MapPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
