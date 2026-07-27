import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Character {
  id: string;
  name: string;
  title: string;
  image: string;
  clan: string;
  role: string;
  description: string;
  hp: number;
  maxHp: number;
  vynndrite: number;
  maxVynndrite: number;
  stats: {
    strength: number;
    agility: number;
    perception: number;
    spirit: number;
    endurance: number;
    intellect: number;
  };
}

export interface GameLogEntry {
  role: 'dm' | 'player';
  text: string;
  timestamp: number;
}

interface AppState {
  activeCharacter: Character | null;
  currentLocation: string;
  gameLog: GameLogEntry[];
  isGameStarted: boolean;
  setActiveCharacter: (character: Character) => void;
  setCurrentLocation: (location: string) => void;
  addLogEntry: (entry: GameLogEntry) => void;
  startGame: () => void;
  resetGame: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      activeCharacter: null,
      currentLocation: 'Echelon City',
      gameLog: [],
      isGameStarted: false,
      setActiveCharacter: (character) => set({ activeCharacter: character }),
      setCurrentLocation: (location) => set({ currentLocation: location }),
      addLogEntry: (entry) => set((state) => ({ gameLog: [...state.gameLog, entry] })),
      startGame: () => set({ isGameStarted: true }),
      resetGame: () => set({ isGameStarted: false, gameLog: [], activeCharacter: null }),
    }),
    {
      name: 'echoes-of-echelon-storage',
    }
  )
);
