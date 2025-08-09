import { gameState } from '../stores/gameState.js';

export const PET_ADOPTION_COST = 50;

export function tryAddPet(name) {
  let createdPet = null;
  gameState.update(state => {
    if (state.coins < PET_ADOPTION_COST) {
      return state;
    }
    if (state.pets.some(p => p.name === name)) {
      return state;
    }
    const newPet = {
      id: `pet-${Date.now()}`,
      name,
      species: ['canine', 'feline', 'avian', 'reptile', 'amphibian'][Math.floor(Math.random() * 5)],
      stage: 'cria',
      level: 1,
      experience: 0,
      needs: {
        hunger: 80,
        happiness: 90,
        energy: 100,
        health: 100
      },
      currentAnimation: 'idle',
      birthTime: Date.now(),
      lastCared: Date.now(),
      stats: {
        strength: 10,
        intelligence: 10,
        agility: 10,
        charisma: 10
      }
    };
    createdPet = newPet;
    return {
      ...state,
      coins: state.coins - PET_ADOPTION_COST,
      pets: [...state.pets, newPet]
    };
  });
  if (createdPet) {
    gameState.save();
  }
  return createdPet;
}
