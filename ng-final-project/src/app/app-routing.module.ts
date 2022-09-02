import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:"full"},
  {path:'login',loadChildren:()=> import('./features/auth/login/login.module').then(m=>m.LoginModule)},
  {path:'register',loadChildren:()=> import('./features/auth/registration/registration.module').then(m=>m.RegistrationModule)},
  {path:'weather',loadChildren:()=> import('./features/main-page/weather.module').then(m=>m.WeatherModule)},
   {
    path: '**',
    component: PageNotFoundComponent,
  }];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
