'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from '@google/genai';
import { useAppStore, GameLogEntry } from '@/store/app-store';
import { Send, Shield, Zap, Map as MapIcon, Scroll, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback } from 'react';

const genAI = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || '' });

const SYSTEM_INSTRUCTION = `You are the Dungeon Master for "Echoes of Echelon", a dark fantasy D&D-style game. 
The world is Echelon, a land powered by Vynndrite crystals. 
Key Lore:
- The Doctrine of Anishal: Mandates protection of life, forbids killing.
- Vynndrite: Amber crystals that power everything.
- Factions: Vynn-Guard (protectors), Knights of Niinyth (assassins), Cult of the Krow (cannibals).
- Locations: Echelon City (capital), Hyacinth City (north), New Et-tu Brutus (stronghold), Raven Tribe (ruins).

Your Role:
1. Narrate the story based on the player's character and location.
2. React to player actions using D&D logic (Strength, Agility, etc.).
3. Maintain a dark, atmospheric, and immersive tone.
4. Keep responses concise but descriptive (max 2-3 paragraphs).
5. Occasionally ask for "checks" or "saves" if an action is risky.
6. If a player mentions a specific champion, use their background (e.g., Anala is a young assassin, Aelfric is a stalwart defender).

Current Game State:
- Character: {characterName} ({characterTitle})
- Location: {location}
- HP: {hp}/{maxHp}
- Vynndrite: {vynndrite}/{maxVynndrite}

Start by describing the player's current situation in {location}.`;

export default function GameInterface() {
  const { activeCharacter, currentLocation, gameLog, addLogEntry, isGameStarted, startGame } = useAppStore();
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [gameLog]);

  const handleDMResponse = useCallback(async (playerMessage: string) => {
    if (!activeCharacter) return;
    
    setIsLoading(true);
    try {
      const model = genAI.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          { role: 'user', parts: [{ text: playerMessage }] }
        ],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION
            .replace('{characterName}', activeCharacter.name)
            .replace('{characterTitle}', activeCharacter.title)
            .replace('{location}', currentLocation)
            .replace('{hp}', activeCharacter.hp.toString())
            .replace('{maxHp}', activeCharacter.maxHp.toString())
            .replace('{vynndrite}', activeCharacter.vynndrite.toString())
            .replace('{maxVynndrite}', activeCharacter.maxVynndrite.toString()),
        }
      });

      const response = await model;
      const text = response.text || "The mists of Echelon cloud my vision... (Error)";
      
      addLogEntry({
        role: 'dm',
        text,
        timestamp: Date.now()
      });
    } catch (error) {
      console.error("DM Error:", error);
      addLogEntry({
        role: 'dm',
        text: "The Vynndrite pulse flickers... I cannot reach the mists right now.",
        timestamp: Date.now()
      });
    } finally {
      setIsLoading(false);
    }
  }, [activeCharacter, currentLocation, addLogEntry]);

  // Initial greeting if game just started
  useEffect(() => {
    if (isGameStarted && gameLog.length === 0 && activeCharacter) {
      handleDMResponse("I have arrived. Where do we begin?");
    }
  }, [isGameStarted, gameLog.length, activeCharacter, handleDMResponse]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const playerText = input.trim();
    setInput('');
    
    addLogEntry({
      role: 'player',
      text: playerText,
      timestamp: Date.now()
    });

    await handleDMResponse(playerText);
  };

  if (!activeCharacter) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-parchment-50 p-6 text-center">
        <Scroll className="w-16 h-16 text-gold-leaf mb-4 animate-pulse" />
        <h2 className="text-3xl mb-4 text-ink-900">No Champion Selected</h2>
        <p className="text-ink-700 mb-8 max-w-md">You must choose a champion to lead through the mists of Echelon before the game can begin.</p>
        <Link href="/character" className="focus-ring bg-sea-700 text-parchment-50 px-8 py-3 rounded-control font-bold hover:bg-sea-500 transition-all">
          Select Champion
        </Link>
      </div>
    );
  }

  if (!isGameStarted) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-parchment-50 p-6 text-center">
        <div className="relative w-32 h-32 rounded-card overflow-hidden border-4 border-gold-leaf mb-6 shadow-raised">
          <Image src={activeCharacter.image} alt={activeCharacter.name} fill className="object-cover" referrerPolicy="no-referrer" />
        </div>
        <h2 className="text-3xl mb-2 text-ink-900">{activeCharacter.name}</h2>
        <p className="text-xl text-ink-700 mb-8">{activeCharacter.title}</p>
        <button
          onClick={startGame}
          className="focus-ring bg-sea-700 text-parchment-50 px-12 py-4 rounded-control font-bold text-xl hover:bg-sea-500 transition-all shadow-raised"
        >
          Begin Adventure
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-parchment-50 text-ink-900 overflow-hidden">
      {/* Header / Stats */}
      <div className="p-4 border-b border-border-tan bg-parchment-100 z-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-card overflow-hidden border border-gold-leaf">
            <Image src={activeCharacter.image} alt={activeCharacter.name} fill className="object-cover" referrerPolicy="no-referrer" />
          </div>
          <div>
            <h3 className="text-ink-900 leading-none">{activeCharacter.name}</h3>
            <p className="text-xs text-ink-500 uppercase tracking-widest">{currentLocation}</p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 text-ember-600">
              <Shield size={14} />
              <span className="text-xs font-bold">{activeCharacter.hp}/{activeCharacter.maxHp}</span>
            </div>
            <div className="w-20 h-1 bg-parchment-200 rounded-control mt-1 overflow-hidden border border-border-tan">
              <div
                className="h-full bg-ember-600 transition-all duration-500"
                style={{ width: `${(activeCharacter.hp / activeCharacter.maxHp) * 100}%` }}
              />
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 text-sea-700">
              <Zap size={14} />
              <span className="text-xs font-bold">{activeCharacter.vynndrite}/{activeCharacter.maxVynndrite}</span>
            </div>
            <div className="w-20 h-1 bg-parchment-200 rounded-control mt-1 overflow-hidden border border-border-tan">
              <div
                className="h-full bg-sea-500 transition-all duration-500"
                style={{ width: `${(activeCharacter.vynndrite / activeCharacter.maxVynndrite) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Game Log */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth pb-32"
      >
        <AnimatePresence initial={false}>
          {gameLog.map((entry, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${entry.role === 'dm' ? 'justify-start' : 'justify-end'}`}
            >
              <div className={`max-w-[85%] p-4 rounded-card ${
                entry.role === 'dm'
                  ? 'bg-parchment-100 border border-border-tan text-ink-900'
                  : 'bg-sea-700 text-parchment-50 font-medium'
              }`}>
                {entry.role === 'dm' && (
                  <div className="flex items-center gap-2 mb-2 text-xs uppercase tracking-widest text-gold-leaf">
                    <Scroll size={10} />
                    Dungeon Master
                  </div>
                )}
                <p className="whitespace-pre-wrap leading-relaxed">{entry.text}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-parchment-100 border border-border-tan p-4 rounded-card flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-gold-leaf rounded-full animate-bounce [animation-delay:-0.3s]" />
              <div className="w-1.5 h-1.5 bg-gold-leaf rounded-full animate-bounce [animation-delay:-0.15s]" />
              <div className="w-1.5 h-1.5 bg-gold-leaf rounded-full animate-bounce" />
            </div>
          </motion.div>
        )}
      </div>

      {/* Input Area */}
      <div className="absolute bottom-16 left-0 right-0 p-4 bg-gradient-to-t from-parchment-50 via-parchment-50 to-transparent">
        <form
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto relative group"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What do you do? (e.g., 'Explore the market', 'Talk to the guard')"
            disabled={isLoading}
            className="focus-ring w-full bg-parchment-50 border border-border-tan rounded-control py-4 pl-6 pr-16 focus:outline-none focus:border-gold-leaf transition-all text-ink-900 placeholder:text-ink-500 shadow-raised"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="focus-ring absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-sea-700 text-parchment-50 rounded-control flex items-center justify-center hover:bg-sea-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={20} />
          </button>
        </form>

        <div className="flex justify-center gap-4 mt-4">
          <Link href="/" className="focus-ring flex items-center gap-2 text-xs uppercase tracking-widest text-ink-500 hover:text-gold-leaf transition-colors">
            <MapIcon size={12} /> Map
          </Link>
          <Link href="/character" className="focus-ring flex items-center gap-2 text-xs uppercase tracking-widest text-ink-500 hover:text-gold-leaf transition-colors">
            <User size={12} /> Character
          </Link>
        </div>
      </div>
    </div>
  );
}
