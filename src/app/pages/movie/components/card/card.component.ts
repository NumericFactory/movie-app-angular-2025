import { Component, input } from '@angular/core';
import { Movie } from '../../../../shared/models/movie.model';
import { RouterLink } from '@angular/router';
import { StarsComponent } from '../../../../ui/stars/stars.component';
import { ButtonComponent } from "../../../../ui/button/button.component";

@Component({
  selector: 'ui-card',
  imports: [StarsComponent, RouterLink, ButtonComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  movie = input.required<Movie>()

}
