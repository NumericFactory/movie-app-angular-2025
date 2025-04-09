import { computed, inject, Injectable, signal } from '@angular/core';
import { MovieService } from '../../../../shared/services/movie.service';

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
  searchResult = computed(() => this._userSearchOption() === 'movie'
    ? this._foundMovies()
    : this._foundSeries()
  )

  public userSearchText = computed(() => this._userSearchText());

  constructor() { }


  // 3 actions : invoquées par l'interface utilisateur (la page SearchMoviesComponent)

  /**
   * role : recherche des films ou séries selon le type de recherche (film ou série)
   * 
   * @param search: UserSearch
   * search.searchText: texte de recherche (saisie par l'utilisateur)
   * search.option: type de recherche (film ou série)
   * search.language: langue de recherche (français ou anglais) 
   */
  searchMoviesOrSeries(search: UserSearch) {
    if (search.option === 'serie') {
      this._userSearchOption.set('serie');
      this._movieService.searchSeries(search.searchText)
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
   */
  resetSearchMovie(): void {
    this._movieService.resetSearchMovie()
  }

}
