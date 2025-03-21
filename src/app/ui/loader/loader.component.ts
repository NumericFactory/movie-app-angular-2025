import { Component, inject } from '@angular/core';
import { MovieService } from '../../shared/services/movie.service';
import { LoaderService } from '../../shared/services/loader.service';

@Component({
  selector: 'ui-loader',
  imports: [],
  template: `
  @if( loader() ) {
    <div class="progress-bar">
      <div class="progress-bar-value"></div>
    </div>
  }
  `,
  styles: ` .progress-bar {
    height: 10px;
    background-color: rgba(5, 114, 206, 0.2);
    width: 100%;
    overflow: hidden;
    position: fixed;
    top: 60px;
    z-index: 1000;
  }
  
  .progress-bar-value {
    width: 100%;
    height: 100%;
    background-color: orange;
    animation: indeterminateAnimation 1s infinite linear;
    transform-origin: 0% 50%;
  }
  
  @keyframes indeterminateAnimation {
    0% {
      transform:  translateX(0) scaleX(0);
    }
    40% {
      transform:  translateX(0) scaleX(0.4);
    }
    100% {
      transform:  translateX(100%) scaleX(0.5);
    }
  }`
})
export class LoaderComponent {
  loaderService = inject(LoaderService);
  loader = this.loaderService.loader;
}
