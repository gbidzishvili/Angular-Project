import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-convertor',
  templateUrl: './convertor.component.html',
  styleUrls: ['./convertor.component.scss']
})
export class ConvertorComponent implements OnInit {
  clicked=false;
  kilometers=1;
  miles=1;
  celsius=1;
  fahrenheit=1;
  converterForm:FormGroup;
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
  }
  calculatekilo(){
    this.kilometers = this.converterForm.get("kilometers").value;
    this.miles = this.kilometers*0.62137119224;
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
  calculateMile(){}
  reverseDistance(){}
  calculateCelsius(){}
  calculateFahrenheit(){}
  reversetemp(){}
  display(){
    this.clicked=!this.clicked
  }
}
