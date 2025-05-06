import { songs, Song } from '../../../data/musicData';
import SongDetailPage from './SongDetailPage';
import { notFound } from 'next/navigation';

interface SongPageProps {
  params: {
    songSlug: string;
  };
}

async function getSongBySlug(slug: string): Promise<Song | undefined> {
  // In a real app, you might fetch this from a DB or API
  return songs.find((song) => song.slug === slug);
}

export async function generateMetadata({ params }: SongPageProps) {
  const song = await getSongBySlug(params.songSlug);
  if (!song) {
    return {
      title: 'Song Not Found',
    };
  }
  return {
    title: `${song.title} by ${song.artist} - Find Everything`,
    description: `Listen to ${song.title} by ${song.artist} on your favorite platforms.`,
  };
}

export default async function SongPage({ params }: SongPageProps) {
  const song = await getSongBySlug(params.songSlug);

  if (!song) {
    notFound();
  }

  return <SongDetailPage song={song} />;
}

// Optional: If you want to statically generate these pages at build time
// export async function generateStaticParams() {
//   return songs.map((song) => ({
//     songSlug: song.slug,
//   }));
// } 