import { writable, derived } from 'svelte/store';
import { gameState } from './gameState.js';

function createPetStore() {
  const { subscribe, update } = writable([]);

  return {
    subscribe,
    updateNeeds: (petId, isDirectCare = false) => {
      gameState.update(state => {
        const pet = state.pets.find(p => p.id === petId);
        if (!pet) return state;

        const now = Date.now();
        const timeDiff = (now - pet.lastCared) / 1000 / 60;

        const needsDecay = {
          hunger: Math.max(0, pet.needs.hunger - (timeDiff * 0.5)),
          happiness: Math.max(0, pet.needs.happiness - (timeDiff * 0.3)),
          energy: Math.max(0, pet.needs.energy - (timeDiff * 0.4)),
          health: Math.max(0, pet.needs.health - (timeDiff * 0.2))
        };

        return {
          ...state,
          pets: state.pets.map(p =>
            p.id === petId
              ? { ...p, needs: needsDecay, lastCared: isDirectCare ? now : p.lastCared }
              : p
          )
        };
      });
    },
    feedPet: (petId) => {
      gameState.update(state => ({
        ...state,
        pets: state.pets.map(pet => 
          pet.id === petId 
            ? { 
                ...pet, 
                needs: { 
                  ...pet.needs, 
                  hunger: Math.min(100, pet.needs.hunger + 25),
                  happiness: Math.min(100, pet.needs.happiness + 5)
                },
                lastCared: Date.now()
              }
            : pet
        ),
        coins: Math.max(0, state.coins - 10)
      }));
    },
    playWithPet: (petId) => {
      gameState.update(state => ({
        ...state,
        pets: state.pets.map(pet => 
          pet.id === petId 
            ? { 
                ...pet, 
                needs: { 
                  ...pet.needs, 
                  happiness: Math.min(100, pet.needs.happiness + 20),
                  energy: Math.max(0, pet.needs.energy - 10)
                },
                experience: pet.experience + 5,
                currentAnimation: 'playing',
                lastCared: Date.now()
              }
            : pet
        )
      }));
    },
    restPet: (petId) => {
      gameState.update(state => ({
        ...state,
        pets: state.pets.map(pet => 
          pet.id === petId 
            ? { 
                ...pet, 
                needs: { 
                  ...pet.needs, 
                  energy: Math.min(100, pet.needs.energy + 30)
                },
                currentAnimation: 'sleeping',
                lastCared: Date.now()
              }
            : pet
        )
      }));
    }
  };
}

export const petStore = createPetStore();

export const selectedPet = derived(
  gameState,
  $gameState => $gameState.pets.find(pet => pet.id === $gameState.selectedPetId) || null
);