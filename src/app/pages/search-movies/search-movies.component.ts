import { Component, computed, effect, inject, signal } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { RouterLink } from '@angular/router';
import { CardComponent } from '../movie-list-page/components/card/card.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounce, debounceTime, map } from 'rxjs';

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
    // je m'abonne à la source de donnée "input" (le champ de saisize)
    this.searchInput.valueChanges
      .pipe(
        map(searchText => searchText ?? ''),
        debounceTime(1000)
      )
      .subscribe(searchText => {
        if (searchText.length) {
          this.movieService.searchMovies(searchText);
          this.movieService.setUserSearchText(searchText)
        }
        else {
          this.movieService.resetSearchMovie()
        }
      });
  }

  ngOnInit() {
    console.log(this.movieService.userSearchText());
    this.searchInput.setValue(this.movieService.userSearchText())
    // this.movieService.resetSearchMovie()
  }

}


