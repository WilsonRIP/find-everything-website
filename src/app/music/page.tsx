"use client";
import React from 'react';
import { useThemeManager } from '../../lib/hooks/useThemeManager';
import { cn } from '../../lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { artists, songs } from '../data/musicData'; // Import data from the new file
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, cardHoverEffect } from '../../lib/animations';

// Placeholder data

export default function MusicPage() {
  const { isDark, mounted } = useThemeManager();

  // Use a consistent theme value until mounted, then use the actual client theme
  const currentIsDark = mounted ? isDark : false; // Default to light theme (isDark = false)

  return (
    <main className={cn("min-h-screen px-4 sm:px-6 md:px-8 lg:p-12", currentIsDark ? "text-slate-100" : "text-slate-800")}>
      <motion.h1 
        className="text-4xl sm:text-5xl font-bold text-center mb-12 sm:mb-16 tracking-tight [text-shadow:_0_1px_2px_rgba(0,0,0,0.05)] dark:[text-shadow:_0_1px_2px_rgba(0,0,0,0.1)]"
        variants={fadeInUp}
        initial="initial"
        animate="animate"
      >
        Discover Your Next Favorite Tune
      </motion.h1>

      <section className="mb-16 sm:mb-20">
        <motion.h2 
          className="text-3xl sm:text-4xl font-semibold mb-8 text-center sm:text-left [text-shadow:_0_1px_2px_rgba(0,0,0,0.05)] dark:[text-shadow:_0_1px_2px_rgba(0,0,0,0.1)]"
          variants={fadeInUp} initial="initial" animate="animate" transition={{ delay: 0.1 }}
        >
          Featured Artists
        </motion.h2>
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 w-full" // Added xl:grid-cols-4 and adjusted gap
          variants={staggerContainer(0.1, 0.2)} // Stagger children by 0.1s, delay first child by 0.2s
          initial="initial"
          animate="animate"
        >
          {artists.map((artist) => {
            const artistSlug = artist.name
              .toLowerCase()
              .replace(/\s+/g, '-') // Replace spaces with hyphens
              .replace(/[^a-z0-9-]/g, ''); // Remove non-alphanumeric characters except hyphens
            return (
              <motion.div variants={fadeInUp} key={artist.id} className="block group">
                <Link href={`/music/artists/${artistSlug}`} className="block h-full">
                  <motion.div 
                    className={cn(
                      "rounded-xl shadow-lg overflow-hidden h-full flex flex-col", // Ensure flex column for content alignment
                      "transition-all duration-300 ease-out", // Keep base transition for non-Framer Motion properties
                      currentIsDark ? "bg-slate-800 ring-1 ring-slate-700 hover:ring-sky-500" : "bg-white ring-1 ring-slate-200 hover:ring-sky-600"
                    )}
                    whileHover={cardHoverEffect} // Apply Framer Motion hover effect
                  >
                    <div className="relative w-full h-64 sm:h-72 md:h-80">
                      <Image
                        src={artist.imageUrl}
                        alt={`Art for ${artist.name}`}
                        fill
                        className="object-cover transition-transform duration-300 ease-out group-hover:scale-105" // Subtle image zoom on hover
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-5 flex-grow flex flex-col"> {/* Adjusted padding and flex for text content */}
                      <h3 className="text-xl font-bold mb-1 tracking-tight truncate group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors" title={artist.name}>{artist.name}</h3>
                      <p className={cn("text-sm flex-grow", currentIsDark ? "text-slate-400" : "text-slate-600")}>
                        {artist.genre}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      <section>
        <motion.h2 
          className="text-3xl sm:text-4xl font-semibold mb-8 text-center sm:text-left [text-shadow:_0_1px_2px_rgba(0,0,0,0.05)] dark:[text-shadow:_0_1px_2px_rgba(0,0,0,0.1)]"
          variants={fadeInUp} initial="initial" animate="animate" transition={{ delay: 0.3 }}
        >
          Recommended Songs
        </motion.h2>
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 w-full"
          variants={staggerContainer(0.1, 0.4)}
          initial="initial"
          animate="animate"
        >
          {songs.map((song) => (
            <Link href={`/music/songs/${song.slug}`} key={song.id} className="block group h-full">
              <motion.div 
                variants={fadeInUp} // This applies to the Link's direct child if Link isn't a motion component itself
                                   // Or, make the Link a motion.a or motion(Link) if direct animation on Link is needed
                className={cn(
                  "rounded-xl shadow-lg overflow-hidden h-full flex flex-col", 
                  currentIsDark ? "bg-slate-800 ring-1 ring-slate-700 group-hover:ring-sky-500" : "bg-white ring-1 ring-slate-200 group-hover:ring-sky-600",
                  "transition-all duration-300 ease-out" 
                )}
                whileHover={cardHoverEffect} 
              >
                <div className="relative w-full h-40 sm:h-48">
                  <Image
                    src={song.imageUrl}
                    alt={`Cover for ${song.title}`}
                    fill
                    className="object-cover transition-transform duration-300 ease-out group-hover:scale-105" 
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-5 flex-grow flex flex-col"> 
                  <h3 className="text-xl font-bold mb-1 tracking-tight truncate group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors" title={song.title}>{song.title}</h3>
                  <p className={cn("text-sm flex-grow", currentIsDark ? "text-slate-400" : "text-slate-600")}>
                    By {song.artist}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </section>
    </main>
  );
} 