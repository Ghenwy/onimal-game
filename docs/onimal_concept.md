# ONIMAL - CONCEPTO REFINADO
## Juego de Crianza y Combate de Animales para Niños (5-13 años)

```yaml
# VISIÓN CORE REFINADA
concept_overview:
  descripcion: "Tamagotchi meets Pokémon meets Animal Crossing"
  genero: "Pet Simulation + Turn-Based Strategy"
  plataforma: "Web Browser (Mobile-First Responsive)"
  target_age: "5-13 años primario, padres secundario"
  
  inspiracion_mecanicas:
    castle_age: "Sistema de crianza, alimentación, cuidado individual"
    pokemon: "Combate turn-based, tipos, fortalezas/debilidades"
    ogame: "Timing systems, upgrades progressivos"
    tamagotchi: "Cuidado responsable, emotional bonding"

# SISTEMA DE ANIMALES
animal_system:
  especies_iniciales:
    caninos:
      - tipo: "Leal"
      - fortaleza_vs: ["Felinos"]
      - debilidad_vs: ["Aviares"]
      - stats_base: {ataque: 7, defensa: 8, velocidad: 6, salud: 9}
      - personalidad: "Protector, leal, valiente"
    
    felinos:
      - tipo: "Ágil"
      - fortaleza_vs: ["Reptiles"]
      - debilidad_vs: ["Caninos"]
      - stats_base: {ataque: 8, defensa: 6, velocidad: 9, salud: 7}
      - personalidad: "Independiente, astuto, grácil"
    
    aviares:
      - tipo: "Rápido"
      - fortaleza_vs: ["Caninos"]
      - debilidad_vs: ["Felinos"]
      - stats_base: {ataque: 6, defensa: 5, velocidad: 10, salud: 6}
      - personalidad: "Libre, inteligente, observador"
    
    reptiles:
      - tipo: "Resistente"
      - fortaleza_vs: ["Aviares"]
      - debilidad_vs: ["Anfibios"]
      - stats_base: {ataque: 9, defensa: 9, velocidad: 4, salud: 8}
      - personalidad: "Paciente, resistente, sabio"
    
    anfibios:
      - tipo: "Adaptable"
      - fortaleza_vs: ["Reptiles"]
      - debilidad_vs: ["Caninos"]
      - stats_base: {ataque: 5, defensa: 7, velocidad: 7, salud: 10}
      - personalidad: "Adaptable, calmado, sanador"

  evolucion_system:
    etapas:
      - huevo: "0-24 horas (tiempo real acelerado)"
      - cria: "1-7 días, vulnerable, necesita cuidados"
      - joven: "7-14 días, entrenamiento básico"
      - adulto: "14+ días, combat ready"
      - veterano: "30+ días, bonuses especiales"
    
    requisitos_evolucion:
      - tiempo_cuidado: "Alimentación regular"
      - nivel_felicidad: "Interacción y juegos"
      - entrenamiento: "Battles ganadas"
      - salud_optima: "Sin enfermedades"

# SISTEMA DE CRIANZA (INSPIRADO CASTLE AGE)
care_system:
  necesidades_basicas:
    hambre:
      - alimentos_tipos: ["Básico", "Premium", "Especial"]
      - efectos: "Salud, crecimiento, felicidad"
      - timing: "Cada 2-6 horas dependiendo edad"
    
    felicidad:
      - actividades: ["Jugar", "Acariciar", "Enseñar trucos"]
      - efectos: "Stats bonuses, faster growth"
      - social_aspect: "Emotional bonding score"
    
    salud:
      - medicina: "Curar enfermedades"
      - ejercicio: "Mantener forma física"
      - descanso: "Sleep cycles importantes"
    
    entrenamiento:
      - combat_training: "Improve battle stats"
      - skill_training: "Special abilities"
      - discipline: "Obedience y control"

  recursos_management:
    monedas:
      - ganancia: "Daily login, battles won, achievements"
      - gasto: "Food, medicine, equipment, upgrades"
    
    comida:
      - tipos: "Basic (free daily), Premium (bought), Special (rare)"
      - efectos: "Different foods boost different stats"
    
    amor_bond:
      - nuevo_recurso: "Emotional connection metric"
      - ganancia: "Time spent, interactions, care quality"
      - efectos: "Combat bonuses, special abilities unlock"

# SISTEMA DE COMBATE
combat_system:
  battle_types:
    one_vs_one:
      - formato: "Turn-based tactical"
      - duracion: "1-3 minutos"
      - estrategia: "Type advantages, ability timing"
      - ai_opponents: "Progressive difficulty"
    
    batalla_campal:
      - formato: "Formation-based army combat"
      - pre_battle: "Setup formations, assign roles"
      - execution: "Semi-automated with player interventions"
      - team_composition: "Mix de diferentes animales"

  combat_mechanics:
    turn_structure:
      - speed_determines_order: "Fastest acts first"
      - action_types: ["Attack", "Defend", "Special", "Item"]
      - timing_elements: "Some abilities require timing"
    
    type_effectiveness:
      - damage_multipliers: "1.5x advantage, 0.75x disadvantage"
      - visual_feedback: "Clear indicators for children"
      - learning_opportunity: "Educational about animal traits"
    
    special_abilities:
      - species_unique: "Each type has signature moves"
      - unlockable: "Progress-gated abilities"
      - cool_downs: "Strategic resource management"

# PROGRESIÓN Y ACHIEVEMENTS
progression_system:
  player_level:
    - experience_sources: "Care activities, battles, discoveries"
    - unlocks: "New species, areas, equipment"
    - progression_curve: "Steady advancement appropriate for age"
  
  animal_progression:
    - individual_levels: "Each animal grows independently"
    - stat_customization: "Focus on preferred attributes"
    - personality_development: "Unique traits emerge over time"
  
  collection_aspects:
    - species_discovery: "Unlock new animal types"
    - variant_collection: "Different breeds within species"
    - achievement_hunting: "Goals appropriate for children"

# INTERFAZ Y EXPERIENCIA
ui_ux_design:
  visual_style:
    - art_direction: "Colorful, friendly, cartoon-style"
    - animation_priority: "Smooth, delightful micro-interactions"
    - accessibility: "Large buttons, clear text, audio cues"
  
  navigation:
    - simple_structure: "Max 3 clicks to any feature"
    - visual_navigation: "Icon-based with text labels"
    - bread_crumbs: "Always clear where you are"
  
  feedback_systems:
    - immediate_response: "Every action has clear feedback"
    - positive_reinforcement: "Celebrations for achievements"
    - gentle_guidance: "Helpful hints without hand-holding"

# EDUCACIÓN INTEGRADA
educational_elements:
  animal_facts:
    - real_world_info: "Learn about actual animal behavior"
    - habitat_information: "Where animals live naturally"
    - conservation_awareness: "Protecting real animals"
  
  responsibility_lessons:
    - consequence_teaching: "Neglect affects pet health"
    - routine_importance: "Regular care schedules"
    - empathy_development: "Understanding animal needs"
  
  strategic_thinking:
    - pattern_recognition: "Type advantages/disadvantages"
    - resource_management: "Budgeting food and money"
    - planning_skills: "Long-term pet development"

# MONETIZACIÓN CHILD-FRIENDLY
monetization_ethical:
  philosophy: "Completely optional enhancements"
  
  parental_controls:
    - purchase_approval: "All purchases require parent ok"
    - spending_limits: "Set monthly limits"
    - transparency: "Clear explanation of what purchases do"
  
  premium_content:
    - cosmetic_only: "Special outfits, house decorations"
    - convenience: "Faster food generation, not better"
    - educational: "Extra animal facts, care tips"
  
  free_experience:
    - complete_game: "All core features available"
    - no_energy_gates: "No artificial play time limits"
    - fair_progression: "Premium doesn't create unfair advantage"

# SAFETY & MODERATION
child_safety:
  content_filtering:
    - age_appropriate: "All content suitable for 5+"
    - positive_messaging: "Encourages kindness and care"
    - no_violence: "Combat is playful, never graphic"
  
  data_protection:
    - minimal_data: "Only necessary information collected"
    - coppa_compliance: "Full children's privacy protection"
    - parental_dashboard: "Parents can monitor activity"
  
  community_features:
    - no_chat: "No direct communication between players"
    - sharing_controls: "Limited, curated sharing options"
    - report_system: "Easy reporting of any issues"
```