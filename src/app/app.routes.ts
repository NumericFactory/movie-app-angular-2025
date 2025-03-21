import { Routes } from '@angular/router';
import { MovieListPageComponent } from './pages/movie/movie-list-page/movie-list-page.component';
import { SearchMoviesComponent } from './pages/movie/search-movies/search-movies.component';
import { MovieDetailPageComponent } from './pages/movie/movie-detail-page/movie-detail-page.component';
import { RegisterPageComponent } from './pages/user/register-page/register-page.component';
import { LoginPageComponent } from './pages/user/login-page/login-page.component';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [

  // Pages publiques
  { path: '', component: MovieListPageComponent },
  { path: 'detail/:id', component: MovieDetailPageComponent },
  { path: 'search', component: SearchMoviesComponent },

  // routes auth
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },

  /* routes protégées (avec un/des guard(s))
    exemples : 
    { path: 'user/profile', canActivate: [authGuard], component: UserProfilePageComponent },
    { path: 'user/profile', canDeactivate: [authGuard], component: EditDocumentPageComponent }

    Explication : 
    ** un guard "canActivate" empêche/autorise la navigation sur la route cible
    ** un guard "canDeactivate" empêche/autorise la sortie de la page courante
    ** Doc : https://angular.dev/api/router/CanActivateFn
  */

];
