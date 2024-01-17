import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  public writtenUser: string = '';
  public writtenPassword: string = '';
  public errorMessage: string = '';

  constructor(private router: Router, private userService: UserService) {}

  public Signup(email: string, password: string) {
    this.userService
      .Signup(email, password)
      .then((response) => {
        this.errorMessage = '';
        this.router.navigateByUrl('home');
      })
      .catch((error) => {
        this.errorMessage = error.code.split('/', 2)[1];
      });
  }

  public Clear() {
    this.writtenPassword = '';
    this.writtenUser = '';
  }
}
