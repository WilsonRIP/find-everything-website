export interface Game {
  id: string;
  name: string;
  slug: string;
  imageUrl?: string;
  imageUrl_2?: string;
  description?: string;
  longDescription?: string;
  genre?: string;
  releaseDate?: string;
  developer?: string;
  citations?: string[];
  steamUrl?: string;
  // Add other game-specific fields as needed
}

export const gamesData: Game[] = [
  {
    id: '1',
    name: "Garry's Mod",
    slug: 'garrys-mod',
    imageUrl: '/games/garrysmod.png',
    imageUrl_2: '/games/garrysmod_2.png', // Ensure this path is correct or update as needed
    description: 'A physics sandbox game with endless possibilities.',
    longDescription: `# Garry's Mod: The Ultimate Sandbox Game

Garry's Mod (commonly abbreviated as GMod) is a 2006 sandbox game developed by Facepunch Studios and published by Valve[2]. Created by Garry Newman, it began as a mod for Valve's Source game engine in December 2004 before expanding into a standalone release in November 2006[2]. As of September 2021, Garry's Mod has sold more than 20 million copies[2].

## What Makes Garry's Mod Unique

Garry's Mod is primarily a physics-based sandbox game that, in its base game mode, has no set objectives[2]. It provides players with a virtual playground where they can:

- Spawn and manipulate non-player characters, ragdolls, and props[2]
- Use the "physics gun" to pick up, rotate, and freeze objects in place[2]
- Employ the "tool gun" for tasks like welding props together and altering facial expressions of ragdolls[2]
- Build machines, contraptions, tanks, cars and other creative structures[1]
- Pose ragdolls to create scenes for storytelling or machinima[1]

The game runs on the Source engine and has evolved significantly since its initial release, with 13 major updates before switching to a software-as-a-service model[5].

## Game Modes and Community Content

While the sandbox mode is the default experience, Garry's Mod truly shines through its vast array of user-created content and game modes:

**Popular Game Modes:**
- **Trouble in Terrorist Town (TTT)**: A game similar to Mafia where players are assigned as Traitors, Detectives, or Innocents[2]
- **Prop Hunt**: Players on one team disguise as props and hide while the other team seeks them[2]
- **DarkRP**: A roleplaying gamemode where players take on various jobs and interact in a society[2]
- **Spacebuild** and **Wiremod**: Allow for creating complex contraptions and machines[2]

The game supports modifications through Lua programming language, which the community uses to create new weapons, entities, and game modes[5]. This flexibility has led to nearly limitless possibilities within the game.

## Content Integration

Garry's Mod can import and enable content from other Source-engine games:
- Half-Life 2 content is included by default[3]
- Team Fortress 2 content is automatically included if you download that game[3]
- Content from Counter-Strike, Left 4 Dead, and other Source games can be added by checking boxes in the game's settings[3]

This integration allows for a massive library of assets and props to use in your creations.

## Technical Features

The game includes several technical capabilities that expand its functionality:
- 64-bit support (through beta branch) for accessing more than 4GB of RAM[5]
- Support for VPK v1 and v2 file formats[5]
- Increased map sizes and engine limits compared to original Source games[5]
- Partial VTF 7.5 support for textures from newer Source games[5]
- BSP 21 support for loading maps from Left 4 Dead engine branches and above[5]

## Development Tool

Beyond being a game, Garry's Mod serves as a valuable tool for Source engine developers:
- Allows testing of game elements without using the Source SDK[5]
- Provides a way to place and move props in MAP_EDIT mode[5]
- Functions as a user-friendly demonstration tool for new concepts[5]
- Enables stress-testing of the Source engine[5]

Garry's Mod represents one of gaming's most successful sandbox environments, providing both entertainment and creative tools to millions of players worldwide.`,
    genre: 'Sandbox, Physics',
    releaseDate: 'November 29, 2006',
    developer: 'Facepunch Studios',
    citations: [
      "https://www.reddit.com/r/gmod/comments/2vw79w/new_to_garrys_mod_beginner_here_asking_what_is/",
      "https://en.wikipedia.org/wiki/Garry's_Mod",
      "https://www.youtube.com/watch?v=N9N63OhRPjU",
      "https://steamcommunity.com/sharedfiles/filedetails/?id=2978952452",
      "https://developer.valvesoftware.com/wiki/Garry's_Mod",
      "https://github.com/Facepunch/garrysmod/blob/master/garrysmod/gameinfo.txt",
      "https://www.reddit.com/r/OutOfTheLoop/comments/303cb9/what_is_gmod_garrys_mod/",
      "https://www.youtube.com/watch?v=zkRm0r-LKA4",
      "https://steamcommunity.com/app/4000/discussions/5/3184610318765746880/",
      "https://steamcommunity.com/app/4000/discussions/5/4637112884972754185/",
      "https://forums.mmorpg.com/discussion/471942/garrys-mod-what_the_heck_is_it",
      "https://www.reddit.com/r/hammer/comments/1fxp0un/i_am_missing_the_gameinfotxt_file_for_garrys_mod/",
      "https://gmod.facepunch.com",
      "https://developer.valvesoftware.com/wiki/Gameinfo.txt",
      "https://forums.nexusmods.com/topic/272345-what-is-gmod/",
      "https://www.wallworm.net/index.php?topic=720.0",
      "https://www.moddb.com/downloads/gameinfo-txt",
      "https://store.steampowered.com/app/4000/Garrys_Mod/",
      "https://www.youtube.com/watch?v=FTHsu-oJ3f8",
      "https://steamcommunity.com/sharedfiles/filedetails/?id=1507197406"
    ],
    steamUrl: "https://store.steampowered.com/app/4000/Garrys_Mod/"
  },
  // Add more games here as needed
]; 