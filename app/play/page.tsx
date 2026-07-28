import { Scroll } from 'lucide-react';

// AI Dungeon Master is temporarily disabled while we lock down the core app
// flow (character creation, map, inventory, dice rolls). It'll come back
// once a real Gemini API key + NextAuth are wired up.
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen w-full bg-parchment-50 p-6 text-center">
      <Scroll className="w-16 h-16 text-gold-leaf mb-4 animate-pulse" />
      <h2 className="text-2xl mb-4 text-ink-900">The Dungeon Master is Resting</h2>
      <p className="text-ink-700 max-w-md">
        AI-powered play is coming soon. In the meantime, explore the Map, choose your Champion, and check the Journal and Lore.
      </p>
    </main>
  );
}
