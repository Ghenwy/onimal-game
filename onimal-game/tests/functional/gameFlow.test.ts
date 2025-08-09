import { describe, it, expect, beforeEach } from 'vitest'
import { get } from 'svelte/store'
import { gameState } from '../../src/stores/gameState.ts'
import { petStore } from '../../src/stores/petStore.ts'

describe('Game Flow Integration Tests', () => {
  beforeEach(() => {
    gameState.reset()
  })

  it('should complete full pet adoption and care flow', () => {
    // 1. Start with initial game state
    const initialState = get(gameState)
    expect(initialState.pets).toHaveLength(0)
    expect(initialState.coins).toBe(100)

    // 2. Add a new pet (adoption)
    const newPet = {
      id: 'pet-flow-test',
      name: 'Flow Test Pet',
      species: 'canine' as const,
      stage: 'cria' as const,
      level: 1,
      experience: 0,
      needs: { hunger: 80, happiness: 90, energy: 100, health: 100 },
      currentAnimation: 'idle' as const,
      birthTime: Date.now(),
      lastCared: Date.now(),
      stats: { strength: 10, intelligence: 10, agility: 10, charisma: 10 }
    }

    gameState.addPet(newPet)
    gameState.selectPet('pet-flow-test')

    // 3. Verify pet was added and selected
    const stateAfterAdoption = get(gameState)
    expect(stateAfterAdoption.pets).toHaveLength(1)
    expect(stateAfterAdoption.selectedPetId).toBe('pet-flow-test')

    // 4. Feed the pet multiple times
    expect(petStore.feedPet('pet-flow-test').success).toBe(true)
    expect(petStore.feedPet('pet-flow-test').success).toBe(true)

    const stateAfterFeeding = get(gameState)
    const fedPet = stateAfterFeeding.pets[0]
    expect(fedPet.needs.hunger).toBeGreaterThan(80)
    expect(stateAfterFeeding.coins).toBe(80) // 100 - 20 (2 feedings)

    // 5. Play with pet to gain experience
    expect(petStore.playWithPet('pet-flow-test').success).toBe(true)
    
    const stateAfterPlaying = get(gameState)
    const playedPet = stateAfterPlaying.pets[0]
    expect(playedPet.experience).toBe(5)
    expect(playedPet.currentAnimation).toBe('playing')
    expect(playedPet.needs.happiness).toBeGreaterThan(90)

    // 6. Rest the pet
    petStore.restPet('pet-flow-test')
    
    const finalState = get(gameState)
    const restedPet = finalState.pets[0]
    expect(restedPet.currentAnimation).toBe('sleeping')
    expect(restedPet.needs.energy).toBeGreaterThan(70)
  })

  it('should handle multiple pets correctly', () => {
    // Add first pet
    const pet1 = {
      id: 'pet-1',
      name: 'Pet One',
      species: 'canine' as const,
      stage: 'cria' as const,
      level: 1,
      experience: 0,
      needs: { hunger: 50, happiness: 50, energy: 50, health: 50 },
      currentAnimation: 'idle' as const,
      birthTime: Date.now(),
      lastCared: Date.now(),
      stats: { strength: 10, intelligence: 10, agility: 10, charisma: 10 }
    }

    // Add second pet
    const pet2 = {
      id: 'pet-2',
      name: 'Pet Two',
      species: 'feline' as const,
      stage: 'joven' as const,
      level: 2,
      experience: 25,
      needs: { hunger: 60, happiness: 70, energy: 80, health: 90 },
      currentAnimation: 'idle' as const,
      birthTime: Date.now(),
      lastCared: Date.now(),
      stats: { strength: 15, intelligence: 12, agility: 18, charisma: 14 }
    }

    gameState.addPet(pet1)
    gameState.addPet(pet2)

    const state = get(gameState)
    expect(state.pets).toHaveLength(2)

    // Feed only the first pet
    expect(petStore.feedPet('pet-1').success).toBe(true)

    const stateAfterFeeding = get(gameState)
    expect(stateAfterFeeding.pets[0].needs.hunger).toBeGreaterThan(50)
    expect(stateAfterFeeding.pets[1].needs.hunger).toBe(60) // unchanged

    // Select and interact with second pet
    gameState.selectPet('pet-2')
    expect(petStore.playWithPet('pet-2').success).toBe(true)

    const finalState = get(gameState)
    expect(finalState.selectedPetId).toBe('pet-2')
    expect(finalState.pets[1].experience).toBe(30) // 25 + 5
  })

  it('should save and restore game state correctly', () => {
    // Set up game state
    const mockPet = {
      id: 'save-test-pet',
      name: 'Save Test',
      species: 'avian' as const,
      stage: 'adulto' as const,
      level: 5,
      experience: 150,
      needs: { hunger: 85, happiness: 75, energy: 95, health: 80 },
      currentAnimation: 'happy' as const,
      birthTime: Date.now(),
      lastCared: Date.now(),
      stats: { strength: 20, intelligence: 25, agility: 30, charisma: 22 }
    }

    gameState.addPet(mockPet)
    gameState.addCoins(200)
    gameState.selectPet('save-test-pet')

    // Save the game
    gameState.save()

    // Reset and verify it's empty
    gameState.reset()
    const resetState = get(gameState)
    expect(resetState.pets).toHaveLength(0)
    expect(resetState.coins).toBe(100)

    // Load the saved state
    gameState.load()
    const loadedState = get(gameState)
    
    expect(loadedState.pets).toHaveLength(1)
    expect(loadedState.pets[0].name).toBe('Save Test')
    expect(loadedState.coins).toBe(300) // 100 + 200
    expect(loadedState.selectedPetId).toBe('save-test-pet')
  })
})