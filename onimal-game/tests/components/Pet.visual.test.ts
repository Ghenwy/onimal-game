import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Pet from '../../src/components/Pet.svelte';

const mockPet = {
  id: 'test-pet-1',
  name: 'Test Dog',
  species: 'canine' as const,
  stage: 'cria' as const,
  level: 2,
  experience: 15,
  needs: {
    hunger: 75,
    happiness: 60,
    energy: 40,
    health: 90
  },
  currentAnimation: 'idle' as const,
  birthTime: Date.now() - 1000000,
  lastCared: Date.now() - 300000,
  stats: {
    strength: 12,
    intelligence: 8,
    agility: 10,
    charisma: 15
  }
};

describe('Pet Component Visual', () => {
  // TODO: Enable when Svelte 5 component testing is fully supported
  it.skip('renders SVG icons', () => {
    render(Pet, { pet: mockPet });
    expect(screen.getByAltText('Pet sprite')).toBeTruthy();
    expect(screen.getByAltText('Alimentar')).toBeTruthy();
    expect(screen.getByAltText('Jugar')).toBeTruthy();
    expect(screen.getByAltText('Descansar')).toBeTruthy();
  });
});
