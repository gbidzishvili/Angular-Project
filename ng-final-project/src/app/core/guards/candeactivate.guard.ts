import { Component, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from 'src/app/features/auth/services/auth-service.service';

export interface CanCompDeactivate{
  canDeactivate:()=> Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
}
@Injectable({
  providedIn: 'root'
})
export class CandeactivateGuard implements CanDeactivate<CanCompDeactivate> {
  constructor(private authservice:AuthServiceService){}
  canDeactivate(component: CanCompDeactivate, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    console.log(component,currentRoute,currentState,nextState);
    if(nextState.url === "/login"){
      if(confirm("do you want to leave this page?")===true){
        localStorage.setItem("registered","false")
        return true;
      }else return false
    }
    else{
      return true;
    }
  }   
    
  }
  

