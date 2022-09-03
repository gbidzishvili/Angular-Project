import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  getTemperature:string;
  constructor() { }
  getTemp(temp){
    this.getTemperature = temp;
  }
}
