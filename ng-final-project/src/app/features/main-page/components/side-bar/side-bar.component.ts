import { Component, Input, OnInit } from '@angular/core';
import { map, share, Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit,OnInit {
  @Input()currtemp:string;
  @Input()tumTemp:string;
  @Input()dayAfttumtem:string;
  @Input()twoDaysAftTumTemp:string;
  @Input()threeDaysAftTumTemp:string;
  @Input()city:string;
  @Input()sky:string;
  @Input()tumsky:string;
  @Input()dayAfttumsky:string;
  @Input()twoDaysAftTumsky:string;
  @Input()threeDaysAftTumsky:string;
  rxTime = new Date();
  tumSunny=false;
  tumRainy=false;
  tumCloudy=false;
  tumSnowy=false;
  dayAfttumSunny=false;
  dayAfttumRainy=false;
  dayAfttumCloudy=false;
  dayAfttumSnowy=false;
  twoDaysAftTumSunny=false;
  twoDaysAftTumRainy=false;
  twoDaysAftTumCloudy=false;
  twoDaysAftTumSnowy=false;
  threeDaysAftTumSunny=false;
  threeDaysAftTumRainy=false;
  threeDaysAftTumCloudy=false;
  threeDaysAftTumSnowy=false;
  day_2;
  day_3;
  day_4;
  day_5;
  sunny=false;
  cloudy=false;
  rainy=false;
  snowy=false;
  subscription: Subscription;
  today;
  constructor() { }

  ngOnInit(): void {
    
    if(this.sky ==='Clear') this.sunny=true;
    if(this.sky==='Clouds')this.cloudy=true;
    if(this.sky==='Rain')this.rainy=true;
    if(this.sky==='Snow')this.snowy=true;
    const currentDate = new Date();
    const tomorrow = new Date(Date.now() + (3600 * 1000 * 24));
    const dayafttom = new Date(Date.now() + (3600 * 1000 * 24)*2);
    const twodaysafttom = new Date(Date.now() + (3600 * 1000 * 24)*3);
    const threedaysafttom = new Date(Date.now() + (3600 * 1000 * 24)*4);
    // console.log(this.today = currentDate.toLocaleDateString('en-us', { weekday: 'long', month: 'short', day: 'numeric' }));
this.day_2 =  tomorrow.toLocaleDateString('en-us', { weekday: 'long' });
this.day_3 =  dayafttom.toLocaleDateString('en-us', { weekday: 'long' });
this.day_4 =  twodaysafttom.toLocaleDateString('en-us', { weekday: 'long' });
this.day_5=  threedaysafttom.toLocaleDateString('en-us', { weekday: 'long' });
    // RxJS clock
 this.subscription = timer(0, 1000)
 .pipe(
   map(() => new Date()),
   share()
 )
 .subscribe(time => {
   this.rxTime = time;
 });


 if(this.tumsky = 'sunny'){
  this.tumSunny=true
 }
 else if(this.tumsky = 'snowy'){
  this.tumSnowy=true
 }
 else if(this.tumsky = 'rainy'){
  this.tumRainy=true
 }
 else if(this.tumsky = 'cloudy'){
  this.tumCloudy=true
 }
// 2
 if(this.dayAfttumsky = 'sunny'){
  this.dayAfttumSunny=true
 }
 else if(this.dayAfttumsky = 'snowy'){
  this.tumSnowy=true
 }
 else if(this.dayAfttumsky = 'rainy'){
  this.tumRainy=true
 }
 else if(this.dayAfttumsky = 'cloudy'){
  this.tumCloudy=true
 }
//  3
if(this.twoDaysAftTumsky = 'sunny'){
  this.twoDaysAftTumSunny=true
 }
 else if(this.twoDaysAftTumsky = 'snowy'){
  this.twoDaysAftTumSnowy=true
 }
 else if(this.twoDaysAftTumsky = 'rainy'){
  this.twoDaysAftTumRainy=true
 }
 else if(this.twoDaysAftTumsky = 'cloudy'){
  this.twoDaysAftTumCloudy=true
 }
//  4
if(this.threeDaysAftTumsky = 'sunny'){
  this.threeDaysAftTumSunny=true
 }
 else if(this.threeDaysAftTumsky = 'snowy'){
  this.threeDaysAftTumSnowy=true
 }
 else if(this.threeDaysAftTumsky = 'rainy'){
  this.threeDaysAftTumRainy=true
 }
 else if(this.threeDaysAftTumsky = 'cloudy'){
  this.threeDaysAftTumCloudy=true
 }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
