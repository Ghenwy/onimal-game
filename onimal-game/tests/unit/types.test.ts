import { describe, it, expect } from 'vitest'
import type { Pet, PetSpecies, PetStage, PetAnimation, GameState } from '../../src/lib/types/pet.ts'

describe('Type Definitions', () => {
  it('should validate PetSpecies type', () => {
    const validSpecies: PetSpecies[] = ['canine', 'feline', 'avian', 'reptile', 'amphibian']
    
    validSpecies.forEach(species => {
      expect(typeof species).toBe('string')
      expect(['canine', 'feline', 'avian', 'reptile', 'amphibian']).toContain(species)
    })
  })

  it('should validate PetStage type', () => {
    const validStages: PetStage[] = ['cria', 'joven', 'adulto', 'veterano']
    
    validStages.forEach(stage => {
      expect(typeof stage).toBe('string')
      expect(['cria', 'joven', 'adulto', 'veterano']).toContain(stage)
    })
  })

  it('should validate PetAnimation type', () => {
    const validAnimations: PetAnimation[] = ['idle', 'happy', 'sad', 'eating', 'sleeping', 'playing']
    
    validAnimations.forEach(animation => {
      expect(typeof animation).toBe('string')
      expect(['idle', 'happy', 'sad', 'eating', 'sleeping', 'playing']).toContain(animation)
    })
  })

  it('should create valid Pet object', () => {
    const testPet: Pet = {
      id: 'test-pet-123',
      name: 'Test Pet Name',
      species: 'canine',
      stage: 'cria',
      level: 1,
      experience: 0,
      needs: {
        hunger: 100,
        happiness: 100,
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
    }

    expect(testPet.id).toBe('test-pet-123')
    expect(testPet.name).toBe('Test Pet Name')
    expect(testPet.species).toBe('canine')
    expect(testPet.stage).toBe('cria')
    expect(testPet.level).toBe(1)
    expect(testPet.experience).toBe(0)
    expect(testPet.currentAnimation).toBe('idle')
    
    // Validate needs structure
    expect(testPet.needs.hunger).toBe(100)
    expect(testPet.needs.happiness).toBe(100)
    expect(testPet.needs.energy).toBe(100)
    expect(testPet.needs.health).toBe(100)
    
    // Validate stats structure
    expect(testPet.stats.strength).toBe(10)
    expect(testPet.stats.intelligence).toBe(10)
    expect(testPet.stats.agility).toBe(10)
    expect(testPet.stats.charisma).toBe(10)
    
    // Validate timestamps
    expect(typeof testPet.birthTime).toBe('number')
    expect(typeof testPet.lastCared).toBe('number')
  })

  it('should create valid GameState object', () => {
    const testGameState: GameState = {
      pets: [],
      selectedPetId: null,
      coins: 100,
      level: 1,
      lastSave: Date.now()
    }

    expect(Array.isArray(testGameState.pets)).toBe(true)
    expect(testGameState.selectedPetId).toBeNull()
    expect(testGameState.coins).toBe(100)
    expect(testGameState.level).toBe(1)
    expect(typeof testGameState.lastSave).toBe('number')
  })

  it('should validate needs values are within range', () => {
    const validNeeds = {
      hunger: 75,
      happiness: 50,
      energy: 25,
      health: 100
    }

    Object.values(validNeeds).forEach(value => {
      expect(value).toBeGreaterThanOrEqual(0)
      expect(value).toBeLessThanOrEqual(100)
    })
  })

  it('should validate stats are positive numbers', () => {
    const validStats = {
      strength: 15,
      intelligence: 20,
      agility: 12,
      charisma: 18
    }

    Object.values(validStats).forEach(value => {
      expect(value).toBeGreaterThan(0)
      expect(typeof value).toBe('number')
    })
  })
})