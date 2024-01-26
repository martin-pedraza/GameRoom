import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { CardsComponent } from 'src/app/games/cards/cards.component';
import { HangmanComponent } from 'src/app/games/hangman/hangman.component';
import { GamesComponent } from 'src/app/games/games.component';
import { TriviaComponent } from 'src/app/games/trivia/trivia.component';
import { CountdownComponent } from 'src/app/games/countdown/countdown.component';
import { LoggedUserGuard } from 'src/app/guards/logged.guard';

const routes: Routes = [
  {
    path:"",
    component: HomeComponent,
    children: [
      {
        path: "",
        component: GamesComponent,
      },
      {
        path: "cards",
        component: CardsComponent,
      },
      {
        path: "hangman",
        component: HangmanComponent,
      },
      {
        path: "trivia",
        component: TriviaComponent,
      },
      {
        path: "countdown",
        component: CountdownComponent,
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
