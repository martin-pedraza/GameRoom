import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { collectionData } from 'rxfire/firestore';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private firestore: Firestore, private userService: UserService) {}

  public async deleteOldChats() {
    try {
      const today = new Date().toISOString().split('T')[0];

      const col = collection(this.firestore, 'chat');
      const q = query(col, where('fecha', '<', today));
      const snapshot = await getDocs(q);

      snapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
    } catch (error) {
      console.error('Error deleting old chats:', error);
    }
  }

  public ReadChat() {
    const today = new Date().toISOString().split('T')[0];
    const col = collection(this.firestore, 'chat');
    const q = query(col, where('fecha', '==', today), orderBy('orden', 'asc'));
    return collectionData(q);
  }

  public SaveChat(message: string) {
    const today = new Date().toISOString().split('T')[0];
    const col = collection(this.firestore, 'chat');
    addDoc(col, {
      mensaje: message,
      orden: Date.now(),
      fecha: today,
      hora: new Date().toLocaleTimeString(),
      usuario: this.userService.currentUser,
    });
  }
}
