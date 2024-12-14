"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeApiRequest = makeApiRequest;
const axios_1 = __importDefault(require("axios"));
const ANILIST_API_URL = 'https://graphql.anilist.co';
async function makeApiRequest(query, variables) {
    try {
        const response = await axios_1.default.post(ANILIST_API_URL, {
            query,
            variables,
        });
        return response.data.data;
    }
    catch (error) {
        throw new Error(`AniList API Error: ${error.message}`);
    }
}
//# sourceMappingURL=anilistApi.js.map