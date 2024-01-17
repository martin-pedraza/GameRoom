import { Injectable, OnDestroy, OnInit } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnInit, OnDestroy {
  logged: boolean = false;
  constructor(private auth: Auth) {}

  ngOnDestroy(): void {}
  ngOnInit(): void {}

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
