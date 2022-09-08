import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  random:number;
  index:number;
  finished:boolean=false;
  item;
  nickname;
  correctans=0;
  incorrectans=0;
  color="yellow";
  answer1=null;
  answer2=null;
  answer3=null;
  answer4=null;
  correct_1:boolean=true;
  correct_2:boolean=false;
  correct_3:boolean=false;
  correct_4:boolean=false;
  itemParsed;
  question;
  answer_1=null;
  answer_2=null;
  answer_3=null;
  answer_4=null;
  progress:number=0;
  counter:number=0;
  started:boolean=false;
  next:boolean=false;
  restart:boolean=false;
  ans1clicked:boolean=false;
  ans1checked:boolean=false;
  ans1cleared:boolean=false;
  ans2clicked:boolean=false;
  ans2checked:boolean=false;
  ans2cleared:boolean=false;
  ans3clicked:boolean=false;
  ans3checked:boolean=false;
  ans3cleared:boolean=false;
  ans4clicked:boolean=false;
  ans4checked:boolean=false;
  ans4cleared:boolean=false;
  canClick:boolean=true;
  bad:boolean=false;
  good:boolean=false;
  nice:boolean=false;
  constructor(private http:HttpClient) { }
  ngOnInit(): void {
    this.nickname = localStorage.getItem("nickname");
    this.http.get("https://the-trivia-api.com/api/questions?categories=geography,science&limit=10")
    .subscribe(v=>{
      localStorage.setItem("question2",JSON.stringify(v));
    })
    this.item = localStorage.getItem("question2");
    this.itemParsed = JSON.parse(this.item);
  }
  start(){  
    this.question = this.itemParsed[`${this.counter}`].question;
    this.checkAnswers();
    this.counter++;
    this.started=true;
    this.next=true;
  }
  checkAnswers(){
    let match=0;  
    this.index = 0;
    this.random = Math.floor(Math.random()*4);
    console.log(this.random);
    // id=0,ran=0,match=0
    if(this.index===this.random && match===0){
      this.answer_1=this.itemParsed[`${this.counter}`].correctAnswer;
      match++;
    }else{
      this.answer_1=this.itemParsed[`${this.counter}`].incorrectAnswers[this.index];
      this.index++;
    }
    // id=0,ran=0,match=1
    if(this.index===this.random && match===0){
      this.answer_2=this.itemParsed[`${this.counter}`].correctAnswer;
      match++;
    }else{
      this.answer_2=this.itemParsed[`${this.counter}`].incorrectAnswers[this.index];
      this.index++;
    }
    if(this.index===this.random && match===0){
      this.answer_3=this.itemParsed[`${this.counter}`].correctAnswer;
      match++;
    }else{
      this.answer_3=this.itemParsed[`${this.counter}`].incorrectAnswers[this.index];
      this.index++;
    }
    if(this.index===this.random && match===0){
      this.answer_4=this.itemParsed[`${this.counter}`].correctAnswer;
      match++;
    }else{
      this.answer_4=this.itemParsed[`${this.counter}`].incorrectAnswers[this.index];
      this.index++;
    }
  }
  nextquestion(){
    console.log(this.counter);
    if(this.counter===10) {
      this.incorrectans++;
      this.progress+=10; 
      this.finished=true;
      this.restart=true;
      if(this.correctans>=0 && this.correctans<5){
        this.bad = true;
      }
      if(this.correctans>=5 && this.correctans<8){
        this.good = true;
      }
      if(this.correctans>=8 && this.correctans<=10){
        this.nice = true;
      }
      

    }
    if(this.counter<10){
    this.checkAnswers();
    this.question = this.itemParsed[`${this.counter}`].question;
    this.counter++;
    this.progress+=10; 
    if(this.ans1clicked!==true && this.ans2clicked!==true && this.ans3clicked!==true && this.ans4clicked!==true){
      this.incorrectans++;
    }
    this.ans1clicked=false;
    this.ans2clicked=false;
    this.ans3clicked=false;
    this.ans4clicked=false;
    this.ans1checked=false;
    this.ans2checked=false;
    this.ans3checked=false;
    this.ans4checked=false;
    this.ans1cleared=false;
    this.ans2cleared=false;
    this.ans3cleared=false;
    this.ans4cleared=false;
    this.canClick=true;
    }
  }
  checkAnswer(value,index){
    if(this.canClick){
      this.canClick=false;
    if(value === this.itemParsed[`${this.counter-1}`].correctAnswer){
      this.showAnswer(index);
      this.correctans++;
      console.log("cor" + this.correctans);
      
    }else if(value !== this.itemParsed[`${this.counter-1}`].correctAnswer){
      this.incorrectans++;
      console.log("incor" + this.incorrectans);
      this.ans1clicked=true;
      this.ans2clicked=true;
      this.ans3clicked=true;
      this.ans4clicked=true;
      
        if(0!==this.random ){
          this.ans1cleared=true;
    }else{
      this.ans1checked=true;
    }
        if(1!==this.random ){
          this.ans2cleared=true;
    }else{
      this.ans2checked=true;
    }
        if(2!==this.random ){
          this.ans3cleared=true;
    }else{
      this.ans3checked=true;
    }
        if(3!==this.random ){
          this.ans4cleared=true;
    }else{
      this.ans4checked=true;
    }
  }
  }
}
  showAnswer(index){
    switch(index){
      case 1:
        this.ans1clicked=true; 
        this.ans1checked=true;
      break;
      case 2:
        this.ans2clicked=true;
        this.ans2checked=true;
      break;
      case 3:
        this.ans3clicked=true; 
        this.ans3checked=true;
      break;
      case 4:
        this.ans4clicked=true;
        this.ans4checked=true;
    }
  }
  estimateAnswer(answer,answericlicked,answerichecked,answericleared){
    
    if(answer===this.itemParsed[`${this.counter-1}`].correctAnswer && answericlicked===true){
      
      console.log(this.ans1checked,this.ans2checked,this.ans3checked,this.ans4checked);
      return "correct";
    }
    else if(answer!==this.itemParsed[`${this.counter-1}`].correctAnswer && answericlicked===true){
     
     
      
      return "incorrect";
    }
  }
  restartquiz(){
    this.http.get("https://the-trivia-api.com/api/questions?categories=geography,science&limit=10")
    .subscribe(v=>{
      localStorage.setItem("question2",JSON.stringify(v));
    }),
    (err=>{
      console.log(err.message)
    })
    this.item = localStorage.getItem("question2");
    this.itemParsed = JSON.parse(this.item);
  this.finished=false;
  this.restart=false;
  this.counter=0
  this.progress=0; 
  this.started=false;
  this.next=false;
  this.question=null;
  this.answer_1=null;
  this.answer_2=null;
  this.answer_3=null;
  this.answer_4=null;
  this.correctans=0;
  this.incorrectans = 0;
  this.bad=false;
  this.good=false;
  this.nice=false;
  }
  canDeactivate():Observable<boolean > | Promise<boolean > | boolean  {
    return confirm("Do you want to leave this page?");
  }
}

