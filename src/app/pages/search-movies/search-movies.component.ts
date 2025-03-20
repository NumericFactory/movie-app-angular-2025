import { Component, computed, effect, inject, signal } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { RouterLink } from '@angular/router';
import { CardComponent } from '../movie-list-page/components/card/card.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-movies',
  imports: [CardComponent, ReactiveFormsModule],
  templateUrl: './search-movies.component.html',
  styleUrl: './search-movies.component.css'
})
export class SearchMoviesComponent {

  movieService = inject(MovieService);
  foundMovies = this.movieService.foundMovies;

  // déclare un objet de la class FormControl
  searchInput = new FormControl('');

  constructor() {
    console.log(this);
    // je m'abonne à la source de donnée "input" (le champ de saisie)
    this.searchInput.valueChanges.subscribe(
      searchText => console.log(searchText)
    )
  }

  searchMoviesAction(searchText: string): void {
    // fais la request HTTP
    this.movieService.searchMovies(searchText);
  }

}


