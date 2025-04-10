import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { MovieService } from '../../../../shared/services/movie.service';
import { Movie } from '../../../../shared/models/movie.model';
import { Serie } from '../../../../shared/models/serie.model';

export type UserSearchOption = 'movie' | 'serie';

export type UserSearch = {
  searchText: string,
  option: UserSearchOption,
  language: string
}

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

  // 2 exposition à la page (SearchMoviesComponent)
  // on expose l'état de la recherche de l'utilisateur
  public userSearchObject = signal<UserSearch>({
    searchText: '',
    option: 'movie',
    language: 'fr-FR'
  });
  // on expose l'état du signal searchResult (liste de Movie ou Serie)
  public searchResult = signal<Movie[] | Serie[]>([]);

  constructor() {
    /**
     * effect : permet de réagir à un changement de valeur d'un signal
     * role : réagir à l'action "recherche" de l'utilisateur  (userSearchObject)
     * 
     * userSearchObject est un signal qui contient un objet avec 3 propriétés :
     * - searchText: texte de recherche (saisie par l'utilisateur)
     * - option: type de recherche (movie ou serie)
     * - language: langue de recherche (français ou anglais) 
     */
    effect(() => {
      this.userSearchObject().option === 'movie'
        ? this._movieService.searchMovies(this.userSearchObject())
          .subscribe((movies: Movie[]) => {
            this.searchResult.set(movies);
          })
        : this._movieService.searchSeries(this.userSearchObject())
          .subscribe((series: Serie[]) => {
            this.searchResult.set(series);
          });
    });
  }

  /**
   * role : réinitialiser recherche de l'utilisateur
   *        avec un tableau vide
   */
  resetSearchMovie(): void {
    this._movieService.resetSearchMovie()
  }

}
