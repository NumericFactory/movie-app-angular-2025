import { computed, inject, Injectable, signal } from '@angular/core';
import { Movie, MovieBuilder } from '../models/movie.model';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';
import { MovieResponseAPI } from '../dto/movie.dto';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class MovieService {


  BASE_URL = 'https://api.themoviedb.org/3';

  private _movies_data = signal<Movie[]>([]);
  public readonly movies = computed(() => this._movies_data());
  private http = inject(HttpClient);

  // private _selectedMovie = signal<Movie>();


  currentMoviesPage = 0;


  getMovies() {
    this.currentMoviesPage++;
    // 1 je construis la request HTTP
    this.http.get(this.BASE_URL + '/discover/movie', {
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
   * récuperer un film par son id
  */
  getMovie(id: number) {
    // https://api.themoviedb.org/3/movie/[id]
    return toSignal(this.http.get(
      this.BASE_URL + '/movie/' + id, {
      params: { 'append_to_response': 'videos,credits', 'language': 'fr' }
    }).pipe(
      map((movieFromApi) => MovieBuilder.fromAPI(movieFromApi))
    ))
  }


  constructor() { }
}
