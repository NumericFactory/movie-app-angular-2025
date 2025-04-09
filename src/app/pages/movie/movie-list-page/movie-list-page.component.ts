import { Component, effect, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { LoaderService } from '../../../shared/services/loader.service';
import { Movie } from '../../../shared/models/movie.model';
import { MovieListStoreService } from './data/movie-list-store.service';
import { MovieCardComponent } from '../components/card/movie-card.component';

@Component({
  selector: 'app-movie-list-page',
  imports: [MovieCardComponent, ReactiveFormsModule],
  templateUrl: './movie-list-page.component.html',
  styleUrl: './movie-list-page.component.css'
})
export class MovieListPageComponent {
  // injection de dépendance (DI)
  movieListStore = inject(MovieListStoreService);
  movies = this.movieListStore.movies;
  isLoading = this.movieListStore.loader;

  constructor() {
    // le signal movies(), consommé dans effect() est un "live consumer"
    // car il est dans un contexte de réactivité (la vue HTML | computed() | ou effect())
    effect(() => console.log('je suis réactif : ', this.movies()));
    // en revanche, le même signal movies(), consommé hors d'effect() est un "non-live consumer"
    // il sera éxécuté 1 fois, mais ne sera pas "réactif"
    console.log('je ne suis pas réactif', this.movies())
  }

  getIsMovieSeen(movie: Movie): boolean {
    return this.movieListStore.seenMoviesIds().includes(movie.id)
  }

  getNextMovies() {
    this.movieListStore.getNextMovies()
  }

}
