'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useThemeManager } from '../../../lib/hooks/useThemeManager';
import { cn } from '../../../lib/utils';
import { Game } from '../../data/gamingData'; // This is the correct import for the Game type
import { ExternalLink } from 'lucide-react'; // Assuming you might want an icon

// Helper function to process markdown-like text to HTML
function processDescription(text: string, citations: string[] | undefined): string {
  if (!text) return '';
  let html = text;

  // 1. Citations [N] -> <a href="URL_FOR_CITATION_N" target="_blank">[N] <ExternalLinkIcon /></a>
  html = html.replace(/\[(\d+)\]/g, (match, p1) => {
    const index = parseInt(p1, 10) - 1; // Convert to 0-based index
    if (citations && index >= 0 && index < citations.length) {
      const url = citations[index];
      // Added a small external link icon next to the citation number
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-sky-500 dark:text-sky-400 hover:underline focus:outline-none focus:ring-2 focus:ring-sky-500 rounded inline-flex items-center">[${p1}]<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-external-link ml-1"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg></a>`;
    }
    return match; // Return original match if citation not found
  });

  // 2. Headings (e.g., # Title, ## Subtitle)
  html = html.replace(/^# (.+?)(?:\[(\d+)\])?$/gm, '<h2 class="text-3xl font-bold mt-6 mb-3">$1</h2>');
  html = html.replace(/^## (.+?)(?:\[(\d+)\])?$/gm, '<h3 class="text-2xl font-semibold mt-4 mb-2">$1</h3>');
  
  // 3. Bold **text** -> <strong>text</strong>
  // Make sure this doesn't conflict with list items if they contain asterisks for other reasons
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // 4. Lists - item -> <ul><li>item</li>...</ul>
  // Process blocks of list items
  html = html.replace(/^(?:\s*- (.*)(?:\n|$))+/gm, (match) => {
    const items = match.split('\n').filter(line => line.trim().startsWith('- ')).map(line => {
      let itemContent = line.substring(line.indexOf('- ') + 2).trim();
      // Inline elements like bold and citations within list items should already be processed by the rules above if they run globally.
      // If not, they might need to be re-applied here or the order of operations adjusted.
      return `<li class="ml-5">${itemContent}</li>`;
    }).join('');
    return `<ul class="list-disc pl-5 mb-4">${items}</ul>`;
  });

  // Replace remaining standalone newlines with <br /> for paragraph-like structures if not handled by prose or whitespace-pre-line
  // This should be careful not to add <br> inside already structured blocks like <ul> or <h3>
  // A simpler way is to wrap non-list, non-heading blocks of text in <p> tags.
  // For now, relying on `whitespace-pre-line` or `prose` to handle text flow.
  // If using prose, it should handle paragraph spacing automatically based on semantic HTML.
  // Let's split by double newlines to form paragraphs for text not already in a list or heading.
  // This is a simplified paragraph handling:
  const blocks = html.split(/\n\s*\n/); // Split by blank lines
  html = blocks.map(block => {
    if (block.startsWith('<ul') || block.startsWith('<h')) {
      return block; // Already formatted
    }
    // Wrap other blocks in <p> tags, ensuring to trim whitespace
    return block.trim() ? `<p>${block.trim().replace(/\n/g, '<br />')}</p>` : '';
  }).join('');


  return html;
}

interface GameInfoClientPageProps {
  game: Game | undefined; // This 'Game' should come from the import above
}

export default function GameInfoClientPage({ game }: GameInfoClientPageProps) {
  const { isDark, mounted } = useThemeManager();
  const currentIsDark = mounted ? isDark : false;

  if (!game) {
    return (
      <main className={cn("min-h-screen p-8 md:p-12 flex flex-col items-center justify-center", currentIsDark ? "text-slate-100" : "text-slate-800")}>
        <h1 className="text-4xl font-bold mb-4">Game Not Found</h1>
        <Link href="/gaming" className={cn("text-lg hover:underline", currentIsDark ? "text-sky-400 hover:text-sky-300" : "text-sky-600 hover:text-sky-700")}>
          &larr; Back to Gaming Page
        </Link>
      </main>
    );
  }

  const processedLongDescription = React.useMemo(() => processDescription(game.longDescription || '', game.citations), [game.longDescription, game.citations]);

  return (
    <main className={cn("min-h-screen p-6 md:p-10", currentIsDark ? "text-slate-100" : "text-slate-900")}>
      <div className="container mx-auto max-w-3xl">
        <Link href="/gaming" className={cn("mb-6 inline-block text-sm hover:underline", currentIsDark ? "text-sky-400 hover:text-sky-300" : "text-sky-600 hover:text-sky-700")}>
          &larr; Back to Gaming Page
        </Link>

        <article className={cn("p-6 rounded-lg shadow-md", currentIsDark ? "bg-slate-800" : "bg-white")}>
          <header className="mb-6 text-center">
            {game.imageUrl && (
              <div className={cn("relative w-full h-64 mx-auto mb-6 rounded-md overflow-hidden shadow-lg", currentIsDark ? "bg-slate-700" : "bg-slate-200")}>
                <Image 
                  src={game.imageUrl} 
                  alt={`Banner for ${game.name}`} 
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>
            )}
            {game.steamUrl ? (
              <a 
                href={game.steamUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "text-4xl sm:text-5xl font-extrabold tracking-tight mb-2 inline-flex items-center group",
                  currentIsDark ? "text-sky-400 hover:text-sky-300" : "text-sky-600 hover:text-sky-700",
                  "transition-colors duration-200"
                )}
              >
                {game.name}
                <ExternalLink className="ml-2 h-5 w-5 opacity-70 group-hover:opacity-100 transition-opacity" />
              </a>
            ) : (
              <h1 className={cn("text-4xl sm:text-5xl font-extrabold tracking-tight mb-2", currentIsDark ? "text-sky-400" : "text-sky-600")}>
                {game.name}
              </h1>
            )}
            {game.genre && <p className={cn("text-md", currentIsDark ? "text-slate-400" : "text-slate-600")}>Genre: {game.genre}</p>}
          </header>

          {game.description && (
            <section className="mb-6">
              <h2 className={cn("text-2xl font-semibold mb-3 border-b pb-2", currentIsDark ? "border-slate-700" : "border-slate-300")}>Quick Look</h2>
              <p className={cn("text-md leading-relaxed", currentIsDark ? "text-slate-300" : "text-slate-700")}>{game.description}</p>
            </section>
          )}
          
          {game.longDescription && (
            <section className="mb-6">
              <h2 className={cn("text-2xl font-semibold mb-3 border-b pb-2", currentIsDark ? "border-slate-700" : "border-slate-300")}>Details</h2>
              <div 
                className={cn("text-md leading-relaxed prose prose-sm max-w-none", 
                             currentIsDark ? "prose-invert" : ""
                            )}
                dangerouslySetInnerHTML={{ __html: processedLongDescription }}
              />
            </section>
          )}

          <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t", currentIsDark ? "border-slate-700" : "border-slate-300")}>
            {game.releaseDate && (
              <div>
                <h3 className={cn("text-lg font-semibold", currentIsDark ? "text-sky-400" : "text-sky-600")}>Release Date</h3>
                <p className={cn(currentIsDark ? "text-slate-300" : "text-slate-700")}>{game.releaseDate}</p>
              </div>
            )}
            {game.developer && (
              <div>
                <h3 className={cn("text-lg font-semibold", currentIsDark ? "text-sky-400" : "text-sky-600")}>Developer</h3>
                <p className={cn(currentIsDark ? "text-slate-300" : "text-slate-700")}>{game.developer}</p>
              </div>
            )}
          </div>

          {game.citations && game.citations.length > 0 && (
            <section className={cn("mt-8 pt-6 border-t", currentIsDark ? "border-slate-700" : "border-slate-300")}>
              <h2 className={cn("text-xl font-semibold mb-3", currentIsDark ? "text-sky-300" : "text-sky-700")}>Citations</h2>
              <ol className="list-decimal list-inside space-y-1 text-xs">
                {game.citations.map((citation: string, index: number) => (
                  <li key={index} id={`citation-${index + 1}`} className={cn(currentIsDark ? "text-slate-400" : "text-slate-600")}>
                    <a 
                      href={citation} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:underline break-all"
                    >
                      {citation}
                    </a>
                  </li>
                ))}
              </ol>
            </section>
          )}
        </article>
      </div>
    </main>
  );
} 