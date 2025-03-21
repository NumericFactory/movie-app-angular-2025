import { Routes } from '@angular/router';
import { MovieListPageComponent } from './pages/movie/movie-list-page/movie-list-page.component';
import { SearchMoviesComponent } from './pages/movie/search-movies/search-movies.component';
import { MovieDetailPageComponent } from './pages/movie/movie-detail-page/movie-detail-page.component';
import { RegisterPageComponent } from './pages/user/register-page/register-page.component';
import { LoginPageComponent } from './pages/user/login-page/login-page.component';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [

  // definir des routes ici
  { path: '', component: MovieListPageComponent },
  { path: 'detail/:id', component: MovieDetailPageComponent },
  { path: 'search', canActivate: [authGuard], component: SearchMoviesComponent },

  // routes auth
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },

];
