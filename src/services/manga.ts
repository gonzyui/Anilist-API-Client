import { makeApiRequest } from '../api/anilistApi';

export async function fetchMangaByTitle(title: string): Promise<any> {
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

    const response = await makeApiRequest(query, variables);
    return response.Media;
}

export async function fetchMangaRecommendations(mangaId: number): Promise<any[]> {
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

    const response = await makeApiRequest(query, variables);
    return response.Media.recommendations.nodes.map((node: any) => node.mediaRecommendation);
}
