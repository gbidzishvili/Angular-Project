import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherComponent } from './components/weather.component';
import { RouterModule } from '@angular/router';
import { MatIconModule} from '@angular/material/icon'
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { CurrencyExchangerComponent } from './components/currency-exchanger/currency-exchanger.component';
import { ConvertorComponent } from './components/convertor/convertor.component';


@NgModule({
  declarations: [
    WeatherComponent,
    NavigationComponent,
    SideBarComponent,
    CurrencyExchangerComponent,
    ConvertorComponent,
    
  ],
  imports: [
    MatIconModule,
    CommonModule,
    SharedModule,
    RouterModule.forChild([{ path: '', component: WeatherComponent }])
  ],
})
export class WeatherModule { }
