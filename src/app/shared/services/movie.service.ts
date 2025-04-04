import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { Movie, MovieBuilder } from '../../shared/models/movie.model';
import { HttpClient } from '@angular/common/http';
import { delay, map, tap } from 'rxjs';
import { MovieResponseAPI } from '../dto/movie.dto';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  // injection HttpClient (pour faire des requests Http)
  private http = inject(HttpClient);
  BASE_URL = 'https://api.themoviedb.org/3';

  // STORE/EXPOSE DATA from /discover/movies
  private _movies_data = signal<Movie[]>([]);
  public readonly movies = computed(() => this._movies_data());

  // STORE/EXPOSE DATA from search/movie/[id]
  private _foundMovies_data = signal<Movie[]>([]);
  public readonly foundMovies = computed(() => this._foundMovies_data());
  private _userSearchText = signal<string>('');
  public userSearchText = computed(() => this._userSearchText());

  // STATE "currentMoviesPage"
  currentMoviesPage = 0;

  /**
   * role: getMovies from tmbd API
   * url : /discover/movies  
   * @returns void
   */
  getMovies(): void {
    this.currentMoviesPage++;
    // 1 je construis la request HTTP
    this.http.get<Movie[]>(this.BASE_URL + '/discover/movie', {
      params: { 'language': 'fr', 'page': this.currentMoviesPage }
    })
      // 2 MAP de la réponse API en Movie[]
      .pipe(
        map((response: any) => response.results.map((movieFromApi: MovieResponseAPI) => MovieBuilder.fromAPI(movieFromApi))),
        // 3 je set la valeur du signal avec le tableau des films reçus de l'API (et préalablement mappé)
        tap((data: Movie[]) => {
          console.log(data);
          this._movies_data.update((currentValue) => [...currentValue, ...data]);
        })

      )
      .subscribe()
  }

  /**
  * role: getMovie from tmbd API
  * url : /discover/movies  
  * @description transform Observable to Signal
  * @argument id: number
  * @returns Signal<Partial<Movie> | undefined>
  */
  getMovie(id: number): Signal<Partial<Movie>> {
    return toSignal(
      this.http.get<Movie>(this.BASE_URL + `/movie/${id}`, {
        params: { 'language': 'fr', 'append_to_response': 'videos,credits' }
      }).pipe(
        map((response: any) => MovieBuilder.fromAPI(response))
      ),
      { initialValue: {} as Partial<Movie> }
      // initialValue permet de définir une valeur initiale pour le signal
      // car toSignal() retourne un signal qui vaut undefined 
      // tant que la requête n'a pas été effectuée
    )
  }


  /**
   * role: searchMovies from tmbd API
   * url : /search/movie
   * @argument searchText: string
   * @returns void
   */
  searchMovies(userSearchText: string): void {
    this.http.get(this.BASE_URL + '/search/movie', {
      headers: {},
      params: {
        'query': userSearchText,
        'language': 'fr'
      },
    })
      .pipe(
        map((response: any) => response.results.map((item: any) => MovieBuilder.fromAPI(item))),
        tap((data: any) => this._foundMovies_data.set(data))
      )
      .subscribe()
  }


  setUserSearchText(userSearchText: string) {
    this._userSearchText.set(userSearchText);
  }
  /**
   * role: resetSearchMovie
   * @returns void
   */
  resetSearchMovie(): void {
    this._foundMovies_data.set([])
  }

}
