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
    <div className="min-h-screen bg-navy p-4 pb-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 pt-6">
          <h1 className="text-3xl md:text-5xl text-gold mb-2 drop-shadow-md">Choose Your Champion</h1>
          <p className="text-parchment/80 font-lora">Select a Vynn-Guard to begin your journey in Echelon.</p>
        </div>

        {activeCharacter && (
          <div className="mb-8 p-4 border border-gold/50 rounded-xl bg-navy/80 backdrop-blur flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-gold">
              <Image src={activeCharacter.image} alt={activeCharacter.name} fill className="object-cover" referrerPolicy="no-referrer" />
            </div>
            <div>
              <h3 className="text-gold font-cinzel text-lg">Current Champion: {activeCharacter.name}</h3>
              <p className="text-sm text-parchment/70">{activeCharacter.title} • {activeCharacter.clan} Clan</p>
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
                className={`relative cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                  isSelected ? 'border-gold shadow-[0_0_15px_rgba(201,168,76,0.5)]' : 'border-gold/20 hover:border-gold/50'
                }`}
              >
                <div className="relative aspect-[3/4] w-full bg-navy-light">
                  <Image 
                    src={champ.image} 
                    alt={champ.name} 
                    fill 
                    className="object-cover"
                    priority={index < 6}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent" />
                  
                  {isSelected && (
                    <div className="absolute top-3 right-3 text-gold">
                      <CheckCircle className="w-8 h-8 fill-navy" />
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h2 className="text-2xl font-cinzel text-gold mb-1">{champ.name}</h2>
                    <p className="text-sm text-parchment/90 font-bold mb-2">{champ.title}</p>
                    
                    <div className="flex items-center gap-3 text-xs text-parchment/80 mb-3">
                      <span className="flex items-center gap-1 bg-navy/60 px-2 py-1 rounded border border-gold/30">
                        {champ.role === 'Protector' && <Shield size={12} />}
                        {champ.role === 'Enforcer' && <Sword size={12} />}
                        {champ.role === 'Inquisitor' && <Eye size={12} />}
                        {champ.role}
                      </span>
                      <span className="bg-navy/60 px-2 py-1 rounded border border-gold/30">
                        {champ.clan} Clan
                      </span>
                    </div>
                    
                    <p className="text-xs text-parchment/70 line-clamp-2">
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
              className="pointer-events-auto bg-gold text-navy font-cinzel font-bold text-lg px-8 py-3 rounded-full shadow-[0_0_20px_rgba(201,168,76,0.4)] hover:bg-amber transition-colors flex items-center gap-2"
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
