export type PetSpecies = 'canine' | 'feline' | 'avian' | 'reptile' | 'amphibian';
export type PetStage = 'cria' | 'joven' | 'adulto' | 'veterano';
export type PetAnimation = 'idle' | 'happy' | 'sad' | 'eating' | 'sleeping' | 'playing';

export interface PetNeeds {
  hunger: number;
  happiness: number;
  energy: number;
  health: number;
}

export interface Pet {
  id: string;
  name: string;
  species: PetSpecies;
  stage: PetStage;
  level: number;
  experience: number;
  needs: PetNeeds;
  currentAnimation: PetAnimation;
  birthTime: number;
  lastCared: number;
  stats: {
    strength: number;
    intelligence: number;
    agility: number;
    charisma: number;
  };
}

export interface GameState {
  pets: Pet[];
  selectedPetId: string | null;
  coins: number;
  level: number;
  lastSave: number;
}