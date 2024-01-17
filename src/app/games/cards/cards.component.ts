import { Component, OnInit } from '@angular/core';

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

  constructor() {}

  ngOnInit(): void {
    this.currentCard = this.pickRandomCard();
  }

  onHigher(): void {
    this.nextCard = this.pickRandomCard();
    this.compareCards(true);
  }

  onLower(): void {
    this.nextCard = this.pickRandomCard();
    this.compareCards(false);
  }

  private pickRandomCard(): string {
    const randomIndex = Math.floor(Math.random() * this.cards.length);
    return this.cards[randomIndex];
  }

  private compareCards(higher: boolean) {
    if (higher) {
      if (
        this.cards.indexOf(this.currentCard) <= this.cards.indexOf(this.nextCard)
      ) {
        this.currentCard = this.nextCard;
        this.nextCard = this.back;
        this.gainPoint();
      } else {
        this.loseGame();
      }
    }

    if (!higher) {
      if (
        this.cards.indexOf(this.currentCard) >= this.cards.indexOf(this.nextCard)
      ) {
        this.currentCard = this.nextCard;
        this.nextCard = this.back;
        this.gainPoint();
      } else {
        this.loseGame();
      }
    }
  }

  private gainPoint() {
    this.points++;
  }

  private loseGame() {
    this.gameOver = true;
  }

  public restartGame() {
    this.points = 0;
    this.gameOver = false;
    this.currentCard = this.pickRandomCard();
    this.nextCard = this.back;
  }
}
