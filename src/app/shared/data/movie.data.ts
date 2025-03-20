import { MovieBuilder } from "../models/movie.model"

let movieBuilder = new MovieBuilder();

export let movies = [
    movieBuilder
        .withTitle('The Gorge')
        .withImage('https://image.tmdb.org/t/p/w500/1Np511QIqSs0s3iDpWXPbuY4o5o.jpg')
        .withScore(2)
        .build(),

    movieBuilder
        .withTitle('vol à hautRisque')
        .withImage('https://image.tmdb.org/t/p/w500/vWoa8QSoNwIHMBKLLv82btw2S5L.jpg')
        .withScore(3)
        .build(),

    movieBuilder
        .withTitle('Anora')
        .withImage('https://image.tmdb.org/t/p/w500/9Gy3W9uMEvPzZYIf4wHDtg8CZId.jpg')
        .withScore(4)
        .build(),

    movieBuilder
        .withTitle('Mufasa')
        .withImage('https://image.tmdb.org/t/p/w500/67BPUqGcMK4iG97JNNX4GE0sDwo.jpg')
        .withScore(5)
        .build()
];