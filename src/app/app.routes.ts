import { Routes } from '@angular/router';
import { MovieListPageComponent } from './pages/movie-list-page/movie-list-page.component';
import { SearchMoviesComponent } from './pages/search-movies/search-movies.component';
import { MovieDetailPageComponent } from './pages/movie/movie-detail-page/movie-detail-page.component';

export const routes: Routes = [

  // definir des routes ici
  { path: '', component: MovieListPageComponent },
  { path: 'detail/:id', component: MovieDetailPageComponent },
  { path: 'search', component: SearchMoviesComponent }

];
