import { Component, inject, Signal } from '@angular/core';
import { MovieCardComponent } from '../components/movie-card/movie-card.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, combineLatest, debounceTime, map, Observable, startWith, Subject, switchMap } from 'rxjs';
import { SearchMoviesStoreService, UserSearch, UserSearchOption } from './data/search-movies-store.service';
import { SerieCardComponent } from '../components/serie-card/serie-card.component';
import { isMovie } from '../../../shared/models/movie.model';
import { isSerie } from '../../../shared/models/serie.model';

@Component({
  selector: 'app-search-movies',
  imports: [MovieCardComponent, SerieCardComponent, ReactiveFormsModule],
  templateUrl: './search-movies.component.html',
  styleUrl: './search-movies.component.css'
})
export class SearchMoviesComponent {
  public isSerie = isSerie; // fonction type guard pour savoir si c'est une Serie
  public isMovie = isMovie; // fonction type guard pour savoir si c'est un Movie

  // injection du store "SearchMoviesStore"
  public searchMoviesStore = inject(SearchMoviesStoreService);

  /**
   * COMMENT GERER la Recherche multi-critères avec RxJs ?
   * 1. la saisie de l'utilisateur (input de recherche)
   * 2. le choix de type de recherche (film ou série)
   * 3. la langue de recherche (français / anglais / espagnol / allemand)
   */
  // critere 1 : champ saisie user / <input>
  searchInput = new FormControl<string>('');
  searchInputWithDebounce: Observable<string> = this.searchInput.valueChanges.pipe(
    map(searchText => searchText ?? ''),
    debounceTime(500) // attend l'arrêt de la saisie user apres 500ms
  );
  // critere 2 : type de recherche film ou série / <button>
  choice = new BehaviorSubject<UserSearchOption>('movie');
  // critere 3 : langue de recherche français / <select> // valeur par défaut : 'fr-FR'
  language = new FormControl<string>('fr-FR', { nonNullable: true });

  constructor() {
    /**
     * REAGIR A LA RECHERCHE MULTI-CRITERES ! 
     * l'opérateur RxJs "combineLatest" permet de combiner plusieurs observables
     * 
     * * Très UTILE pour combiner plusieurs flux de données, et réagir à leurs changements
     * * et gérer des interfaces utilisateur de recherche multi-critères
     * *
     * * ici, on combine les 3 observables : 
     * * >searchInputWithDebounce, >choice et >language
     * * lorsque l'un des observables émet une nouvelle valeur
     * * on exécute la fonction de callback de subscribe :  
     * *  - qui met à jour l'état de "userSearchObject" dans le store
     * *  - ou réinitialise la recherche si le champ de saisie est vide
     */
    combineLatest([
      this.searchInputWithDebounce, // observable de la saisie user
      this.choice, // observable du type de recherche (film ou série)
      this.language.valueChanges.pipe(startWith('fr-FR')) // observable de la langue (français ou anglais)
    ])
      .subscribe(([searchText, option, language]) => {
        searchText = searchText.trim();
        // mettre à jour : l'état de "userSearchObject" dans le store
        if (searchText.trim().length) {
          this.searchMoviesStore.userSearchObject.set({ searchText, option, language });
        } else {
          return this.searchMoviesStore.resetSearchMovie();
        }
      });
  }

  ngOnInit() {
    // on initialise le champ de saisie de recherche
    this.searchInput.setValue(this.searchMoviesStore.userSearchObject().searchText)
    // on initialise le select (choix de la langue)
    this.language.setValue(this.searchMoviesStore.userSearchObject().language);
    // on initialise le type de recherche (mobie ou série)
    this.choice.next(this.searchMoviesStore.userSearchObject().option);
  }

  /**
   * @description : invoquée au clic du user sur le bouton 'films' ou 'series' 
   * @param searchType 
   */
  onCategoryChange(searchType: UserSearchOption): void {
    this.choice.next(searchType); // on met à jour le type de recherche (film ou série)
  }

}
