'use client';

import React from 'react';
import Link from 'next/link';
import { useThemeManager } from '../../lib/hooks/useThemeManager';
import { cn } from '../../lib/utils';
import { Game, gamesData } from '../data/gamingData'; // Updated import
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../../lib/animations';

export default function GamingPage() {
  const { isDark, mounted } = useThemeManager();
  const currentIsDark = mounted ? isDark : false;

  return (
    <main
      className={cn(
        "min-h-screen flex flex-col items-center p-8 md:p-12",
        currentIsDark ? "text-slate-100" : "text-slate-800"
      )}
    >
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-8 text-center">
          Gaming Zone
        </h1>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer(0.1, 0.2)} // Stagger children by 0.1s, delay first child by 0.2s
          initial="initial"
          animate="animate"
        >
          {gamesData.map((game) => ( // Changed games to gamesData
            <motion.div key={game.id} variants={fadeInUp}>
              <Link href={`/gaming/${game.slug}`} passHref>
                <div className={cn(
                  "p-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out h-full flex flex-col", // Removed redundant 'block' class
                  currentIsDark ? "bg-slate-800 hover:bg-slate-700" : "bg-white hover:bg-slate-100"
                )}>
                  {/* Example: Add an Image component here if you have images */}
                  {game.imageUrl_2 && ( 
                    <div className="relative w-full h-40 mb-4 rounded-md overflow-hidden"> {/* Added container for responsive image */}
                      <Image 
                        src={game.imageUrl_2} 
                        alt={game.name} 
                        fill
                        style={{ objectFit: 'cover' }} // Changed to fill and objectFit
                        className="rounded-md" 
                      /> 
                    </div>
                  )}
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
} 