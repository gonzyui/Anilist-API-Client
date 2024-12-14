"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnilistAPIClient = void 0;
const anime_1 = require("./services/anime");
const manga_1 = require("./services/manga");
exports.AnilistAPIClient = {
    anime: {
        getByTitle: anime_1.fetchAnimeByTitle,
        getRecommendations: anime_1.fetchAnimeRecommendations,
    },
    manga: {
        getByTitle: manga_1.fetchMangaByTitle,
        getRecommendations: manga_1.fetchMangaRecommendations,
    },
};
//# sourceMappingURL=index.js.map