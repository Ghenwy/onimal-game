import { beforeEach, describe, expect, it } from 'vitest';
import { get } from 'svelte/store';
import { gameState } from '../../src/stores/gameState.ts';
import { tryAddPet } from '../../src/lib/createPet.ts';

describe('pet creation helper', () => {
  beforeEach(() => {
    gameState.reset();
  });

  it('does not create pets with duplicate names', () => {
    const name = 'Buddy';
    const first = tryAddPet(name);
    const second = tryAddPet(name);

    const state = get(gameState);
    expect(first).not.toBeNull();
    expect(second).toBeNull();
    expect(state.pets).toHaveLength(1);
    expect(state.pets[0].name).toBe(name);
  });

  it('does not create pets when coins are insufficient', () => {
    gameState.spendCoins(100); // leave 0 coins
    const result = tryAddPet('PoorPet');
    const state = get(gameState);

    expect(result).toBeNull();
    expect(state.pets).toHaveLength(0);
    expect(state.coins).toBe(0);
  });
});
