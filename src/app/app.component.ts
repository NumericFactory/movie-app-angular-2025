import { Component } from '@angular/core';
import { Movie } from './models/movie.model';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'movie-app';

  movie: Movie = {
    title: 'Rambo',
    image: 'https://image.tmdb.org/t/p/w500/67BPUqGcMK4iG97JNNX4GE0sDwo.jpg',
    score: 3
  }

}
