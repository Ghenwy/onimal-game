import { gameState } from '../stores/gameState.ts';
import { PET_ADOPTION_COST } from './constants.ts';
import type { PetSpecies, Pet } from './types/pet';

export function tryAddPet(name: string): Pet | null {
  let createdPet: Pet | null = null;
  gameState.update((state) => {
    if (state.coins < PET_ADOPTION_COST) {
      return state;
    }
    if (state.pets.some((p) => p.name === name)) {
      return state;
    }
    const species: PetSpecies = (
      ['canine', 'feline', 'avian', 'reptile', 'amphibian'] as const
    )[Math.floor(Math.random() * 5)];
    const newPet: Pet = {
      id: crypto.randomUUID(),
      name,
      species,
      stage: 'cria',
      level: 1,
      experience: 0,
      needs: {
        hunger: 80,
        happiness: 90,
        energy: 100,
        health: 100,
      },
      currentAnimation: 'idle',
      birthTime: Date.now(),
      lastCared: Date.now(),
      stats: {
        strength: 10,
        intelligence: 10,
        agility: 10,
        charisma: 10,
      },
    };
    createdPet = newPet;
    return {
      ...state,
      coins: state.coins - PET_ADOPTION_COST,
      pets: [...state.pets, newPet],
    };
  });
  if (createdPet) {
    gameState.save();
  }
  return createdPet;
}
