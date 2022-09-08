import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { user } from '../interfaces/interfaces';
import { GetUsersDataService } from 'src/app/shared/services/get-users-data.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  public counter:number=0;
  public isAuthenticated:boolean = false;
  public email: string;
  public password: string;
  public salary: number;
  constructor(private http: HttpClient, private router: Router,private getUsersDataService:GetUsersDataService) {}
  getEmail(email: string) {
    if (typeof email !== 'string') return false;
    this.email = email;
  }
  getPassword(pass: string) {
    if (typeof pass !== 'string') return false;
    this.password = pass;
  }

  auth(email: string, password: string) {
    
    this.http
      .get<user[]>(`http://localhost:3000/users`)
      .pipe(
        tap((users: user[]) => {
          const user = users.filter(
            (u) => u.email === email && u.password === password
          )[0];
          this.email = email;
          this.password = password;
          localStorage.setItem("registered","true")
          this.isAuthenticated = true;
          if (user) {
            localStorage.setItem(`nickname`,user["nickname"])
            this.router.navigate(['/weather']);
            return true;
          } else {
            alert('invalid email or password');
            this.router.navigate(['/']);
            return false;
          }
        })
      )
      .subscribe((v) => {});
  }
  isAuthenticatedcheck() {
    if (this.isAuthenticated === true) return true;
    else return false;
  }

}


