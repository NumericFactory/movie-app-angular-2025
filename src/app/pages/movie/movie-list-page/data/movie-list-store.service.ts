import { computed, effect, inject, Injectable } from '@angular/core';
import { MovieService } from '../../../../shared/services/movie.service';
import { UserService } from '../../../../shared/services/user.service';
import { AuthService } from '../../../../shared/services/auth.service';
import { LoaderService } from '../../../../shared/services/loader.service';

@Injectable({
  providedIn: 'root'
})
export class MovieListStoreService {

  // 1 injecter les dépendances (services)
  movieService = inject(MovieService);
  userService = inject(UserService);
  authService = inject(AuthService);
  loaderService = inject(LoaderService);
  private _movies_from_tmdb = this.movieService.movies;
  private _seenMovies = this.userService.seenMovies;

  // 2 exposer les données au component (movie-list-page)
  movies = computed(() => this._movies_from_tmdb());

  moviesFilterBySeen = computed(() => this._movies_from_tmdb().filter(
    movie => this._seenMovies().includes(movie.id)
  ))

  seenMoviesIds = computed(() => this._seenMovies());
  loader = computed(() => this.loaderService.loader);

  constructor() {
    this.movieService.getMovies();
    effect(() => {
      if (this.authService.isAuthenticated()) {
        this.userService.getUserMovies();
      }
    })
  }

  // 3 creer des méthodes
  getNextMovies() {
    this.movieService.getMovies();
  }

}
