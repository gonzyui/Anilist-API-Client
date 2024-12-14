# AnilistAPI Client Module Documentation

## Introduction
AnimeMangaWrapper is an npm module designed to interact with the AniList API, allowing users to search for anime and manga information. It offers dynamic features such as multilingual support (EN/FR), search by title or ID, and flexible configuration.

---

## Installation
Ensure that Node.js is installed on your machine.

### Installation Command:
```bash
npm install anilist-api-client
```
---

## Usage

### Importing the Module
In a JavaScript or TypeScript project, you can import the module as follows:

#### **JavaScript:**
```javascript
const { AnilistAPIClient } = require('anime-api-client');
```

#### **TypeScript:**
```typescript
import { AnilistAPIClient } from 'anime-api-client';
```

---
## Classes and Methods
The module is divided into two main subclasses: **Anime** and **Manga**.

### Main Class: `AnilistAPIClient`
This class serves as the main interface for accessing module functionality.

### Subclass: `Anime`
Enables interaction with anime-related data.

#### Primary Methods:

##### **`getByTitle(title: string): Promise<any>`**
Searches for an anime by its title.

- **Parameters:**
    - `title` *(string)*: The title of the anime.

- **Returns:**
    - A promise containing the data of the found anime.

##### **Example:**
```javascript
const anime = await AnilistAPIClient.anime.getByTitle('Naruto');
console.log(anime);
```

##### **`getById(id: number): Promise<any>`**
Searches for an anime by its ID.

- **Parameters:**
    - `id` *(number)*: The ID of the anime.

- **Returns:**
    - A promise containing the data of the found anime.

##### **Example:**
```javascript
const anime = await AnilistAPIClient.anime.getById(20);
console.log(anime);
```

---

### Subclass: `Manga`
Enables interaction with manga-related data.

#### Primary Methods:

##### **`getByTitle(title: string): Promise<any>`**
Searches for a manga by its title.

- **Parameters:**
    - `title` *(string)*: The title of the manga.

- **Returns:**
    - A promise containing the data of the found manga.

##### **Example:**
```javascript
const manga = await AnilistAPIClient.manga.getByTitle('One Piece');
console.log(manga);
```

##### **`getById(id: number): Promise<any>`**
Searches for a manga by its ID.

- **Parameters:**
    - `id` *(number)*: The ID of the manga.

- **Returns:**
    - A promise containing the data of the found manga.

##### **Example:**
```javascript
const manga = await AnilistAPIClient.manga.getById(1);
console.log(manga);
```

---

## Error Handling
The module integrates advanced error handling with clear messages.

### **Example: Search Without Title**
If a missing title or ID is provided, an error is thrown:

```javascript
try {
  const anime = await AnilistAPIClient.anime.getByTitle('');
} catch (error) {
  console.error(error.message); // "A title is required to perform a search."
}
```

### **Example: API Error**
In case of network errors or issues with the API:
```javascript
try {
  const manga = await AnilistAPIClient.manga.getById(9999999);
} catch (error) {
  console.error(error.message); // "Error fetching data: ..."
}
```

---

## Complete Usage Example
Here is an example demonstrating the main features of the module:

```javascript
const { AnilistAPIClient } = require('anime-api-client');

(async () => {
  // Search for an anime by title
  try {
    const anime = await AnilistAPIClient.anime.getByTitle('Naruto');
    console.log('Found anime:', anime);
  } catch (error) {
    console.error('Error:', error.message);
  }

  try {
    const anime = await AnilistAPIClient.anime.getById(20);
    console.log('Found anime (EN):', anime);
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
```

## Discord Bot Integration Example
To use this module in a Discord bot, you can create a command that retrieves anime or manga information when triggered by users.

**Discord bot example**:
```js
const { Client, GatewayIntentBits } = require('discord.js');
const { AnilistAPIClient } = require('anime-api-client');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const [command, ...args] = message.content.split(' ');

  if (command === '!anime') {
    const title = args.join(' ');
    if (!title) {
      return message.reply('Please provide the title of the anime.');
    }

    try {
      const anime = await AnilistAPIClient.anime.getByTitle(title);
      message.reply(`Found anime: ${anime.title.romaji} - ${anime.description}`);
    } catch (error) {
      message.reply(`Error: ${error.message}`);
    }
  }

  if (command === '!manga') {
    const title = args.join(' ');
    if (!title) {
      return message.reply('Please provide the title of the manga.');
    }

    try {
      const manga = await AnilistAPIClient.manga.getByTitle(title);
      message.reply(`Found manga: ${manga.title.romaji} - ${manga.description}`);
    } catch (error) {
      message.reply(`Error: ${error.message}`);
    }
  }
});

client.login('YOUR_DISCORD_BOT_TOKEN');
```
---

## Development and Contribution
If you want to contribute to the module's development:

1. Clone the repository:
   ```bash
   git clone https://github.com/gonzyui/Anilist-API-Client.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the project:
   ```bash
   npm run build
   ```
4. Run tests:
   ```bash
   npm test
   ```

---

## License
This project is licensed under the MIT License. You are free to use and modify it.

