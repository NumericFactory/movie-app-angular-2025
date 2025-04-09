import { Component, inject } from '@angular/core';
import { MovieCardComponent } from '../components/card/movie-card.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, combineLatest, debounceTime, map, Observable, startWith, Subject } from 'rxjs';
import { SearchMoviesStoreService, UserSearchOption } from './data/search-movies-store.service';

import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-search-movies',
  imports: [MovieCardComponent, ReactiveFormsModule, AsyncPipe],
  templateUrl: './search-movies.component.html',
  styleUrl: './search-movies.component.css'
})
export class SearchMoviesComponent {

  searchInput = new FormControl('');

  // injection du store de données "SearchMoviesStore"
  searchMoviesStore = inject(SearchMoviesStoreService);
  foundResults = this.searchMoviesStore.searchResult;

  // critere 1 : saisie user / déclarer un objet de la class FormControl
  searchInputWithDebounce: Observable<string> = this.searchInput.valueChanges.pipe(
    map(searchText => searchText ?? ''),
    debounceTime(500) // attend l'arrêt de la saisie user apres 500ms
  );

  // critere 2 : type de recherche (film ou série) 
  choice = new BehaviorSubject<UserSearchOption>('movie');

  // critere 3 : langue de recherche (français ou anglais)
  language = new FormControl<string>('fr-FR', { nonNullable: true });

  constructor() {
    /**
     * * l'opérateur RxJs "combineLatest" permet de combiner plusieurs observables
     * 
     * * Très UTILE pour combiner plusieurs flux de données, et réagir à leurs changements
     * * et gérer des interfaces utilisateur de recherche multi-critères
     * *
     * * ici, on combine les 3 observables : searchInputWithDebounce, choice et language
     * * lorsque l'un des observables émet une nouvelle valeur
     * * on exécute la fonction de callback de subscribe 
     */
    combineLatest([
      this.searchInputWithDebounce, // observable de la saisie user
      this.choice, // observable du type de recherche (film ou série)
      this.language.valueChanges.pipe(startWith('fr-FR')) // observable de la langue (français ou anglais)
    ]
    )
      .subscribe(([searchText, option, language]) => {
        // 1 store la donnée texte "recherche" de l'utilisateur
        this.searchMoviesStore.setUserSearchText(searchText)
        // 2 si il y a un texte de recherche, 
        //   on execute la request HTTP de récupération des films ou series
        if (searchText.length) {
          this.searchMoviesStore.searchMoviesOrSeries({
            searchText: searchText,
            option: option,
            language: language
          })
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

  /**
   * onCategoryChange
   * @param searchType 
   */
  onCategoryChange(searchType: UserSearchOption): void {
    this.choice.next(searchType);
  }

}


