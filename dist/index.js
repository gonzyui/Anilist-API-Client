var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fetch from 'node-fetch';
export class AniList {
    constructor() {
        this.apiEndpoint = 'https://graphql.anilist.co';
    }
    fetchGraphQL(query_1) {
        return __awaiter(this, arguments, void 0, function* (query, variables = {}) {
            try {
                const response = yield fetch(this.apiEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ query, variables }),
                });
                const data = yield response.json();
                // @ts-ignore
                if (data.errors) {
                    // @ts-ignore
                    throw new Error(data.errors[0].message);
                }
                // @ts-ignore
                return data.data;
            }
            catch (error) {
                throw new Error(`AniList API Error: ${error.message}`);
            }
        });
    }
    getAnimeByTitle(title) {
        return __awaiter(this, void 0, void 0, function* () {
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
            const data = yield this.fetchGraphQL(query, variables);
            return data.Media;
        });
    }
    getMangaByTitle(title) {
        return __awaiter(this, void 0, void 0, function* () {
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
            const data = yield this.fetchGraphQL(query, variables);
            return data.Media;
        });
    }
    getTrendingAnime() {
        return __awaiter(this, arguments, void 0, function* (page = 1) {
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
            const data = yield this.fetchGraphQL(query, variables);
            return data.Page.media;
        });
    }
    getUserByName(username) {
        return __awaiter(this, void 0, void 0, function* () {
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
            const data = yield this.fetchGraphQL(query, variables);
            return data.User;
        });
    }
    getUserMediaList(username_1) {
        return __awaiter(this, arguments, void 0, function* (username, type = 'ANIME') {
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
            const data = yield this.fetchGraphQL(query, variables);
            return data.MediaListCollection.lists;
        });
    }
    getAnimeStudios(title) {
        return __awaiter(this, void 0, void 0, function* () {
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
            const data = yield this.fetchGraphQL(query, variables);
            return data.Media.studios.edges.map(edge => edge.node);
        });
    }
}
