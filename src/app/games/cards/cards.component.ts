import { Component, OnInit } from '@angular/core';
import { ResultService } from 'src/app/services/result/result.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent implements OnInit {
  cards: string[] = [
    './../../../assets/cards/0.png',
    './../../../assets/cards/1.png',
    './../../../assets/cards/2.png',
    './../../../assets/cards/3.png',
    './../../../assets/cards/4.png',
    './../../../assets/cards/5.png',
    './../../../assets/cards/6.png',
    './../../../assets/cards/7.png',
    './../../../assets/cards/8.png',
    './../../../assets/cards/9.png',
  ];
  back: string = './../../../assets/cards/dorso.png';
  currentCard: string = '';
  nextCard: string = this.back;
  points: number = 0;
  gameOver: boolean = false;
  disableButton = false;

  constructor(
    private resultService: ResultService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.currentCard = this.pickRandomCard();
  }

  onHigher(): void {
    do {
      this.nextCard = this.pickRandomCard();
    } while (this.nextCard == this.currentCard);
    this.compareCards(true);
  }

  onLower(): void {
    do {
      this.nextCard = this.pickRandomCard();
    } while (this.nextCard == this.currentCard);
    this.compareCards(false);
  }

  private pickRandomCard(): string {
    const randomIndex = Math.floor(Math.random() * this.cards.length);
    return this.cards[randomIndex];
  }

  private compareCards(higher: boolean) {
    if (higher) {
      if (
        this.cards.indexOf(this.currentCard) <=
        this.cards.indexOf(this.nextCard)
      ) {
        this.flipCard();
        this.gainPoint();
      } else {
        this.loseGame();
      }
    }

    if (!higher) {
      if (
        this.cards.indexOf(this.currentCard) >=
        this.cards.indexOf(this.nextCard)
      ) {
        this.flipCard();
        this.gainPoint();
      } else {
        this.loseGame();
      }
    }
  }

  private flipCard() {
    this.disableButton = true;
    setTimeout(() => {
      this.currentCard = this.nextCard;
      this.nextCard = this.back;
      this.disableButton = false;
    }, 1500);
  }

  private gainPoint() {
    this.points++;
  }

  private loseGame() {
    this.saveScore();
    this.gameOver = true;
    this.disableButton = true;
  }

  public restartGame() {
    this.points = 0;
    this.gameOver = false;
    this.disableButton = false;
    this.currentCard = this.pickRandomCard();
    this.nextCard = this.back;
  }

  saveScore() {
    if (this.userService.logged) {
      this.resultService.SaveCardsScore(this.points.toString());
    }
  }
}
