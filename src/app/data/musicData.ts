// src/data/musicData.ts
export interface CareerMilestone {
  year: string;
  event: string;
}

export interface DiscographyItem {
  title: string;
  year: number;
  notes?: string;
}

export interface Artist {
  id: number;
  name: string;
  slug: string; // Added for URL-friendly routing
  genre: string;
  imageUrl: string;
  summary?: string;
  biographyParagraphs?: string[];
  careerHighlights?: CareerMilestone[];
  recognitionAndAwards?: {
    mainstreamRecognition?: string;
    awards?: string[];
  };
  discography?: {
    studioAlbums?: DiscographyItem[];
    eps?: DiscographyItem[];
    mixtapes?: DiscographyItem[];
  };
  artisticStyleAndImpact?: string[];
  citations?: string[];
}

export interface Song {
  id: number;
  title: string;
  artist: string; // This could later be an Artist ID or even the full Artist object if needed
  imageUrl: string;
  slug: string; // Added for URL-friendly routing
  spotifyUrl?: string;
  appleMusicUrl?: string;
  youtubeMusicUrl?: string;
  // Add other platform URLs as needed
}

export const artists: Artist[] = [
  { 
    id: 1, 
    name: 'NF', 
    slug: 'nf',
    genre: 'Hip-Hop, Rap, Emotional', 
    imageUrl: '/artists/NF.png',
    summary: "NF is the stage name of Nathan John Feuerstein, an American rapper, singer, songwriter, and record producer. Known for his deeply personal lyrics and storytelling ability, NF has established himself as a significant figure in contemporary hip-hop.",
    biographyParagraphs: [
      "Nathan Feuerstein experienced a difficult childhood that would later fuel much of his musical content. Growing up as the oldest of three children, he faced significant hardships. His mother struggled with opioid addiction, eventually leading his father to take custody of him.",
      "Tragically, his mother passed away from an overdose in 2009, inspiring his emotional song \"How Could You Leave Us\".",
      "Music became an escape for young Nathan, who would record using a karaoke machine. His early exposure to Christian music came through his grandfather, who served as a pastor at their local church. After high school, NF began his career at the Fine Arts Festival organized by Connection Church in Canton, Michigan."
    ],
    careerHighlights: [
      { year: "2010", event: "Released his first album \"Moments\" under his birth name." },
      { year: "2012", event: "Released his first EP \"I'm Free\"." },
      { year: "2014", event: "Signed with Capitol Christian Music Group, marking his first major career breakthrough." },
      { year: "2014", event: "Released his self-titled EP \"NF,\" which charted at No. 12 on Christian Albums and No. 4 on Top Gospel Albums." },
      { year: "2015", event: "Released his first major-label album \"Mansion\" on March 31." },
      { year: "2016", event: "Released \"Therapy Session\" on April 22, which peaked at number 12 on Billboard 200." },
      { year: "2017", event: "Released \"Perception\" on October 6, which debuted at No. 1 on the Billboard 200." },
      { year: "2019", event: "Released \"The Search\" on July 26, which also reached No. 1." },
      { year: "2021", event: "Released \"Clouds (The Mixtape)\" on March 26, peaking at number 3 on Billboard 200." },
      { year: "2023", event: "Released \"Hope\" on April 7, which peaked at number 2 on the Billboard 200." }
    ],
    recognitionAndAwards: {
      mainstreamRecognition: "NF achieved mainstream recognition with his album \"Perception\" in 2017. The album not only topped the US charts but was also certified platinum. The single \"Let You Down\" became his breakout hit, reaching number 12 on the Billboard Hot 100 and achieving top-ten status internationally.",
      awards: [
        "Gospel Music Association Dove Award for Rap/Hip Hop Album of the Year (\"Therapy Session\") in 2016",
        "Rap/Hip Hop Recorded Song of the Year (\"Oh Lord\") in 2017",
        "iHeartRadio Titanium Award for \"Let You Down\" (1 Billion Total Audience Spins)"
      ]
    },
    discography: {
      studioAlbums: [
        { title: "Moments", year: 2010, notes: "as Nathan Feuerstein" },
        { title: "Mansion", year: 2015 },
        { title: "Therapy Session", year: 2016 },
        { title: "Perception", year: 2017 },
        { title: "The Search", year: 2019 },
        { title: "Hope", year: 2023 }
      ],
      eps: [
        { title: "I'm Free", year: 2012 },
        { title: "NF", year: 2014, notes: "self-titled" }
      ],
      mixtapes: [
        { title: "Clouds (The Mixtape)", year: 2021 }
      ]
    },
    artisticStyleAndImpact: [
      "NF is known for his introspective lyrics that often explore themes of mental health, personal struggles, and overcoming adversity. Throughout his career, he has formatted his albums to tell cohesive stories with characters, conflicts, and climaxes. \"Mansion,\" his first major-label album, serves as a prologue to this storytelling journey.",
      "His music has been featured in various media, including video games like Madden NFL 16 and MLB The Show 18, as well as on networks such as ESPN, VH1, Showtime, and NBC shows.",
      "Despite his commercial success, NF maintains a somewhat unique position in the music industry - having achieved multiple platinum albums while still being considered to have a relatively small but incredibly dedicated fanbase.",
      "NF's powerful blend of lyricism and production has resonated with millions, addressing meaningful messages about personal struggles and social issues that transcend traditional rap music."
    ],
    citations: [
      "https://www.nfrealmusic.com", "https://www.hotnewhiphop.com/667979-nf-rapper", "https://en.wikipedia.org/wiki/NF_discography", "https://en.wikipedia.org/wiki/NF_(rapper)", "https://thesciencesurvey.com/spotlight/2024/02/06/the-legacy-and-impact-of-nate-feuerstein-nf-real-music/", "https://www.instagram.com/nfrealmusic/", "https://www.reddit.com/r/nfrealmusic/comments/fyehdy/curious_how_everyone_here_discovered_nf/", "https://www.reddit.com/r/nfrealmusic/comments/ngezpl/nf_albums_ranked/", "https://www.instagram.com/nfrealmusicnews/", "https://www.reddit.com/r/nfrealmusic/comments/wqn3l4/how_did_yall_find_out_about_nf/", "https://www.allmusic.com/artist/nf-mn0003282827", "https://www.reddit.com/r/nfrealmusic/comments/hd4gtz/list_of_every_nf_song_ever_in_order/", "https://www.reddit.com/r/nfrealmusic/comments/1g60dx9/its_been_almost_2_years_since_hope_dropped_while/", "https://www.famousbirthdays.com/people/nf.html", "https://open.spotify.com/artist/6fOMl44jA4Sp5b9PpYCkzz", "https://www.youtube.com/@NFrealmusic/videos", "https://www.discogs.com/artist/1270883-nf", "https://x.com/nfrealmusic?lang=en", "https://www.youtube.com/channel/UCoRR6OLuIZ2-5VxtnQIaN2w", "https://www.youtube.com/watch?v=OWwB9hGm8_Y"
    ]
  },
  { id: 2, name: 'Julia Alexa', slug: 'julia-alexa', genre: 'Sad Music', imageUrl: '/artists/juliaalexa.png' },
  { id: 3, name: 'Yung Gravy', slug: 'yung-gravy', genre: 'Hip-Hop, Fun', imageUrl: '/artists/yunggravy.png' },
];

export const songs: Song[] = [
  {
    id: 1, 
    title: 'Story', 
    artist: 'NF', 
    imageUrl: '/songs/story_NF.png',
    slug: 'story-nf', // Example slug
    spotifyUrl: 'https://open.spotify.com/track/7HiIy4QaA5ud7ZuuyBysKk?si=e2f2562b4e1c426c', // Placeholder - replace with actual URL
    appleMusicUrl: 'https://music.apple.com/us/music-video/story/1559899600', // Placeholder - replace with actual URL
    youtubeMusicUrl: 'https://www.youtube.com/watch?v=XSAGLJckRWM' // Placeholder - replace with actual URL
  },
  {
    id: 2, 
    title: 'Please Hold Me', 
    artist: 'Julia Alexa', 
    imageUrl: '/songs/pleaseholdme-juliaalexa.png',
    slug: 'please-hold-me-julia-alexa', // Example slug
    spotifyUrl: 'https://open.spotify.com/track/1lIvjNoTaiI8eHkzn4l2lD?si=bf035e865a174c9b', // Placeholder - replace with actual URL
    appleMusicUrl: 'https://music.apple.com/us/song/please-hold-me/1605906926', // Placeholder - replace with actual URL
    youtubeMusicUrl: 'https://www.youtube.com/watch?v=31wn2SnzFCM' // Placeholder - replace with actual URL
  }, 
  {
    id: 3, 
    title: 'Dancing in the Rain', 
    artist: 'Yung Gravy', 
    imageUrl: '/songs/dancingintherain_yunggravy_2.png',
    slug: 'dancing-in-the-rain-yung-gravy' // Example slug
  },
  {
    id: 4, 
    title: 'body bag', 
    artist: 'Julia Alexa', 
    imageUrl: '/songs/bodybag_juliaalexa.png',
    slug: 'body-bag-julia-alexa' // Example slug
  },
]; 