import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    LoginComponent
    ],
  imports: [
   SharedModule,RouterModule.forChild([{ path: '', component: LoginComponent }])
  ],
  exports:[LoginComponent,RouterModule]
})
export class LoginModule { }
