import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TriviaService } from 'src/app/services/trivia/trivia.service';

@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.component.html',
  styleUrls: ['./trivia.component.css'],
})
export class TriviaComponent implements OnDestroy {
  characters: string[] = this.triviaService.characters;
  started: boolean = false;
  suscription: Subscription | undefined;
  questions: any | undefined;
  currentQuestionIndex: number = 0;
  currentCharacter: string = '';
  mixedOptions: string[] = [];
  score: number = 0;

  constructor(private triviaService: TriviaService) {}

  ngOnDestroy(): void {
    this.suscription?.unsubscribe();
  }

  startGame() {
    this.started = true;
    this.score = 0;
    this.currentQuestionIndex = 0;
    this.questions = [];
    this.mixedOptions = [];
    this.getQuestions();
    this.getCharacter();
  }

  getQuestions() {
    this.suscription = this.triviaService
      .getQuestionsRandom()
      .subscribe((response) => {
        this.questions = response;
        this.mixOptions();
      });
  }

  mixOptions() {
    if (this.questions.results) {
      for (const question of this.questions.results) {
        const options = [
          question.correct_answer,
          ...question.incorrect_answers,
        ];
        this.shuffleArray(options);
        this.mixedOptions.push(...options);
      }
    }
  }

  private shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  getCharacter() {
    this.currentCharacter = this.triviaService.character;
  }

  nextQuestion() {
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex >= this.questions.results.length) {
      this.finishGame();
    }
  }

  verifyAnswer(answer: string) {
    if (
      this.questions.results[this.currentQuestionIndex].correct_answer == answer
    ) {
      this.score++;
    }
    this.nextQuestion();
  }

  finishGame() {
    this.started = false;
  }
}
