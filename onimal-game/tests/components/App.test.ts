import { describe, it, expect, beforeEach } from 'vitest';
import App from '../../src/App.svelte';
import { gameState } from '../../src/stores/gameState.ts';

// Simple server-side render tests for App

describe('App component', () => {
  beforeEach(() => {
    gameState.reset();
  });

  // Rendering tests are skipped until Svelte 5 testing utilities support DOM APIs
  it.skip('renders header and controls', () => {
    const { html } = (App as any).render();
    expect(html).toContain('🐾 Onimal');
    expect(html).toContain('Nueva Mascota');
  });
});
