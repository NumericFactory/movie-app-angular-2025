import { Component, effect, inject, Signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';
import { DatePipe } from '@angular/common';
import { StarsComponent } from "../movie-list-page/components/stars/stars.component";

@Component({
  selector: 'app-movie-detail-page',
  imports: [DatePipe, StarsComponent],
  templateUrl: './movie-detail-page.component.html',
  styleUrl: './movie-detail-page.component.css'
})
export class MovieDetailPageComponent {

  // injections (services, route)
  movieService = inject(MovieService);
  route = inject(ActivatedRoute)
  movie: Signal<Partial<Movie> | undefined>;

  constructor() {
    const id = this.route.snapshot.params['id'];
    this.movie = this.movieService.getMovie(id);
  }



}
