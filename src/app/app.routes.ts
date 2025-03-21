import { Routes } from '@angular/router';
import { MovieListPageComponent } from './pages/movie/movie-list-page/movie-list-page.component';
import { MovieDetailPageComponent } from './pages/movie/movie-detail-page/movie-detail-page.component';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [

  // routes publiques
  { path: '', component: MovieListPageComponent },
  {
    path: 'detail/:id', loadChildren: () => import('./pages/movie/movie-detail-page/movie-detail-page.component')
      .then(m => m.MovieDetailPageComponent)
  },
  {
    path: 'search',
    loadChildren: () => import('./pages/movie/search-movies/search-movies.component')
      .then(m => m.SearchMoviesComponent)
  },

  // routes auth
  {
    path: 'login',
    loadChildren: () => import('./pages/user/login-page/login-page.component')
      .then(m => m.LoginPageComponent)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/user/register-page/register-page.component')
      .then(m => m.RegisterPageComponent)
  }

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
