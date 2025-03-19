import { MovieResponseAPI } from "../dto/movie.dto";

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
            video: data.videos ? 'https://www.youtube.com/embed/' + data.videos.results[0]?.key : undefined,
            duration: data.runtime ?? 0,
            genres: data.genres ? data.genres.map(item => item.name) : [],
            actors: data.credits ? data.credits.cast.map(item => item.name) : []
        }
    }

    withTitle(title: string) {
        this.title = title;
        return this;
    }
    withImage(image: string) {
        this.image = image;
        return this;
    }
    withScore(score: number) {
        this.score = score;
        return this;
    }
    build() {
        return {
            title: this.title,
            image: this.image,
            score: this.score
        }
    }
    // constructor(title: string, image: string, score: number) {
    //     this.title = title;
    //     this.image = image;
    //     this.score = score
    // }
}


