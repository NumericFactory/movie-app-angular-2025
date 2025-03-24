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

  logout() {
    // on suppose que l'API réponse 200 OK 
    // (et le token est supprimé en DB côté serveur et côté client) 
    this.isAuthenticated.set(false);
    this.router.navigate(['/']);
  }

  constructor() { }
}
