import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs';
import { LoaderService } from '../services/loader.service';
import { inject } from '@angular/core';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {

  const loaderService = inject(LoaderService)

  // afficher le loader
  loaderService.loader.set(true)
  return next(req).pipe(
    finalize(() => {
      // Désactiver le loader à la fin de la réponse (succès ou erreur)
      loaderService.loader.set(false)
    })
  );
};
