import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-convertor',
  templateUrl: './convertor.component.html',
  styleUrls: ['./convertor.component.scss']
})
export class ConvertorComponent implements OnInit {
  clicked=false;
  kilometers:number=1;
  miles:number=0.621;
  celsius:number=1;
  fahrenheit:number=33.8;
  converterForm:FormGroup;
  reversedDistance:boolean=false;
  reversedtemp:boolean=false;
  constructor() { }

  ngOnInit(): void {
    this.converterForm = new FormGroup({
      kilometers: new FormControl(),
      miles: new FormControl(),
      celsius: new FormControl(),
      fahrenheit: new FormControl(),
    });
    this.converterForm.setValue(
      {
        kilometers: this.kilometers,
        miles: this.miles,
        celsius: this.celsius,
        fahrenheit: this.fahrenheit,
      },
      { emitEvent: false }
    );
    this.converterForm.get('kilometers').valueChanges.subscribe((val) => {
      if(typeof +val==="number")
      this.kilosIntoMiles(val);
    });
    this.converterForm.get('miles').valueChanges.subscribe((val) => {
      if(typeof +val==="number")
      this.milesIntoKilo(val);
    });
    this.converterForm.get('celsius').valueChanges.subscribe((val) => {
      if(typeof +val==="number")
      this.celsiusIntoFahrenheit(val);;
    });
    this.converterForm.get('fahrenheit').valueChanges.subscribe((val) => {
      if(typeof +val==="number")
      this.fahrenheitIntoCelsius(val);;
    });
  
  }
  kilosIntoMiles(kilo){
    this.kilometers= kilo;
    const mile:number=kilo*0.621;
    const milesprecision:string = mile.toPrecision(4);
    const parsed:number = parseFloat(milesprecision)
    this.miles = parsed;
    this.converterForm.setValue(
      {
        kilometers: this.kilometers,
        miles: this.miles,
        celsius: this.celsius,
        fahrenheit: this.fahrenheit,
      },
      { emitEvent: false }
    );

  }
  milesIntoKilo(miles){
    
    this.miles = miles;
    const kilo:number = miles*1.609344;
    const kilosprecision:string = kilo.toPrecision(4);
    const parsed:number = parseFloat(kilosprecision);
    this.kilometers = parsed;
    this.converterForm.setValue(
      {
        kilometers: this.kilometers,
        miles: this.miles,
        celsius: this.celsius,
        fahrenheit: this.fahrenheit,
      },
      { emitEvent: false }
    );

  }
  reverseDistance(){
    if(!this.reversedDistance){
      this.reversedDistance=true;
    this.miles = this.kilometers;
    const kilo:number = this.miles*1.609344;
    const kilosprecision:string = kilo.toPrecision(4);
    const parsed:number = parseFloat(kilosprecision);
    this.kilometers =parsed;
    this.converterForm.setValue(
      {
        kilometers: this.miles,
        miles: this.kilometers,
        celsius: this.celsius,
        fahrenheit: this.fahrenheit,
      },
      { emitEvent: false }
    );
    }else if(this.reversedDistance){
      this.reversedDistance=false;
      
      this.kilometers = this.miles;
      const mile:number = this.kilometers*0.621;
      const milesprecision:string = mile.toPrecision(4);
      const parsed:number = parseFloat(milesprecision);
      this.miles=parsed;
      console.log(this.miles);
      
      this.converterForm.setValue(
        {
          kilometers: this.kilometers,
          miles: this.miles,
          celsius: this.celsius,
          fahrenheit: this.fahrenheit,
        },
        { emitEvent: false }
      );
    }
  }
  celsiusIntoFahrenheit(celsius){
    this.celsius = celsius
    const intofahrenheit:number = (celsius*9/5)+32;
    const fahrenheitPrecision:string = intofahrenheit.toPrecision(4);
    const parsed:number = parseFloat(fahrenheitPrecision);
    this.fahrenheit = parsed;
    this.converterForm.setValue(
      {
        kilometers: this.kilometers,
        miles: this.miles,
        celsius: this.celsius,
        fahrenheit: this.fahrenheit,
      },
      { emitEvent: false }
    );
  }
  fahrenheitIntoCelsius(fahrenheit){
    this.fahrenheit = fahrenheit;
    const intoCelsius:number =(fahrenheit-32)*5/9;
    const CelsiusPrecision:string =intoCelsius.toPrecision(4) ;
    const parsed:number = parseFloat(CelsiusPrecision);
    this.celsius = parsed;
    this.converterForm.setValue(
    {
        kilometers: this.kilometers,
        miles: this.miles,
        celsius: this.celsius,
        fahrenheit: this.fahrenheit,
      },
      { emitEvent: false }
    );
  }
  reversetemp(){
    if(!this.reversedtemp){
    this.reversedtemp=true;
    this.fahrenheit = this.celsius;
    const celsius:number = (this.fahrenheit-32)*5/9;
    const celsiusprecision:string = celsius.toPrecision(4);
    const parsed:number = parseFloat(celsiusprecision);
    this.celsius =parsed;
    this.converterForm.setValue(
      {
        kilometers: this.kilometers,
        miles: this.miles,
        celsius: this.fahrenheit,
        fahrenheit: this.celsius,
      },
      { emitEvent: false }
    );
    }else if(this.reversedtemp){
      this.reversedtemp=false;
      this.celsius = this.fahrenheit;
      const fahrenheit:number = (this.celsius*9/5)+32;
      const fahrenheitprecision:string = fahrenheit.toPrecision(4);
      const parsed:number = parseFloat(fahrenheitprecision);
      this.fahrenheit=parsed;
      
      this.converterForm.setValue(
        {
          kilometers: this.kilometers,
          miles: this.miles,
          celsius: this.celsius,
          fahrenheit: this.fahrenheit,
        },
        { emitEvent: false }
      );
    }
  }
  display(){
    this.clicked=!this.clicked
  }
}
