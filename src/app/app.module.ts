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
import { DataService } from './data.service';
import { AttractionCardComponent } from './attraction-card/attraction-card.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    InfoPanelComponent,
    HeaderComponent,
    MapPanelComponent,
    AttractionCardComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
