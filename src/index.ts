import fetch from 'node-fetch';

interface MediaTitle {
    romaji: string;
    english: string | null;
}

interface Media {
    id: number;
    title: MediaTitle;
    description: string;
    episodes?: number;
    chapters?: number;
    averageScore?: number;
}

interface User {
    id: number;
    name: string;
    about: string | null;
    avatar: {
        large: string;
    };
}

interface Studio {
    name: string;
    isAnimationStudio: boolean;
}

interface MediaListEntry {
    media: {
        title: MediaTitle;
        status: string;
        averageScore?: number;
    };
}

interface MediaList {
    name: string;
    entries: MediaListEntry[];
}

export class AniList {
    private apiEndpoint: string;

    constructor() {
        this.apiEndpoint = 'https://graphql.anilist.co';
    }

    private async fetchGraphQL<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
        try {
            const response = await fetch(this.apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query, variables }),
            });

            const data = await response.json();
            // @ts-ignore
            if (data.errors) {
                // @ts-ignore
                throw new Error(data.errors[0].message);
            }
            // @ts-ignore
            return data.data;
        } catch (error) {
            throw new Error(`AniList API Error: ${(error as Error).message}`);
        }
    }

    async getAnimeByTitle(title: string): Promise<Media> {
        const query = `
            query ($title: String) {
                Media(type: ANIME, search: $title) {
                    id
                    title {
                        romaji
                        english
                    }
                    description
                    episodes
                    averageScore
                }
            }
        `;
        const variables = { title };
        const data = await this.fetchGraphQL<{ Media: Media }>(query, variables);
        return data.Media;
    }

    async getMangaByTitle(title: string): Promise<Media> {
        const query = `
            query ($title: String) {
                Media(type: MANGA, search: $title) {
                    id
                    title {
                        romaji
                        english
                    }
                    description
                    chapters
                    averageScore
                }
            }
        `;
        const variables = { title };
        const data = await this.fetchGraphQL<{ Media: Media }>(query, variables);
        return data.Media;
    }

    async getTrendingAnime(page = 1): Promise<Media[]> {
        const query = `
            query ($page: Int) {
                Page(page: $page, perPage: 10) {
                    media(type: ANIME, sort: TRENDING_DESC) {
                        title {
                            romaji
                            english
                        }
                        trending
                        averageScore
                    }
                }
            }
        `;
        const variables = { page };
        const data = await this.fetchGraphQL<{ Page: { media: Media[] } }>(query, variables);
        return data.Page.media;
    }

    async getUserByName(username: string): Promise<User> {
        const query = `
            query ($username: String) {
                User(name: $username) {
                    id
                    name
                    about
                    avatar {
                        large
                    }
                }
            }
        `;
        const variables = { username };
        const data = await this.fetchGraphQL<{ User: User }>(query, variables);
        return data.User;
    }

    async getUserMediaList(username: string, type: 'ANIME' | 'MANGA' = 'ANIME'): Promise<MediaList[]> {
        const query = `
            query ($username: String, $type: MediaType) {
                MediaListCollection(userName: $username, type: $type) {
                    lists {
                        name
                        entries {
                            media {
                                title {
                                    romaji
                                    english
                                }
                                status
                                averageScore
                            }
                        }
                    }
                }
            }
        `;
        const variables = { username, type };
        const data = await this.fetchGraphQL<{ MediaListCollection: { lists: MediaList[] } }>(query, variables);
        return data.MediaListCollection.lists;
    }

    async getAnimeStudios(title: string): Promise<Studio[]> {
        const query = `
            query ($title: String) {
                Media(type: ANIME, search: $title) {
                    studios {
                        edges {
                            node {
                                name
                                isAnimationStudio
                            }
                        }
                    }
                }
            }
        `;
        const variables = { title };
        const data = await this.fetchGraphQL<{ Media: { studios: { edges: { node: Studio }[] } } }>(query, variables);
        return data.Media.studios.edges.map(edge => edge.node);
    }
}