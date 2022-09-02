import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { user } from '../interfaces/interfaces';
@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  isAuthenticated = false;
  email: string;
  password: string;
  salary: number;
  constructor(private http: HttpClient, private router: Router) {}
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
          this.isAuthenticated = true;
          if (user) {
            this.router.navigate(['/weather']);
            return true;
          } else {
            alert('invalid email or password');
            this.router.navigate(['/']);
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


