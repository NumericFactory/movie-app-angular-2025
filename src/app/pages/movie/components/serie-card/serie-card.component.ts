import { Component, input } from '@angular/core';
import { Serie } from '../../../../shared/models/serie.model';
import { RouterLink } from '@angular/router';
import { StarsComponent } from '../../../../ui/stars/stars.component';
import { B } from '@angular/cdk/keycodes';
import { ButtonComponent } from '../../../../ui/button/button.component';

@Component({
  selector: 'ui-serie-card',
  imports: [RouterLink, StarsComponent, ButtonComponent],
  templateUrl: './serie-card.component.html',
  styleUrl: './serie-card.component.css'
})
export class SerieCardComponent {

  serie = input.required<Serie>();

}
