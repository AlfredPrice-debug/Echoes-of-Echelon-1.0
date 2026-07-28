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
    <div className="min-h-screen bg-parchment-50 p-4 pb-24">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8 pt-6">
          <div>
            <h1 className="text-3xl mb-2 text-ink-900">Campaign Journal</h1>
            <p className="text-ink-700">Chronicle your adventures across the empire.</p>
          </div>
          <button className="focus-ring bg-sea-700 text-parchment-50 p-3 rounded-control hover:bg-sea-500 transition-colors shadow-resting">
            <Plus size={24} />
          </button>
        </div>

        <div className="grid gap-6">
          {entries.map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-parchment-100 text-ink-900 p-6 rounded-card border border-border-tan shadow-resting relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-gold-leaf/20 rounded-bl-full" />
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-ink-900">{entry.title}</h2>
                  <p className="text-sm text-ink-500 font-mono">{entry.date}</p>
                </div>
                <span className="px-3 py-1 bg-forest-500 text-parchment-50 text-xs font-bold rounded-control uppercase tracking-wider">
                  {entry.status}
                </span>
              </div>
              <p className="text-ink-700 leading-relaxed mb-4">
                {entry.summary}
              </p>
              <div className="flex gap-4 text-sm text-ink-500 border-t border-border-tan pt-4">
                <button className="focus-ring flex items-center gap-1 hover:text-ink-900 transition-colors">
                  <BookOpen size={16} /> Read Full
                </button>
                <button className="focus-ring flex items-center gap-1 hover:text-ink-900 transition-colors">
                  <MapPin size={16} /> Locations
                </button>
                <button className="focus-ring flex items-center gap-1 hover:text-ink-900 transition-colors">
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
