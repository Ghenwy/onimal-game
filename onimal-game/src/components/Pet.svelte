<script>
  import { petStore } from '../stores/petStore.js';
  import { gameState } from '../stores/gameState.js';

  const spritePaths = {
    canine: '/sprites/dog.svg',
    feline: '/sprites/cat.svg',
    avian: '/sprites/bird.svg',
    reptile: '/sprites/reptile.svg',
    amphibian: '/sprites/amphibian.svg'
  } as const;

  export let pet;
  
  $: needsStatus = {
    hunger: pet.needs.hunger < 30 ? 'danger' : pet.needs.hunger < 60 ? 'warning' : '',
    happiness: pet.needs.happiness < 30 ? 'danger' : pet.needs.happiness < 60 ? 'warning' : '',
    energy: pet.needs.energy < 30 ? 'danger' : pet.needs.energy < 60 ? 'warning' : '',
    health: pet.needs.health < 30 ? 'danger' : pet.needs.health < 60 ? 'warning' : ''
  };

  function feedPet() {
    petStore.feedPet(pet.id);
  }

  function playWithPet() {
    petStore.playWithPet(pet.id);
  }

  function restPet() {
    petStore.restPet(pet.id);
  }

  function selectPet() {
    gameState.selectPet(pet.id);
  }
</script>

<div
  class="pet-container {pet.stage}"
  role="button"
  tabindex="0"
  aria-label={`Seleccionar ${pet.name}`}
  aria-pressed={$gameState.selectedPetId === pet.id}
  on:click={selectPet}
  on:keydown={(e) => ['Enter', ' '].includes(e.key) && selectPet()}
>
  <div class="pet-header">
    <h3>{pet.name}</h3>
    <span class="pet-level">Nivel {pet.level}</span>
  </div>
  
  <div class="pet-avatar">
    <img
      class="pet-sprite {pet.species} {pet.currentAnimation}"
      src={spritePaths[pet.species]}
      alt={pet.species}
    />
  </div>

  <div class="pet-needs">
    <div class="need">
      <span>Hambre</span>
      <div class="needs-bar">
        <div class="needs-fill {needsStatus.hunger}" 
             style="width: {pet.needs.hunger}%"></div>
      </div>
    </div>

    <div class="need">
      <span>Felicidad</span>
      <div class="needs-bar">
        <div class="needs-fill {needsStatus.happiness}" 
             style="width: {pet.needs.happiness}%"></div>
      </div>
    </div>

    <div class="need">
      <span>Energía</span>
      <div class="needs-bar">
        <div class="needs-fill {needsStatus.energy}" 
             style="width: {pet.needs.energy}%"></div>
      </div>
    </div>

    <div class="need">
      <span>Salud</span>
      <div class="needs-bar">
        <div class="needs-fill {needsStatus.health}" 
             style="width: {pet.needs.health}%"></div>
      </div>
    </div>
  </div>

  <div class="pet-actions">
    <button on:click|stopPropagation={feedPet} class="action-btn feed">
      🍎 Alimentar
    </button>
    <button on:click|stopPropagation={playWithPet} class="action-btn play">
      🎾 Jugar
    </button>
    <button on:click|stopPropagation={restPet} class="action-btn rest">
      😴 Descansar
    </button>
  </div>
</div>

<style>
  .pet-container {
    background: white;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    cursor: pointer;
    transition: all 0.3s ease-in-out;
  }

  .pet-container:hover {
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    transform: translateY(-2px);
  }

  .pet-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }

  .pet-header h3 {
    margin: 0;
    color: #4A90E2;
  }

  .pet-level {
    background: #F5A623;
    color: white;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 600;
  }

  .pet-avatar {
    display: flex;
    justify-content: center;
    margin-bottom: 16px;
  }

  .pet-sprite {
    width: 4rem;
    height: 4rem;
    display: block;
    transition: all 0.3s ease-in-out;
  }

  .pet-sprite.playing {
    animation: bounce 0.5s ease-in-out infinite;
  }

  .pet-sprite.sleeping {
    opacity: 0.7;
    filter: brightness(0.8);
  }

  .pet-needs {
    margin-bottom: 16px;
  }

  .need {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }

  .need span {
    font-size: 0.9rem;
    font-weight: 500;
    min-width: 80px;
  }

  .needs-bar {
    flex-grow: 1;
    margin-left: 12px;
    width: 100%;
    height: 8px;
    background: #E9ECEF;
    border-radius: 4px;
    overflow: hidden;
  }

  .needs-fill {
    height: 100%;
    background: #7ED321;
    transition: width 0.3s ease-in-out;
    border-radius: 4px;
  }

  .needs-fill.warning {
    background: #F8E71C;
  }

  .needs-fill.danger {
    background: #D0021B;
  }

  .pet-actions {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }

  .action-btn {
    padding: 8px 12px;
    font-size: 0.85rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.15s ease-in-out;
    min-height: 44px;
  }

  .action-btn.feed {
    background: #7ED321;
    color: white;
  }

  .action-btn.play {
    background: #F8E71C;
    color: #333;
  }

  .action-btn.rest {
    background: #4A90E2;
    color: white;
  }

  .action-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }

  .pet-cria { filter: brightness(0.9) saturate(0.8); }
  .pet-joven { filter: brightness(1) saturate(1); }
  .pet-adulto { filter: brightness(1.1) saturate(1.1); }
  .pet-veterano { filter: brightness(1.2) saturate(1.2) drop-shadow(0 0 8px gold); }

  @media (max-width: 480px) {
    .pet-actions {
      grid-template-columns: 1fr;
      gap: 6px;
    }
    
    .action-btn {
      font-size: 0.9rem;
      padding: 10px;
    }
  }
</style>