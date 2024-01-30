import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import {
  OrderByDirection,
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { collectionData } from 'rxfire/firestore';
import { UserService } from '../user/user.service';
import { ChatService } from '../chat/chat.service';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(
    private firestore: Firestore,
    private userService: UserService,
    private chatService: ChatService
  ) {}

  public ReadTop(table: string, order: OrderByDirection) {
    const today = new Date().toISOString().split('T')[0];
    const col = collection(this.firestore, table);
    const q = query(
      col,
      where('fecha', '==', today),
      orderBy('puntos', order),
      limit(5)
    );
    return collectionData(q);
  }

  public SaveScore(table: string, score: string) {
    const today = new Date().toISOString().split('T')[0];
    const col = collection(this.firestore, table);
    addDoc(col, {
      fecha: today,
      puntos: score,
      usuario: this.userService.currentUser,
    });
  }

  public async deleteAllRecords() {
    try {
      await this.deleteCollection('trivia');
      await this.deleteCollection('cards');
      await this.deleteCollection('hangman');
      await this.deleteCollection('countdown');
      await this.chatService.deleteOldChats();
    } catch (error) {
      console.error('Error deleting records:', error);
    }
  }

  private async deleteCollection(collectionPath: string) {
    const col = collection(this.firestore, collectionPath);
    const snapshot = await getDocs(col);
    snapshot.forEach((doc) => {
      deleteDoc(doc.ref);
    });
  }
}
