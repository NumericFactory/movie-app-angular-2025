import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../../shared/services/auth.service';
import { ButtonComponent } from "../../../../../ui/button/button.component";
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AlertService } from '../../../../../shared/services/alert.service';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule, ButtonComponent, MatSnackBarModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {

  loginForm: FormGroup;
  authService = inject(AuthService);
  // injecter alertService pour afficher des messages d'alerte
  alertService = inject(AlertService);

  constructor() {
    this.loginForm = new FormGroup({
      email: new FormControl('fred@gg.co', [Validators.required, Validators.email]),
      password: new FormControl('user123456', [Validators.required, Validators.minLength(6)])
    })
  }

  /**
   * onSubmit
   * Role : vérifier la validité du formulaire loginForm 
   * et appeler une méthode login de AuthService (par exemple)
   */
  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login();
      this.alertService.show('Vous êtes connecté(e)👋', 'OK');
    }
  }

}
