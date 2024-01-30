import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { ResultService } from 'src/app/services/result/result.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnInit, OnDestroy {
  cardsList: any[] = [];
  cardsSubscription: Subscription | undefined;
  triviaList: any[] = [];
  triviaSubscription: Subscription | undefined;
  hangmanList: any[] = [];
  hangmanSubscription: Subscription | undefined;
  countdownList: any[] = [];
  countdownSubscription: Subscription | undefined;

  constructor(
    private resultService: ResultService,
    private firebase: FirebaseService
  ) {}

  ngOnInit(): void {
    this.cardsSubscription = this.resultService
      .ReadCardsTop()
      .subscribe((cards) => {
        this.cardsList = cards;
        while (this.cardsList.length < 5) {
          this.cardsList.push({ usuario: '...', puntos: '...' });
        }
      });

    this.triviaSubscription = this.resultService
      .ReadTriviaTop()
      .subscribe((trivia) => {
        this.triviaList = trivia;
        while (this.triviaList.length < 5) {
          this.triviaList.push({ usuario: '...', puntos: '...' });
        }
      });

    this.countdownSubscription = this.resultService
      .ReadCountdownTop()
      .subscribe((countdown) => {
        this.countdownList = countdown;
        while (this.countdownList.length < 5) {
          this.countdownList.push({ usuario: '...', puntos: '...' });
        }
      });

    this.hangmanSubscription = this.resultService
      .ReadHangmanTop()
      .subscribe((hangman) => {
        this.hangmanList = hangman;
        while (this.hangmanList.length < 5) {
          this.hangmanList.push({ usuario: '...', puntos: '...' });
        }
      });
  }
  ngOnDestroy(): void {
    this.cardsSubscription?.unsubscribe();
    this.triviaSubscription?.unsubscribe();
    this.hangmanSubscription?.unsubscribe();
    this.countdownSubscription?.unsubscribe();
  }

  restartRecords() {
    this.firebase.deleteAllRecords();
  }
}
