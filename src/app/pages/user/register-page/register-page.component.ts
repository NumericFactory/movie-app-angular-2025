import { Component } from '@angular/core';
import { RegisterFormComponent } from "./components/register-form/register-form.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register-page',
  imports: [RegisterFormComponent, RouterLink],
  template: `
  <div class="container-sm py-5 bg-light rounded">
    <h1>Inscription</h1>
      <app-register-form></app-register-form>
  </div>
  <div class="container-sm text-center py-2">
    <p>Vous avez déjà un compte ? <a routerLink="/login">Connectez-vous</a></p>
  </div>
  `,
  styles: `
  .container-sm {max-width: 576px}
  a { color: orange !important;text-decoration: underline !important;cursor: pointer;}
  `
})

export class RegisterPageComponent {

}
