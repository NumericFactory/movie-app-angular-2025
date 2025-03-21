import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated = signal<boolean>(false);

  login() {
    // on suppose que l'API réponse 200 OK
    this.isAuthenticated.set(true);

  }

  constructor() { }
}
