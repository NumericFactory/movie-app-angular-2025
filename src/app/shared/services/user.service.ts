import { Injectable, signal, computed } from '@angular/core';
import { delay, of, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _seenMovies = signal<number[]>([]);
  public readonly seenMovies = computed(() => this._seenMovies());

  constructor() { }

  /**
   * role: getUserMovies from MY API
   * Simulate a request to the server
   */
  getUserMovies() {
    of([1229730, 1261050, 1165067]).pipe(
      // simulate a delay of 5 seconds
      // delay(10000),
      tap(() => this._seenMovies.set([1229730, 1261050, 1165067]))
    )
      .subscribe()
  }

}
