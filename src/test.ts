import { AniList } from './index';

const anilist = new AniList();

async function main() {
    const anime = await anilist.getAnimeByTitle('Attack on Titan');
    console.log('Anime:', anime);

    const user = await anilist.getUserByName('NarutoFan123');
    console.log('User:', user);

    const studios = await anilist.getAnimeStudios('One Piece');
    console.log('Studios:', studios);
}

main().catch(console.error);
