import { Component } from '@angular/core';
import { ResultService } from 'src/app/services/result/result.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.css'],
})
export class CountdownComponent {
  initialSeconds: number = 9;
  initialMilliseconds: number = 999;
  seconds: number = 0;
  milliseconds: string = '000';
  started: boolean = false;
  stopped: boolean = false;

  constructor(
    private userService: UserService,
    private resultService: ResultService
  ) {}

  startCountdown() {
    this.started = true;
    this.stopped = false;
    this.seconds = this.initialSeconds;
    this.countdownMilliseconds(this.initialMilliseconds);
  }

  countdownMilliseconds(milliseconds: number) {
    if (!this.stopped) {
      if (milliseconds >= 0 && this.seconds >= 0) {
        setTimeout(() => {
          this.milliseconds = milliseconds.toString().padStart(3, '0');
          this.countdownMilliseconds(milliseconds - 9);
        }, 9);
      }

      if (milliseconds < 0 && this.seconds > 0) {
        this.countdownMilliseconds(this.initialMilliseconds);
        this.seconds--;
      }

      if (this.seconds == 0 && milliseconds == 0) {
        this.started = false;
      }
    }
  }

  stopCountdown() {
    this.stopped = true;
    this.saveScore();
  }

  saveScore() {
    if (this.userService.logged) {
      this.resultService.SaveCountdownScore(`${this.seconds}.${this.milliseconds}`);
    }
  }
}
