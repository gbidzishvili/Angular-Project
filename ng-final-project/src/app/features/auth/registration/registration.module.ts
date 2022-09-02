import { NgModule } from '@angular/core';
import { RegistrationComponent } from './components/registration.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    RegistrationComponent
    ],
  imports: [
   SharedModule,RouterModule.forChild([{path: '', component: RegistrationComponent }])
  ],
  exports:[RegistrationComponent]
})
export class RegistrationModule { }
