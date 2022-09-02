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
  signupForm: FormGroup;
  public value: boolean = false;
  check = false;
  display = false;
  info = '';
  arr = [];
  arr2 = [];
  email = '';
  password = '';
  confirmPass = '';
  phoneNumber = '';
  nickname = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private authServ: AuthServiceService
  ) {}
  ngOnInit() {
    this.signupForm = new FormGroup(
      {
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [
          Validators.required,
          Validators.pattern('^[A-Za-z0-9]+'), 
          Validators.minLength(7),
        ]),
        confirmPass: new FormControl(null, [
          Validators.required,
          Validators.pattern('^[A-Za-z0-9]+'),
          Validators.minLength(7),
        ]),
        nickname: new FormControl(null, [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9-]*$'),
        ]),
        phoneNumber: new FormControl(null, [
          Validators.required,
          Validators.pattern('(\\+995\\d{9})?'),
          Validators.minLength(13),
          Validators.maxLength(13),
        ]),
        checkbox: new FormControl(null, [Validators.required]),
      },
      { validators: passConfValidator }
    );
    this.http.get('http://localhost:3000/users').subscribe((val) => {
      for (let x in val) {
        console.log(val[x]);
        this.arr.push(val[x]);
      }
    });
  }
  onSubmit(postData: user) {
    this.http
      .post('http://localhost:3000/users', postData)
      .subscribe((response) => {
        console.log(response);
      });
    this.arr.push({
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
      confirmPass: this.signupForm.value.name,
      nickname: this.signupForm.value.name,
      phoneNumber: this.signupForm.value.phoneNumber,
      checkbox: true,
    });
    // this.router.navigate(['/users']);
    return true;
  }
  isAnswered(): boolean {
    if (this.signupForm.valid && this.signupForm.touched === true) return false;
    else return true;
  }
  fillFields(i: number) {
    if (i < 0) {
      return false;
    }
    if (
      (this.arr[i].email === this.authServ.email,
      this.arr[i].password === this.authServ.password)
    ) {
      console.log(
        this.arr[i].nickname,
        '//' + this.signupForm.get('nickname').value
      );
      (this.arr[i].email = this.signupForm.get('email').value),
        (this.arr[i].password = this.signupForm.get('password').value),
        (this.arr[i].confirmPass = this.signupForm.get('confirmPass').value);
      this.arr[i].nickname = this.signupForm.get('nickname').value;
      this.arr[i].phoneNumber = this.signupForm.get('phoneNumber').value;
    }
    return true;
  }
  removeuser(i: number) {
    if (i < 0) {
      return false;
    }
    if (
      (this.arr[i].email === this.authServ.email,
      this.arr[i].password === this.authServ.password)
    ) {
      let txt;

      confirm(
        `This action will remove a user with this email: ${this.arr[i].email}`
      );
      {
        this.display = false;
        console.log(i);
        console.log(this.arr2);
        for (let j = 0; j < this.arr.length; j++) {
          this.arr2 = this.arr;
        }
        console.log(this.arr2);
        this.arr = [];
        for (let j = 0; j < this.arr2.length; j++) {
          if (j !== i) {
            this.arr.push(this.arr2[j]);
            console.log(this.arr2[j]);
          }
        }
        this.arr2 = [];
        console.log(this.arr2);
      }
    }
  }
  goToLogin() {
    this.router.navigate(['/']);
  }
}
