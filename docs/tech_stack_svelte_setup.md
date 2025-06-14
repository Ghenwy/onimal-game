# ONIMAL - TECH STACK SVELTE SETUP
## Configuración Técnica y Primeros Pasos

```yaml
# TECH STACK CONFIRMADO
technology_stack:
  framework_principal:
    name: "Svelte + SvelteKit"
    version: "Latest stable 2025"
    reasoning:
      - bundle_size: "30-40% más pequeño que React"
      - performance: "Compile-time optimization"
      - mobile_focus: "Excelente en dispositivos low-end"
      - simplicity: "Menos boilerplate, desarrollo más rápido"
      - animations: "Built-in smooth transitions"
  
  animation_system:
    primary: "Svelte transitions y CSS animations"
    secondary: "CSS transforms y keyframes"
    special_effects: "Pixi.js minimal (solo para particles complejos)"
    approach: "Progressive enhancement - CSS first"
  
  styling:
    framework: "CSS custom properties + Svelte scoped styles"
    responsive: "Mobile-first design approach"
    optimization: "PostCSS para browser compatibility"
  
  state_management:
    game_state: "Svelte stores (writable, readable, derived)"
    persistence: "LocalStorage API nativo"
    timers: "Custom timer management con Svelte stores"
  
  asset_management:
    sprites: "WebP format para compression"
    organization: "Sprite sheets para performance"
    loading: "Dynamic imports + lazy loading"

# PROJECT SETUP STEPS
setup_proceso:
  paso_1_project_creation:
    command: "npm create svelte@latest onimal-game"
    options:
      - typescript: "Yes - Type safety crítico"
      - eslint: "Yes - Code quality"
      - prettier: "Yes - Code formatting"
      - playwright: "Yes - Testing"
      - vitest: "Yes - Unit testing"
  
  paso_2_folder_structure:
    src/
      components/
        pets/: "Pet display components"
        ui/: "Interface components"
        animations/: "Animation components"
      stores/: "Svelte stores para game state"
      assets/
        sprites/: "Pet sprites organizados por especie"
        sounds/: "Audio assets"
        ui/: "UI graphics"
      lib/
        game/: "Core game logic"
        utils/: "Helper functions"
        types/: "TypeScript definitions"
      routes/: "SvelteKit pages"
  
  paso_3_dependencies:
    core_dependencies:
      - "@sveltejs/kit": "Framework principal"
      - "typescript": "Type safety"
      - "sass": "Advanced CSS features"
    
    animation_dependencies:
      - "gsap": "Solo si necesitamos complex timing"
      - "pixi.js": "Solo para particle effects especiales"
    
    development_dependencies:
      - "@typescript-eslint/eslint-plugin": "TS linting"
      - "@sveltejs/vite-plugin-svelte": "Build optimization"
      - "vite": "Fast development server"

# ARCHITECTURE DESIGN
game_architecture:
  component_hierarchy:
    App.svelte:
      - GameContainer.svelte
        - PetDisplay.svelte
          - PetSprite.svelte
          - PetNeeds.svelte
          - PetActions.svelte
        - GameUI.svelte
          - ResourceDisplay.svelte
          - TimerDisplay.svelte
          - ActionButtons.svelte
        - GameModals.svelte
          - BattleModal.svelte
          - EvolutionModal.svelte
  
  store_architecture:
    gameState.js: "Core game state management"
    petStore.js: "Individual pet data y management"
    timerStore.js: "Ogame-style timer system"
    saveStore.js: "LocalStorage persistence"
    animationStore.js: "Animation state coordination"

# SPRITE SYSTEM DESIGN
sprite_management:
  organization_strategy:
    by_species:
      canine/: "Perro sprites"
      feline/: "Gato sprites"
      avian/: "Pájaro sprites"
      reptile/: "Reptil sprites"
      amphibian/: "Anfibio sprites"
    
    by_evolution:
      cria/: "Stage 1 sprites"
      joven/: "Stage 2 sprites"
      adulto/: "Stage 3 sprites"
      veterano/: "Stage 4 sprites"
    
    by_animation:
      idle.webp: "Default animation"
      happy.webp: "Joy expression"
      sad.webp: "Sad expression"
      eat.webp: "Eating animation"
      sleep.webp: "Sleeping state"
      attack.webp: "Combat animation"
  
  loading_strategy:
    initial_load: "Solo especies seleccionada"
    lazy_loading: "Otras especies on-demand"
    preloading: "Next evolution stage"
    sprite_sheets: "Combined para reduce HTTP requests"

# ANIMATION IMPLEMENTATION
animation_approach:
  css_first:
    benefits: "Hardware accelerated, smooth performance"
    use_cases: "Idle animations, UI transitions, basic effects"
    implementation: "CSS keyframes + Svelte class bindings"
  
  svelte_transitions:
    benefits: "Built-in, easy to use, performant"
    use_cases: "Screen transitions, modal openings, evolution"
    implementation: "Svelte transition directives"
  
  pixi_js_selective:
    benefits: "Complex particle effects, WebGL acceleration"
    use_cases: "Evolution transformation, victory celebrations"
    implementation: "Component-based Pixi integration"
  
  performance_targets:
    frame_rate: "60fps para animaciones críticas"
    memory_usage: "Minimize sprite texture memory"
    battery_impact: "Optimize para mobile battery life"

# TIMING SYSTEM OGAME-STYLE
timer_implementation:
  timer_store_design:
    structure:
      - active_timers: "Array of running timers"
      - timer_completion_callbacks: "Functions to execute"
      - timer_persistence: "Save to localStorage"
      - timer_notifications: "User feedback system"
    
    timer_types:
      - egg_hatching: "1-2 horas"
      - evolution: "4-16 horas dependiendo stage"
      - training: "30 minutos - 4 horas"
      - healing: "1-8 horas"
      - construction: "2-12 horas"
    
    acceleration_mechanics:
      - love_energy_boost: "25% faster timers"
      - perfect_care_bonus: "20% faster growth"
      - premium_acceleration: "Optional convenience features"

# SAVE SYSTEM DESIGN
persistence_strategy:
  local_storage:
    advantages: "No server needed, instant save/load"
    implementation: "JSON serialization of game state"
    backup_strategy: "Export/import save data"
  
  save_data_structure:
    player_profile:
      - player_name: "string"
      - creation_date: "timestamp"
      - total_playtime: "seconds"
      - achievements: "array of unlocked achievements"
    
    pets_collection:
      - active_pets: "current living pets"
      - pet_history: "memorial for deceased pets"
      - breeding_lineage: "family trees"
    
    game_progress:
      - unlocked_species: "available pet types"
      - unlocked_evolutions: "achieved evolution stages"
      - battle_records: "win/loss statistics"
      - resource_balances: "current resources"

# MOBILE OPTIMIZATION
mobile_first_approach:
  responsive_design:
    breakpoints:
      - mobile: "320px - 768px (primary target)"
      - tablet: "768px - 1024px (secondary)"
      - desktop: "1024px+ (enhancement)"
    
    touch_optimization:
      - button_sizes: "Minimum 44px touch targets"
      - gesture_support: "Swipe navigation"
      - haptic_feedback: "Mobile vibration API"
    
    performance_considerations:
      - lazy_loading: "Load content as needed"
      - image_optimization: "WebP format, multiple sizes"
      - bundle_splitting: "Code splitting para faster initial load"
      - service_worker: "Offline capability opcional"

# DEVELOPMENT WORKFLOW
development_process:
  mvp_approach:
    week_1: "Basic pet display + simple animation"
    week_2: "Feeding system + timer implementation"
    week_3: "Evolution system + save functionality"
    week_4: "Combat system + UI polish"
    week_5_8: "All species + advanced features + optimization"
  
  testing_strategy:
    unit_tests: "Core game logic functions"
    component_tests: "Svelte component functionality"
    integration_tests: "Save/load system integrity"
    mobile_testing: "Performance on target devices"
  
  performance_monitoring:
    bundle_analysis: "Track bundle size growth"
    lighthouse_scores: "Performance, accessibility metrics"
    real_device_testing: "Low-end mobile devices"
    memory_profiling: "Prevent memory leaks"
```