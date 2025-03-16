export interface Movie {
    title: string,
    image: string,
    score: number,
}

export class MovieBuilder {
    title: string = 'Rambo';
    image: string = 'https://image.tmdb.org/t/p/w500/67BPUqGcMK4iG97JNNX4GE0sDwo.jpg';
    score: number = 3;

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


