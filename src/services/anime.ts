import { makeApiRequest } from '../api/anilistApi';

export async function fetchAnimeByTitle(title: string): Promise<any> {
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

    const response = await makeApiRequest(query, variables);
    return response.Media;
}

export async function fetchAnimeRecommendations(animeId: number): Promise<any[]> {
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

    const response = await makeApiRequest(query, variables);
    return response.Media.recommendations.nodes.map((node: any) => node.mediaRecommendation);
}
