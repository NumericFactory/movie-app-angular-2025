import { Component, inject, Signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../../shared/services/movie.service';
import { Movie } from '../../../shared/models/movie.model';
import { CommonModule, DatePipe } from '@angular/common';
import { StarsComponent } from "../../../ui/stars/stars.component";
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
    // récupération du paramètre "id" passé dans la route (url)
    const id = this.route.snapshot.params['id'];
    this.movie = this.movieService.getMovie(id);
  }

  /**
   * getSafeVideoUrl()
   * Role : bypass la sécurité Angular 
   * doc : https://angular.dev/api/platform-browser/DomSanitizer#description
   * @param url void
   * @returns  SafeResourceUrl | null
   */
  getSafeVideoUrl(url: string | undefined): SafeResourceUrl | null {
    console.log(url)
    if (url) {
      return this.sanitize.bypassSecurityTrustResourceUrl(url)
    }
    return null
  }



}
