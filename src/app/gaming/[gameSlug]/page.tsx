import React from 'react';
import GameInfoClientPage from './GameInfoClientPage';
import { Game, gamesData } from '../../data/gamingData'; // Updated import

// Removed local Game interface as it's imported

async function getGameBySlug(slug: string): Promise<Game | undefined> {
  // Simulate API call or database lookup
  return gamesData.find(game => game.slug === slug);
}

interface GamePageProps {
  params: Promise<{ 
    gameSlug: string; 
  }>;
}

export default async function GamePage({ params }: GamePageProps) {
  const { gameSlug } = await params;
  const game = await getGameBySlug(gameSlug);

  return <GameInfoClientPage game={game} />;
}

// Optional: If you want to statically generate paths for known games at build time
export async function generateStaticParams() {
  return gamesData.map((game) => ({
    gameSlug: game.slug,
  }));
} 