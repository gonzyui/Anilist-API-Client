import { fetchAnimeByTitle, fetchAnimeRecommendations } from './services/anime';
import { fetchMangaByTitle, fetchMangaRecommendations } from './services/manga';
export declare const AnilistAPIClient: {
    anime: {
        getByTitle: typeof fetchAnimeByTitle;
        getRecommendations: typeof fetchAnimeRecommendations;
    };
    manga: {
        getByTitle: typeof fetchMangaByTitle;
        getRecommendations: typeof fetchMangaRecommendations;
    };
};
//# sourceMappingURL=index.d.ts.map