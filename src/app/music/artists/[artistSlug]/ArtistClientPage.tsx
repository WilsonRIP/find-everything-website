'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useThemeManager } from "../../../../lib/hooks/useThemeManager";
import { cn } from "../../../../lib/utils";
import { Artist, CareerMilestone, DiscographyItem } from '../../../data/musicData';

interface ArtistClientPageProps {
  artist: Artist | undefined;
}

export default function ArtistClientPage({ artist }: ArtistClientPageProps) {
  const { isDark, mounted } = useThemeManager();
  const currentIsDark = mounted ? isDark : false;

  if (!artist) {
    return (
      <main className={cn("min-h-screen p-8 md:p-12 flex flex-col items-center justify-center", currentIsDark ? "bg-slate-900 text-slate-100" : "bg-slate-50 text-slate-800")}>
        <h1 className="text-4xl font-bold mb-4">Artist Not Found</h1>
        <Link href="/music" className={cn("text-lg hover:underline", currentIsDark ? "text-sky-400 hover:text-sky-300" : "text-sky-600 hover:text-sky-700")}>
          &larr; Back to Music
        </Link>
      </main>
    );
  }

  const { 
    name, 
    imageUrl, 
    genre,
    summary, 
    biographyParagraphs, 
    careerHighlights, 
    recognitionAndAwards, 
    discography, 
    artisticStyleAndImpact,
    citations 
  } = artist;

  return (
    <main className={cn("min-h-screen p-6 md:p-10", currentIsDark ? "bg-slate-900 text-slate-100" : "bg-slate-100 text-slate-900")}>
      <div className="container mx-auto max-w-4xl">
        <Link href="/music" className={cn("mb-6 inline-block text-sm hover:underline", currentIsDark ? "text-sky-400 hover:text-sky-300" : "text-sky-600 hover:text-sky-700")}>
          &larr; Back to Music
        </Link>

        <header className="mb-8 md:mb-12 text-center">
          <div className={cn("relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden shadow-xl ring-2", currentIsDark ? "ring-slate-700" : "ring-slate-300")}>
            <Image src={imageUrl} alt={`Photo of ${name}`} fill className="object-cover" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-2">
            {name}
          </h1>
          {genre && <p className={cn("text-lg", currentIsDark ? "text-slate-400" : "text-slate-600")}>{genre}</p>}
        </header>

        {summary && (
          <section className={cn("mb-8 p-6 rounded-lg shadow-md", currentIsDark ? "bg-slate-800" : "bg-white")}>
            <h2 className="text-2xl font-semibold mb-3">Summary</h2>
            <p className={cn("text-md leading-relaxed", currentIsDark ? "text-slate-300" : "text-slate-700")}>{summary}</p>
          </section>
        )}

        {biographyParagraphs && biographyParagraphs.length > 0 && (
          <section className={cn("mb-8 p-6 rounded-lg shadow-md", currentIsDark ? "bg-slate-800" : "bg-white")}>
            <h2 className="text-2xl font-semibold mb-3">Biography</h2>
            <div className="space-y-4">
              {biographyParagraphs.map((paragraph: string, index: number) => (
                <p key={index} className={cn("text-md leading-relaxed", currentIsDark ? "text-slate-300" : "text-slate-700")}>{paragraph}</p>
              ))}
            </div>
          </section>
        )}

        {careerHighlights && careerHighlights.length > 0 && (
          <section className={cn("mb-8 p-6 rounded-lg shadow-md", currentIsDark ? "bg-slate-800" : "bg-white")}>
            <h2 className="text-2xl font-semibold mb-4">Career Highlights</h2>
            <ul className="list-disc list-inside space-y-2 pl-2">
              {careerHighlights.map((highlight: CareerMilestone, index: number) => (
                <li key={index} className={cn("text-md", currentIsDark ? "text-slate-300" : "text-slate-700")}>
                  <strong className={cn(currentIsDark ? "text-sky-400" : "text-sky-600")}>{highlight.year}:</strong> {highlight.event}
                </li>
              ))}
            </ul>
          </section>
        )}

        {recognitionAndAwards && (recognitionAndAwards.mainstreamRecognition || (recognitionAndAwards.awards && recognitionAndAwards.awards.length > 0)) && (
          <section className={cn("mb-8 p-6 rounded-lg shadow-md", currentIsDark ? "bg-slate-800" : "bg-white")}>
            <h2 className="text-2xl font-semibold mb-3">Recognition and Awards</h2>
            {recognitionAndAwards.mainstreamRecognition && (
              <p className={cn("text-md leading-relaxed mb-4", currentIsDark ? "text-slate-300" : "text-slate-700")}>{recognitionAndAwards.mainstreamRecognition}</p>
            )}
            {recognitionAndAwards.awards && recognitionAndAwards.awards.length > 0 && (
              <ul className="list-disc list-inside space-y-2 pl-2">
                {recognitionAndAwards.awards.map((award: string, index: number) => (
                  <li key={index} className={cn("text-md", currentIsDark ? "text-slate-300" : "text-slate-700")}>{award}</li>
                ))}
              </ul>
            )}
          </section>
        )}

        {discography && (discography.studioAlbums || discography.eps || discography.mixtapes) && (
          <section className={cn("mb-8 p-6 rounded-lg shadow-md", currentIsDark ? "bg-slate-800" : "bg-white")}>
            <h2 className="text-2xl font-semibold mb-4">Discography</h2>
            {discography.studioAlbums && discography.studioAlbums.length > 0 && (
              <div className="mb-4">
                <h3 className={cn("text-xl font-medium mb-2", currentIsDark ? "text-sky-400" : "text-sky-600")}>Studio Albums</h3>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  {discography.studioAlbums.map((album: DiscographyItem) => (
                    <li key={album.title} className={cn("text-md", currentIsDark ? "text-slate-300" : "text-slate-700")}>
                      {album.title} ({album.year}){album.notes && <span className="italic text-sm"> - {album.notes}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {discography.eps && discography.eps.length > 0 && (
              <div className="mb-4">
                <h3 className={cn("text-xl font-medium mb-2", currentIsDark ? "text-sky-400" : "text-sky-600")}>EPs</h3>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  {discography.eps.map((ep: DiscographyItem) => (
                    <li key={ep.title} className={cn("text-md", currentIsDark ? "text-slate-300" : "text-slate-700")}>
                      {ep.title} ({ep.year}){ep.notes && <span className="italic text-sm"> - {ep.notes}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {discography.mixtapes && discography.mixtapes.length > 0 && (
              <div>
                <h3 className={cn("text-xl font-medium mb-2", currentIsDark ? "text-sky-400" : "text-sky-600")}>Mixtapes</h3>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  {discography.mixtapes.map((mixtape: DiscographyItem) => (
                    <li key={mixtape.title} className={cn("text-md", currentIsDark ? "text-slate-300" : "text-slate-700")}>
                      {mixtape.title} ({mixtape.year}){mixtape.notes && <span className="italic text-sm"> - {mixtape.notes}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}

        {artisticStyleAndImpact && artisticStyleAndImpact.length > 0 && (
          <section className={cn("mb-8 p-6 rounded-lg shadow-md", currentIsDark ? "bg-slate-800" : "bg-white")}>
            <h2 className="text-2xl font-semibold mb-3">Artistic Style & Impact</h2>
            <div className="space-y-4">
              {artisticStyleAndImpact.map((paragraph: string, index: number) => (
                <p key={index} className={cn("text-md leading-relaxed", currentIsDark ? "text-slate-300" : "text-slate-700")}>{paragraph}</p>
              ))}
            </div>
          </section>
        )}
        
        {citations && citations.length > 0 && (
           <section className={cn("mt-10 pt-6 border-t", currentIsDark ? "border-slate-700" : "border-slate-300")}>
            <h2 className="text-xl font-semibold mb-3">Citations</h2>
            <ul className="list-decimal list-inside space-y-1 text-xs">
              {citations.map((citation: string, index: number) => (
                <li key={index} className={cn(currentIsDark ? "text-slate-400" : "text-slate-600")}>
                  <a href={citation} target="_blank" rel="noopener noreferrer" className="hover:underline break-all">{citation}</a>
                </li>
              ))}
            </ul>
          </section>
        )}

      </div>
    </main>
  );
} 