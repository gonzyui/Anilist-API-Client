export interface Manga {
    id: number;
    title: {
        romaji: string;
        english: string;
        native: string;
    };
    description: string;
    genres: string[];
    averageScore: number;
    chapters: number;
    volumes: number;
}
//# sourceMappingURL=Manga.d.ts.map