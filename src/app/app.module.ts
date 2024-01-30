import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './modules/general/home/home.component';
import { LoginComponent } from './modules/general/login/login.component';
import { ErrorComponent } from './modules/general/error/error.component';
import { UserComponent } from './modules/general/user/user.component';
import { NavbarComponent } from './modules/layout/partials/navbar/navbar.component';
import { PrincipalComponent } from './modules/layout/principal/principal.component';
import { SignupComponent } from './modules/general/signup/signup.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { ChatComponent } from './modules/general/chat/chat.component';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { GamesComponent } from './games/games.component';
import { HttpClientModule } from '@angular/common/http';
import { ResultsComponent } from './modules/general/results/results.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorComponent,
    HomeComponent,
    UserComponent,
    NavbarComponent,
    PrincipalComponent,
    SignupComponent,
    ChatComponent,
    GamesComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
