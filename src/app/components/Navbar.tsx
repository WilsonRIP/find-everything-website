"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Crimson_Text } from "next/font/google";
import { useState, useEffect } from "react";
import { useThemeManager } from "../../lib/hooks/useThemeManager";
import ThemeToggle from "./ThemeToggle";
import Image from "next/image";
import { Button } from "../components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "../components/ui/sheet";
import { Menu, Search, X as XIcon } from "lucide-react";
import { cn } from "../../lib/utils";
import { mainNavLinks } from "../data/navigation";
import { WEBSITE_NAME } from "../../lib/types";
import { gamesData, Game } from "../data/gamingData";
import { artists, songs, Artist, Song } from "../data/musicData";
import { motion } from "framer-motion";

const crimsonText = Crimson_Text({
  weight: "400",
  subsets: ["latin"],
});

const navLinks = mainNavLinks;

export default function Navbar() {
  const pathname = usePathname();
  const { isDark, mounted } = useThemeManager();
  const [isMobile, setIsMobile] = useState(false);
  const [isCompactView, setIsCompactView] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<(Game | Artist | Song)[]>([]);

  // Theme detection handled by useThemeManager

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsCompactView(window.innerWidth < 1024);
    };

    // Initial check
    checkScreenSize();

    // Add resize event listener
    window.addEventListener("resize", checkScreenSize);

    // Clean up
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Add scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Search logic effect
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    const lowerCaseQuery = searchQuery.toLowerCase();
    
    const filteredGames = gamesData.filter(
      (game) =>
        game.name.toLowerCase().includes(lowerCaseQuery) ||
        game.description?.toLowerCase().includes(lowerCaseQuery) ||
        game.genre?.toLowerCase().includes(lowerCaseQuery) ||
        game.developer?.toLowerCase().includes(lowerCaseQuery)
    );

    const filteredArtists = artists.filter(
      (artist) =>
        artist.name.toLowerCase().includes(lowerCaseQuery) ||
        artist.genre.toLowerCase().includes(lowerCaseQuery)
    );

    const filteredSongs = songs.filter(
      (song) =>
        song.title.toLowerCase().includes(lowerCaseQuery) ||
        song.artist.toLowerCase().includes(lowerCaseQuery)
    );
    
    // Combine and type results (simple example, can be refined with a type property)
    const combinedResults = [
      ...filteredGames.map(item => ({ ...item, resultType: 'game' })),
      ...filteredArtists.map(item => ({ ...item, resultType: 'artist' })),
      ...filteredSongs.map(item => ({ ...item, resultType: 'song' })),
    ];

    setSearchResults(combinedResults as (Game | Artist | Song)[]); // Cast needed if resultType is not on base types

  }, [searchQuery]);

  // Prevent hydration mismatch by rendering a placeholder until client-side
  if (!mounted) {
    return (
      <header
        className={cn(
          crimsonText.className,
          "sticky top-0 z-50 h-16 md:h-[68px] backdrop-blur-lg"
        )}
      >
        <div className="container mx-auto flex items-center px-4 md:px-6 h-full"></div>
      </header>
    );
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setShowSearch(false); // Optionally close search bar on clear
  };
  
  const closeSearch = () => {
    setSearchQuery("");
    setShowSearch(false);
  }

  return (
    <header
      className={cn(
        crimsonText.className,
        "sticky top-0 z-50 backdrop-blur-lg transition-all duration-300 ease-in-out",
        isScrolled ? "py-2 shadow-xl" : "py-3 shadow-lg",
        isDark
          ? "bg-gray-900/95 text-white border-b border-gray-800 shadow-gray-900/50"
          : "bg-white/95 text-gray-800 border-b border-gray-200 shadow-gray-300/20"
      )}
    >
      <div className="container mx-auto flex items-center h-10 md:h-12 px-4 md:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center text-xl md:text-2xl font-semibold tracking-wide mr-auto md:mr-8 group"
        >
          <span
            className={cn(
              "font-bold text-2xl",
              isDark 
                ? "text-white" 
                : "text-gray-900"
            )}
          >
            {WEBSITE_NAME}
          </span>
        </Link>

        {/* Search Toggle */}
        {!isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className={`mr-2 hover:bg-opacity-20 ${isDark ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-200'}`}
            onClick={() => setShowSearch(!showSearch)}
            aria-label="Toggle search"
          >
            <Search className="h-5 w-5" />
          </Button>
        )}

        {/* Desktop Navigation - Use NavigationMenu */}
        {!isMobile && (
          <NavigationMenu className="md:flex flex-grow justify-center">
            <NavigationMenuList className="flex flex-wrap gap-x-1 lg:gap-x-2">
              {navLinks.map(({ url, name }) => {
                const isActive = pathname === url || 
                  (url !== "/" && pathname?.startsWith(url));
                return (
                  <NavigationMenuItem key={url}>
                    <Link
                      href={url}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "font-medium whitespace-nowrap relative group transition-colors duration-200 ease-in-out",
                        isActive
                          ? isDark 
                            ? "text-gray-100 bg-primary/20" 
                            : "text-primary bg-primary/10"
                          : isDark
                            ? "text-gray-200 hover:text-gray-100 hover:bg-primary/10"
                            : "text-gray-800 hover:text-primary hover:bg-primary/10"
                      )}
                      data-state={isActive ? "active" : "inactive"}
                    >
                      {name}
                      <span
                        className={cn(
                          "absolute left-0 -bottom-[1px] h-0.5 w-full rounded bg-primary",
                          "transform origin-left scale-x-0 transition-transform duration-300 ease-out",
                          "group-hover:scale-x-100",
                          isActive && "scale-x-100"
                        )}
                      />
                    </Link>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        )}

        {/* Theme Toggle */}
        {!isMobile && (
          <div className="ml-auto pl-4">
            <ThemeToggle aria-label="Toggle theme" />
          </div>
        )}

        {/* Mobile Content (Theme Toggle + Menu Button) */}
        {isMobile && (
          <div className="flex items-center gap-2 ml-4">
            <Button
              variant="ghost"
              size="icon"
              className={`mr-2 hover:bg-opacity-20 ${isDark ? 'text-gray-200 hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-200'}`}
              onClick={() => setShowSearch(!showSearch)}
              aria-label="Toggle search"
            >
              <Search className="h-5 w-5" />
            </Button>
            <ThemeToggle aria-label="Toggle theme" />
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`z-50 hover:bg-opacity-20 ${isDark ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-200'}`}
                  aria-label="Toggle Menu"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className={cn(
                  "w-3/4 sm:w-1/2 backdrop-blur-md shadow-lg border-r",
                  isDark
                    ? "bg-slate-900/95 border-slate-700"
                    : "bg-background/95 border-slate-200"
                )}
              >
                <SheetHeader className="pb-6">
                  <SheetTitle className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {WEBSITE_NAME}
                  </SheetTitle>
                </SheetHeader>
                <div className="py-6">
                  <nav className="flex flex-col gap-4">
                    {navLinks.map(({ url, name }) => {
                      const isActive = pathname === url || 
                        (url !== "/" && pathname?.startsWith(url));
                      return (
                        <Link
                          key={url}
                          href={url}
                          className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-md transition-colors duration-200",
                            isActive
                              ? isDark
                                ? "bg-primary/20 text-gray-100 font-medium"
                                : "bg-primary/10 text-primary font-medium"
                              : isDark 
                                ? "text-gray-200 hover:bg-gray-800" 
                                : "text-gray-800 hover:bg-gray-100"
                          )}
                        >
                          {name}
                        </Link>
                      );
                    })}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        )}
      </div>
      
      {/* Expandable search bar */}
      {showSearch && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2, ease: "circOut" }}
          className="absolute top-full left-0 right-0 z-40 border-b shadow-lg"
          style={{ backgroundColor: isDark ? '#1f2937' : 'white'}}
        >
          <div className="container mx-auto px-4 py-3">
            <div className="relative w-full flex items-center">
              <Search className={cn("absolute left-3 h-5 w-5", isDark ? "text-gray-400" : "text-gray-500")} />
              <input
                type="text"
                placeholder="Search music, games..."
                value={searchQuery}
                onChange={handleSearchChange}
                className={cn(
                  "w-full pl-10 pr-10 py-2 rounded-md border",
                  isDark 
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-sky-500 focus:border-sky-500"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-sky-500 focus:border-sky-500"
                )}
                autoFocus
              />
              {searchQuery && (
                <Button variant="ghost" size="icon" onClick={clearSearch} className="absolute right-10 h-8 w-8">
                  <XIcon className={cn("h-4 w-4", isDark ? "text-gray-400 hover:text-gray-200" : "text-gray-500 hover:text-gray-800")} />
                </Button>
              )}
               <Button variant="ghost" size="icon" onClick={closeSearch} className="absolute right-1 h-8 w-8">
                  <XIcon className={cn("h-4 w-4", isDark ? "text-gray-400 hover:text-gray-200" : "text-gray-500 hover:text-gray-800")} />
                </Button>
            </div>
            {searchQuery && searchResults.length > 0 && (
              <div className="mt-2 max-h-80 overflow-y-auto rounded-md border p-2 shadow-sm"
                   style={{ 
                     backgroundColor: isDark ? '#374151' : '#f9fafb',
                     borderColor: isDark ? '#4b5563' : '#e5e7eb'
                   }}
              >
                {searchResults.map((item, index) => {
                  let href = "#";
                  let title = "Unknown";
                  let type = (item as any).resultType;

                  if (type === 'game') {
                    const game = item as Game;
                    href = `/gaming/${game.slug}`;
                    title = game.name;
                  } else if (type === 'artist') {
                    const artist = item as Artist;
                    href = `/music/artists/${artist.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`;
                    title = artist.name;
                  } else if (type === 'song') {
                    const song = item as Song;
                    href = `/music`;
                    title = `${song.title} by ${song.artist}`;
                  }

                  return (
                    <Link href={href} key={`${type}-${(item as any).id || index}`} onClick={closeSearch}>
                      <div className={cn(
                        "p-2 rounded-md cursor-pointer",
                        isDark ? "hover:bg-gray-600" : "hover:bg-gray-200"
                      )}>
                        <span className="font-semibold">{title}</span>
                        <span className={cn("ml-2 text-xs px-1.5 py-0.5 rounded-full", 
                          type === 'game' ? (isDark ? 'bg-sky-700 text-sky-200' : 'bg-sky-100 text-sky-700') :
                          type === 'artist' ? (isDark ? 'bg-purple-700 text-purple-200' : 'bg-purple-100 text-purple-700') :
                          (isDark ? 'bg-green-700 text-green-200' : 'bg-green-100 text-green-700')
                        )}>{type}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
            {searchQuery && searchResults.length === 0 && (
              <p className={cn("text-center text-sm py-4", isDark ? "text-gray-400" : "text-gray-500")}>No results found for "{searchQuery}"</p>
            )}
          </div>
        </motion.div>
      )}
    </header>
  );
}
