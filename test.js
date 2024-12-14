const { AnilistAPIClient } = require('./dist/index');

async function runTests() {
    try {
        const anime = await AnilistAPIClient.anime.getByTitle('Attack on titan');
        console.log(`Results for ${anime.title.romaji}: `, anime);
    } catch (error) {
        console.error('An error occurred when trying to get anime..', error.message);
    }
    try {
        const recommendations = await AnilistAPIClient.anime.getRecommendations(20);
        console.log('Recommend anime: ', recommendations);
    } catch (error) {
        console.error('An error occurred when trying to get recommendation..', error.message);
    }
    try {
        const manga = await AnilistAPIClient.manga.getByTitle('One Piece');
        console.log(`Results for ${manga.title.romaji}: `, manga);
    } catch (error) {
        console.error('An error occurred when trying to get manga..', error.message);
    }
}

runTests();