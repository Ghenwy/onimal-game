# Análisis del repositorio Onimal

## Juegos de referencia
- **Tamagotchi**: pionero de las mascotas virtuales. Útil para inspirar mecánicas de cuidado y degradación de necesidades con timers.
- **Pokémon**: evoluciones por niveles y combate por turnos que pueden servir de modelo para el sistema planificado.
- **Ogame**: gestión de recursos y temporizadores largos para acciones estratégicas.
- **Neopets**: economía interna, minijuegos y eventos diarios que incentivan el regreso del jugador.
- **Nintendogs**: interacción táctil y expresiones de las mascotas para mejorar la conexión emocional.
- **Animal Crossing: Pocket Camp**: diseño visual amable y tareas diarias sencillas.
- **My Talking Tom / Pou**: ejemplo de interfaz móvil simple con monetización responsable.

## Fallos detectados
- `updateNeeds` reinicia `lastCared` incluso cuando sólo se degradan las necesidades, lo que impide que la degradación continúe correctamente.
- `feedPet` y `playWithPet` permiten gastar monedas sin validar saldo; simplemente recortan a 0.
- Inconsistencia de etapas: los tests usan `anciano` mientras los tipos definen `veterano`.
- Discrepancia en animaciones: los tests contemplan `happy` pero el tipo también incluye `sad`, generando divergencia entre definición y pruebas.
- `main.ts` carece de salto de línea final y no maneja la ausencia del elemento `#app`.
- `Pet.svelte` sólo responde a la tecla Enter y omite la barra espaciadora, limitando la accesibilidad del botón.
- `Pet.svelte` usa emojis como sprites, lo que puede producir inconsistencias visuales entre plataformas.
- `App.svelte` permite crear mascotas de prueba sin validar monedas ni duplicados, saturando el estado de juego.
- `gameState` no captura errores de `localStorage`, fallando en entornos con almacenamiento restringido.
- El repositorio mantiene una versión standalone y otra basada en Svelte, lo que puede generar divergencias de funcionalidad con el tiempo.

## 15 mejoras imprescindibles
1. Implementar un sistema de degradación de necesidades por intervalos que no sobrescriba `lastCared` automáticamente.
2. Validar el saldo de monedas antes de alimentar o jugar con una mascota.
3. Unificar la nomenclatura de etapas y animaciones entre tipos y pruebas.
4. Añadir soporte de teclado completo (incluyendo barra espaciadora) y atributos ARIA en componentes interactivos.
5. Sustituir emojis por sprites gráficos consistentes y optimizados.
6. Migrar componentes y stores a TypeScript para mayor seguridad.
7. Manejar errores al acceder a `localStorage` y ofrecer mensajes útiles al usuario.
8. Incorporar un linter/formatter para asegurar estilo consistente y archivos con salto final.
9. Centralizar la lógica de creación de mascotas con validación de costos y duplicados.
10. Refactorizar `petStore` para separar lógica de temporizadores y acciones del jugador.
11. Integrar un sistema de temporizadores estilo OGame que funcione aun con la app cerrada.
12. Añadir internacionalización para soportar múltiples idiomas.
13. Implementar pruebas de interacción con `@testing-library/svelte` para cubrir la UI.
14. Convertir el proyecto en una PWA con modo offline y posible sincronización en la nube.
15. Unificar o automatizar la generación de la versión standalone para evitar divergencias con el proyecto principal.
