'use client';

import dynamic from 'next/dynamic';

const GameInterface = dynamic(() => import('@/components/game-interface'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen bg-navy text-gold font-cinzel text-2xl animate-pulse">
      Summoning the Dungeon Master...
    </div>
  ),
});

export default function Home() {
  return (
    <main className="h-screen w-full bg-navy">
      <GameInterface />
    </main>
  );
}
