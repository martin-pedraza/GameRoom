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
  ) {}

  ngOnDestroy(): void {
  }
  ngOnInit(): void {
  }

  CheckUser(){
    return this.userService.currentUser
  }

  public Logout() {
    this.userService.Logout();
    this.router.navigateByUrl('home');
  }
}
