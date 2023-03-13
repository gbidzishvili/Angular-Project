import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UrlTree } from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  public google: any
  public Form:FormGroup;
  public getforecast:string = "forecast";
  public sunny=true;
  public temp:number;
  public Mintemp:number;
  public Maxtemp:number;
  public humidity:number;
  public wind:number;
  public city:string="Tbilisi";
  public correctCountry:boolean=true;
  public inpCurTemp:number;
  public sky:string;
  public todaysDate:Date;
  public firstDay:string;
  public tumTempAvg:number;
  public tumTempSum:number=0;
  public dayAfttumtempAvg:number;
  public dayAfttumtempSum:number=0;
  public twoDaysAftTumTempAvg:number;
  public twoDaysAftTumTempSum:number=0;
  public threeDaysAftTumTempAvg:number;
  public threeDaysAftTumTempSum:number=0;
  public tumsky:string;
  public tumSunny:number=0;
  public tumRainy:number=0;
  public tumSnowy:number=0;
  public tumCloudy:number=0;
  public dayAfttumsky:string;
  public dayAfttumSunny:number=0;
  public dayAfttumRainy:number=0;
  public dayAfttumSnowy:number=0;
  public dayAfttumCloudy:number=0;
  public twoDaysAftTumsky:string;
  public twoDaysAfttumSunny:number=0;
  public twoDaysAfttumRainy:number=0;
  public twoDaysAfttumSnowy:number=0;
  public twoDaysAfttumCloudy:number=0;
  public threeDaysAftTumsky:string;
  public threeDaysAfttumSunny:number=0;
  public threeDaysAfttumRainy:number=0;
  public threeDaysAfttumSnowy:number=0;
  public threeDaysAfttumCloudy:number=0;
  public index:number;
  public loading=true;
  public baseUrl:string = "https://openweather43.p.rapidapi.com";
  public api_key_options = 
  [
    '19390cb9d4msh526432bedef9373p147597jsn06606fea107d',
    'befb762131msh0fca0ea1158c417p1c829djsn8dca637f2a02',
    'ec49eb0927mshd3340c35846f4edp1938bbjsne18cf19afb20',
    '2350909e71mshb0e23036efad877p1f3d76jsnc6f1f60bfa09',
    '1286c0f3b2mshefc1bf9f52daa48p1efd13jsn6b3d52fd1ee4',
    'd3eff14730mshb096df999c41f99p19e974jsnd959d98b7e97',
    'eff42ef84bmsh647db56fbd4359bp14c9afjsn178584f08a6d',
    '6fb1acb66bmsh17f9fd0f5859789p14ebc6jsnd80790c4de3e',
    'c87a5568f7msh66a6b14a73f5e1dp15c0bajsn33b88df26ef0',
    'a2de218ba2msh4885af07ea0fc98p147e0djsnbc0e579ef4e7',
    'e33834454emsh10fce08cab4f5d8p1b3e5djsn9650058bec15',
    'ba9a9cac8amsh90dedb6eaf4a728p147bcdjsnc74581430142',
    'ff7e77eac1msh34de1fb494d6eb5p1b9069jsn4c94f11e05fd',
    '36eb294ba0mshca62b1022389512p17edd7jsne9a556220e35',
    '03a82e4b0fmsh4310dfcf8136efep1a9306jsn389f71b5664c',
    '66daa78204msh9cdd771907274d5p1ca8e6jsn5ac3e019e470',
    '670de1c4f1mshe613b2f8fd56572p1fd28ejsn11f1f008bdcc',
    'fd6e7757bemshe857a404f250231p17bdb9jsn5f64abc15e08',
    'e133d6efacmsha26c38947072113p134061jsnd0945a0730ad',
    '405265b9c1mshd2741fe819a8a71p164fcfjsn8a506ef37a1a',
    'd29f688541mshf403147890d53aap1eb68djsnb71fca0d4ef9'
  ];
  public api_key:string=this.api_key_options[10];
  private googl_Map_API_Key = "AIzaSyB7RZZ6W27WIbP_ZwmmMQkU8VlydA6yGIs";
  public lat = 41.715137;
  public lng = 44.827095;
  // map:google.maps.Map;
  constructor(public http:HttpClient) { }
  
  ngOnInit(): void {

  // }
    this.loading=true;
    this.Form = new FormGroup({
      search : new FormControl("search city")});
    this.fetchData(this.city);
  }
  
  fetchData(city: string): void {
    this.loading = true;
    const headers = new HttpHeaders({
      'X-RapidAPI-Key': this.api_key,
      'X-RapidAPI-Host': 'openweather43.p.rapidapi.com'
    });
    
    const params = new HttpParams()
      .set("q", city)
      .set("appid", "da0f9c8d90bde7e619c3ec47766a42f4")
      .set("cnt", "40")
      .set("units", "metric");
    
    this.http.get(`${this.baseUrl}/${this.getforecast}`, { headers, params }).subscribe(
      v => {
        this.insideSubscribe(v);
      },
      err => {
        this.correctCountry = false;
        this.loading = false;
      }
    );
    
  }
  
 
  clearText(){
    this.Form.setValue({"search":""});
  }
  onSubmit(value){ 
    this.loading=true;
    console.log('value');
    console.log(value.search);
    this.nulifyData();
    this.fetchData(value.search);

  }
  // canDeactivate(){
  //   return confirm("Do you want to leave this page?");
  // }
  insideSubscribe(v){
    console.log("v is:",v);
      this.temp=Math.round(v["list"][0].main.temp.toString());
      if(this.temp<20)this.sunny = false; 
      else{
        this.sunny = true;
      }
      console.log(v);
      this.temp =Math.round(v["list"][0].main.temp.toString());
      if(this.temp<20)this.sunny = false; 
      else{this.sunny = true}
      this.Mintemp = Math.round(v["list"][0].main.temp_min.toString());
      this.Maxtemp = Math.round(v["list"][0].main.temp_max.toString());
      this.wind = v["list"][0].wind.speed;
      this.humidity = Math.round(v["list"][0].main.humidity.toString());
      this.correctCountry = true;
      this.city = v["city"].name;
      // this.inpCurTemp = this.temp;
      console.log('/*****');
      console.log(v["list"][0].weather[0].main);
      this.sky = v["list"][0].weather[0].main;
      this.todaysDate = v["list"][0].dt_txt.slice(8,10);
      // Get weather data for tomorrow,dayAftertomorow,twoDaysAftTum,threeDaysAftTum.
      for(let i = 0; i < 8; i++){
        console.log("2",v["list"][i].dt_txt,this.todaysDate)
        if(v["list"][i].dt_txt.slice(8,10) !== this.todaysDate){
          this.index = i;
          break;
        }
      }
      for(let j = this.index;j<40; j++){
        console.log(this.index);
        if(j<this.index+8){
          // console.log('tumTemp');
          // console.log(this.tumTempSum);
          this.tumTempSum+=v["list"][j].main.temp;
          if(v["list"][j].weather[0].main === "Clear"){
            this.tumSunny++;
          }
          else if(v["list"][j].weather[0].main === "Clouds"){
            this.tumCloudy++;
          }
          else if(v["list"][j].weather[0].main === "Rain"){
            this.tumRainy++;
          }
          else{
            this.tumSnowy++;
          }
        }
        else if(j>=this.index+8 && j<this.index+16 ){
          // console.log('dayAfttumtempSum');
          // console.log(this.dayAfttumtempSum);
          this.dayAfttumtempSum+=v["list"][j].main.temp;
          if(v["list"][j].weather[0].main === "Clear"){
            this.dayAfttumSunny++;
          }
          else if(v["list"][j].weather[0].main === "Clouds"){
            this.dayAfttumCloudy++;
          }
          else if(v["list"][j].weather[0].main === "Rain"){
            this.dayAfttumRainy++;
          }
          else{
            this.dayAfttumSnowy++;
          }
        }
        else if(j>=this.index+16 && j<this.index+24 ){
          //  console.log('twoDaysAftTumTempSum');
          // console.log(this.twoDaysAftTumTempSum)
          this.twoDaysAftTumTempSum+=v["list"][j].main.temp;
          if(v["list"][j].weather[0].main === "Clear"){
            this.twoDaysAfttumSunny++;
          }
          else if(v["list"][j].weather[0].main === "Clouds"){
            this.twoDaysAfttumCloudy++;
          }
          else if(v["list"][j].weather[0].main === "Rain"){
            this.twoDaysAfttumRainy++;
          }
          else{
            this.twoDaysAfttumSnowy++;
          }
        }
        else if(j>=this.index+24 && j<this.index+32 ){
          // console.log('threeDaysAftTumtempSum');
          // console.log(this.threeDaysAftTumTempSum)
          this.threeDaysAftTumTempSum+=v["list"][j].main.temp;
          if(v["list"][j].weather[0].main === "Clear"){
            this.threeDaysAfttumSunny++;
          }
          else if(v["list"][j].weather[0].main === "Clouds"){
            this.threeDaysAfttumCloudy++;
          }
          else if(v["list"][j].weather[0].main === "Rain"){
            this.threeDaysAfttumRainy++;
          }
          else{
            this.threeDaysAfttumSnowy++;
          }
        }
        else{
          break;
        }
        this.loading=false;
      }
      // const weatherParameters= [
      //   [this.tumSnowy, this.tumRainy, this.tumSunny, this.tumCloudy],
      //   [this.dayAfttumSnowy, this.dayAfttumRainy, this.dayAfttumSunny, this.dayAfttumCloudy],
      //   [this.twoDaysAfttumSnowy, this.twoDaysAfttumRainy, this.twoDaysAfttumSunny, this.twoDaysAfttumCloudy],
      //   [this.threeDaysAfttumSnowy, this.threeDaysAfttumRainy, this.threeDaysAfttumSunny, this.threeDaysAfttumCloudy]
      // ];
      
      // const skyTypes = [];
      // for (let weatherParameter of weatherParameters) {
      //   skyTypes.push(this.skyDetec(weatherParameter[0],weatherParameter[1],weatherParameter[2],weatherParameter[3]));
      // }
      
      // [this.tumsky, this.dayAfttumsky, this.twoDaysAftTumsky, this.threeDaysAftTumsky] = skyTypes;
      
      // const skyTypes = weatherParameters.map((parameters) => this.skyDetec(parameters[0],parameters[1],parameters[2],parameters[3]));
      
      // [this.tumsky, this.dayAfttumsky, this.twoDaysAftTumsky, this.threeDaysAftTumsky] = skyTypes;
      
      this.tumsky=  this.skyDetec(this.tumSnowy,this.tumRainy,this.tumSunny,this.tumCloudy);
      this.dayAfttumsky=  this.skyDetec(this.dayAfttumSnowy,this.dayAfttumRainy,this.dayAfttumSunny,this.dayAfttumCloudy);
      this.twoDaysAftTumsky=  this.skyDetec(this.twoDaysAfttumSnowy,this.twoDaysAfttumRainy,this.twoDaysAfttumSunny,this.twoDaysAfttumCloudy);
      this.threeDaysAftTumsky=  this.skyDetec(this.threeDaysAfttumSnowy,this.threeDaysAfttumRainy,this.threeDaysAfttumSunny,this.threeDaysAfttumCloudy);
      this.tumTempAvg = Math.round(this.tumTempSum/8);
      this.dayAfttumtempAvg = Math.round(this.dayAfttumtempSum/8);
      this.twoDaysAftTumTempAvg = Math.round(this.twoDaysAftTumTempSum/8);
      this.threeDaysAftTumTempAvg =Math.round(this.threeDaysAftTumTempSum/8);
  }
  skyDetec(snowy:number, rainy:number, sunny:number, cloudy:number) {
    const weatherArray = [snowy, rainy, sunny, cloudy];
    const maxIndex = weatherArray.indexOf(Math.max(...weatherArray));
    const weatherTypes = ["snowy", "rainy", "sunny", "cloudy"];
    return weatherTypes[maxIndex];
  }
  
  nulifyData(){
    const propertiesToReset = ["todaysDate", "temp", "tumTempAvg", "tumTempSum", "tumsky",    "dayAfttumtempAvg", "dayAfttumtempSum", "dayAfttumsky",    "twoDaysAftTumTempAvg", "twoDaysAftTumTempSum", "twoDaysAftTumsky",    "threeDaysAftTumTempAvg", "threeDaysAftTumTempSum", "threeDaysAftTumsky",    "city", "sky",    "tumSunny", "dayAfttumSunny", "twoDaysAfttumSunny", "threeDaysAfttumSunny",    "tumRainy", "dayAfttumRainy", "twoDaysAfttumRainy", "threeDaysAfttumRainy",    "tumCloudy", "dayAfttumCloudy", "twoDaysAfttumCloudy", "threeDaysAfttumCloudy",    "tumSnowy", "dayAfttumSnowy", "twoDaysAfttumSnowy", "threeDaysAfttumSnowy"  ];
    propertiesToReset.forEach(property => {
      this[property] = null;
      if (property.includes("temp") || property.includes("Temp") ||  property.includes("Sunny") || property.includes("Rainy") || property.includes("Cloudy") || property.includes("Snowy")) {
        this[property] = 0;
      }
    });
  }
}
