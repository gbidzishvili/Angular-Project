import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit,OnChanges {
  public nickname:string;
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.nickname = localStorage.getItem("nickname")
  }
  logOut(){
this.router.navigate(['/'])
  }
  ngOnChanges(){}
}
