import { Scroll } from 'lucide-react';

// AI Dungeon Master is temporarily disabled while we lock down the core app
// flow (character creation, map, inventory, dice rolls). It'll come back
// once a real Gemini API key + NextAuth are wired up.
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen w-full bg-navy p-6 text-center">
      <Scroll className="w-16 h-16 text-gold mb-4 animate-pulse" />
      <h2 className="text-3xl font-cinzel text-gold mb-4">The Dungeon Master is Resting</h2>
      <p className="text-parchment/70 max-w-md">
        AI-powered play is coming soon. In the meantime, explore the Map, choose your Champion, and check the Journal and Lore.
      </p>
    </main>
  );
}
