import { SerieResponseAPI } from "../dto/serie.dto";
import { Movie } from "./movie.model";



export interface Serie {
    id: number,
    title: string,
    description: string,
    image_backdrop: string,
    image_poster: string,
    score: number,
    first_air_date: string,
    vote_count: number,
    episodes_count: number,
    genres: string[],
    // actors: string[],
    // video: string | undefined
}

export class SerieBuilder {
    title: string = 'Minecraft';
    image_poster: string = 'https://image.tmdb.org/t/p/w500/lIFdBogazScckoSyA68JRt8RyXp.jpg';
    score: number = 3;

    static fromAPI(data: Partial<SerieResponseAPI>): Partial<Serie> {
        return {
            id: data.id,
            title: data.name,
            description: data.overview,
            image_backdrop: data.backdrop_path
                ? 'https://image.tmdb.org/t/p/w500/' + data.backdrop_path
                : 'https://placehold.co/500x281/000000/white?text=image+non+disponible',
            image_poster: data.poster_path
                ? 'https://image.tmdb.org/t/p/w500/' + data.poster_path
                : 'https://placehold.co/500x750/000000/white?text=image+non+disponibles',
            score: data.vote_average,
            first_air_date: data.first_air_date,
            vote_count: data.vote_count,
            episodes_count: 0
        }
    }
}

/**
  * isSerie
  * Role : type prédictif
  * (doc : https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates)
  * @description permet de savoir si l'objet est une série
  * @param data
  */
export function isSerie(data: Movie | Serie): data is Serie {
    if (data !== null && typeof data == 'object') {
        return 'first_air_date' in data
    }
    return false
}


