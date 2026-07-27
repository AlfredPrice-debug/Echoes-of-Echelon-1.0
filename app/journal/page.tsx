'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, BookOpen, MapPin, Users } from 'lucide-react';

export default function Journal() {
  const [entries, setEntries] = useState([
    {
      id: 1,
      title: 'Arrival in Echelon',
      date: '2938 a.g.s.',
      summary: 'We arrived at the great port city. The Vynn-Guard presence is overwhelming.',
      status: 'Active',
    }
  ]);

  return (
    <div className="min-h-screen bg-navy p-4 pb-24">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8 pt-6">
          <div>
            <h1 className="text-3xl md:text-5xl text-gold mb-2 drop-shadow-md">Campaign Journal</h1>
            <p className="text-parchment/80 font-lora">Chronicle your adventures across the empire.</p>
          </div>
          <button className="bg-gold text-navy p-3 rounded-full hover:bg-amber transition-colors shadow-[0_0_15px_rgba(201,168,76,0.3)]">
            <Plus size={24} />
          </button>
        </div>

        <div className="grid gap-6">
          {entries.map((entry) => (
            <motion.div 
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-parchment text-navy p-6 rounded-lg border-2 border-gold/50 shadow-lg relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-gold/20 rounded-bl-full" />
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-cinzel font-bold text-navy">{entry.title}</h2>
                  <p className="text-sm text-navy/60 font-cinzel">{entry.date}</p>
                </div>
                <span className="px-3 py-1 bg-gold text-navy text-xs font-bold rounded-full uppercase tracking-wider">
                  {entry.status}
                </span>
              </div>
              <p className="text-navy/80 leading-relaxed mb-4">
                {entry.summary}
              </p>
              <div className="flex gap-4 text-sm text-navy/60 border-t border-navy/10 pt-4">
                <button className="flex items-center gap-1 hover:text-navy transition-colors">
                  <BookOpen size={16} /> Read Full
                </button>
                <button className="flex items-center gap-1 hover:text-navy transition-colors">
                  <MapPin size={16} /> Locations
                </button>
                <button className="flex items-center gap-1 hover:text-navy transition-colors">
                  <Users size={16} /> NPCs
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
