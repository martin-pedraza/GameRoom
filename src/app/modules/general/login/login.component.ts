import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public writtenUser: string = '';
  public writtenPassword: string = '';
  public errors: string = '';

  constructor(private router: Router, private userService: UserService) {}

  public Login(email: string, password: string) {
    this.userService
      .Login(email, password)
      .then((response) => {
        this.errors = '';
        this.router.navigateByUrl('home');
      })
      .catch((error) => {
        this.errors = error.code.split('/', 2)[1];
      });
  }

  public Clear() {
    this.writtenPassword = '';
    this.writtenUser = '';
  }

  public Autofill() {
    this.writtenUser = 'admin@gameroom.com';
    this.writtenPassword = '123456';
  }
}
