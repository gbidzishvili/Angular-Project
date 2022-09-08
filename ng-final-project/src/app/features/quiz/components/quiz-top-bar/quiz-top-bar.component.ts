import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-quiz-top-bar',
  templateUrl: './quiz-top-bar.component.html',
  styleUrls: ['./quiz-top-bar.component.scss']
})
export class QuizTopBarComponent implements OnInit {
  nickname:string;
  constructor() { }

  ngOnInit(): void {
    // this.nickname = this.getUsersDataService.nickname;
    this.nickname = localStorage.getItem("nickname")
    console.log(this.nickname);
    
  }

}
