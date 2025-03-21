import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-form',
  imports: [ReactiveFormsModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {

  // J'ai besoin d'injecter MatSnackbar
  notif = inject(MatSnackBar);

  registerForm: FormGroup;
  isSubmitted: boolean = false;

  constructor() {
    this.registerForm = new FormGroup({
      firstname: new FormControl('', [Validators.minLength(2), Validators.maxLength(5)]),
      lastname: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)),
      country: new FormControl('us')
    });
  }

  onSubmitRegisterForm() {
    this.isSubmitted = true;
    if (this.registerForm.valid) {
      // call a method du service
      // Suppose que l'api nous a répondu que l'inscription est OK
      // afficher une notification de succès
      this.notif.open('Votre inscription est OK', 'Fermer', {
        duration: 10000,
        verticalPosition: 'top',
        horizontalPosition: 'end',
        panelClass: 'notif'
      })
    }
    else {
      this.notif.open('Veuillez corriger vos erreurs', 'Fermer', {
        duration: 30000,
        verticalPosition: 'top',
        horizontalPosition: 'end',
        panelClass: 'notif'
      })
    }

    console.log(this.registerForm);
  }

}
