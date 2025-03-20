import { Component, input } from '@angular/core';

@Component({
  selector: 'ui-button',
  imports: [],
  template: `
    <button class="btn"
            [class.btn-sm]="size()=='sm'" 
            [class.btn-lg]="size()=='lg'" 
            [class]="getCssColorClass(color())">
      <ng-content></ng-content>
    </button>
  `,
  styles: ``
})
export class ButtonComponent {
  color = input<'primary' | 'secondary' | 'warning' | 'dark' | 'light'>('secondary');
  size = input<'sm' | 'md' | 'lg'>('md');

  getCssColorClass(color: 'primary' | 'secondary' | 'warning' | 'dark' | 'light') {
    return 'btn-' + color;
  }
}
