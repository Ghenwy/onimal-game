export const PET_ADOPTION_COST = 50;
export const FEED_COST = 10;
export const PLAY_COST = 5;
export const NEEDS_DECAY_RATES = {
  hunger: 0.5,
  happiness: 0.3,
  energy: 0.4,
  health: 0.2
} as const;
export const NEEDS_DECAY_INTERVAL = 60 * 1000; // 1 minute
