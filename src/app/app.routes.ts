import { Routes } from '@angular/router';
import { MovieListPageComponent } from './pages/movie-list-page/movie-list-page.component';
import { SearchMoviesComponent } from './pages/search-movies/search-movies.component';

export const routes: Routes = [

  // definir des routes ici
  { path: '', component: MovieListPageComponent },
  { path: 'search', component: SearchMoviesComponent }

];
