import { writable } from 'svelte/store';
import { z } from 'zod';
import type { GameState, Pet } from '../lib/types/pet';

const gameStateSchema: z.ZodType<GameState> = z.object({
  pets: z.array(z.any()),
  selectedPetId: z.string().nullable(),
  coins: z.number(),
  level: z.number(),
  lastSave: z.number(),
});

const initialGameState: GameState = {
  pets: [],
  selectedPetId: null,
  coins: 100,
  level: 1,
  lastSave: Date.now(),
};

function createGameState() {
  const { subscribe, set, update } = writable<GameState>(initialGameState);

  return {
    update,
    subscribe,
    addPet: (pet: Pet) =>
      update((state) => ({
        ...state,
        pets: [...state.pets, pet],
      })),
    selectPet: (petId: string) =>
      update((state) => ({
        ...state,
        selectedPetId: petId,
      })),
    updatePet: (petId: string, updates: Partial<Pet>) =>
      update((state) => ({
        ...state,
        pets: state.pets.map((pet) =>
          pet.id === petId ? { ...pet, ...updates } : pet
        ),
      })),
    addCoins: (amount: number) =>
      update((state) => ({
        ...state,
        coins: state.coins + amount,
      })),
    spendCoins: (amount: number) =>
      update((state) => ({
        ...state,
        coins: Math.max(0, state.coins - amount),
      })),
    save: () =>
      update((state) => {
        const newState = { ...state, lastSave: Date.now() };
        try {
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('onimal-game-state', JSON.stringify(newState));
          } else {
            console.warn(
              'localStorage is not available. Game state was not saved.'
            );
          }
        } catch (error) {
          console.warn('Failed to save game state to localStorage:', error);
        }
        return newState;
      }),
    load: () => {
      try {
        if (typeof localStorage !== 'undefined') {
          const saved = localStorage.getItem('onimal-game-state');
          if (saved) {
            const parsed = gameStateSchema.safeParse(JSON.parse(saved));
            if (parsed.success) {
              set(parsed.data);
              return;
            }
          }
        } else {
          console.warn('localStorage is not available. Using default state.');
        }
      } catch (error) {
        console.warn('Failed to load game state from localStorage:', error);
      }
      set(initialGameState);
    },
    reset: () => set(initialGameState),
  };
}

export const gameState = createGameState();
