import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ButtonComponent } from "../../../../../ui/button/button.component";
import { AlertService } from '../../../../../shared/services/alert.service';

@Component({
  selector: 'app-register-form',
  imports: [ReactiveFormsModule, MatButtonModule, MatSnackBarModule, ButtonComponent],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {

  // injecter alertService pour afficher des messages d'alerte
  alertService = inject(AlertService);

  registerForm: FormGroup;
  isSubmitted: boolean = false;

  constructor() {
    /**
    * Créer une instance de FormGroup
    */
    this.registerForm = new FormGroup({
      firstname: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)),
      country: new FormControl('fr')
    });
  }

  /**
   * onSubmitRegisterForm()
   * Role : vérifier la validité du formulaire registerForm 
   * et appeler une méthode createUser de AuthService (par exemple)
   */
  onSubmitRegisterForm() {
    console.log(this.registerForm);
    this.isSubmitted = true;
    if (this.registerForm.valid) {
      // 1. call une method du service pour poster les données (registerForm.value)
      // 2. Suppose que l'api nous a répondu que l'inscription est OK
      // 3. on affiche une notification de succès
      this.alertService.show('Vous êtes déconnecté(e)👋', 'OK');
    }
    else {
      // afficher un message d'erreur
      this.alertService.show('Veuillez corriger vos erreurs', 'OK');
    }


  }

}
