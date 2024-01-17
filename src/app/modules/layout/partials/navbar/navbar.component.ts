import { Component, OnDestroy, OnInit } from '@angular/core';
import { Auth, Unsubscribe } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  public correoLogueado: string = '';
  public suscription: Unsubscribe | undefined;
  constructor(
    private userService: UserService,
    private router: Router,
    private auth: Auth
  ) {}

  ngOnDestroy(): void {
    if (this.suscription) {
      this.suscription();
    }
  }
  ngOnInit(): void {
    this.SaveUser();
  }

  public Logout() {
    this.userService.Logout();
    this.userService.logged = false;
    this.router.navigateByUrl('home');
  }

  public SaveUser() {
    this.suscription = this.auth.onAuthStateChanged((user) => {
      if (user && user.email) {
        this.correoLogueado = user.email;
      } else {
        this.correoLogueado = '';
      }
    });
  }
}
