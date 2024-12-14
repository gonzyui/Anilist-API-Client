import { fetchAnimeByTitle, fetchAnimeRecommendations } from './services/anime';
import { fetchMangaByTitle, fetchMangaRecommendations } from './services/manga';

export const AnilistAPIClient = {
    anime: {
        getByTitle: fetchAnimeByTitle,
        getRecommendations: fetchAnimeRecommendations,
    },
    manga: {
        getByTitle: fetchMangaByTitle,
        getRecommendations: fetchMangaRecommendations,
    },
};
