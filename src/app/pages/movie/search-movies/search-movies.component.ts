import { Component, inject, Signal } from '@angular/core';
import { MovieCardComponent } from '../components/movie-card/movie-card.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, combineLatest, debounceTime, map, Observable, startWith, Subject } from 'rxjs';
import { SearchMoviesStoreService, UserSearchOption } from './data/search-movies-store.service';
import { AsyncPipe } from '@angular/common';
import { SerieCardComponent } from '../components/serie-card/serie-card.component';
import { Movie, isMovie } from '../../../shared/models/movie.model';
import { Serie, isSerie } from '../../../shared/models/serie.model';

@Component({
  selector: 'app-search-movies',
  imports: [MovieCardComponent, SerieCardComponent, ReactiveFormsModule, AsyncPipe],
  templateUrl: './search-movies.component.html',
  styleUrl: './search-movies.component.css'
})
export class SearchMoviesComponent {

  searchInput = new FormControl('');
  public isSerie = isSerie; // fonction type guard pour savoir si c'est une Serie
  public isMovie = isMovie; // fonction type guard pour savoir si c'est un Movie

  // injection du store "SearchMoviesStore"
  searchMoviesStore = inject(SearchMoviesStoreService);
  // expose foundResults à la view HTML (Signal<Movie[] | Serie[]>)
  foundResults: Signal<Movie[] | Serie[]> = this.searchMoviesStore.searchResult;

  /**
   * La Recherche multi-critères est gérée par 3 critères :
   * 1. la saisie de l'utilisateur (input de recherche)
   * 2. le choix de type de recherche (film ou série)
   * 3. la langue de recherche (français / anglais / espagnol / allemand)
   */
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
    ]).subscribe(([searchText, option, language]) => {
      // 1 on store la donnée texte "recherche" de l'utilisateur
      this.searchMoviesStore.setUserSearchText(searchText)
      // 2 si il y a un texte de recherche, 
      //   on execute la request HTTP de récupération des films ou series
      if (searchText.trim().length) {
        this.searchMoviesStore.onSearchMoviesOrSeries({
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
    // on initialise le champ de recherche avec le texte de l'utilisateur
    this.searchInput.setValue(this.searchMoviesStore.userSearchText())
  }

  /**
   * onCategoryChange
   * @description : invoquée au clic du user sur le bouton 'films' ou 'series' 
   * @param searchType 
   */
  onCategoryChange(searchType: UserSearchOption): void {
    this.choice.next(searchType);
  }

}


