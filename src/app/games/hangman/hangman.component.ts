import { Component, OnInit } from '@angular/core';
import { WordsService } from 'src/app/services/words/words.service';

@Component({
  selector: 'app-hangman',
  templateUrl: './hangman.component.html',
  styleUrls: ['./hangman.component.css'],
})
export class HangmanComponent implements OnInit {
  word: string[] = [];
  guess: string[] = [];
  end: boolean = false;
  letters: string[] = [];
  attempts: number = 0;
  images: string[] = [
    './../../../assets/hangman/0.png',
    './../../../assets/hangman/1.png',
    './../../../assets/hangman/2.png',
    './../../../assets/hangman/3.png',
    './../../../assets/hangman/4.png',
    './../../../assets/hangman/5.png',
    './../../../assets/hangman/6.png',
    './../../../assets/hangman/7.png',
  ];
  actualStage = this.images[0];

  constructor(private wordsService: WordsService) {}

  ngOnInit(): void {
    this.getNewWord();
  }

  getNewWord(): void {
    this.wordsService.getRandomWord().subscribe((randomWord: string[]) => {
      this.word = randomWord[0].toUpperCase().split('');
      for (let index = 0; index < this.word.length; index++) {
        this.guess[index] = '_';
      }
    });
  }

  verifyLetter(letter: string) {
    const indices: number[] = [];
    let currentIndex = this.word.indexOf(letter);

    if (currentIndex == -1) {
      if (!this.letters.includes(letter)) {
        this.makeMistake();
        this.letters.push(letter);
      }
      return;
    }

    while (currentIndex !== -1) {
      indices.push(currentIndex);
      currentIndex = this.word.indexOf(letter, currentIndex + 1);
    }

    for (const index of indices) {
      this.guess[index] = letter;
    }

    this.verifyWord();
  }

  verifyWord() {
    this.end = this.word.every((val, index) => val === this.guess[index]);
  }

  restarGame() {
    this.letters = [];
    this.word = [];
    this.getNewWord();
    this.attempts = 0;
    this.updateStage(0);
    this.end = false;
  }

  makeMistake() {
    if (this.attempts < 7) {
      this.attempts++;
      this.updateStage(this.attempts);
    }
    if (this.attempts == 7) {
      this.showWord();
      this.end = true;
    }
  }

  showWord() {
    this.guess = this.word;
  }

  updateStage(index: number) {
    this.actualStage = this.images[index];
  }
}
