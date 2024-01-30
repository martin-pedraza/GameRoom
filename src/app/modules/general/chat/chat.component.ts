import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/services/chat/chat.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit,AfterViewChecked, OnDestroy {
  @ViewChild('messageContainer') messageContainer: ElementRef | undefined;
  public message: string = '';
  suscription: Subscription | undefined;
  chat: any[] = [];

  constructor(public chatService: ChatService, private userService: UserService) {}

  ngOnDestroy(): void {
    this.suscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.suscription = this.chatService.ReadChat().subscribe((messages) => {
      if (messages.length > this.chat.length) {
        this.scrollToBottom();
      }
      this.chat = messages;
    });
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  CheckUser(){
    return this.userService.currentUser
  } 

  SentMessage(message: string) {
    this.message = '';
    this.chatService.SaveChat(message);
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    if (this.messageContainer) {
      this.messageContainer.nativeElement.scrollTop =
        this.messageContainer.nativeElement.scrollHeight;
    }
  }
}
