import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizComponent } from './components/quiz/quiz.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { QuizTopBarComponent } from './components/quiz-top-bar/quiz-top-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    QuizComponent,
    QuizTopBarComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: QuizComponent }]),
    // BrowserAnimationsModule,
    MatProgressBarModule
  ]
})
export class QuizModule { }
