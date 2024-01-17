import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { FormsModule } from '@angular/forms';
import { CardsComponent } from 'src/app/games/cards/cards.component';
import { HangmanComponent } from 'src/app/games/hangman/hangman.component';
import { TriviaComponent } from 'src/app/games/trivia/trivia.component';
import { CountdownComponent } from 'src/app/games/countdown/countdown.component';


@NgModule({
  declarations: [CardsComponent, HangmanComponent, TriviaComponent, CountdownComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule
  ]
})
export class HomeModule { }
