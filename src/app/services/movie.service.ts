import { computed, Injectable, signal } from '@angular/core';
import { movies } from '../data/movie.data';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private _movies_data = signal<Movie[]>(movies);
  public readonly movies = computed(() => this._movies_data());

  constructor() { }
}
