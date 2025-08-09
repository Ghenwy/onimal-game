import { derived, get } from 'svelte/store';
import { gameState } from './gameState.ts';
import {
  FEED_COST,
  PLAY_COST,
  NEEDS_DECAY_RATES,
  NEEDS_DECAY_INTERVAL,
} from '../lib/constants.ts';
import type { Pet } from '../lib/types/pet';

function updateNeeds(petId: string): void {
  gameState.update((state) => {
    const pet = state.pets.find((p) => p.id === petId);
    if (!pet) return state;

    const now = Date.now();
    const timeDiff = (now - pet.lastCared) / 1000 / 60; // minutes

    const needsDecay = {
      hunger: Math.max(0, pet.needs.hunger - timeDiff * NEEDS_DECAY_RATES.hunger),
      happiness: Math.max(
        0,
        pet.needs.happiness - timeDiff * NEEDS_DECAY_RATES.happiness
      ),
      energy: Math.max(0, pet.needs.energy - timeDiff * NEEDS_DECAY_RATES.energy),
      health: Math.max(0, pet.needs.health - timeDiff * NEEDS_DECAY_RATES.health),
    } as Pet['needs'];

    return {
      ...state,
      pets: state.pets.map((p) =>
        p.id === petId ? { ...p, needs: needsDecay, lastCared: now } : p
      ),
    };
  });
}

function feedPet(petId: string): { success: boolean; reason?: string } {
  if (get(gameState).coins < FEED_COST) {
    return { success: false, reason: 'INSUFFICIENT_COINS' };
  }
  gameState.update((state) => ({
    ...state,
    pets: state.pets.map((pet) =>
      pet.id === petId
        ? {
            ...pet,
            needs: {
              ...pet.needs,
              hunger: Math.min(100, pet.needs.hunger + 25),
              happiness: Math.min(100, pet.needs.happiness + 5),
            },
            lastCared: Date.now(),
          }
        : pet
    ),
    coins: state.coins - FEED_COST,
  }));
  return { success: true };
}

function playWithPet(petId: string): { success: boolean; reason?: string } {
  if (get(gameState).coins < PLAY_COST) {
    return { success: false, reason: 'INSUFFICIENT_COINS' };
  }
  gameState.update((state) => ({
    ...state,
    pets: state.pets.map((pet) =>
      pet.id === petId
        ? {
            ...pet,
            needs: {
              ...pet.needs,
              happiness: Math.min(100, pet.needs.happiness + 20),
              energy: Math.max(0, pet.needs.energy - 10),
            },
            experience: pet.experience + 5,
            currentAnimation: 'playing',
            lastCared: Date.now(),
          }
        : pet
    ),
    coins: state.coins - PLAY_COST,
  }));
  return { success: true };
}

function restPet(petId: string): void {
  gameState.update((state) => ({
    ...state,
    pets: state.pets.map((pet) =>
      pet.id === petId
        ? {
            ...pet,
            needs: {
              ...pet.needs,
              energy: Math.min(100, pet.needs.energy + 30),
            },
            currentAnimation: 'sleeping',
            lastCared: Date.now(),
          }
        : pet
    ),
  }));
}

let intervalId: ReturnType<typeof setInterval> | null = null;
export function startAutoUpdate() {
  if (intervalId) return;
  intervalId = setInterval(() => {
    const state = get(gameState);
    state.pets.forEach((p) => updateNeeds(p.id));
  }, NEEDS_DECAY_INTERVAL);
}

export const petStore = { updateNeeds, feedPet, playWithPet, restPet };

export const selectedPet = derived(
  gameState,
  ($gameState) =>
    $gameState.pets.find((pet) => pet.id === $gameState.selectedPetId) || null
);
