import { Injectable, OnChanges, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetUsersDataService implements OnInit {
  nickname;
  key;
  item;

  constructor() { }
  getkey(key){
    this.key = key;
    this.nickname = localStorage.getItem(this.key);
    return key;
  }
  ngOnInit(): void {
    // console.log(this.key);
    
    this.nickname = localStorage.getItem(this.key);
    //  this.item = localStorage.getItem(this.key);
   
  }
 
//   ngOnChanges(){
//     console.log('***');
//     console.log(this.key,this.nickname);
    
//     this.nickname = localStorage.getItem(this.key);
  
// }
}
