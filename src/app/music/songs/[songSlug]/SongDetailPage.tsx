'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Song } from '../../../data/musicData';
import { useThemeManager } from '../../../../lib/hooks/useThemeManager';
import { cn } from '../../../../lib/utils';
import { ExternalLink } from 'lucide-react'; // Keep ExternalLink, remove others

interface SongDetailPageProps {
  song: Song;
}

// Helper to get platform icon
const PlatformIcon = ({ platform, className }: { platform: string, className?: string }) => {
  const defaultClass = "w-5 h-5 mr-2 relative"; // Added relative for Image positioning
  const imageSize = 20; // Consistent size for icons

  if (platform.toLowerCase().includes('spotify')) {
    return (
      <div className={cn(defaultClass, className)}>
        <Image src="/musicplayer_icons/spotify.png" alt="Spotify" width={imageSize} height={imageSize} />
      </div>
    );
  }
  if (platform.toLowerCase().includes('apple')) {
    return (
      <div className={cn(defaultClass, className)}>
        <Image src="/musicplayer_icons/apple_music_logo_2.png" alt="Apple Music" width={imageSize} height={imageSize} />
      </div>
    );
  }
  if (platform.toLowerCase().includes('youtube')) {
    return (
      <div className={cn(defaultClass, className)}>
        <Image src="/musicplayer_icons/yt_music_4.png" alt="YouTube Music" width={imageSize} height={imageSize} />
      </div>
    );
  }
  return <ExternalLink className={cn("w-5 h-5 mr-2", className)} />; // Adjusted default class for ExternalLink
};

export default function SongDetailPage({ song }: SongDetailPageProps) {
  const { isDark, mounted } = useThemeManager();
  const currentIsDark = mounted ? isDark : false;

  const platformLinks = [
    { name: 'Spotify', url: song.spotifyUrl, iconPlatform: 'spotify' },
    { name: 'Apple Music', url: song.appleMusicUrl, iconPlatform: 'apple' },
    { name: 'YouTube Music', url: song.youtubeMusicUrl, iconPlatform: 'youtube' },
    // Add more platforms here if they are in the Song interface
  ].filter(link => link.url && link.url !== '#'); // Filter out empty or placeholder links

  return (
    <main className={cn("min-h-screen p-6 md:p-10", currentIsDark ? "text-slate-100" : "text-slate-900")}>
      <div className="container mx-auto max-w-2xl">
        <Link href="/music" className={cn("mb-6 inline-block text-sm hover:underline", currentIsDark ? "text-sky-400 hover:text-sky-300" : "text-sky-600 hover:text-sky-700")}>
          &larr; Back to Music Page
        </Link>

        <article className={cn("p-6 rounded-lg shadow-xl", currentIsDark ? "bg-slate-800" : "bg-white")}>
          <header className="mb-6 text-center flex flex-col items-center">
            {song.imageUrl && (
              <div className={cn("relative w-48 h-48 md:w-56 md:h-56 mx-auto mb-6 rounded-lg overflow-hidden shadow-lg", currentIsDark ? "bg-slate-700" : "bg-slate-200")}>
                <Image 
                  src={song.imageUrl} 
                  alt={`Cover for ${song.title}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>
            )}
            <h1 className={cn("text-3xl sm:text-4xl font-extrabold tracking-tight mb-1", currentIsDark ? "text-sky-300" : "text-sky-600")}>
              {song.title}
            </h1>
            <p className={cn("text-xl font-medium mb-4", currentIsDark ? "text-slate-300" : "text-slate-700")}>
              by {song.artist}
            </p>
          </header>

          {platformLinks.length > 0 && (
            <section className={cn("mt-6 pt-6 border-t", currentIsDark ? "border-slate-700" : "border-slate-300")}>
              <h2 className={cn("text-2xl font-semibold mb-4 text-center", currentIsDark ? "text-slate-200" : "text-slate-800")}>
                Listen On
              </h2>
              <div className="flex flex-col space-y-3">
                {platformLinks.map(link => (
                  <a 
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "flex items-center justify-center px-6 py-3 rounded-md font-medium text-center transition-all duration-200 ease-out",
                      "shadow-md hover:shadow-lg transform hover:scale-[1.02]",
                      currentIsDark
                        ? link.iconPlatform === 'apple'
                          ? "bg-[#fc445c] hover:bg-[#fc3c54] text-white ring-1 ring-[#fc445c] hover:ring-[#fc2840]"
                          : link.iconPlatform === 'spotify'
                            ? "bg-[#1DB954] hover:bg-[#1AA34A] text-white ring-1 ring-[#1DB954] hover:ring-[#1AA34A]"
                            : link.iconPlatform === 'youtube'
                              ? "bg-[#FF0000] hover:bg-[#CC0000] text-white ring-1 ring-[#FF0000] hover:ring-[#CC0000]"
                              : "bg-slate-700 hover:bg-slate-600 text-slate-100 ring-1 ring-slate-600 hover:ring-sky-500"
                        : link.iconPlatform === 'apple'
                          ? "bg-[#fc445c] hover:bg-[#fc3c54] text-white ring-1 ring-[#fc445c] hover:ring-[#fc2840]"
                          : link.iconPlatform === 'spotify'
                            ? "bg-[#1DB954] hover:bg-[#1AA34A] text-white ring-1 ring-[#1DB954] hover:ring-[#1AA34A]"
                            : link.iconPlatform === 'youtube'
                              ? "bg-[#FF0000] hover:bg-[#CC0000] text-white ring-1 ring-[#FF0000] hover:ring-[#CC0000]"
                              : "bg-slate-100 hover:bg-slate-200 text-slate-800 ring-1 ring-slate-200 hover:ring-sky-600"
                    )}
                  >
                    <PlatformIcon platform={link.iconPlatform} />
                    {link.name}
                  </a>
                ))}
              </div>
            </section>
          )}

          {!platformLinks.length && (
             <p className={cn("text-center text-sm py-4 mt-6 pt-6 border-t", currentIsDark ? "text-slate-400 border-slate-700" : "text-gray-500 border-slate-300")}>
                No streaming links available for this song yet.
              </p>
          )}
          
        </article>
      </div>
    </main>
  );
} 