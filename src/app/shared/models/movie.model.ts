import { MovieResponseAPI, Videos } from "../dto/movie.dto";
import { Serie } from "./serie.model";

export interface Movie {
    id: number,
    title: string,
    description: string,
    image_backdrop: string,
    image_poster: string,
    score: number,
    release_date: string,
    vote_count: number,
    duration: number,
    genres: string[],
    actors: string[],
    video: string | undefined
}

export class MovieBuilder {
    title: string = 'Rambo';
    image: string = 'https://image.tmdb.org/t/p/w500/67BPUqGcMK4iG97JNNX4GE0sDwo.jpg';
    score: number = 3;

    static getUrlVideo(videos: Videos): string | undefined {
        let url: string | undefined;
        if (videos?.results.length) { url = 'https://www.youtube.com/embed/' + videos.results[0]?.key }
        return url
    }

    static fromAPI(data: Partial<MovieResponseAPI>): Partial<Movie> {
        return {
            id: data.id,
            title: data.title,
            description: data.overview,
            image_backdrop: data.backdrop_path
                ? 'https://image.tmdb.org/t/p/w500/' + data.backdrop_path
                : 'https://placehold.co/500x281/000000/white?text=image+non+disponible',
            image_poster: data.poster_path
                ? 'https://image.tmdb.org/t/p/w500/' + data.poster_path
                : 'https://placehold.co/500x750/000000/white?text=image+non+disponibles',
            score: data.vote_average,
            release_date: data.release_date,
            vote_count: data.vote_count,
            video: this.getUrlVideo(data.videos!),
            duration: data.runtime ?? 0,
            genres: data.genres ? data.genres.map(item => item.name) : [],
            actors: data.credits ? data.credits.cast.map(item => item.name) : []
        }
    }
}

/**
 * isMovie
 * Role : type prédictif 
 * (doc : https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates)
 * @description permet de savoir si l'objet est un film 
 * @param data 
 */
export function isMovie(data: Movie | Serie): data is Movie {
    if (data !== null && typeof data == 'object') {
        return 'duration' in data
    }
    return false
}



