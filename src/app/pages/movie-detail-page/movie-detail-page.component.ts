import { Component, effect, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';
@Component({
  selector: 'app-movie-detail-page',
  imports: [],
  templateUrl: './movie-detail-page.component.html',
  styleUrl: './movie-detail-page.component.css'
})
export class MovieDetailPageComponent {
  movie;
  movieService = inject(MovieService);
  route = inject(ActivatedRoute)

  constructor() {
    const id = this.route.snapshot.params['id'];
    this.movie = this.movieService.getMovie(id);
    effect(() => console.log(this.movie()))
  }

}
