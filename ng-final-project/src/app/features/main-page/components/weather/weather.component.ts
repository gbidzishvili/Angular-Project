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
  item2;
  itemParsed;
  itemParsedForecast;
  temp:number;
  Mintemp:number;
  Maxtemp:number;
  humidity:number;
  wind:number;
  country = "Georgia";
  population:number;
  city="Tbilisi";
  correctCountry=true;
  inpCurTemp:string;
  sky:string;
  todaysDate;
  firstDay;
  tumTempAvg;
  tumTempSum=0;
  dayAfttumtemAvg;
  dayAfttumtemSum=0;
  twoDaysAftTumTempAvg;
  twoDaysAftTumTempSum=0;
  threeDaysAftTumTempAvg;
  threeDaysAftTumTempSum=0;
  tumsky;
  tumSunny=0;
  tumRainy=0;
  tumSnowy=0;
  tumCloudy=0;
  dayAfttumsky=0;
  dayAfttumSunny=0;
  dayAfttumRainy=0;
  dayAfttumSnowy=0;
  dayAfttumCloudy=0;
  twoDaysAftTumsky=0;
  twoDaysAfttumSunny=0;
  twoDaysAfttumRainy=0;
  twoDaysAfttumSnowy=0;
  twoDaysAfttumCloudy=0;
  threeDaysAftTumsky=0;
  threeDaysAfttumSunny=0;
  threeDaysAfttumRainy=0;
  threeDaysAfttumSnowy=0;
  threeDaysAfttumCloudy=0;
  index:number;
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
    this.item = localStorage.getItem(`${2}`);
    this.itemParsed = JSON.parse(this.item)
    // console.log(this.itemParsed);
    this.temp =Math.round(this.itemParsed.main.temp.toString()); 
    this.Mintemp = Math.round(this.itemParsed.main.temp_min.toString());
    this.Maxtemp = Math.round(this.itemParsed.main.temp_max.toString());
    this.wind = this.itemParsed.wind.speed;
    this.humidity = Math.round(this.itemParsed.main.humidity.toString());
    this.inpCurTemp = this.temp + "°";
    this.sky = this.itemParsed.weather[0].main;
    // /////////
    this.item2 = localStorage.getItem(`${3}`);
    this.itemParsedForecast = JSON.parse(this.item2);
    console.log(this.itemParsedForecast["list"]);
    this.todaysDate = this.itemParsedForecast["list"][0].dt_txt.slice(8,10);
    console.log( this.itemParsedForecast["list"][0].dt_txt.slice(8,10));
    // this.firstDay = new Date(this.itemParsedForecast["list"][0].dt_txt.slice(8,10));
    // Get weather data for tomorrow,dayAftertomorow,twoDaysAftTum,threeDaysAftTum.
    for(let i =0; i<8; i++){
      if(this.itemParsedForecast["list"][i].dt_txt.slice(8,10) !== this.todaysDate){
        console.log(this.itemParsedForecast["list"][i].dt_txt.slice(8,10),this.todaysDate,i);
        this.index = i;
        console.log("index" + this.index);
        break;
      }
    }

    for(let j = this.index;j<40; j++){
      if(j<=this.index+8){
        this.tumTempSum+=this.itemParsedForecast["list"][j].main.temp;
        if(this.itemParsedForecast["list"][j].weather.main = "Clear"){
          this.tumSunny++;
        }
        else if(this.itemParsedForecast["list"][j].weather.main = "Clouds"){
          this.tumCloudy++;
        }
        else if(this.itemParsedForecast["list"][j].weather.main = "Rain"){
          this.tumRainy++;
        }
        else{
          this.tumSnowy++;
        }
      }
      else if(j>this.index+8 && j<=this.index+16 ){
        this.dayAfttumtemSum+=this.itemParsedForecast["list"][j].main.temp;
        if(this.itemParsedForecast["list"][j].weather.main = "Clear"){
          this.dayAfttumSunny++;
        }
        else if(this.itemParsedForecast["list"][j].weather.main = "Clouds"){
          this.dayAfttumCloudy++;
        }
        else if(this.itemParsedForecast["list"][j].weather.main = "Rain"){
          this.dayAfttumRainy++;
        }
        else{
          this.dayAfttumSnowy++;
        }
      }
      else if(j>this.index+16 && j<=this.index+24 ){
        this.twoDaysAftTumTempSum+=this.itemParsedForecast["list"][j].main.temp;
      }
      else if(j>this.index+24 && j<=this.index+32 ){
        this.threeDaysAftTumTempSum+=this.itemParsedForecast["list"][j].main.temp;
      }
      else{
        break;
      }
    }

     
    this.skyDetec(this.tumsky,this.tumSnowy,this.tumRainy,this.tumSunny,this.tumCloudy);
    this.skyDetec(this.dayAfttumsky,this.dayAfttumSnowy,this.dayAfttumRainy,this.dayAfttumSunny,this.dayAfttumCloudy);
    console.log(this.dayAfttumSnowy,this.dayAfttumRainy,this.dayAfttumSunny,this.dayAfttumCloudy);
    console.log(this.tumsky,this.dayAfttumsky);


    this.tumTempAvg = Math.round(this.tumTempSum/8);
    this.dayAfttumtemAvg = Math.round(this.dayAfttumtemSum/8);
    this.twoDaysAftTumTempAvg = Math.round(this.twoDaysAftTumTempSum/8);
    this.threeDaysAftTumTempAvg =Math.round(this.threeDaysAftTumTempSum/8);
  
    
  }
  skyDetec(day,snowy,rainy,sunny,cloudy){
    if(
      snowy>=rainy && snowy>=sunny && snowy>=cloudy
    ){
      day = "snowy"
    }
    else if(
      rainy>=sunny && rainy>=cloudy && rainy>=snowy
      ){
        day = "rainy"
      }
      else if(
        sunny>=rainy && sunny>=cloudy && sunny>=snowy
      ){
        day = "sunny"
      }
      else if(
        cloudy>=rainy && cloudy>=sunny && cloudy>=snowy

      ){
        day = "cloudy"
      }
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
      this.temp =Math.round(v['main'].temp.toString());
      if(this.temp<20)this.sunny = false; 
      else{this.sunny = true}
      this.Mintemp = Math.round(v['main'].temp_min.toString());
    this.Maxtemp = Math.round(v['main'].temp_max.toString());
    this.wind = v['wind'].speed;
    this.humidity = Math.round(v['main'].humidity.toString());
      this.correctCountry = true;
      this.city = value.search;
      console.log(v);
      this.counter++;
      localStorage.setItem(`${this.counter}`, JSON.stringify(v));
      this.counter++;
    
    },
    (err=>{
      this.correctCountry = false;
    }
    )
    ),
    
    
    console.log(this.city);
    

    this.http.get(`${this.baseUrl}/${this.getforecast}`,
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
      this.temp =Math.round(v['main'].temp.toString());
      this.Mintemp = Math.round(v["list"][0].main.temp_min.toString());
    this.Maxtemp = Math.round(v["list"][0].main.temp_max.toString());
    this.wind = v["list"][0].wind.speed;
    this.humidity = Math.round(v["list"][0].main.humidity.toString());
      this.correctCountry = true;
      this.city = value.search;
      console.log(v)
       localStorage.setItem(`${this.counter}`, JSON.stringify(v));
  },
  (err=>{
    this.correctCountry = false;
  }
  )
  ),
  
  
  console.log(this.city);
  }

}
