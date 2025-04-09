import { computed, inject, Injectable, signal } from '@angular/core';
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
  private _foundMovies = this._movieService.foundMovies;
  private _foundSeries = this._movieService.foundSeries;
  private _userSearchText = signal<string>('');
  private _userSearchOption = signal<UserSearchOption>('movie');

  // 2 exposition à la page (SearchMoviesComponent)
  public searchResult = computed(() => this._userSearchOption() === 'movie'
    ? this._foundMovies() // type Signal<Movie[]>
    : this._foundSeries() // type Signal<Serie[]>
  );
  public userSearchText = computed(() => this._userSearchText());

  constructor() { }


  // 3 les actions invoquées par l'interface utilisateur (la page SearchMoviesComponent)

  /**
   * role : répondre à l'action "recherche" de l'utilisateur
   * 
   * @param search: UserSearch
   * search.searchText: texte de recherche (saisie par l'utilisateur)
   * search.option: type de recherche (film ou série)
   * search.language: langue de recherche (français ou anglais) 
   */
  onSearchMoviesOrSeries(search: UserSearch) {
    if (search.option === 'serie') {
      this._userSearchOption.set('serie');
      this._movieService.searchSeries(search.searchText, search.language)
    }
    else {
      this._userSearchOption.set('movie');
      this._movieService.searchMovies(search.searchText, search.language)
    }
  }

  /**
   * role : stocker le texte de recherche de l'utilisateur
   * @param userSearchText : texte de recherche (saisie par l'utilisateur)
   */
  setUserSearchText(userSearchText: string) {
    this._userSearchText.set(userSearchText);
  }

  /**
   * role : réinitialiser recherche de l'utilisateur
   *        avec un tableau vide
   */
  resetSearchMovie(): void {
    this._movieService.resetSearchMovie()
  }

}
