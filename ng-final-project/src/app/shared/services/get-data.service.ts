import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {
nickname;
  constructor() { }
  getNickName(nickname){
    this.nickname = nickname;
  }
}
