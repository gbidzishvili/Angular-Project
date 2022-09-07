import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  authenticated;
  constructor(
    private router: Router,
    private authservice: AuthServiceService
  ) {}
  ngOnInit() {
    // console.log(this.authservice.email, this.authservice.password);

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
    this.authservice.auth(
      this.signupForm.get('email').value,
      this.signupForm.get('password').value
    );
  
  }
  isFilled(): boolean {
    if (this.signupForm.valid && this.signupForm.touched === true) return false;
    else return true;
  }
  gotoSignUp(){
    this.router.navigate(["/register"]);
  }
}
