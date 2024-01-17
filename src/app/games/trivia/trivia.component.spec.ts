import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriviaComponent } from './trivia.component';

describe('TriviaComponent', () => {
  let component: TriviaComponent;
  let fixture: ComponentFixture<TriviaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TriviaComponent]
    });
    fixture = TestBed.createComponent(TriviaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
