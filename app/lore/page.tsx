'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Book } from 'lucide-react';

const loreEntries = [
  {
    id: 1,
    title: 'The Doctrine of Anishal',
    category: 'History',
    content: 'A code that mandates protection of all life and forbids taking life. Established by Anishal and his six followers after destroying the Vynndrite reserves of four warring nations.'
  },
  {
    id: 2,
    title: 'Vynndrite Crystals',
    category: 'Magic',
    content: 'Amber-glowing crystals left behind by geological events called Shyphs. They serve as the power source for cities and Vynn-Guard abilities.'
  },
  {
    id: 3,
    title: 'Knights of Niinyth',
    category: 'Factions',
    content: 'A 700-year-old assassin order that framed Orevus. They worship the demon god Niinyth and are led by the Kardynal.'
  },
  {
    id: 4,
    title: 'Cult of the Krow',
    category: 'Factions',
    content: 'A cannibal cult formed from corrupted Raven-clan blood. Followers eat flesh and drink blood, worshipping Varlkrow.'
  }
];

export default function Lore() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLore = loreEntries.filter(entry => 
    entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-navy p-4 pb-24">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 pt-6">
          <h1 className="text-3xl md:text-5xl text-gold mb-2 drop-shadow-md">Lore Encyclopedia</h1>
          <p className="text-parchment/80 font-lora">Discover the history and secrets of Echelon.</p>
        </div>

        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/50 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search lore..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-parchment text-navy pl-12 pr-4 py-3 rounded-full border-2 border-gold focus:outline-none focus:ring-2 focus:ring-gold/50 font-lora text-lg placeholder:text-navy/50"
          />
        </div>

        <div className="grid gap-6">
          {filteredLore.map((entry) => (
            <motion.div 
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-navy/80 backdrop-blur border border-gold/30 p-6 rounded-xl hover:border-gold/60 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <Book className="text-gold w-6 h-6" />
                <h2 className="text-2xl font-cinzel text-gold">{entry.title}</h2>
              </div>
              <span className="inline-block px-3 py-1 bg-gold/10 text-gold text-xs rounded-full uppercase tracking-wider mb-4 border border-gold/20">
                {entry.category}
              </span>
              <p className="text-parchment/90 leading-relaxed">
                {entry.content}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
