import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetUsersDataService } from 'src/app/shared/services/get-users-data.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit,OnChanges {
nickname;
  constructor(private router:Router,private getUsersDataService:GetUsersDataService) { }

  ngOnInit(): void {
    this.nickname = localStorage.getItem("nickname")
  }
  logOut(){
this.router.navigate(['/'])
  }
  ngOnChanges(){}
}
