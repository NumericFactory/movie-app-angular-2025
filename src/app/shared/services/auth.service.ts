import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated = signal<boolean>(false);
  router = inject(Router)

  login() {
    // on suppose que l'API réponse 200 OK
    this.isAuthenticated.set(true);
    this.router.navigate(['/']);


  }

  constructor() { }
}
