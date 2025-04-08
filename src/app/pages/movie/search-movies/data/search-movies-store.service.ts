import { computed, inject, Injectable, signal } from '@angular/core';
import { MovieService } from '../../../../shared/services/movie.service';

@Injectable({
  providedIn: 'root'
})
/**
 * Le STORE "SearchMovieStore" est une facade entre : 
 * - l'interface utilisateur (la page "SearchMoviesComponent")
 * - et le service ("MovieService")
 * 
 * La page (component) se source directement sur son "STORE" de données et méthodes
 * 
 * Pourquoi ? Cela permet de découpler le component du Service et d'offir à la page 
 * des données et des méthodes qui match avec l'interface utilisateur
 */
export class SearchMoviesStoreService {

  // 1 injection services et données (depuis MovieService)
  private _movieService = inject(MovieService);
  private _foundMovies = this._movieService.foundMovies;
  private _userSearchText = signal<string>('');
  public userSearchText = computed(() => this._userSearchText());

  // 2 exposition à la page (SearchMoviesComponent)
  searchResult = computed(() => this._foundMovies())

  constructor() { }

  // 3 actions : invoquées par l'interface utilisateur (la page SearchMoviesComponent)
  searchMovies(search: string) {
    this._movieService.searchMovies(search)
  }

  setUserSearchText(userSearchText: string) {
    this._userSearchText.set(userSearchText);
  }

  resetSearchMovie(): void {
    this._movieService.resetSearchMovie()
  }

}
