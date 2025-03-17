import { Component, input } from '@angular/core';
import { Movie } from '../../../../models/movie.model';
import { StarsComponent } from '../stars/stars.component';

@Component({
  selector: 'ui-card',
  imports: [StarsComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  movie = input.required<Movie>()

}
