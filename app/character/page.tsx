'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { champions } from '@/data/champions';
import { useAppStore, Character } from '@/store/app-store';
import { CheckCircle, Shield, Sword, Eye } from 'lucide-react';

import { useRouter } from 'next/navigation';

export default function CharacterCreator() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { activeCharacter, setActiveCharacter } = useAppStore();

  const handleSelect = (champ: typeof champions[0]) => {
    setSelectedId(champ.id);
  };

  const handleConfirm = () => {
    const champ = champions.find(c => c.id === selectedId);
    if (champ) {
      const newChar: Character = {
        ...champ,
        hp: 30,
        maxHp: 30,
        vynndrite: 10,
        maxVynndrite: 10,
        stats: {
          strength: 12,
          agility: 14,
          perception: 10,
          spirit: 16,
          endurance: 12,
          intellect: 10,
        }
      };
      setActiveCharacter(newChar);
      router.push('/play');
    }
  };

  return (
    <div className="min-h-screen bg-parchment-50 p-4 pb-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 pt-6">
          <h1 className="text-3xl mb-2 text-ink-900">Choose Your Champion</h1>
          <p className="text-ink-700">Select a Vynn-Guard to begin your journey in Echelon.</p>
        </div>

        {activeCharacter && (
          <div className="mb-8 p-4 border border-border-tan rounded-card bg-parchment-100 shadow-resting flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-card overflow-hidden border-2 border-gold-leaf shrink-0">
              <Image src={activeCharacter.image} alt={activeCharacter.name} fill className="object-cover" referrerPolicy="no-referrer" />
            </div>
            <div>
              <h3 className="text-ink-900 text-lg">Current Champion: {activeCharacter.name}</h3>
              <p className="text-sm text-ink-700">{activeCharacter.title} • {activeCharacter.clan} Clan</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {champions.map((champ, index) => {
            const isSelected = selectedId === champ.id;
            return (
              <motion.div
                key={champ.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelect(champ)}
                className={`focus-ring relative cursor-pointer rounded-card overflow-hidden transition-all duration-300 ${
                  isSelected ? 'card-emphasis' : 'border border-border-tan hover:border-gold-leaf'
                }`}
              >
                <div className="relative aspect-[3/4] w-full bg-parchment-200">
                  <Image
                    src={champ.image}
                    alt={champ.name}
                    fill
                    className="object-cover"
                    priority={index < 6}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/20 to-transparent" />

                  {isSelected && (
                    <div className="absolute top-3 right-3 text-gold-leaf">
                      <CheckCircle className="w-8 h-8 fill-ink-900" />
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h2 className="text-2xl text-gold-leaf mb-1">{champ.name}</h2>
                    <p className="text-sm text-parchment-50 font-bold mb-2">{champ.title}</p>

                    <div className="flex items-center gap-3 text-xs text-parchment-100/80 mb-3">
                      <span className="flex items-center gap-1 bg-ink-900/60 px-2 py-1 rounded-control border border-gold-leaf/40">
                        {champ.role === 'Protector' && <Shield size={12} />}
                        {champ.role === 'Enforcer' && <Sword size={12} />}
                        {champ.role === 'Inquisitor' && <Eye size={12} />}
                        {champ.role}
                      </span>
                      <span className="bg-ink-900/60 px-2 py-1 rounded-control border border-gold-leaf/40">
                        {champ.clan} Clan
                      </span>
                    </div>

                    <p className="text-xs text-parchment-100/80 line-clamp-2">
                      {champ.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {selectedId && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-20 left-0 right-0 p-4 flex justify-center z-40 pointer-events-none"
          >
            <button
              onClick={handleConfirm}
              className="focus-ring pointer-events-auto bg-sea-700 text-parchment-50 font-bold text-lg px-8 py-3 rounded-control shadow-raised hover:bg-sea-500 transition-colors flex items-center gap-2"
            >
              <Sword className="w-5 h-5" />
              Confirm Champion
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
