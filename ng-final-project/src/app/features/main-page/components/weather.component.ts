import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  public Form:FormGroup;
  public getweather:string = "weather";
  public getforecast:string = "forecast";
  public sunny=true;
  public counter:number=0;
  public item:string;
  public item2:string;
  public itemParsed:string;
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
  public baseUrl:string = "https://openweather43.p.rapidapi.com";
  public key1:string='19390cb9d4msh526432bedef9373p147597jsn06606fea107d';
  public key2:string='befb762131msh0fca0ea1158c417p1c829djsn8dca637f2a02';
  public key3:string='ec49eb0927mshd3340c35846f4edp1938bbjsne18cf19afb20';
  public key4:string='2350909e71mshb0e23036efad877p1f3d76jsnc6f1f60bfa09';
  public key5:string='1286c0f3b2mshefc1bf9f52daa48p1efd13jsn6b3d52fd1ee4';
  public key6:string='d3eff14730mshb096df999c41f99p19e974jsnd959d98b7e97';
  public key7:string='eff42ef84bmsh647db56fbd4359bp14c9afjsn178584f08a6d';
  public key8:string='6fb1acb66bmsh17f9fd0f5859789p14ebc6jsnd80790c4de3e';
  public key9:string='c87a5568f7msh66a6b14a73f5e1dp15c0bajsn33b88df26ef0';
  public key10:string='a2de218ba2msh4885af07ea0fc98p147e0djsnbc0e579ef4e7';
  public key11:string='e33834454emsh10fce08cab4f5d8p1b3e5djsn9650058bec15';
  constructor(public http:HttpClient) { }
  
  ngOnInit(): void {
    this.http.get(`${this.baseUrl}/${this.getforecast}`,
    { headers: new HttpHeaders({
      'X-RapidAPI-Key': this.key9,
      'X-RapidAPI-Host': 'openweather43.p.rapidapi.com'
    }
      ),
      params:new HttpParams()
      .set("appid","da0f9c8d90bde7e619c3ec47766a42f4")
      .set('q',"minsk")
      .set("appid","da0f9c8d90bde7e619c3ec47766a42f4")
      .set("cnt","40")
      .set("units","metric")
    }
    )
    .subscribe(v=>{
      
      console.log(v);
      this.temp =Math.round(v["list"][0].main.temp.toString());
      if(this.temp<20)this.sunny = false; 
      else{this.sunny = true}
      this.Mintemp = Math.round(v["list"][0].main.temp_min.toString());
    this.Maxtemp = Math.round(v["list"][0].main.temp_max.toString());
    this.wind = v["list"][0].wind.speed;
    this.humidity = Math.round(v["list"][0].main.humidity.toString());
      this.correctCountry = true;
      this.city = "tbilisi";
      // this.inpCurTemp = this.temp;
      console.log('/*****');
      
      console.log(v["list"][0].weather[0].main);
      
      this.sky = v["list"][0].weather[0].main;
      localStorage.setItem("sky",this.sky)
      localStorage.setItem("weather", JSON.stringify(v));
      console.log(v);
    },
    (err=>{
      this.correctCountry = false;
    }
    )
    ),
    this.sky = localStorage.getItem("sky");
    this.Form = new FormGroup({
    search : new FormControl("search city")})
    this.item = localStorage.getItem("weather");
    this.itemParsed = JSON.parse(this.item)
    this.todaysDate = this.itemParsed["list"][0].dt_txt.slice(8,10);
    // Get weather data for tomorrow,dayAftertomorow,twoDaysAftTum,threeDaysAftTum.
    for(let i = 0; i < 8; i++){
      if(this.itemParsed["list"][i].dt_txt.slice(8,10) !== this.todaysDate){
        this.index = i;
        break;
      }
    }
    for(let j = this.index;j<40; j++){
      if(j<this.index+8){
        this.tumTempSum+=this.itemParsed["list"][j].main.temp;
        if(this.itemParsed["list"][j].weather[0].main === "Clear"){
          this.tumSunny++;
        }
        else if(this.itemParsed["list"][j].weather[0].main === "Clouds"){
          this.tumCloudy++;
        }
        else if(this.itemParsed["list"][j].weather[0].main === "Rain"){
          this.tumRainy++;
        }
        else{
          this.tumSnowy++;
        }
      }
      else if(j>=this.index+8 && j<this.index+16 ){
        this.dayAfttumtempSum+=this.itemParsed["list"][j].main.temp;
        if(this.itemParsed["list"][j].weather[0].main === "Clear"){
          this.dayAfttumSunny++;
        }
        else if(this.itemParsed["list"][j].weather[0].main === "Clouds"){
          this.dayAfttumCloudy++;
        }
        else if(this.itemParsed["list"][j].weather[0].main === "Rain"){
          this.dayAfttumRainy++;
        }
        else{
          this.dayAfttumSnowy++;
        }
      }
      else if(j>=this.index+16 && j<this.index+24 ){
        this.twoDaysAftTumTempSum+=this.itemParsed["list"][j].main.temp;
        if(this.itemParsed["list"][j].weather[0].main === "Clear"){
          this.twoDaysAfttumSunny++;
        }
        else if(this.itemParsed["list"][j].weather[0].main === "Clouds"){
          this.twoDaysAfttumCloudy++;
        }
        else if(this.itemParsed["list"][j].weather[0].main === "Rain"){
          this.twoDaysAfttumRainy++;
        }
        else{
          this.twoDaysAfttumSnowy++;
        }
      }
      else if(j>=this.index+24 && j<this.index+32 ){
        this.threeDaysAftTumTempSum+=this.itemParsed["list"][j].main.temp;
        if(this.itemParsed["list"][j].weather[0].main === "Clear"){
          this.threeDaysAfttumSunny++;
        }
        else if(this.itemParsed["list"][j].weather[0].main === "Clouds"){
          this.threeDaysAfttumCloudy++;
        }
        else if(this.itemParsed["list"][j].weather[0].main === "Rain"){
          this.threeDaysAfttumRainy++;
        }
        else{
          this.threeDaysAfttumSnowy++;
        }
      }
      else{
        break;
      }
    }
   
    this.tumsky=  this.skyDetec(this.tumsky,this.tumSnowy,this.tumRainy,this.tumSunny,this.tumCloudy);
    this.dayAfttumsky=  this.skyDetec(this.dayAfttumsky,this.dayAfttumSnowy,this.dayAfttumRainy,this.dayAfttumSunny,this.dayAfttumCloudy);
    this.twoDaysAftTumsky=  this.skyDetec(this.twoDaysAftTumsky,this.twoDaysAfttumSnowy,this.twoDaysAfttumRainy,this.twoDaysAfttumSunny,this.twoDaysAfttumCloudy);
    this.threeDaysAftTumsky=  this.skyDetec(this.threeDaysAftTumsky,this.threeDaysAfttumSnowy,this.threeDaysAfttumRainy,this.threeDaysAfttumSunny,this.threeDaysAfttumCloudy);
    this.tumTempAvg = Math.round(this.tumTempSum/8);
    this.dayAfttumtempAvg = Math.round(this.dayAfttumtempSum/8);
    this.twoDaysAftTumTempAvg = Math.round(this.twoDaysAftTumTempSum/8);
    this.threeDaysAftTumTempAvg =Math.round(this.threeDaysAftTumTempSum/8);
  
    
  }
  skyDetec(day:string,snowy,rainy,sunny,cloudy){
    
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
      return day;
      }
  
  clearText(){
    this.Form.setValue({"search":""});
  }
  onSubmit(value){ 
    this.nulifyData();
    this.http.get(`${this.baseUrl}/${this.getforecast}`,
    { headers: new HttpHeaders({
      'X-RapidAPI-Key': this.key9,
      'X-RapidAPI-Host': 'openweather43.p.rapidapi.com'
    }
      ),
      params:new HttpParams()
      .set("appid","da0f9c8d90bde7e619c3ec47766a42f4")
      .set('q',value.search)
      .set("appid","da0f9c8d90bde7e619c3ec47766a42f4")
      .set("cnt","40")
      .set("units","metric")
    }
    )
    .subscribe(v=>{
      console.log(v);
      this.temp =Math.round(v["list"][0].main.temp.toString());
      if(this.temp<20)this.sunny = false; 
      else{this.sunny = true}
      this.Mintemp = Math.round(v["list"][0].main.temp_min.toString());
    this.Maxtemp = Math.round(v["list"][0].main.temp_max.toString());
    this.wind = v["list"][0].wind.speed;
    this.humidity = Math.round(v["list"][0].main.humidity.toString());
      this.correctCountry = true;
      this.city = value.search;
      this.sky = v["list"][0].weather[0].main;
      localStorage.setItem("sky",this.sky)
      localStorage.setItem("weather", JSON.stringify(v));
    },
    (err=>{
      this.correctCountry = false;
    }
    )
    ),
    this.sky = localStorage.getItem("sky");
    this.Form = new FormGroup({
    search : new FormControl("search city")})
    this.item = localStorage.getItem("weather");
    this.itemParsed = JSON.parse(this.item)
    this.todaysDate = this.itemParsed["list"][0].dt_txt.slice(8,10);
    // Get weather data for tomorrow,dayAftertomorow,twoDaysAftTum,threeDaysAftTum.
    for(let i = 0; i < 8; i++){
      if(this.itemParsed["list"][i].dt_txt.slice(8,10) !== this.todaysDate){
        this.index = i;
        break;
      }
    }

    for(let j = this.index;j<40; j++){
      if(j<this.index+8){
        this.tumTempSum+=this.itemParsed["list"][j].main.temp;
        if(this.itemParsed["list"][j].weather[0].main === "Clear"){
          this.tumSunny++;
        }
        else if(this.itemParsed["list"][j].weather[0].main === "Clouds"){
          this.tumCloudy++;
        }
        else if(this.itemParsed["list"][j].weather[0].main === "Rain"){
          this.tumRainy++;
        }
        else{
          this.tumSnowy++;
        }
      }
      else if(j>=this.index+8 && j<this.index+16 ){
        this.dayAfttumtempSum+=this.itemParsed["list"][j].main.temp;
        if(this.itemParsed["list"][j].weather[0].main === "Clear"){
          this.dayAfttumSunny++;
        }
        else if(this.itemParsed["list"][j].weather[0].main === "Clouds"){
          this.dayAfttumCloudy++;
        }
        else if(this.itemParsed["list"][j].weather[0].main === "Rain"){
          this.dayAfttumRainy++;
        }
        else{
          this.dayAfttumSnowy++;
        }
      }
      else if(j>=this.index+16 && j<this.index+24 ){
        this.twoDaysAftTumTempSum+=this.itemParsed["list"][j].main.temp;
        if(this.itemParsed["list"][j].weather[0].main === "Clear"){
          this.twoDaysAfttumSunny++;
        }
        else if(this.itemParsed["list"][j].weather[0].main === "Clouds"){
          this.twoDaysAfttumCloudy++;
        }
        else if(this.itemParsed["list"][j].weather[0].main === "Rain"){
          this.twoDaysAfttumRainy++;
        }
        else{
          this.twoDaysAfttumSnowy++;
        }
      }
      else if(j>=this.index+24 && j<this.index+32 ){
        this.threeDaysAftTumTempSum+=this.itemParsed["list"][j].main.temp;
        if(this.itemParsed["list"][j].weather[0].main === "Clear"){
          this.threeDaysAfttumSunny++;
        }
        else if(this.itemParsed["list"][j].weather[0].main === "Clouds"){
          this.threeDaysAfttumCloudy++;
        }
        else if(this.itemParsed["list"][j].weather[0].main === "Rain"){
          this.threeDaysAfttumRainy++;
        }
        else{
          this.threeDaysAfttumSnowy++;
        }
      }
      else{
        break;
      }
    }
    this.tumsky=  this.skyDetec(this.tumsky,this.tumSnowy,this.tumRainy,this.tumSunny,this.tumCloudy);
    this.dayAfttumsky=  this.skyDetec(this.dayAfttumsky,this.dayAfttumSnowy,this.dayAfttumRainy,this.dayAfttumSunny,this.dayAfttumCloudy);
    this.twoDaysAftTumsky=  this.skyDetec(this.twoDaysAftTumsky,this.twoDaysAfttumSnowy,this.twoDaysAfttumRainy,this.twoDaysAfttumSunny,this.twoDaysAfttumCloudy);
    this.threeDaysAftTumsky=  this.skyDetec(this.threeDaysAftTumsky,this.threeDaysAfttumSnowy,this.threeDaysAfttumRainy,this.threeDaysAfttumSunny,this.threeDaysAfttumCloudy);
    this.tumTempAvg = Math.round(this.tumTempSum/8);
    this.dayAfttumtempAvg = Math.round(this.dayAfttumtempSum/8);
    this.twoDaysAftTumTempAvg = Math.round(this.twoDaysAftTumTempSum/8);
    this.threeDaysAftTumTempAvg =Math.round(this.threeDaysAftTumTempSum/8);
  }
  canDeactivate():Observable<boolean > | Promise<boolean > | boolean  {
    return confirm("Do you want to leave this page?");
  }
  nulifyData(){
    this.temp=0;
this.tumTempAvg=0;
this.tumTempSum=0;
this.tumsky=null;
this.dayAfttumtempAvg=0;
this.dayAfttumtempSum=0;
this.dayAfttumsky=null;
this.twoDaysAftTumTempAvg=0;
this.twoDaysAftTumTempSum=0;
this.twoDaysAftTumsky=null;
this.threeDaysAftTumTempAvg=0;
this.threeDaysAftTumTempSum=0;
this.threeDaysAftTumsky=null;
this.city=null;
this.sky=null;
this.tumSunny = 0;
this.dayAfttumSunny=0
this.twoDaysAfttumSunny=0;
this.threeDaysAfttumSunny=0;
this.tumRainy = 0;
this.dayAfttumRainy=0;
this.twoDaysAfttumRainy=0;
this.threeDaysAfttumRainy=0;
this.tumCloudy=0;
this.dayAfttumCloudy=0;
this.twoDaysAfttumCloudy=0;
this.threeDaysAfttumCloudy=0;
this.tumSnowy = 0;
this.dayAfttumSnowy=0;
this.twoDaysAfttumSnowy=0;
this.threeDaysAfttumSnowy=0;
  }
}
