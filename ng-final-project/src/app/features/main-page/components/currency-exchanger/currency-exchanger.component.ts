import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, of, share, tap } from 'rxjs';
@Component({
  selector: 'app-currency-exchanger',
  templateUrl: './currency-exchanger.component.html',
  styleUrls: ['./currency-exchanger.component.scss']
})
export class CurrencyExchangerComponent implements OnInit {
  public currencyForm: FormGroup;
  public Am1:number = 1;
  public Am2:number = 0;
  public ivalidCurrency1:boolean=false;
  public ivalidCurrency2:boolean=false;
  public ivalidNumber1:boolean=false;
  public ivalidNumber2:boolean=false;
  public cur1:string = 'EUR';
  public cur2:string = 'USD';
  public rate: number;
  public additinalAmount:number;
  public additinalCur:string;
  constructor(private http: HttpClient) {}
  // round(number){

  // }
  ngOnInit(): void {
    this.fetchPost()
    .subscribe(
      (post) => {
        this.ivalidCurrency1=false;
        if (post.hasOwnProperty('conversion_rate')) {
          for (let x in post) {
            if (x === 'conversion_rate') {
              this.rate = post[x];
            }
          }
          this.Am2 = this.rate * this.Am1;
          // console.log(this.Am2);
          
          this.currencyForm.setValue(
            {
              cur1: this.cur1,
              am1: this.Am1,
              cur2: this.cur2,
              am2: this.Am2,
            },
            { emitEvent: false }
          );
          this.currencyForm.get('am1').valueChanges.subscribe((val) => {
            if(typeof +val==="number")
            this.calculateValue(this.rate, val);
          });
          this.currencyForm.get('am2').valueChanges.subscribe((val) => {
            if(typeof +val==="number")
            console.log(val);
            this.calculateValue2(this.rate, val);
          });
        }
        share();
      },
      
    );
    this.currencyForm = new FormGroup({
      cur1: new FormControl(this.cur1),
      am1: new FormControl(this.Am1,),
      cur2: new FormControl(this.cur2),
      am2: new FormControl(this.Am2),
    });
    // 
    this.currencyForm.get('cur1').valueChanges.subscribe((val) => {
      this.cur1 = val;
      if (this.cur1.length === 3 && this.cur2.length === 3) {
      this.fetchPost().subscribe(
        (post) => {
          this.ivalidCurrency1=false;
          if (post.hasOwnProperty('conversion_rate')) {
            for (let x in post) {
              if (x === 'conversion_rate') {
                this.rate = post[x];
              }
            }
            this.Am2 = this.rate * this.Am1;
            console.log(this.Am2);
            this.currencyForm.setValue(
              {
                cur1: this.cur1,
                am1: this.Am1,
                cur2: this.cur2,
                am2: this.Am2,
              },
              { emitEvent: false }
            );
            this.currencyForm.get('am1').valueChanges.subscribe((val) => {
              if(typeof +val==="number")
              this.calculateValue(this.rate, val);
            });
            this.currencyForm.get('am2').valueChanges.subscribe((val) => {
              if(typeof +val==="number")
              this.calculateValue2(this.rate, val);
            });
          }
        },
        () => {
          console.log('Invalid Name Please Enter valid Currency');
          this.ivalidCurrency1=true;
        }
      )}else{return null};
    });
    this.currencyForm.get('cur2').valueChanges.subscribe((val) => {
      this.cur2 = val;
      if (this.cur1.length === 3 && this.cur2.length === 3) {
      this.fetchPost().subscribe(
        (post) => {
          this.ivalidCurrency2=false;
          
          if (post.hasOwnProperty('conversion_rate')) {
            for (let x in post) {
              if (x === 'conversion_rate') {
                this.rate = post[x];
              }
            }
            this.Am2 = this.rate * this.Am1;
            console.log(this.Am2);
            this.currencyForm.setValue(
              {
                cur1: this.cur1,
                am1: this.Am1,
                cur2: this.cur2,
                am2: this.Am2,
              },
              { emitEvent: false }
            );
          
            this.currencyForm.get('am1').valueChanges.subscribe((val) => {
              if(typeof +val==="number"){
              if (this.cur1.length === 3 && this.cur2.length === 3) {
              this.calculateValue(this.rate, val);
              }
              }
            });
            this.currencyForm.get('am2').valueChanges.subscribe((val) => {
              if(typeof +val==="number"){
              if (this.cur1.length === 3 && this.cur2.length === 3) {
              this.calculateValue2(this.rate, val);
              }
              }
            });
          }
        },
        () => {
          console.log('Invalid Name Please Enter valid Currency');
          this.ivalidCurrency2=true; 
        }
      )}else{
        return null;
      };
    });
    this.currencyForm.get('am1').valueChanges.subscribe((val) => {
      if(val<0 ){
        this.ivalidNumber1=true;
      }else{
        this.ivalidNumber1=false;
      }
      if(+val*0!==0){
        this.ivalidNumber1=true;
      }
    });
    this.currencyForm.get('am2').valueChanges.subscribe((val) => {
      if(val<0 ){
        this.ivalidNumber2=true;
      }else{
        this.ivalidNumber2=false;
      }
      if(+val*0!==0){
        this.ivalidNumber2=true;
      }
    });
    this.currencyForm.setValue(
      {
        cur1: this.cur1,
        am1: this.Am1,
        cur2: this.cur2,
        am2: this.Am2,
      },
      { emitEvent: false }
    );
    // this.consolthis.e.l);
    
  }
  fetchPost() {
     return this.http
        .get(
          ` https://v6.exchangerate-api.com/v6/22d74dfb14c65ae86ea8a5f3/pair/${this.cur1}/${this.cur2}`
        )
    }
  calculateValue(rate: number, val: number) {
    // const celsiusprecision = celsius.toPrecision(4);
    // const parsed = parseFloat(celsiusprecision);
    this.rate = rate;
    this.Am2 = rate * val;
    this.Am2 =  +this.Am2.toPrecision(4);
    this.Am2 =  +parseFloat(this.Am2.toString());
    this.Am1 = val;
    this.currencyForm.setValue(
      {
        cur1: this.cur1,
        am1: this.Am1,
        cur2: this.cur2,
        am2: this.Am2,
      },
      { emitEvent: false }
    );
  }
  calculateValue2(rate: number, val: number) {
    this.rate = rate;
    this.Am2 = val;
    this.Am1 = val / rate;
    this.currencyForm.setValue(
      {
        cur1: this.cur1,
        am1: this.Am1,
        cur2: this.cur2,
        am2: this.Am2,
      },
      { emitEvent: false }
    );
    }
    reverseAmount(){
      console.log(this.rate);
      this.additinalAmount = this.Am1;
      this.Am1 = this.Am2;

      this.calculateValue(this.rate,this.Am1)
    
    }
    reverseCurr(){
      console.log(this.cur1,this.cur2);
      
      this.additinalCur = this.cur1;
      this.cur1 = this.cur2;
      this.cur2 = this.additinalCur;
      
      
      this.currencyForm.setValue(
        {
          cur1: this.cur1,
          am1: this.Am1,
          cur2: this.cur2,
          am2: this.Am2,
        },
        { emitEvent: false }
      );
      this.fetchPost()
       .subscribe(
      (post) => {
     
        if (post.hasOwnProperty('conversion_rate')) {
          for (let x in post) {
            if (x === 'conversion_rate') {
              this.rate = post[x];
            }
          }
          this.Am2 = this.rate * this.Am1;
          console.log(this.Am2);
          this.currencyForm.setValue(
            {
              cur1: this.cur1,
              am1: this.Am1,
              cur2: this.cur2,
              am2: this.Am2,
            },
            { emitEvent: false }
          );
          this.currencyForm.get('am1').valueChanges.subscribe((val) => {
            if(typeof +val==="number")
            this.calculateValue(this.rate, val);
          });
          this.currencyForm.get('am2').valueChanges.subscribe((val) => {
            if(typeof +val==="number")
          
            this.calculateValue2(this.rate, val);
          });
        }
        share();
      },
      
    ),
    () => {
      console.log('Invalid Name Please Enter valid Currency');
      
    }
    }
}