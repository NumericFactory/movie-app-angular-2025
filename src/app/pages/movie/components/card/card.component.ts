import { Component, input } from '@angular/core';
import { Movie } from '../../../../shared/models/movie.model';
import { StarsComponent } from '../stars/stars.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ui-card',
  imports: [StarsComponent, RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  movie = input.required<Movie>()

}
