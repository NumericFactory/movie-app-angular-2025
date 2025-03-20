import { Component, effect, inject, Signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';
import { CommonModule, DatePipe } from '@angular/common';
import { StarsComponent } from "../movie-list-page/components/stars/stars.component";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-detail-page',
  imports: [DatePipe, StarsComponent, CommonModule],
  templateUrl: './movie-detail-page.component.html',
  styleUrl: './movie-detail-page.component.css'
})
export class MovieDetailPageComponent {

  // injections (MovieService, ActivatedRoute, DomSanitize)
  movieService = inject(MovieService);
  route = inject(ActivatedRoute);
  sanitize = inject(DomSanitizer);

  movie: Signal<Partial<Movie>>;

  constructor() {
    const id = this.route.snapshot.params['id'];
    this.movie = this.movieService.getMovie(id);
  }

  getSafeVideoUrl(url: string | undefined) {
    console.log(url)
    if (url) {
      return this.sanitize.bypassSecurityTrustResourceUrl(url)
    }
    return null
  }



}
