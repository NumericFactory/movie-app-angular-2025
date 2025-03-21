import { Component } from '@angular/core';
import { LoginFormComponent } from "./components/login-form/login-form.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [LoginFormComponent, RouterLink],

  template: `
  <div class="container-sm py-5 bg-light rounded">
    <h1>Connexion</h1>
      <app-login-form></app-login-form>
  </div>
  <div class="container-sm text-center py-2">
    <p>Pas encore inscrit(e)? <a routerLink="/register">Créer un compte</a></p>
  </div>
  `,

  styles: `
  .container-sm {max-width: 576px}
  a { color: orange !important;text-decoration: underline !important;cursor: pointer;}
  `
})
export class LoginPageComponent {

}
