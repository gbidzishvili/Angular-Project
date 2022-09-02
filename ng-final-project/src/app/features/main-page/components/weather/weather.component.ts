import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  arr=[];
  Form:FormGroup;
  
  sunny=true;
  counter:number=7;
  item;
  itemParsed;
  temp:number;
  Mintemp:number;
  Maxtemp:number;
  humidity:number;
  wind:number;
  country = "Georgia";
  population:number;
  city="Tbilisi";
  correctCountry=true;
  baseUrl = "https://openweather43.p.rapidapi.com/forecast";
  XRapidAPIKeyheaderName:'X-RapidAPI-Key';
  XRapidAPIKeyheaderValue:'19390cb9d4msh526432bedef9373p147597jsn06606fea107d';
  XRapidAPIHostheaderName:'X-RapidAPI-Host';
  XRapidAPIHostheaderValue:'openweather43.p.rapidapi.com';
  constructor(public http:HttpClient) { }

  ngOnInit(): void {
    this.Form = new FormGroup({
    search : new FormControl("search city")})
    this.item = localStorage.getItem(`item`)
    this.itemParsed = JSON.parse(this.item)
    console.log(this.itemParsed["list"]);
    this.temp =Math.round(this.itemParsed["list"][0].main.temp.toString()); 
    this.Mintemp = Math.round(this.itemParsed["list"][0].main.temp_min.toString());
    this.Maxtemp = Math.round(this.itemParsed["list"][0].main.temp_max.toString());
    this.wind = this.itemParsed["list"][0].wind.speed;
    this.humidity = Math.round(this.itemParsed["list"][0].main.humidity.toString());
    this.country = this.itemParsed.city.country;
    this.population = this.itemParsed.city.population;
    console.log("temp"+ " " + this.temp + "°")
    console.log('min'+ " " + this.Mintemp + "°")
    console.log('max'+ " " + this.Maxtemp + "°")
    console.log('wind'+ " " + this.wind + "km/h")
    console.log('humidity'+ " " + this.humidity + "%")
    console.log(this.country);
    console.log(this.population);
    console.log(this.itemParsed);
    console.log(this.counter);
  }
 
  clearText(){
    this.Form.setValue({"search":""});
  }
  onSubmit(value){
  
  
    // this.http.get("https://openweather43.p.rapidapi.com/forecast",
    // { headers: new HttpHeaders({
    //   'X-RapidAPI-Key': '19390cb9d4msh526432bedef9373p147597jsn06606fea107d',
    //   'X-RapidAPI-Host': 'openweather43.p.rapidapi.com'
    // }
    //   ),
    //   params:new HttpParams()
    //   .set("appid","da0f9c8d90bde7e619c3ec47766a42f4")
    //   .set('q',value.search)
    //   .set("cnt","40")
    //   .set("units","metric")
    // }
    // )
    // .subscribe(v=>{
    //   this.temp =Math.round(v["list"][0].main.temp.toString());
    //   if(this.temp<20)this.sunny = false; 
    //   else{this.sunny = true}
    //   this.Mintemp = Math.round(v["list"][0].main.temp_min.toString());
    // this.Maxtemp = Math.round(v["list"][0].main.temp_max.toString());
    // this.wind = v["list"][0].wind.speed;
    // this.humidity = Math.round(v["list"][0].main.humidity.toString());
    //   this.correctCountry = true;
    //   this.city = value.search;
    //   console.log(v)
    //   this.counter++;
    //    localStorage.setItem(`item`, JSON.stringify(v));
    // },
    // (err=>{
    //   this.correctCountry = false;
    // }
    // )
    // ),
    
    
    // console.log(this.city)
   
  }
}

