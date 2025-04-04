import { Injectable, signal, computed, effect, inject } from '@angular/core';
import { of, tap } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private authService = inject(AuthService);

  private _seenMovies = signal<number[]>([]);
  public readonly seenMovies = computed(() => this._seenMovies());

  constructor() {
    effect(() => {
      if (!this.authService.isAuthenticated()) {
        this._seenMovies.set([]);
      }
    })
  }

  /**
   * role: getUserMovies from MY API
   * Simulate a request to the server
   */
  getUserMovies() {
    of([1229730, 1261050, 1165067]).pipe(
      // simulate a delay of 5 seconds
      // delay(5000),
      tap((movies_ids) => this._seenMovies.set(movies_ids))
    )
      .subscribe()
  }

}
