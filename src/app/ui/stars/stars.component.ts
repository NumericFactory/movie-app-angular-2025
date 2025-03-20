import { Component, input } from '@angular/core';

@Component({
  selector: 'ui-stars',
  imports: [],
  templateUrl: './stars.component.html',
  styleUrl: './stars.component.css'
})
export class StarsComponent {

  note = input.required({
    transform: (value: number) => Math.round(value / 2)
  });

  // je cree un array qui contient autant d'items que le score
  // note = input.required({
  //   transform: (value: number) => new Array(value).fill(1)
  // })

}


