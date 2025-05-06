import React from 'react';
import { artists, Artist } from '../../../data/musicData';
import ArtistClientPage from './ArtistClientPage'; // Import the new client component

interface ArtistPageProps {
  params: Promise<{
    artistSlug: string;
  }>;
}

export default async function ArtistPage({ params }: ArtistPageProps) {
  const { artistSlug } = await params;
  const artist = artists.find((a: Artist) => a.slug === artistSlug);

  // The rendering logic is now delegated to ArtistClientPage
  return <ArtistClientPage artist={artist} />;
} 