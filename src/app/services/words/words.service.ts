import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WordsService {
  private apiUrl = 'https://random-word-api.herokuapp.com/word';

  constructor(private http: HttpClient) { }

  getRandomWord(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}?number=1`);
  }
}
