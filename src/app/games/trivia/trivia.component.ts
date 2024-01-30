import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ResultService } from 'src/app/services/result/result.service';
import { TriviaService } from 'src/app/services/trivia/trivia.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.component.html',
  styleUrls: ['./trivia.component.css'],
})
export class TriviaComponent implements OnDestroy {
  characters: string[] = this.triviaService.characters;
  intro: boolean = true;
  started: boolean = false;
  finished: boolean = false;
  suscription: Subscription | undefined;
  questions: any | undefined;
  currentQuestionIndex: number = 0;
  currentCharacter: string = '';
  mixedOptions: string[] = [];
  score: number = 0;
  disabledButtons = false;

  constructor(
    private triviaService: TriviaService,
    private userService: UserService,
    private resultService: ResultService
  ) {}

  ngOnDestroy(): void {
    this.suscription?.unsubscribe();
  }

  startGame() {
    this.intro = false;
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
    if (this.questions) {
      for (const question of this.questions) {
        const options = [question.correctAnswer, ...question.incorrectAnswers];
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
    if (this.currentQuestionIndex >= this.questions.length) {
      this.finishGame();
    }
  }

  verifyAnswer(answer: string) {
    this.disableButtons();
    if (this.questions[this.currentQuestionIndex].correctAnswer == answer) {
      this.score++;
    }
    this.paintAnswer(answer);

    setTimeout(() => {
      this.nextQuestion();
    }, 2000);
  }

  paintAnswer(answer: string) {
    const correctAnswer =
      this.questions[this.currentQuestionIndex].correctAnswer;

    if (answer !== correctAnswer) {
      const selectedAnswer = document.getElementById(answer);
      if (selectedAnswer) {
        selectedAnswer.style.backgroundColor = 'red';
      }
    }

    const correctAnswerElement = document.getElementById(correctAnswer);
    if (correctAnswerElement) {
      correctAnswerElement.style.backgroundColor = 'green';
    }
  }

  disableButtons() {
    this.disabledButtons = true;
    setTimeout(() => {
      this.disabledButtons = false;
    }, 2000);
  }

  finishGame() {
    this.saveScore();
    this.started = false;
    this.finished = true;
  }

  saveScore() {
    if (this.userService.logged) {
      this.resultService.SaveTriviaScore(`${this.score}`);
    }
  }
}
