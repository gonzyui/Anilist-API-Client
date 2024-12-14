"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAnimeByTitle = fetchAnimeByTitle;
exports.fetchAnimeRecommendations = fetchAnimeRecommendations;
const anilistApi_1 = require("../api/anilistApi");
async function fetchAnimeByTitle(title) {
    const query = `
    query ($search: String) {
      Media(type: ANIME, search: $search) {
        id
        title {
          romaji
          english
          native
        }
        description
        genres
        averageScore
        episodes
      }
    }
  `;
    const variables = { search: title };
    const response = await (0, anilistApi_1.makeApiRequest)(query, variables);
    return response.Media;
}
async function fetchAnimeRecommendations(animeId) {
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
    const variables = { id: animeId };
    const response = await (0, anilistApi_1.makeApiRequest)(query, variables);
    return response.Media.recommendations.nodes.map((node) => node.mediaRecommendation);
}
//# sourceMappingURL=anime.js.map