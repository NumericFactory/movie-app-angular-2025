import { Component, input } from '@angular/core';
import { Movie } from '../../../../shared/models/movie.model';
import { RouterLink } from '@angular/router';
import { StarsComponent } from '../../../../ui/stars/stars.component';
import { ButtonComponent } from "../../../../ui/button/button.component";
import { NgOptimizedImage } from '@angular/common'

@Component({
  selector: 'ui-movie-card',
  imports: [StarsComponent, RouterLink, ButtonComponent, NgOptimizedImage],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css'
})
export class MovieCardComponent {

  /* 
    la fonction input() permet de récuper des données en entrée
    passées depuis le component parent 
    exemple ici dans le component MovieListPage
    <ui-card [movie]="movieObject" />
  */
  movie = input.required<Movie>();
  isMovieSeen = input<boolean>(false)

}
