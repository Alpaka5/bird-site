export type birdDetailed = {
    latin_name: string;
    length_min_mm: number;
    length_max_mm: number;
    weight_min_g: number;
    weight_max_g: number;
    family: string;
    order: string;
    suborder: string;
    tags: string[];
    winning_bird: boolean;
}

export type birdDescription = {
    bird: string;
    language: string;
    description: string;
}