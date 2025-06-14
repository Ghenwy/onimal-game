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
      localStorage.setItem('onimal-game-state', JSON.stringify(newState));
      return newState;
    }),
    load: () => {
      const saved = localStorage.getItem('onimal-game-state');
      if (saved) {
        const state = JSON.parse(saved);
        set(state);
      }
    },
    reset: () => set(initialGameState)
  };
}

export const gameState = createGameState();