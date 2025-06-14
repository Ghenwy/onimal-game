import { describe, it, expect, beforeEach, vi } from 'vitest'
import { get } from 'svelte/store'
import { petStore } from '../../src/stores/petStore.js'
import { gameState } from '../../src/stores/gameState.js'

describe('petStore', () => {
  beforeEach(() => {
    gameState.reset()
    vi.clearAllMocks()
  })

  const createMockPet = () => ({
    id: 'test-pet-1',
    name: 'Test Pet',
    species: 'canine' as const,
    stage: 'cria' as const,
    level: 1,
    experience: 0,
    needs: { hunger: 50, happiness: 50, energy: 50, health: 50 },
    currentAnimation: 'idle' as const,
    birthTime: Date.now(),
    lastCared: Date.now(),
    stats: { strength: 10, intelligence: 10, agility: 10, charisma: 10 }
  })

  it('should feed pet correctly', () => {
    const mockPet = createMockPet()
    gameState.addPet(mockPet)
    
    petStore.feedPet('test-pet-1')
    
    const state = get(gameState)
    const updatedPet = state.pets[0]
    
    expect(updatedPet.needs.hunger).toBe(75) // 50 + 25
    expect(updatedPet.needs.happiness).toBe(55) // 50 + 5
    expect(state.coins).toBe(90) // 100 - 10
  })

  it('should not exceed max hunger when feeding', () => {
    const mockPet = createMockPet()
    mockPet.needs.hunger = 90
    gameState.addPet(mockPet)
    
    petStore.feedPet('test-pet-1')
    
    const state = get(gameState)
    const updatedPet = state.pets[0]
    
    expect(updatedPet.needs.hunger).toBe(100) // capped at 100
  })

  it('should play with pet correctly', () => {
    const mockPet = createMockPet()
    gameState.addPet(mockPet)
    
    petStore.playWithPet('test-pet-1')
    
    const state = get(gameState)
    const updatedPet = state.pets[0]
    
    expect(updatedPet.needs.happiness).toBe(70) // 50 + 20
    expect(updatedPet.needs.energy).toBe(40) // 50 - 10
    expect(updatedPet.experience).toBe(5) // 0 + 5
    expect(updatedPet.currentAnimation).toBe('playing')
  })

  it('should rest pet correctly', () => {
    const mockPet = createMockPet()
    gameState.addPet(mockPet)
    
    petStore.restPet('test-pet-1')
    
    const state = get(gameState)
    const updatedPet = state.pets[0]
    
    expect(updatedPet.needs.energy).toBe(80) // 50 + 30
    expect(updatedPet.currentAnimation).toBe('sleeping')
  })

  it('should not exceed max energy when resting', () => {
    const mockPet = createMockPet()
    mockPet.needs.energy = 80
    gameState.addPet(mockPet)
    
    petStore.restPet('test-pet-1')
    
    const state = get(gameState)
    const updatedPet = state.pets[0]
    
    expect(updatedPet.needs.energy).toBe(100) // capped at 100
  })

  it('should update needs over time', () => {
    const mockPet = createMockPet()
    const pastTime = Date.now() - (60 * 1000) // 1 minute ago
    mockPet.lastCared = pastTime
    gameState.addPet(mockPet)
    
    petStore.updateNeeds('test-pet-1')
    
    const state = get(gameState)
    const updatedPet = state.pets[0]
    
    // After 1 minute, needs should decay
    expect(updatedPet.needs.hunger).toBeLessThan(50)
    expect(updatedPet.needs.happiness).toBeLessThan(50)
    expect(updatedPet.needs.energy).toBeLessThan(50)
    expect(updatedPet.needs.health).toBeLessThan(50)
  })

  it('should not let needs go below 0', () => {
    const mockPet = createMockPet()
    mockPet.needs = { hunger: 5, happiness: 5, energy: 5, health: 5 }
    const longPastTime = Date.now() - (60 * 60 * 1000) // 1 hour ago
    mockPet.lastCared = longPastTime
    gameState.addPet(mockPet)
    
    petStore.updateNeeds('test-pet-1')
    
    const state = get(gameState)
    const updatedPet = state.pets[0]
    
    expect(updatedPet.needs.hunger).toBeGreaterThanOrEqual(0)
    expect(updatedPet.needs.happiness).toBeGreaterThanOrEqual(0)
    expect(updatedPet.needs.energy).toBeGreaterThanOrEqual(0)
    expect(updatedPet.needs.health).toBeGreaterThanOrEqual(0)
  })
})