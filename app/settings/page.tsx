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
    <div className="min-h-screen bg-parchment-50 p-4 pb-24">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8 pt-6">
          <SettingsIcon className="w-8 h-8 text-gold-leaf" />
          <div>
            <h1 className="text-3xl mb-2 text-ink-900">Settings</h1>
            <p className="text-ink-700">Configure your companion app experience.</p>
          </div>
        </div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-parchment-100 border border-border-tan rounded-card shadow-resting overflow-hidden"
          >
            <div className="p-4 border-b border-border-tan flex items-center justify-between hover:bg-parchment-200 transition-colors cursor-pointer">
              <div className="flex items-center gap-4">
                <Volume2 className="text-gold-leaf w-5 h-5" />
                <span className="text-ink-900 text-lg">Sound Effects</span>
              </div>
              <div className="w-12 h-6 bg-sea-700 rounded-control relative">
                <div className="w-4 h-4 bg-parchment-50 rounded-control absolute right-1 top-1" />
              </div>
            </div>
            <div className="p-4 border-b border-border-tan flex items-center justify-between hover:bg-parchment-200 transition-colors cursor-pointer">
              <div className="flex items-center gap-4">
                <Moon className="text-gold-leaf w-5 h-5" />
                <span className="text-ink-900 text-lg">Dark Theme</span>
              </div>
              <div className="w-12 h-6 bg-sea-700 rounded-control relative">
                <div className="w-4 h-4 bg-parchment-50 rounded-control absolute right-1 top-1" />
              </div>
            </div>
            <div className="p-4 flex items-center justify-between hover:bg-parchment-200 transition-colors cursor-pointer">
              <div className="flex items-center gap-4">
                <Bell className="text-gold-leaf w-5 h-5" />
                <span className="text-ink-900 text-lg">Notifications</span>
              </div>
              <div className="w-12 h-6 bg-snow-100 border border-border-tan rounded-control relative">
                <div className="w-4 h-4 bg-ink-500/40 rounded-control absolute left-1 top-1" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-parchment-100 border border-border-tan rounded-card shadow-resting overflow-hidden"
          >
            <div
              onClick={handleReset}
              className="focus-ring p-4 flex items-center gap-4 hover:bg-ember-600/10 transition-colors cursor-pointer text-ink-900 border-b border-border-tan border-l-4 border-l-ember-600"
            >
              <LogOut className="w-5 h-5 text-ember-600" />
              <span className="text-lg">Reset Journey</span>
            </div>
            <div className="focus-ring p-4 flex items-center gap-4 hover:bg-ember-600/10 transition-colors cursor-pointer text-ink-900 border-l-4 border-l-ember-600">
              <LogOut className="w-5 h-5 text-ember-600" />
              <span className="text-lg">Sign Out</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
