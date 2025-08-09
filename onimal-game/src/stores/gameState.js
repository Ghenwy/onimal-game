import { writable } from 'svelte/store';

const initialGameState = {
  pets: [],
  selectedPetId: null,
  coins: 100,
  level: 1,
  lastSave: Date.now()
};

function createGameState() {
  const { subscribe, set, update } = writable(initialGameState);

  return {
    update,
    subscribe,
    addPet: (pet) => update(state => ({ 
      ...state, 
      pets: [...state.pets, pet] 
    })),
    selectPet: (petId) => update(state => ({ 
      ...state, 
      selectedPetId: petId 
    })),
    updatePet: (petId, updates) => update(state => ({
      ...state,
      pets: state.pets.map(pet => 
        pet.id === petId ? { ...pet, ...updates } : pet
      )
    })),
    addCoins: (amount) => update(state => ({ 
      ...state, 
      coins: state.coins + amount 
    })),
    spendCoins: (amount) => update(state => ({ 
      ...state, 
      coins: Math.max(0, state.coins - amount) 
    })),
    save: () => update(state => {
      const newState = { ...state, lastSave: Date.now() };
      try {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('onimal-game-state', JSON.stringify(newState));
        } else {
          console.warn('localStorage is not available. Game state was not saved.');
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
            const state = JSON.parse(saved);
            set(state);
          }
        } else {
          console.warn('localStorage is not available. Using default state.');
          set(initialGameState);
        }
      } catch (error) {
        console.warn('Failed to load game state from localStorage:', error);
        set(initialGameState);
      }
    },
    reset: () => set(initialGameState)
  };
}

export const gameState = createGameState();
