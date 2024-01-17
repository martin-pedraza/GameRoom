import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { Unsubscribe, addDoc, collection, limit, orderBy, query } from 'firebase/firestore';
import { collectionData } from 'rxfire/firestore';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService implements OnInit, OnDestroy {
  public currentEmail: string = '';
  public suscriptionUser: Unsubscribe | undefined;

  constructor(private firestore: Firestore, private auth :Auth) {}

  ngOnDestroy(): void {
    if (this.suscriptionUser) {
      this.suscriptionUser();
    }
  }

  ngOnInit(): void {
  }

  public ReadChat() {
    this.SaveUser();
    const col = collection(this.firestore, 'chat')
    const q = query(col, orderBy('orden', 'asc'));
    return collectionData(q);
  }

  public SaveChat(message :string){
    const col = collection(this.firestore, "chat");
    addDoc(col, {
      mensaje: message,
      orden: Date.now(),
      hora: new Date().toLocaleTimeString(),
      usuario: this.currentEmail.split('@')[0]
    });
    
  }

  public SaveUser() {
    this.suscriptionUser = this.auth.onAuthStateChanged((user) => {
      if (user && user.email) {
        this.currentEmail = user.email;
      }else{
        this.currentEmail = '';
      }
    });
  }
}
