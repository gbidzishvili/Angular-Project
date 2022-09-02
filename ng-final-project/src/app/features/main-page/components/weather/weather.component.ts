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
  getweather = "weather";
  getforecast = "forecast";
  sunny=true;
  counter:number=0;
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
  baseUrl = "https://openweather43.p.rapidapi.com";
  XRapidAPIKeyheaderName:'X-RapidAPI-Key';
  XRapidAPIKeyheaderValue:'19390cb9d4msh526432bedef9373p147597jsn06606fea107d';
  XRapidAPIHostheaderName:'X-RapidAPI-Host';
  XRapidAPIHostheaderValue:'openweather43.p.rapidapi.com';
  constructor(public http:HttpClient) { }

  ngOnInit(): void {
    this.Form = new FormGroup({
    search : new FormControl("search city")})
   this.counter = this.counter+1;
    this.item = localStorage.getItem(`${this.counter}`);
    this.itemParsed = JSON.parse(this.item)
    console.log(this.itemParsed);
    this.temp =Math.round(this.itemParsed.main.temp.toString()); 
    this.Mintemp = Math.round(this.itemParsed.main.temp_min.toString());
    this.Maxtemp = Math.round(this.itemParsed.main.temp_max.toString());
    this.wind = this.itemParsed.wind.speed;
    this.humidity = Math.round(this.itemParsed.main.humidity.toString());

    console.log("temp"+ " " + this.temp + "°")
    console.log('min'+ " " + this.Mintemp + "°")
    console.log('max'+ " " + this.Maxtemp + "°")
    console.log('wind'+ " " + this.wind + "km/h")
    console.log('humidity'+ " " + this.humidity + "%")
    
   
    console.log(this.itemParsed);
    console.log(this.counter);
   
    // this.itemParsed = JSON.parse(this.item)
    // console.log(this.itemParsed["list"]);
    // this.temp =Math.round(this.itemParsed["list"][0].main.temp.toString()); 
    // this.Mintemp = Math.round(this.itemParsed["list"][0].main.temp_min.toString());
    // this.Maxtemp = Math.round(this.itemParsed["list"][0].main.temp_max.toString());
    // this.wind = this.itemParsed["list"][0].wind.speed;
    // this.humidity = Math.round(this.itemParsed["list"][0].main.humidity.toString());
    // this.country = this.itemParsed.city.country;
    // this.population = this.itemParsed.city.population;
    // console.log("temp"+ " " + this.temp + "°")
    // console.log('min'+ " " + this.Mintemp + "°")
    // console.log('max'+ " " + this.Maxtemp + "°")
    // console.log('wind'+ " " + this.wind + "km/h")
    // console.log('humidity'+ " " + this.humidity + "%")
    // console.log(this.country);
    // console.log(this.population);
    // console.log(this.itemParsed);
    // console.log(this.counter);
  }
 
  clearText(){
    this.Form.setValue({"search":""});
  }
  onSubmit(value){
  
  
    this.http.get(`${this.baseUrl}/${this.getweather}`,
    { headers: new HttpHeaders({
      'X-RapidAPI-Key': '19390cb9d4msh526432bedef9373p147597jsn06606fea107d',
      'X-RapidAPI-Host': 'openweather43.p.rapidapi.com'
    }
      ),
      params:new HttpParams()
      .set("appid","da0f9c8d90bde7e619c3ec47766a42f4")
      .set('q',value.search)
      .set("appid","da0f9c8d90bde7e619c3ec47766a42f4")
      // .set("cnt","40")
      .set("units","metric")
    }
    )
    .subscribe(v=>{
     // console.log(v["main"]);
      this.temp =Math.round(v['main'].temp.toString());
      if(this.temp<20)this.sunny = false; 
      else{this.sunny = true}
      this.Mintemp = Math.round(v['main'].temp_min.toString());
    this.Maxtemp = Math.round(v['main'].temp_max.toString());
    this.wind = v['wind'].speed;
    this.humidity = Math.round(v['main'].humidity.toString());
      this.correctCountry = true;
      this.city = value.search;
      console.log(v)
      this.counter++;
       localStorage.setItem(`${this.counter}`, JSON.stringify(v));
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
    //    localStorage.setItem(`1`, JSON.stringify(v));
    // },
    // (err=>{
    //   this.correctCountry = false;
    // }
    // )
    // ),
    
    
    // console.log(this.city)
    }
    )
  }
}

