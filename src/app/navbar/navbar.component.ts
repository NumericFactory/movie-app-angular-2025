import { Component, inject, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  authService = inject(AuthService);
  alertService = inject(AlertService);
  isAuthenticated: Signal<boolean> = this.authService.isAuthenticated;

  logout() {
    this.authService.logout();
    this.alertService.show('Vous êtes déconnecté(e)👋', 'OK');
  }
}
