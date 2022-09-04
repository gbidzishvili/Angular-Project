import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  finished=false;
  item;
  itemParsed;
  question;
  answer_1;
  answer_2;
  answer_3;
  answer_4;
  progress=0;
  counter=0;
  started=false;
  next=false;
  restart=false;
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
   
 
    this.http.get("https://the-trivia-api.com/api/questions?categories=geography,science&limit=10")
    .subscribe(v=>{
      
      // console.log( this.progress);
      
      localStorage.setItem("question2",JSON.stringify(v));
   
    })
    this.item = localStorage.getItem("question2");
    this.itemParsed = JSON.parse(this.item);
  }
  getData(){
     
      this.answer_1 = this.itemParsed[`${this.counter}`].correctAnswer;
     
     
        this.answer_2 = this.itemParsed[`${this.counter}`].incorrectAnswers[0]
    
          this.answer_3 = this.itemParsed[`${this.counter}`].incorrectAnswers[1]
      
       
            this.answer_4 = this.itemParsed[`${this.counter}`].incorrectAnswers[2]

        this.question = this.itemParsed[`${this.counter}`].question;
    this.counter++;
   
    this.started=true;
    this.next=true;
  }
  nextquestion(){
    if(this.counter===10) {
      
      this.progress+=10; 
      this.finished=true;
      this.restart=true;
    }
    if(this.counter<10){
    this.answer_1 = this.itemParsed[`${this.counter}`].correctAnswer;
    this.answer_2 = this.itemParsed[`${this.counter}`].incorrectAnswers[0]
    this.answer_3 = this.itemParsed[`${this.counter}`].incorrectAnswers[1]
    this.answer_4 = this.itemParsed[`${this.counter}`].incorrectAnswers[2]
    this.question = this.itemParsed[`${this.counter}`].question;
       this.counter++;
      this.progress+=10; 
    }
    
console.log(this.counter);

  }
  restartquiz(){}
}

