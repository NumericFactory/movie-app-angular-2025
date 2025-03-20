import { Component, effect, inject } from '@angular/core';
import { MovieService } from '../../../shared/services/movie.service';

import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from '../components/card/card.component';

@Component({
  selector: 'app-movie-list-page',
  imports: [CardComponent, ReactiveFormsModule],
  templateUrl: './movie-list-page.component.html',
  styleUrl: './movie-list-page.component.css'
})
export class MovieListPageComponent {

  checkTitle = new FormControl(false)

  // constructor(private movieService: MovieService) { }
  movieService = inject(MovieService);
  movies = this.movieService.movies;

  constructor() {
    effect(() => console.log(this.movies()));
  }

  ngOnInit() {
    this.movieService.getMovies();
  }

  getNextMovies() {
    this.movieService.getMovies();
  }

}
