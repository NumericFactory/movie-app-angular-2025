import { Component, inject } from '@angular/core';
import { MovieService } from '../../../shared/services/movie.service';
import { CardComponent } from '../components/card/card.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, map } from 'rxjs';
import { SearchMoviesStoreService } from './data/search-movies-store.service';

@Component({
  selector: 'app-search-movies',
  imports: [CardComponent, ReactiveFormsModule],
  templateUrl: './search-movies.component.html',
  styleUrl: './search-movies.component.css'
})
export class SearchMoviesComponent {

  searchMoviesStore = inject(SearchMoviesStoreService);
  foundMovies = this.searchMoviesStore.searchResult;

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
        // store la donnée texte "recherche" de l'utilisateur
        this.searchMoviesStore.setUserSearchText(searchText)
        if (searchText.length) {
          // execute la request HTTP de récupération des films
          this.searchMoviesStore.searchMovies(searchText)
        }
        else {
          this.searchMoviesStore.resetSearchMovie()
        }
      });
  }

  ngOnInit() {
    console.log(this.searchMoviesStore.userSearchText());
    this.searchInput.setValue(this.searchMoviesStore.userSearchText())
  }

}


