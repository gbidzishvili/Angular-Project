import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizTopBarComponent } from './quiz-top-bar.component';

describe('QuizTopBarComponent', () => {
  let component: QuizTopBarComponent;
  let fixture: ComponentFixture<QuizTopBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizTopBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizTopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
