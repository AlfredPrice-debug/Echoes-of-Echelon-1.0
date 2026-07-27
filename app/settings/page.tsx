'use client';

import { motion } from 'motion/react';
import { Settings as SettingsIcon, Volume2, Moon, Bell, LogOut } from 'lucide-react';

import { useAppStore } from '@/store/app-store';
import { useRouter } from 'next/navigation';

export default function Settings() {
  const { resetGame } = useAppStore();
  const router = useRouter();

  const handleReset = () => {
    if (confirm("Are you sure you want to reset your journey? All progress will be lost.")) {
      resetGame();
      router.push('/character');
    }
  };

  return (
    <div className="min-h-screen bg-navy p-4 pb-24">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8 pt-6">
          <SettingsIcon className="w-8 h-8 text-gold" />
          <div>
            <h1 className="text-3xl md:text-5xl text-gold mb-2 drop-shadow-md">Settings</h1>
            <p className="text-parchment/80 font-lora">Configure your companion app experience.</p>
          </div>
        </div>

        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-navy/80 backdrop-blur border border-gold/30 rounded-xl overflow-hidden"
          >
            <div className="p-4 border-b border-gold/20 flex items-center justify-between hover:bg-gold/5 transition-colors cursor-pointer">
              <div className="flex items-center gap-4">
                <Volume2 className="text-gold w-5 h-5" />
                <span className="text-parchment font-cinzel text-lg">Sound Effects</span>
              </div>
              <div className="w-12 h-6 bg-gold rounded-full relative">
                <div className="w-4 h-4 bg-navy rounded-full absolute right-1 top-1" />
              </div>
            </div>
            <div className="p-4 border-b border-gold/20 flex items-center justify-between hover:bg-gold/5 transition-colors cursor-pointer">
              <div className="flex items-center gap-4">
                <Moon className="text-gold w-5 h-5" />
                <span className="text-parchment font-cinzel text-lg">Dark Theme</span>
              </div>
              <div className="w-12 h-6 bg-gold rounded-full relative">
                <div className="w-4 h-4 bg-navy rounded-full absolute right-1 top-1" />
              </div>
            </div>
            <div className="p-4 flex items-center justify-between hover:bg-gold/5 transition-colors cursor-pointer">
              <div className="flex items-center gap-4">
                <Bell className="text-gold w-5 h-5" />
                <span className="text-parchment font-cinzel text-lg">Notifications</span>
              </div>
              <div className="w-12 h-6 bg-navy/50 border border-gold/30 rounded-full relative">
                <div className="w-4 h-4 bg-gold/50 rounded-full absolute left-1 top-1" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-navy/80 backdrop-blur border border-gold/30 rounded-xl overflow-hidden"
          >
            <div 
              onClick={handleReset}
              className="p-4 flex items-center gap-4 hover:bg-red-900/20 transition-colors cursor-pointer text-red-400 border-b border-gold/10"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-cinzel text-lg">Reset Journey</span>
            </div>
            <div className="p-4 flex items-center gap-4 hover:bg-red-900/20 transition-colors cursor-pointer text-red-400">
              <LogOut className="w-5 h-5" />
              <span className="font-cinzel text-lg">Sign Out</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
