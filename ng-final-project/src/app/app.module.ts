import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule} from '@angular/material/icon'
// import {GoogleMapsModule} from '@angular/google-maps'
// import { AgmCoreModule } from '@agm/core';
@NgModule({
  declarations: [AppComponent,
     ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    SharedModule,
    HttpClientModule,
    CoreModule,
    BrowserAnimationsModule,
    MatIconModule ,


    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyB7RZZ6W27WIbP_ZwmmMQkU8VlydA6yGIs'
    // }),
   
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
