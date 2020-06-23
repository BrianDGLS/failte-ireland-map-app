import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MapService } from './map.service';
import { DataService } from './data.service';
import { AppComponent } from './app.component';
import { MaterialModule } from './material-module';
import { AppRoutingModule } from './app-routing.module';
import { MobileMenuService } from './mobile-menu.service';
import { ScreenSizeService } from './screen-size.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MapPanelComponent } from './map-panel/map-panel.component';
import { InfoPanelComponent } from './info-panel/info-panel.component';
import { AttractionCardComponent } from './attraction-card/attraction-card.component';
import { MobileInfoPanelComponent } from './mobile-info-panel/mobile-info-panel.component';
import { HelpBarComponent } from './help-bar/help-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    InfoPanelComponent,
    HeaderComponent,
    MapPanelComponent,
    AttractionCardComponent,
    FooterComponent,
    MobileInfoPanelComponent,
    HelpBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  providers: [DataService, MapService, MobileMenuService, ScreenSizeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
