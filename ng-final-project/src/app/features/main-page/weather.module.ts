import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherComponent } from './components/weather/weather.component';
import { RouterModule } from '@angular/router';
import { MatIconModule} from '@angular/material/icon'
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { InfoComponent } from './components/info/info.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { CurrencyExchangerComponent } from './components/currency-exchanger/currency-exchanger.component';


@NgModule({
  declarations: [
    WeatherComponent,
    InfoComponent,
    NavigationComponent,
    SideBarComponent,
    CurrencyExchangerComponent,
    
  ],
  imports: [
    MatIconModule,
    CommonModule,
    SharedModule,
    RouterModule.forChild([{ path: '', component: WeatherComponent }])
  ],
  // exports:[TopBarComponent]
})
export class WeatherModule { }
