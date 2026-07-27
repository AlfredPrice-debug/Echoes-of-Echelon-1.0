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
      <div className="flex flex-col items-center justify-center h-screen bg-navy p-6 text-center">
        <Scroll className="w-16 h-16 text-gold mb-4 animate-pulse" />
        <h2 className="text-3xl font-cinzel text-gold mb-4">No Champion Selected</h2>
        <p className="text-parchment/70 mb-8 max-w-md">You must choose a champion to lead through the mists of Echelon before the game can begin.</p>
        <Link href="/character" className="bg-gold text-navy px-8 py-3 rounded-full font-cinzel font-bold hover:bg-amber transition-all">
          Select Champion
        </Link>
      </div>
    );
  }

  if (!isGameStarted) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-navy p-6 text-center">
        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gold mb-6 shadow-[0_0_30px_rgba(201,168,76,0.3)]">
          <Image src={activeCharacter.image} alt={activeCharacter.name} fill className="object-cover" referrerPolicy="no-referrer" />
        </div>
        <h2 className="text-4xl font-cinzel text-gold mb-2">{activeCharacter.name}</h2>
        <p className="text-xl text-parchment/60 font-cinzel mb-8">{activeCharacter.title}</p>
        <button 
          onClick={startGame}
          className="bg-gold text-navy px-12 py-4 rounded-full font-cinzel font-bold text-xl hover:bg-amber transition-all shadow-lg"
        >
          Begin Adventure
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-navy text-parchment overflow-hidden">
      {/* Header / Stats */}
      <div className="p-4 border-b border-gold/20 bg-navy/90 backdrop-blur z-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gold">
            <Image src={activeCharacter.image} alt={activeCharacter.name} fill className="object-cover" referrerPolicy="no-referrer" />
          </div>
          <div>
            <h3 className="font-cinzel text-gold leading-none">{activeCharacter.name}</h3>
            <p className="text-[10px] text-parchment/50 uppercase tracking-widest">{currentLocation}</p>
          </div>
        </div>
        
        <div className="flex gap-4">
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 text-red-400">
              <Shield size={14} />
              <span className="text-xs font-bold">{activeCharacter.hp}/{activeCharacter.maxHp}</span>
            </div>
            <div className="w-20 h-1 bg-navy-light rounded-full mt-1 overflow-hidden border border-white/5">
              <div 
                className="h-full bg-red-500 transition-all duration-500" 
                style={{ width: `${(activeCharacter.hp / activeCharacter.maxHp) * 100}%` }} 
              />
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 text-amber">
              <Zap size={14} />
              <span className="text-xs font-bold">{activeCharacter.vynndrite}/{activeCharacter.maxVynndrite}</span>
            </div>
            <div className="w-20 h-1 bg-navy-light rounded-full mt-1 overflow-hidden border border-white/5">
              <div 
                className="h-full bg-amber transition-all duration-500" 
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
              <div className={`max-w-[85%] p-4 rounded-2xl ${
                entry.role === 'dm' 
                  ? 'bg-navy-light border border-gold/10 text-parchment/90 rounded-tl-none' 
                  : 'bg-gold text-navy font-medium rounded-tr-none'
              }`}>
                {entry.role === 'dm' && (
                  <div className="flex items-center gap-2 mb-2 text-[10px] uppercase tracking-widest text-gold/60 font-cinzel">
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
            <div className="bg-navy-light border border-gold/10 p-4 rounded-2xl rounded-tl-none flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce [animation-delay:-0.3s]" />
              <div className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce [animation-delay:-0.15s]" />
              <div className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce" />
            </div>
          </motion.div>
        )}
      </div>

      {/* Input Area */}
      <div className="absolute bottom-16 left-0 right-0 p-4 bg-gradient-to-t from-navy via-navy to-transparent">
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
            className="w-full bg-navy-light border-2 border-gold/30 rounded-full py-4 pl-6 pr-16 focus:outline-none focus:border-gold transition-all text-parchment placeholder:text-parchment/30 shadow-2xl"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-gold text-navy rounded-full flex items-center justify-center hover:bg-amber transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={20} />
          </button>
        </form>
        
        <div className="flex justify-center gap-4 mt-4">
          <Link href="/" className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-parchment/40 hover:text-gold transition-colors">
            <MapIcon size={12} /> Map
          </Link>
          <Link href="/character" className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-parchment/40 hover:text-gold transition-colors">
            <User size={12} /> Character
          </Link>
        </div>
      </div>
    </div>
  );
}
