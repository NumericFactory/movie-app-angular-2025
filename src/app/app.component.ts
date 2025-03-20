import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { LoaderComponent } from './ui/loader/loader.component';
import { LoaderService } from './shared/services/loader.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'movie-app';

  loaderService = inject(LoaderService);
  loader = this.loaderService.loader;

}
