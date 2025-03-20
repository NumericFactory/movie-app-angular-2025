import { Component, computed, effect, inject, signal } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { RouterLink } from '@angular/router';
import { CardComponent } from '../movie-list-page/components/card/card.component';

@Component({
  selector: 'app-search-movies',
  imports: [CardComponent],
  templateUrl: './search-movies.component.html',
  styleUrl: './search-movies.component.css'
})
export class SearchMoviesComponent {

  movieService = inject(MovieService);
  foundMovies = this.movieService.foundMovies;

  constructor() {
    console.log(this)
  }

  searchMoviesAction(searchText: string): void {
    // fais la request HTTP
    this.movieService.searchMovies(searchText);
  }

}


