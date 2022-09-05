import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizComponent } from './components/quiz/quiz.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { QuizTopBarComponent } from './components/quiz-top-bar/quiz-top-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    QuizComponent,
    QuizTopBarComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: QuizComponent }]),
    MatIconModule,
    MatProgressBarModule
  ]
})
export class QuizModule { }
