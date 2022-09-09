import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { map, share, Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit,OnChanges {
  @Input()currtemp:string;
  @Input()tumTemp:string;
  @Input()tumsky:string;
  @Input()dayAfttumtemp:string;
  @Input()dayAfttumsky:string;
  @Input()twoDaysAftTumsky:string;
  @Input()twoDaysAftTumTemp:string;
  @Input()threeDaysAftTumTemp:string;
  @Input()threeDaysAftTumsky:string;
  @Input()city:string;
  @Input()sky:string;
  @Input()isloading:boolean=false;

  public rxTime:Date = new Date();
  public tumSunny:boolean=false;
  public tumRainy:boolean=false;
  public tumCloudy:boolean=false;
  public tumSnowy:boolean=false;
  public dayAfttumSunny:boolean=false;
  public dayAfttumRainy:boolean=false;
  public dayAfttumCloudy:boolean=false;
  public dayAfttumSnowy:boolean=false;
  public twoDaysAftTumSunny:boolean=false;
  public twoDaysAftTumRainy:boolean=false;
  public twoDaysAftTumCloudy:boolean=false;
  public twoDaysAftTumSnowy:boolean=false;
  public threeDaysAftTumSunny:boolean=false;
  public threeDaysAftTumRainy:boolean=false;
  public threeDaysAftTumCloudy:boolean=false;
  public threeDaysAftTumSnowy:boolean=false;
  public day_2:string;
  public day_3:string;
  public day_4:string;
  public day_5:string;
  public sunny:boolean=false;
  public cloudy:boolean=false;
  public rainy:boolean=false;
  public snowy:boolean=false;
  public subscription: Subscription;
  public today:string;
  public currHours:number;
  private daytime:boolean;
  private night:boolean;
// private isloading:false;
  constructor() { }
 
  ngOnInit(): void {
    // console.log('%%%%%%%1');
    // console.log(this.currtemp)
    // console.log(this.tumTemp)
    // console.log(this.dayAfttumtemp)
    // console.log(this.twoDaysAftTumTemp)
    // console.log(this.threeDaysAftTumTemp)
    this.currHours = new Date().getHours();
    this.getTodaysState();
    if(this.sky ==='Clear') this.sunny=true;
    if(this.sky==='Clouds')this.cloudy=true;
    if(this.sky==='Rain')this.rainy=true;
    if(this.sky==='Snow')this.snowy=true;
    const tomorrow:Date = new Date(Date.now() + (3600 * 1000 * 24));
    const dayafttom:Date = new Date(Date.now() + (3600 * 1000 * 24)*2);
    const twodaysafttom:Date = new Date(Date.now() + (3600 * 1000 * 24)*3);
    const threedaysafttom:Date = new Date(Date.now() + (3600 * 1000 * 24)*4);
    this.today = new Date().toLocaleDateString('en-us', {  weekday: 'long',  day: 'numeric',month: 'long'});
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


 if(this.tumsky === 'sunny'){
  this.tumSunny=true;
  this.tumCloudy=false;
  this.tumSnowy=false;
  this.tumRainy=false;
 }
 else if(this.tumsky === 'snowy'){
  this.tumSnowy=true;
  this.tumCloudy=false;
  this.tumSunny=false;
  this.tumRainy=false;
 }
 else if(this.tumsky === 'rainy'){
  this.tumRainy=true;
  this.tumCloudy=false;
  this.tumSnowy=false;
  this.tumSunny=false;
 }
 else if(this.tumsky === 'cloudy'){
  this.tumCloudy=true
  this.tumSunny=false;
  this.tumSnowy=false;
  this.tumRainy=false;
 }
// 2
 if(this.dayAfttumsky === 'sunny'){
  this.dayAfttumSunny=true;
  this.dayAfttumCloudy=false;
  this.dayAfttumSnowy=false;
  this.dayAfttumRainy=false;
 }
 else if(this.dayAfttumsky === 'snowy'){
  this.dayAfttumSnowy=true;
  this.dayAfttumSunny=false;
  this.dayAfttumCloudy=false;
  this.dayAfttumRainy=false;

 }
 else if(this.dayAfttumsky === 'rainy'){
  this.dayAfttumRainy=true;
  this.dayAfttumSnowy=false;
  this.dayAfttumSunny=false;
  this.dayAfttumCloudy=false;

 }
 else if(this.dayAfttumsky === 'cloudy'){
  this.dayAfttumCloudy=true;
  this.dayAfttumRainy=false;
  this.dayAfttumSnowy=false;
  this.dayAfttumSunny=false;

  
 }
//  3
if(this.twoDaysAftTumsky === 'sunny'){
  this.twoDaysAftTumSunny=true;
  this.twoDaysAftTumRainy=false;
  this.twoDaysAftTumCloudy=false;
  this.twoDaysAftTumSnowy=false;
 }
 else if(this.twoDaysAftTumsky === 'snowy'){
  this.twoDaysAftTumSnowy=true;
  this.twoDaysAftTumSunny=false;
  this.twoDaysAftTumRainy=false;
  this.twoDaysAftTumCloudy=false;

 }
 else if(this.twoDaysAftTumsky === 'rainy'){
  this.twoDaysAftTumRainy=true;
  this.twoDaysAftTumSunny=false;
  this.twoDaysAftTumSnowy=false;
  this.twoDaysAftTumCloudy=false;

 }
 else if(this.twoDaysAftTumsky === 'cloudy'){
  this.twoDaysAftTumCloudy=true;
  this.twoDaysAftTumRainy=false;
  this.twoDaysAftTumSunny=false;
  this.twoDaysAftTumSnowy=false;
 }
//  4
if(this.threeDaysAftTumsky === 'sunny'){
  this.threeDaysAftTumSunny=true;
  this.threeDaysAftTumRainy=false;
  this.threeDaysAftTumCloudy=false;
  this.threeDaysAftTumSnowy=false;

 }
 else if(this.threeDaysAftTumsky === 'snowy'){
  this.threeDaysAftTumSnowy=true;
  this.threeDaysAftTumRainy=false;
  this.threeDaysAftTumSunny = false;
  this.threeDaysAftTumCloudy=false;
 }
 else if(this.threeDaysAftTumsky === 'rainy'){
  this.threeDaysAftTumRainy=true;
  this.threeDaysAftTumSnowy=false;
  this.threeDaysAftTumSunny = false;
  this.threeDaysAftTumCloudy=false;
 }
 else if(this.threeDaysAftTumsky === 'cloudy'){
  this.threeDaysAftTumCloudy=true;
  this.threeDaysAftTumRainy=false;
  this.threeDaysAftTumSnowy=false;
  this.threeDaysAftTumSunny = false;
 }
  }
  getTodaysState(){
    if(this.currHours>=20 && this.currHours<=23 || this.currHours>=0 && this.currHours<=6){
      this.night = true;
    }else{
      this.daytime = true;
    }
  }
  ngOnChanges(){
    // console.log('%%%%%%%2');
    // console.log(this.currtemp)
    // console.log(this.tumTemp)
    // console.log(this.dayAfttumtemp)
    // console.log(this.twoDaysAftTumTemp)
    // console.log(this.threeDaysAftTumTemp)
this.tumSunny=false;
   this.tumRainy=false;
   this.tumCloudy=false;
   this.tumSnowy=false;
   this.dayAfttumSunny=false;
   this.dayAfttumRainy=false;
   this.dayAfttumCloudy=false;
   this.dayAfttumSnowy=false;
   this.twoDaysAftTumSunny=false;
   this.twoDaysAftTumRainy=false;
   this.twoDaysAftTumCloudy=false;
   this.twoDaysAftTumSnowy=false;
   this.threeDaysAftTumSunny=false;
   this.threeDaysAftTumRainy=false;
   this.threeDaysAftTumCloudy=false;
   this.threeDaysAftTumSnowy=false;
   if(this.sky ==='Clear') {
    this.sunny=true;
    this.cloudy=false;
    this.rainy=false;
    this.snowy=false;
  }
   if(this.sky==='Clouds'){
    this.cloudy=true;
    this.sunny=false;
    this.rainy=false;
    this.snowy=false;

   }
   if(this.sky==='Rain'){
    this.rainy=true;
    this.cloudy=false;
    this.sunny=false;
    this.snowy=false;

   }
   if(this.sky==='Snow'){
    this.snowy=true;
    this.rainy=false;
    this.cloudy=false;
    this.sunny=false;
   }
   const tomorrow = new Date(Date.now() + (3600 * 1000 * 24));
   const dayafttom = new Date(Date.now() + (3600 * 1000 * 24)*2);
   const twodaysafttom = new Date(Date.now() + (3600 * 1000 * 24)*3);
   const threedaysafttom = new Date(Date.now() + (3600 * 1000 * 24)*4);
   this.today = new Date().toLocaleDateString('en-us', {  weekday: 'long',  day: 'numeric',month: 'long'});
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


if(this.tumsky === 'sunny'){
 this.tumSunny=true;
 this.tumCloudy=false;
 this.tumSnowy=false;
 this.tumRainy=false;
}
else if(this.tumsky === 'snowy'){
 this.tumSnowy=true;
 this.tumCloudy=false;
 this.tumSunny=false;
 this.tumRainy=false;
}
else if(this.tumsky === 'rainy'){
 this.tumRainy=true;
 this.tumCloudy=false;
 this.tumSnowy=false;
 this.tumSunny=false;
}
else if(this.tumsky === 'cloudy'){
 this.tumCloudy=true
 this.tumSunny=false;
 this.tumSnowy=false;
 this.tumRainy=false;
}
// 2
if(this.dayAfttumsky === 'sunny'){
 this.dayAfttumSunny=true;
 this.dayAfttumCloudy=false;
 this.dayAfttumSnowy=false;
 this.dayAfttumRainy=false;
}
else if(this.dayAfttumsky === 'snowy'){
 this.dayAfttumSnowy=true;
 this.dayAfttumSunny=false;
 this.dayAfttumCloudy=false;
 this.dayAfttumRainy=false;

}
else if(this.dayAfttumsky === 'rainy'){
 this.dayAfttumRainy=true;
 this.dayAfttumSnowy=false;
 this.dayAfttumSunny=false;
 this.dayAfttumCloudy=false;

}
else if(this.dayAfttumsky === 'cloudy'){
 this.dayAfttumCloudy=true;
 this.dayAfttumRainy=false;
 this.dayAfttumSnowy=false;
 this.dayAfttumSunny=false;

 
}
//  3
if(this.twoDaysAftTumsky === 'sunny'){
 this.twoDaysAftTumSunny=true;
 this.twoDaysAftTumRainy=false;
 this.twoDaysAftTumCloudy=false;
 this.twoDaysAftTumSnowy=false;
}
else if(this.twoDaysAftTumsky === 'snowy'){
 this.twoDaysAftTumSnowy=true;
 this.twoDaysAftTumSunny=false;
 this.twoDaysAftTumRainy=false;
 this.twoDaysAftTumCloudy=false;

}
else if(this.twoDaysAftTumsky === 'rainy'){
 this.twoDaysAftTumRainy=true;
 this.twoDaysAftTumSunny=false;
 this.twoDaysAftTumSnowy=false;
 this.twoDaysAftTumCloudy=false;

}
else if(this.twoDaysAftTumsky === 'cloudy'){
 this.twoDaysAftTumCloudy=true;
 this.twoDaysAftTumRainy=false;
 this.twoDaysAftTumSunny=false;
 this.twoDaysAftTumSnowy=false;

}
//  4
if(this.threeDaysAftTumsky === 'sunny'){
 this.threeDaysAftTumSunny=true;
 this.threeDaysAftTumRainy=false;
 this.threeDaysAftTumCloudy=false;
 this.threeDaysAftTumSnowy=false;

}
else if(this.threeDaysAftTumsky === 'snowy'){
 this.threeDaysAftTumSnowy=true;
 this.threeDaysAftTumRainy=false;
 this.threeDaysAftTumSunny = false;
 this.threeDaysAftTumCloudy=false;

}
else if(this.threeDaysAftTumsky === 'rainy'){
 this.threeDaysAftTumRainy=true;
 this.threeDaysAftTumSnowy=false;
 this.threeDaysAftTumSunny = false;
 this.threeDaysAftTumCloudy=false;


}
else if(this.threeDaysAftTumsky === 'cloudy'){
 this.threeDaysAftTumCloudy=true;
 this.threeDaysAftTumRainy=false;
 this.threeDaysAftTumSnowy=false;
 this.threeDaysAftTumSunny = false;


}
  }
  ngOnDestroy() {
    
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
