"use client";
import { useThemeManager } from "../lib/hooks/useThemeManager";
import { cn } from "../lib/utils";
import { motion } from 'framer-motion';
import { fadeInUp, subtleButtonHover } from '../lib/animations';
import Link from 'next/link'; // Import Link for navigation

export default function HomePage() {
  const { isDark, mounted } = useThemeManager();

  // Use a consistent theme value until mounted, then use the actual client theme
  const currentIsDark = mounted ? isDark : false; // Default to light theme (isDark = false)

  return (
    <main className={cn(
      "flex min-h-screen flex-col items-center justify-center p-8 text-center", // Adjusted padding and text-center
      currentIsDark ? "bg-slate-900 text-slate-100" : "bg-slate-50 text-slate-800" 
    )}>
      <motion.h1 
        className={cn(
          "text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-4", // Added mb-4
          "[text-shadow:_0_2px_4px_rgba(0,0,0,0.1)] dark:[text-shadow:_0_2px_4px_rgba(0,0,0,0.3)]", 
          currentIsDark ? "text-white" : "text-gray-900" 
        )}
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5, ease: 'easeOut' }} // Base fadeInUp transition
      >
        Find Everything
      </motion.h1>
      
      <motion.p 
        variants={fadeInUp} 
        initial="initial" 
        animate="animate" 
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }} // Delayed fadeInUp
        className={cn(
          "mt-2 mb-8 text-lg md:text-xl max-w-xl", // Adjusted margins and max-width
          currentIsDark ? "text-slate-400" : "text-slate-600" // Conditional text color
        )}
      >
        Your ultimate destination to explore a curated collection of music, games, and much more. Dive in and discover your next favorite thing!
      </motion.p>

      <motion.div
        variants={fadeInUp} // Animate the container for buttons
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-4 mt-4"
      >
        <motion.div whileHover={subtleButtonHover}>
          <Link 
            href="/music"
            className={cn(
              "px-8 py-3 font-semibold rounded-lg shadow-md transition-all duration-300 ease-out",
              currentIsDark 
                ? "bg-sky-600 hover:bg-sky-500 text-white focus:ring-sky-400"
                : "bg-sky-500 hover:bg-sky-600 text-white focus:ring-sky-300",
              "focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
            )}
          >
            Explore Music
          </Link>
        </motion.div>
        <motion.div whileHover={subtleButtonHover}>
          <Link 
            href="/gaming"
            className={cn(
              "px-8 py-3 font-semibold rounded-lg shadow-md transition-all duration-300 ease-out",
              currentIsDark 
                ? "bg-indigo-600 hover:bg-indigo-500 text-white focus:ring-indigo-400"
                : "bg-indigo-500 hover:bg-indigo-600 text-white focus:ring-indigo-300",
              "focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
            )}
          >
            Discover Games
          </Link>
        </motion.div>
      </motion.div>

    </main>
  );
} 