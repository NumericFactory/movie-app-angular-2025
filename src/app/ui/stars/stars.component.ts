import { Component, input } from '@angular/core';

@Component({
  selector: 'ui-stars',
  imports: [],
  template: `
    <i [class.fas]="note()>=1" class="far fa-star"></i>
    <i [class.fas]="note()>=2" class="far fa-star"></i>
    <i [class.fas]="note()>=3" class="far fa-star"></i>
    <i [class.fas]="note()>=4" class="far fa-star"></i>
    <i [class.fas]="note()>=5" class="far fa-star"></i>
  `,
  styles: `i {color:rgb(255, 204, 0)}`
})
export class StarsComponent {

  note = input.required({
    transform: (value: number) => Math.round(value / 2)
  });

}


