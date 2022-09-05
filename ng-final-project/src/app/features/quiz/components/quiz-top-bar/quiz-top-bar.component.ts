import { Component, OnInit } from '@angular/core';
import { GetUsersDataService } from 'src/app/shared/services/get-users-data.service';

@Component({
  selector: 'app-quiz-top-bar',
  templateUrl: './quiz-top-bar.component.html',
  styleUrls: ['./quiz-top-bar.component.scss']
})
export class QuizTopBarComponent implements OnInit {
  nickname
  constructor(private getUsersDataService:GetUsersDataService) { }

  ngOnInit(): void {
    // this.nickname = this.getUsersDataService.nickname;
    this.nickname = localStorage.getItem("nickname")
    console.log(this.nickname);
    
  }

}
