"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchMangaByTitle = fetchMangaByTitle;
exports.fetchMangaRecommendations = fetchMangaRecommendations;
const anilistApi_1 = require("../api/anilistApi");
async function fetchMangaByTitle(title) {
    const query = `
    query ($search: String) {
      Media(type: MANGA, search: $search) {
        id
        title {
          romaji
          english
          native
        }
        description
        genres
        averageScore
        chapters
        volumes
      }
    }
  `;
    const variables = { search: title };
    const response = await (0, anilistApi_1.makeApiRequest)(query, variables);
    return response.Media;
}
async function fetchMangaRecommendations(mangaId) {
    const query = `
    query ($id: Int) {
      Media(id: $id) {
        recommendations {
          nodes {
            mediaRecommendation {
              id
              title {
                romaji
                english
              }
              genres
            }
          }
        }
      }
    }
  `;
    const variables = { id: mangaId };
    const response = await (0, anilistApi_1.makeApiRequest)(query, variables);
    return response.Media.recommendations.nodes.map((node) => node.mediaRecommendation);
}
//# sourceMappingURL=manga.js.map