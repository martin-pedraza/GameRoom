import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  logged: boolean = false;
  public currentUser: string = '';

  constructor(private auth: Auth) {
    this.auth.onAuthStateChanged((user: any | null) => {
      if (user) {
        this.logged = true;
        this.currentUser = user.email.split('@')[0] || '';
      } else {
        this.logged = false;
        this.currentUser = '';
      }
    });

    window.addEventListener('beforeunload', () => {
      this.Logout();
    });
  }

  public Signup(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  public Login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  public Logout() {
    return signOut(this.auth);
  }
}
