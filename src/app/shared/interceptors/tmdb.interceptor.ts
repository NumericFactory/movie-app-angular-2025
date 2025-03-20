import { HttpInterceptorFn } from '@angular/common/http';

export const tmdbInterceptor: HttpInterceptorFn = (req, next) => {
  const TMDB_URL: string = 'https://api.themoviedb.org';
  const TOKEN: string = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZmRlYjY2MWFhYTAwNmIxZTRmMzZmOTkwYTVmZDhmZCIsIm5iZiI6MTUwNzI0MjEyMy45ODU5OTk4LCJzdWIiOiI1OWQ2YjA4YmMzYTM2ODU1N2QwMDA0MTAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.GIerR_exMfX4ubYeTiYZ6DLF6iO34Vm7Iw5nwZNJKA8'

  // HttpRequest / HttpResponse / HttpErrorResponse

  /*
    si l'url contient 'https://api.themoviedb.org/3'
    > on clone req
    > on set headers avec 'Authorization': 'Bearer xxxx'
    > on retourne le clone modifié de req
  */
  // SOLUTION 1
  let cloneRequest = req;
  if (req.url.includes(TMDB_URL)) {
    cloneRequest = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + TOKEN) })
    console.log(cloneRequest);
  }
  return next(cloneRequest);

};
