# AniList API Client

This module allows you to interact with the AniList API to retrieve information about anime, manga, studios, users and media lists. This guide will help you understand how to use the module and how to integrate its features into your project.

## Contenu

- [Installation](#installation)
- [Features](#features)
- [Usage](#usage)
- [Examples](#examples)
- [Manage errors](#manage-errors)

## Installation

You need at least Node.JS and then install package with npm.

```bash
npm install anilist-api-client
```

## Features

- getAnimeByTitle(title) :Get anime information with title
- getMangaByTitle(title) : Get manga information with title.
- getTrendingAnime(page) : Get trending anime.
- getUserByName(username) : Get user information with his username.
- getUserMediaList(username, type) : Get media list of a user(manga/anime).
- getAnimeStudios(title) : Get associated studios of an anime.

## Usage
```js
const AniList = require('anilist-api-client');

const anilist = new AniList();

// Get anime informations by title
anilist.getAnimeByTitle('Naruto').then(media => console.log(media));

// Get manga informations by title
anilist.getMangaByTitle('One Piece').then(media => console.log(media));

// Get trending anime (1st page default)
anilist.getTrendingAnime().then(animeList => console.log(animeList));

// Get user informations by username
anilist.getUserByName('someUser').then(user => console.log(user));

// Get medialist of user (anime default)
anilist.getUserMediaList('someUser').then(mediaList => console.log(mediaList));

// Get studio associated to anime by his name
anilist.getAnimeStudios('Naruto').then(studios => console.log(studios));
```

## Examples

```ts
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
```

## Manage Errors

```js
try {
    const anime = await anilist.getAnimeByTitle('One Piece');
    console.log(anime);
} catch (error) {
    console.error('Error with Anilist API', error.message);
}

```

