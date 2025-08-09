<script>
  import Pet from './components/Pet.svelte';
  import { gameState } from './stores/gameState.js';
  import { tryAddPet } from './lib/createPet.js';
  import { onMount } from 'svelte';
  
  onMount(() => {
    gameState.load();
  });

  function addTestPet() {
    const name = `Mascota ${$gameState.pets.length + 1}`;
    tryAddPet(name);
  }
</script>

<main>
  <header class="game-header">
    <h1>🐾 Onimal</h1>
    
    <div class="game-stats">
      <div class="stat">
        <span class="stat-icon">💰</span>
        <span class="stat-value">{$gameState.coins}</span>
      </div>
      
      <div class="stat">
        <span class="stat-icon">⭐</span>
        <span class="stat-value">Nivel {$gameState.level}</span>
      </div>
      
      <div class="stat">
        <span class="stat-icon">🐾</span>
        <span class="stat-value">{$gameState.pets.length}</span>
      </div>
    </div>

    <div class="game-controls">
      <button on:click={addTestPet} class="control-btn">
        ➕ Nueva Mascota
      </button>
      
      <button on:click={() => gameState.save()} class="control-btn save">
        💾 Guardar
      </button>
    </div>
  </header>

  <div class="game-content">
    {#if $gameState.pets.length === 0}
      <div class="welcome-screen">
        <div class="welcome-card">
          <h2>🎉 ¡Bienvenido a Onimal!</h2>
          <p>¡Tu aventura con mascotas virtuales está a punto de comenzar!</p>
          <p>Haz clic en "Nueva Mascota" para adoptar tu primera mascota.</p>
          <div class="welcome-features">
            <div class="feature">
              <span class="feature-icon">🍎</span>
              <span>Alimenta a tus mascotas</span>
            </div>
            <div class="feature">
              <span class="feature-icon">🎾</span>
              <span>Juega con ellas</span>
            </div>
            <div class="feature">
              <span class="feature-icon">💤</span>
              <span>Cuida su descanso</span>
            </div>
            <div class="feature">
              <span class="feature-icon">⭐</span>
              <span>Haz que evolucionen</span>
            </div>
          </div>
        </div>
      </div>
    {:else}
      <div class="pets-grid">
        {#each $gameState.pets as pet (pet.id)}
          <Pet {pet} />
        {/each}
      </div>
    {/if}
  </div>

  <footer class="game-footer">
    <p>Onimal v0.1.0 - Webgame para niños de 5-13 años</p>
  </footer>
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: #F8F9FA;
  }

  main {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .game-header {
    background: linear-gradient(135deg, #4A90E2, #F5A623);
    color: white;
    padding: 16px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }

  .game-header h1 {
    margin: 0 0 16px 0;
    text-align: center;
    font-size: clamp(1.5rem, 4vw, 2rem);
  }

  .game-stats {
    display: flex;
    justify-content: center;
    gap: 16px;
    margin-bottom: 16px;
  }

  .stat {
    display: flex;
    align-items: center;
    gap: 6px;
    background: rgba(255,255,255,0.2);
    padding: 8px 12px;
    border-radius: 8px;
  }

  .stat-icon {
    font-size: 1.2rem;
  }

  .stat-value {
    font-weight: 600;
    font-size: 0.9rem;
  }

  .game-controls {
    display: flex;
    justify-content: center;
    gap: 8px;
  }

  .control-btn {
    padding: 8px 16px;
    font-size: 0.85rem;
    border-radius: 8px;
    background: rgba(255,255,255,0.9);
    color: #333;
    border: none;
    cursor: pointer;
    transition: all 0.15s ease-in-out;
    font-weight: 600;
  }

  .control-btn:hover {
    background: white;
    transform: translateY(-2px);
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .control-btn.save {
    background: #7ED321;
    color: white;
  }

  .game-content {
    flex-grow: 1;
    padding: 24px 16px;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
  }

  .welcome-screen {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 60vh;
  }

  .welcome-card {
    background: white;
    padding: 32px;
    border-radius: 16px;
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
    text-align: center;
    max-width: 500px;
  }

  .welcome-card h2 {
    color: #4A90E2;
    margin-bottom: 16px;
  }

  .welcome-card p {
    color: #6C757D;
    margin-bottom: 16px;
    line-height: 1.6;
  }

  .welcome-features {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    margin-top: 24px;
  }

  .feature {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px;
    background: #F8F9FA;
    border-radius: 8px;
  }

  .feature-icon {
    font-size: 1.5rem;
  }

  .pets-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 24px;
  }

  .game-footer {
    background: #E9ECEF;
    padding: 16px;
    text-align: center;
    border-top: 1px solid #ddd;
  }

  .game-footer p {
    margin: 0;
    font-size: 0.8rem;
    color: #6C757D;
  }

  @media (max-width: 768px) {
    .game-stats {
      flex-direction: column;
      gap: 8px;
    }

    .game-controls {
      flex-direction: column;
      gap: 8px;
    }

    .control-btn {
      font-size: 0.9rem;
      padding: 10px 16px;
    }

    .welcome-features {
      grid-template-columns: 1fr;
    }

    .pets-grid {
      grid-template-columns: 1fr;
      gap: 16px;
    }
  }
</style>