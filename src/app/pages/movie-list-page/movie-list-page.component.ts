import { Component, inject } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { CardComponent } from "./components/card/card.component";

@Component({
  selector: 'app-movie-list-page',
  imports: [CardComponent],
  templateUrl: './movie-list-page.component.html',
  styleUrl: './movie-list-page.component.css'
})
export class MovieListPageComponent {

  // constructor(private movieService: MovieService) { }
  movieService = inject(MovieService);
  movies = this.movieService.movies;


}
