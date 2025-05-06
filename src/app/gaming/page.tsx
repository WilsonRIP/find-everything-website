'use client';

import React from 'react';
import Link from 'next/link';
import { useThemeManager } from '../../lib/hooks/useThemeManager';
import { cn } from '../../lib/utils';
import { Game, gamesData } from '../data/gamingData'; // Updated import
import Image from 'next/image';
export default function GamingPage() {
  const { isDark, mounted } = useThemeManager();
  const currentIsDark = mounted ? isDark : false;

  return (
    <main
      className={cn(
        "min-h-screen flex flex-col items-center p-8 md:p-12",
        currentIsDark ? "bg-slate-900 text-slate-100" : "bg-slate-50 text-slate-800"
      )}
    >
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-8 text-center">
          Gaming Zone
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gamesData.map((game) => ( // Changed games to gamesData
            <Link key={game.id} href={`/gaming/${game.slug}`} passHref>
              <div className={cn(
                "block p-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out",
                "hover:shadow-xl hover:scale-105",
                currentIsDark ? "bg-slate-800 hover:bg-slate-700" : "bg-white hover:bg-slate-100"
              )}>
                {/* Example: Add an Image component here if you have images */}
                {game.imageUrl_2 && ( <Image src={game.imageUrl_2} alt={game.name} width={300} height={150} className="rounded-md mb-4" /> )}
                <h2 className={cn("text-2xl font-semibold mb-2", currentIsDark ? "text-sky-400" : "text-sky-600")}>
                  {game.name}
                </h2>
                {game.description && (
                  <p className={cn("text-sm", currentIsDark ? "text-slate-400" : "text-slate-600")}>
                    {game.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
} 