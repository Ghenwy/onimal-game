# ONIMAL - DIAGRAMA DE FLUJO COMPLETO
## Arquitectura Total del Sistema

```yaml
# FLUJO PRINCIPAL DEL JUEGO
main_game_flow:
  
  # 1. INICIO Y ONBOARDING
  player_entry:
    landing_screen:
      - spectacular_intro_animation: "20 segundos de trailer épico"
      - play_button_with_glow: "Botón con particle effects"
      - settings_accessible: "Audio, graphics, accessibility"
    
    onboarding_sequence:
      - choose_first_egg: "5 especies disponibles con preview"
      - name_your_pet: "Input con character limit"
      - habitat_setup: "Colocar egg en primer habitat"
      - tutorial_basics: "Feeding, playing, waiting for hatch"
      - first_hatch_ceremony: "Epic 20-second sequence"
    
    save_system_init:
      - local_storage_setup: "Primary save mechanism"
      - cloud_backup_optional: "Parent email for backup"
      - progress_tracking_init: "Achievement system setup"

  # 2. CORE GAMEPLAY LOOP
  daily_routine_flow:
    login_sequence:
      - welcome_back_animation: "Pets react to return"
      - status_overview: "Quick view all pets"
      - daily_rewards: "Login bonuses with animation"
      - notification_summary: "What happened while away"
    
    pet_care_cycle:
      - check_needs: "Hunger, happiness, health meters"
      - feeding_mini_game: "Interactive feeding with reactions"
      - play_activities: "5 different mini-games per species"
      - training_sessions: "Stat-boosting activities"
      - health_monitoring: "Disease prevention/cure"
    
    empire_management:
      - habitat_construction: "Build/upgrade living spaces"
      - resource_production: "Food farms, gold mines"
      - research_progress: "Unlock new species/abilities"
      - facility_management: "Training grounds, medical center"

  # 3. COMBAT SYSTEM FLOW
  battle_preparation:
    daily_limit_check:
      - available_battles_display: "X/8 1v1, X/2 campal"
      - cooldown_timers: "Next battle available in X"
      - opponent_selection: "AI difficulty levels"
    
    pre_battle_setup:
      - pet_selection: "Choose active combatant"
      - equipment_check: "Armor, accessories, items"
      - formation_setup: "For batalla campal"
      - strategy_briefing: "Type advantages display"
    
    combat_execution:
      - turn_based_engine: "Speed determines order"
      - cinematic_attacks: "Marvel-level animations"
      - type_effectiveness: "Visual damage multipliers"
      - special_abilities: "Unique powers per species"
      - victory_celebration: "Epic reward sequence"

  # 4. PROGRESSION SYSTEMS
  advancement_flow:
    pet_evolution:
      - experience_accumulation: "From battles, care, training"
      - evolution_requirements: "Time + care + battles + health"
      - evolution_ceremony: "15-second transformation"
      - new_abilities_unlock: "Power progression"
    
    empire_expansion:
      - unlock_new_habitats: "Research-gated expansion"
      - species_discovery: "New pet types available"
      - facility_upgrades: "Enhanced capabilities"
      - prestige_system: "Reset for permanent bonuses"
    
    achievement_system:
      - care_achievements: "Perfect care streaks"
      - battle_achievements: "Victory milestones"
      - collection_achievements: "Species discovery"
      - special_achievements: "Hidden challenges"

# SISTEMA DE ESTADOS DEL JUEGO
game_state_machine:
  
  # ESTADOS PRINCIPALES
  core_states:
    main_menu:
      - new_game_option
      - continue_game_option
      - settings_menu
      - credits_screen
    
    habitat_view:
      - pet_interaction_mode
      - construction_mode
      - inventory_access
      - navigation_menu
    
    battle_mode:
      - opponent_selection
      - battle_preparation
      - active_combat
      - victory_screen
    
    management_screens:
      - empire_overview
      - research_tree
      - achievement_gallery
      - statistics_dashboard

  # TRANSICIONES ENTRE ESTADOS
  state_transitions:
    smooth_animations: "Todas las transiciones con effects"
    loading_screens: "Animated loading con pet interactions"
    context_preservation: "Remember where player was"
    seamless_flow: "No jarring cuts or jumps"

# ARQUITECTURA DE DATOS
data_architecture:
  
  # ESTRUCTURA DE SAVE DATA
  save_game_structure:
    player_profile:
      - player_name: "String"
      - total_playtime: "Seconds"
      - creation_date: "Timestamp"
      - last_login: "Timestamp"
      - achievements_unlocked: "Array of IDs"
    
    pets_data:
      - pet_collection: "Array of pet objects"
      - active_pets: "Currently alive pets"
      - pet_cemetery: "Memorial for deceased pets"
      - breeding_history: "Lineage tracking"
    
    empire_data:
      - habitats: "Array of habitat objects"
      - facilities: "Buildings and their levels"
      - resources: "Current amounts of each resource"
      - research_progress: "Unlocked technologies"
    
    battle_data:
      - daily_battle_count: "1v1 and campal counts"
      - last_battle_reset: "Timestamp for daily reset"
      - battle_history: "Recent combat results"
      - win_loss_record: "Statistics tracking"

  # ESTRUCTURA DE PET INDIVIDUAL
  pet_object_schema:
    basic_info:
      - pet_id: "Unique identifier"
      - species: "Canine, Feline, Avian, Reptile, Amphibian"
      - name: "Player-assigned name"
      - birth_date: "Creation timestamp"
      - current_age: "Calculated from birth_date"
    
    stats_and_progression:
      - level: "Overall pet level"
      - experience: "Current XP amount"
      - evolution_stage: "Egg, Cria, Joven, Adulto, Veterano"
      - base_stats: "{attack, defense, speed, health}"
      - current_stats: "Base stats + bonuses"
    
    care_status:
      - hunger_level: "0-100"
      - happiness_level: "0-100"
      - health_status: "Healthy, Sick, Critical"
      - bond_level: "Emotional connection strength"
      - last_fed: "Timestamp"
      - last_played: "Timestamp"
    
    combat_data:
      - battles_won: "Victory count"
      - battles_lost: "Defeat count"
      - favorite_abilities: "Most used attacks"
      - equipment_equipped: "Current gear"

# SISTEMA DE RECURSOS
resource_management_flow:
  
  # TIPOS DE RECURSOS
  resource_types:
    primary_resources:
      food:
        - generation: "Automatic from farms + daily bonuses"
        - consumption: "Pet feeding + special activities"
        - storage: "Warehouse capacity limits"
        - types: "Basic, Premium, Special (rare)"
      
      gold:
        - generation: "Battles won + daily login + achievements"
        - consumption: "Equipment, medicine, habitat upgrades"
        - no_premium_purchases: "Cannot buy with real money"
        - inflation_protection: "Balanced economy"
      
      love_energy:
        - generation: "Time spent with pets + care quality"
        - consumption: "Special abilities + evolution requirements"
        - bond_strengthening: "Deeper connection unlocks more"
        - unique_mechanic: "Cannot be rushed or bought"
      
      research_points:
        - generation: "Discoveries + milestones + time"
        - consumption: "New species unlock + facility upgrades"
        - tech_tree_progression: "Linear advancement"
        - endgame_content: "Always new research available"

  # PRODUCCIÓN Y CONSUMO
  economic_balance:
    production_rates:
      - early_game: "Sufficient for 1-2 pets"
      - mid_game: "Supports 3-5 pets comfortably"
      - late_game: "Can maintain 8-10 pets"
      - endgame: "Surplus for experimentation"
    
    consumption_scaling:
      - higher_evolution: "More expensive to maintain"
      - multiple_pets: "Economies of scale"
      - premium_activities: "Optional expensive options"
      - emergency_costs: "Illness treatment, accidents"

# SISTEMA DE TIMING (OGAME-STYLE)
timing_mechanics_detailed:
  
  # CRONÓMETROS SIMULTÁNEOS
  concurrent_timers:
    pet_growth:
      - egg_incubation: "2-4 hours depending on species"
      - evolution_stages: "8h, 16h, 48h for each stage"
      - care_acceleration: "Good care = 25% faster"
      - neglect_penalty: "Poor care = 50% slower"
    
    construction_timers:
      - habitat_building: "4-24 hours depending on size"
      - facility_construction: "2-16 hours depending on type"
      - upgrade_improvements: "Previous time x1.5 per level"
      - rush_completion: "Love energy can accelerate 25%"
    
    research_timers:
      - basic_research: "1-4 hours"
      - advanced_research: "8-24 hours"
      - breakthrough_research: "48-72 hours"
      - parallel_research: "Multiple projects simultaneously"
    
    combat_cooldowns:
      - 1v1_battles: "8 per day, reset at midnight"
      - batalla_campal: "2 per day, 6 hour cooldown between"
      - healing_after_defeat: "1-4 hours depending on damage"
      - equipment_durability: "Repair time after heavy use"

  # GESTIÓN DE EXPECTATIVAS
  anticipation_building:
    positive_waiting:
      - visual_progress_bars: "See exactly when things complete"
      - activity_suggestions: "What to do while waiting"
      - notification_system: "Get notified when ready"
      - accelerated_options: "Earn faster progress"
    
    never_idle:
      - always_something: "Always an action available"
      - multiple_projects: "Parallel progress on many fronts"
      - mini_games: "Entertainment while waiting"
      - planning_ahead: "Strategy for upcoming completions"

# SISTEMA DE UI/UX 2D DE ALTA CALIDAD
visual_excellence_2d:
  
  # ESTÁNDARES DE CALIDAD VISUAL
  art_direction_2d:
    style_inspiration:
      - ori_and_blind_forest: "Painterly backgrounds"
      - hollow_knight: "Character animation fluidity"
      - cuphead: "Hand-drawn frame quality"
      - gris: "Emotional color palettes"
      - rayman_legends: "Whimsical character design"
    
    technical_specifications:
      - resolution_target: "4K-ready assets with scaling"
      - frame_animation: "12-24 fps hand-drawn quality"
      - color_depth: "32-bit color with alpha"
      - compression: "Lossless for key assets"
      - optimization: "Multiple resolution versions"
  
  # ARQUITECTURA DE SPRITES
  sprite_system_architecture:
    character_sprites:
      - base_pet_sprites: "5 especies x 5 evolution stages = 25 base sets"
      - animation_states: "Idle, Walk, Run, Happy, Sad, Eating, Sleeping, Fighting"
      - expression_variants: "Eyes, mouth, posture variations"
      - equipment_layers: "Accessories, armor, items overlay"
      - special_effects: "Evolution auras, ability effects"
    
    background_assets:
      - habitat_environments: "5 unique habitat types"
      - weather_variations: "Sun, rain, night, seasons"
      - interactive_elements: "Food bowls, toys, furniture"
      - construction_states: "Building phases visualization"
      - atmospheric_effects: "Particles, lighting, ambiance"
    
    ui_elements:
      - button_states: "Idle, hover, pressed, disabled"
      - progress_bars: "Health, hunger, happiness, timers"
      - menu_panels: "Inventory, settings, achievements"
      - notification_system: "Alerts, celebrations, warnings"
      - transition_effects: "Screen changes, loading screens"

  # SISTEMA DE ANIMACIONES 2D
  animation_pipeline_2d:
    hand_drawn_approach:
      - keyframe_animation: "Primary poses hand-drawn"
      - inbetween_generation: "Smooth interpolation"
      - secondary_animation: "Hair, clothes, accessories movement"
      - facial_animation: "Expressive eyes and mouth"
    
    technical_implementation:
      - sprite_atlasing: "Efficient texture management"
      - bone_animation: "Skeletal systems for complex movement"
      - particle_systems: "2D particles for effects"
      - shader_effects: "Glow, outline, color manipulation"
    
    performance_optimization:
      - animation_pooling: "Reuse animation instances"
      - level_of_detail: "Simpler animations when zoomed out"
      - culling_system: "Don't animate off-screen elements"
      - memory_management: "Smart loading/unloading"

# PIPELINE DE DESARROLLO
development_workflow:
  
  # FASE DE ARTE Y DISEÑO
  art_production_pipeline:
    concept_art:
      - species_design: "Character sheets para 5 especies"
      - evolution_progression: "Visual development stages"
      - habitat_concepts: "Environment design"
      - ui_mockups: "Screen layout and flow"
    
    asset_production:
      - sprite_creation: "Vector-based for scalability"
      - animation_production: "Frame-by-frame key sequences"
      - background_painting: "Detailed environment art"
      - effect_design: "Particle and magical effects"
    
    technical_art:
      - sprite_optimization: "Compression and formatting"
      - atlas_generation: "Efficient sprite sheets"
      - animation_export: "Game-ready animation data"
      - performance_testing: "Frame rate validation"

  # PROGRAMACIÓN E INTEGRACIÓN
  development_phases:
    core_engine:
      - react_setup: "Modern React 18 with concurrent features"
      - animation_framework: "Framer Motion + custom systems"
      - state_management: "Zustand for game state"
      - save_system: "LocalStorage + cloud backup"
    
    game_systems:
      - pet_logic: "AI behavior and needs simulation"
      - combat_engine: "Turn-based battle system"
      - timer_system: "Ogame-style timing mechanics"
      - progression_system: "Experience and evolution"
    
    polish_and_optimization:
      - performance_tuning: "60fps target achievement"
      - accessibility_features: "Child-friendly accessibility"
      - parental_controls: "Safety and monitoring"
      - testing_validation: "Quality assurance"
```