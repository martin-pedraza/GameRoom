import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TriviaService {
  private apiArt = 'https://the-trivia-api.com/v2/questions?categories=art';
  private apiSports = 'https://the-trivia-api.com/v2/questions?categories=sports';
  private apiHistory = 'https://the-trivia-api.com/v2/questions?categories=history';
  private apiGeography = 'https://the-trivia-api.com/v2/questions?categories=geography';
  private apiScience = 'https://the-trivia-api.com/v2/questions?categories=science';
  private apiEntertainment = 'https://the-trivia-api.com/v2/questions?categories=film_and_tv';
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
