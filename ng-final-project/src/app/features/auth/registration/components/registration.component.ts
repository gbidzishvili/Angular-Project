import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passConfValidator } from 'src/app/features/auth/validators/confirm-pass';
import { AuthServiceService } from 'src/app/features/auth/services/auth-service.service';
import { user } from 'src/app/features/auth/interfaces/interfaces';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  public signupForm: FormGroup;
  public arr:user[] = [];
  public nicknameErr:boolean=false;
  public emailErr:boolean=false;
  public passwordErr:boolean=false;
  public confirmPassErr:boolean=false;
  public phoneNumberErr:boolean=false;
  public checkboxErr:boolean=false;
  public submitted:boolean=false;
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}
  ngOnInit() {
 
    
    this.signupForm = new FormGroup(
      {
        nickname: new FormControl(null, [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9-!$%@#?^&*()_+|~=\\]`{}[:";\\\'<>?,./\\\\]*$'),
        ]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9-!$%@#?^&*()_+|~=\\]`{}[:";\\\'<>?,./\\\\]*$'), 
          Validators.minLength(7),
        ]),
        confirmPass: new FormControl(null, [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9-!$%@#?^&*()_+|~=\\]`{}[:";\\\'<>?,./\\\\]*$'),
          Validators.minLength(7),
        ]),
       
        phoneNumber: new FormControl(null, [
          Validators.required,
          Validators.pattern('\\+995\\s?\\d{3}\\s?\\d{2}\\s?\\d{1}\\s?\\d{2}\\s?\\d{1}\\s?'),
        ]),
        checkbox: new FormControl(null, [Validators.required]),
      },
      { validators: passConfValidator }
    );
    this.http.get('http://localhost:3000/users').subscribe((val) => {
      for (let x in val) {
        
        this.arr.push(val[x]);
      }
      
    },(err)=>{
      console.log(err.message);
      
    })
    ;
   
    
    
  }
  routerlink(){
    if(this.signupForm.valid){
      this.router.navigate(["/login"]);
    }
  }
  onSubmit(postData: user) {
    if(!this.submitted){

    this.submitted=true;
     if(!!postData.nickname!==true){
      this.nicknameErr=true;
    }
     if(!!postData.email!==true){
      this.emailErr =true;
    }
// checkbox
     if(!!postData.password!==true){
      this.passwordErr=true;
    }
     if(!!postData.confirmPass!==true){
      this.confirmPassErr =true;
    }
     if(!!postData.phoneNumber!==true){
      this.phoneNumberErr =true;
    }
     if(!!postData.checkbox!==true){
      this.checkboxErr =true;
    }else{
    this.http
      .post('http://localhost:3000/users', postData)
      .subscribe((response) => {
        
      },(err)=>{
        console.log(err.message);
        
      });
   
    return true;
  }}
  }
  goToLogin() {
    this.router.navigate(['/']);
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

showErrMethod(submittedValue:string){
  if(submittedValue===null && this.submitted){
    return true;
  }else {
    return false;
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
}