import { Component, computed, effect, inject } from '@angular/core';
import { MovieService } from '../../../shared/services/movie.service';

import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from '../components/card/card.component';
import { LoaderService } from '../../../shared/services/loader.service';
import { UserService } from '../../../shared/services/user.service';
import { Movie } from '../../../shared/models/movie.model';

@Component({
  selector: 'app-movie-list-page',
  imports: [CardComponent, ReactiveFormsModule],
  templateUrl: './movie-list-page.component.html',
  styleUrl: './movie-list-page.component.css'
})
export class MovieListPageComponent {
  // injection de dépendance (DI)
  // inject() est une fonction de Angular qui permet d'injecter des dépendances
  movieService = inject(MovieService);
  movies = this.movieService.movies;

  userService = inject(UserService);
  seenMovies = this.userService.seenMovies;

  loaderService = inject(LoaderService);
  isLoading = this.loaderService.loader;

  constructor() {
    // le signal movies(), consommé dans effect() est un "live consumer"
    // car il est dans un contexte de réactivité (la vue HTML | computed() | ou effect())
    effect(() => console.log('je suis réactif : ', this.movies()));
    // en revanche, le même signal movies(), consommé hors d'effect() est un "non-live consumer"
    // il sera éxécuté 1 fois, mais ne sera pas "réactif"
    console.log('je ne suis pas réactif', this.movies())
  }

  ngOnInit() {
    this.movieService.getMovies();
    this.userService.getUserMovies();
  }

  getIsMovieSeen(movie: Movie): boolean {
    return this.seenMovies().includes(movie.id)
  }

  getNextMovies() {
    this.movieService.getMovies();
  }

}
