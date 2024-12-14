import axios from 'axios';

const ANILIST_API_URL = 'https://graphql.anilist.co';

export async function makeApiRequest(query: string, variables: any): Promise<any> {
    try {
        const response = await axios.post(ANILIST_API_URL, {
            query,
            variables,
        });
        return response.data.data;
    } catch (error: any) {
        throw new Error(`AniList API Error: ${error.message}`);
    }
}
