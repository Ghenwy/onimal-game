import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { get } from 'svelte/store'
import { gameState } from '../../src/stores/gameState.js'

describe('gameState store', () => {
  beforeEach(() => {
    gameState.reset()
  })

  it('should initialize with default values', () => {
    const state = get(gameState)
    
    expect(state.pets).toEqual([])
    expect(state.selectedPetId).toBeNull()
    expect(state.coins).toBe(100)
    expect(state.level).toBe(1)
    expect(state.lastSave).toBeTypeOf('number')
  })

  it('should add a pet correctly', () => {
    const mockPet = {
      id: 'test-pet-1',
      name: 'Test Pet',
      species: 'canine' as const,
      stage: 'cria' as const,
      level: 1,
      experience: 0,
      needs: { hunger: 100, happiness: 100, energy: 100, health: 100 },
      currentAnimation: 'idle' as const,
      birthTime: Date.now(),
      lastCared: Date.now(),
      stats: { strength: 10, intelligence: 10, agility: 10, charisma: 10 }
    }

    gameState.addPet(mockPet)
    const state = get(gameState)
    
    expect(state.pets).toHaveLength(1)
    expect(state.pets[0]).toEqual(mockPet)
  })

  it('should select a pet correctly', () => {
    const petId = 'test-pet-1'
    gameState.selectPet(petId)
    
    const state = get(gameState)
    expect(state.selectedPetId).toBe(petId)
  })

  it('should add coins correctly', () => {
    gameState.addCoins(50)
    const state = get(gameState)
    
    expect(state.coins).toBe(150)
  })

  it('should spend coins correctly', () => {
    gameState.spendCoins(30)
    const state = get(gameState)
    
    expect(state.coins).toBe(70)
  })

  it('should not allow negative coins', () => {
    gameState.spendCoins(200)
    const state = get(gameState)
    
    expect(state.coins).toBe(0)
  })

  it('should update pet correctly', () => {
    const mockPet = {
      id: 'test-pet-1',
      name: 'Test Pet',
      species: 'canine' as const,
      stage: 'cria' as const,
      level: 1,
      experience: 0,
      needs: { hunger: 100, happiness: 100, energy: 100, health: 100 },
      currentAnimation: 'idle' as const,
      birthTime: Date.now(),
      lastCared: Date.now(),
      stats: { strength: 10, intelligence: 10, agility: 10, charisma: 10 }
    }

    gameState.addPet(mockPet)
    gameState.updatePet('test-pet-1', { level: 2, experience: 100 })
    
    const state = get(gameState)
    expect(state.pets[0].level).toBe(2)
    expect(state.pets[0].experience).toBe(100)
  })

  it('should save and load from localStorage', () => {
    const mockLocalStorage = {
      'onimal-game-state': JSON.stringify({
        pets: [],
        selectedPetId: null,
        coins: 200,
        level: 2,
        lastSave: Date.now()
      })
    }
    
    localStorage.getItem = vi.fn((key) => mockLocalStorage[key] || null)
    localStorage.setItem = vi.fn()
    
    gameState.load()
    const state = get(gameState)
    
    expect(state.coins).toBe(200)
    expect(state.level).toBe(2)
  })

  describe('when localStorage is unavailable', () => {
    let originalStorage: Storage | undefined
    let warnSpy: ReturnType<typeof vi.spyOn>

    beforeEach(() => {
      originalStorage = globalThis.localStorage
      // @ts-ignore
      delete globalThis.localStorage
      warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      gameState.reset()
    })

    afterEach(() => {
      globalThis.localStorage = originalStorage as any
      warnSpy.mockRestore()
    })

    it('save should not throw and should warn', () => {
      expect(() => gameState.save()).not.toThrow()
      expect(warnSpy).toHaveBeenCalled()
    })

    it('load should not throw and keep default state', () => {
      expect(() => gameState.load()).not.toThrow()
      const state = get(gameState)
      expect(state.coins).toBe(100)
      expect(warnSpy).toHaveBeenCalled()
    })
  })
})
