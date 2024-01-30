import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection, limit, orderBy, query } from 'firebase/firestore';
import { collectionData } from 'rxfire/firestore';
import { FirebaseService } from '../firebase/firebase.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class ResultService {
  public currentEmail: string = '';

  constructor(private firebase: FirebaseService) {}

  public ReadTriviaTop() {
    return this.firebase.ReadTop('trivia', 'asc');
  }

  public ReadCardsTop() {
    return this.firebase.ReadTop('cards', 'desc');
  }

  public ReadHangmanTop() {
    return this.firebase.ReadTop('hangman', 'asc');
  }

  public ReadCountdownTop() {
    return this.firebase.ReadTop('countdown', 'asc');
  }

  public SaveTriviaScore(score: string) {
    return this.firebase.SaveScore('trivia', score);
  }

  public SaveCardsScore(score: string) {
    return this.firebase.SaveScore('cards', score);
  }

  public SaveHangmanScore(score: string) {
    return this.firebase.SaveScore('hangman', score);
  }

  public SaveCountdownScore(score: string) {
    return this.firebase.SaveScore('countdown', score);
  }
}
