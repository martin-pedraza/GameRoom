import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TriviaService {
  private apiArt = 'https://opentdb.com/api.php?amount=10&category=25&type=multiple';
  private apiSports = 'https://opentdb.com/api.php?amount=10&category=21&type=multiple';
  private apiHistory = 'https://opentdb.com/api.php?amount=10&category=23&type=multiple';
  private apiGeography = 'https://opentdb.com/api.php?amount=10&category=22&type=multiple';
  private apiScience = 'https://opentdb.com/api.php?amount=10&category=17&type=multiple';
  private apiEntertainment = 'https://opentdb.com/api.php?amount=10&category=11&type=multiple';
  private apiAll = [this.apiArt, this.apiSports, this.apiHistory, this.apiGeography, this.apiScience, this.apiEntertainment];
  public character = "";
  public characters = [
    './../../../assets/trivia/art.png',
    './../../../assets/trivia/sports.png',
    './../../../assets/trivia/history.png',
    './../../../assets/trivia/geography.png',
    './../../../assets/trivia/science.png',
    './../../../assets/trivia/entertainment.png',
  ];

  constructor(private http: HttpClient) { }

  getQuestionsRandom(){
    const index = Math.floor(Math.random() * this.apiAll.length);
    const randomEndpoint = this.apiAll[index];
    this.getCharacter(index);
    return this.http.get(randomEndpoint);
  }

  getCharacter(index :number){
    this.character = this.characters[index];
  }
}
