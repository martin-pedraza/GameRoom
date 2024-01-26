import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './modules/general/error/error.component';
import { PrincipalComponent } from './modules/layout/principal/principal.component';
import { ChatComponent } from './modules/general/chat/chat.component';
import { LoggedUserGuard } from './guards/logged.guard';
import { ResultsComponent } from './modules/general/results/results.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: PrincipalComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./modules/general/home/home.module').then(
            (mod) => mod.HomeModule
          ),
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./modules/general/user/user.module').then(
            (mod) => mod.UserModule
          ),
      },
      {
        path: 'login',
        loadChildren: () =>
          import('./modules/general/login/login.module').then(
            (mod) => mod.LoginModule
          ),
      },
      {
        path: 'signup',
        loadChildren: () =>
          import('./modules/general/signup/signup.module').then(
            (mod) => mod.SignupModule
          ),
      },
      {
        path: 'chat',
        component: ChatComponent,
        canActivate: [LoggedUserGuard],
      },
      {
        path: 'results',
        component: ResultsComponent,
        canActivate: [LoggedUserGuard],
      },
    ],
  },
  {
    path: '**',
    component: ErrorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
