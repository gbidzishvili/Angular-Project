import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { delay } from 'rxjs';
import { AuthServiceService } from '../../services/auth-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public signupForm: FormGroup;
  public value: boolean = false;
  public check = false;
  public display = false;
  public info:string = '';
  public email:string = '';
  public password:string = '';
  public submitted:boolean=false;
  constructor(
    private router: Router,
    private authservice: AuthServiceService
  ) {}
  ngOnInit() {
    this.signupForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[A-Za-z0-9]+'),
        Validators.minLength(7),
      ]),
    });
  }
  auth() {
    this.authservice.getEmail(this.signupForm.get('email').value);
    this.authservice.getPassword(this.signupForm.get('password').value);
  }
  onSubmit() {
    this.submitted=true;
    this.authservice.auth(
      this.signupForm.get('email').value,
      this.signupForm.get('password').value
    );
  }
  checkIfValidvalue(value){
    if(this.submitted){
      if(this.signupForm.get(`${value.getAttribute('formControlName')}`).invalid && this.signupForm.get(`${value.getAttribute('formControlName')}`).touched){
    return "redborder";
  }
   else{
    return null;
  }
    }
}
checkIfwrittencorrectly(value){
  if(this.signupForm.get(`${value.getAttribute('formControlName')}`).invalid && 
  this.signupForm.get(`${value.getAttribute('formControlName')}`).touched && 
  this.signupForm.get(`${value.getAttribute('formControlName')}`).value !== null){
return true;
  }

}
enterValue(value){
  if(`${value.getAttribute('formControlName')}`==="checkbox"){
    if(this.submitted && this.signupForm.get(`${value.getAttribute('formControlName')}`).value===null)
    {return true;}
  }
  if(this.signupForm.get(`${value.getAttribute('formControlName')}`).touched
   && this.signupForm.get(`${value.getAttribute('formControlName')}`).value===null ||this.submitted && this.signupForm.get(`${value.getAttribute('formControlName')}`).value===null
   ){
    return true;
  }
}
  gotoSignUp(){
    this.router.navigate(["/register"]);
  }
}
