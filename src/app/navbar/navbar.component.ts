import { Component, inject, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  authService = inject(AuthService);
  isAuthenticated: Signal<boolean> = this.authService.isAuthenticated;

  logout() {
    this.authService.logout();
  }
}
