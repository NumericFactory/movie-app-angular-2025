import { Component, inject } from '@angular/core';
import { MovieService } from '../../../shared/services/movie.service';
import { CardComponent } from '../components/card/card.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, map } from 'rxjs';

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
    // je m'abonne à la source de donnée "input" (le champ de saisie)
    this.searchInput.valueChanges
      .pipe(
        map(searchText => searchText ?? ''),
        // debounce : attend l'arrêt de la saisie user apres 1s
        debounceTime(1000)
      )
      .subscribe(searchText => {
        if (searchText.length) {
          // execute la request HTTP de récupération des films
          this.movieService.searchMovies(searchText);
          // store la donnée texte "recherche" de l'utilisateur
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
  }

}


