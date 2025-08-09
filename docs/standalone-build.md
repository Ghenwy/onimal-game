# Standalone Build

This project can generate a single HTML file of the game from the Svelte source.

## Generate

```bash
cd onimal-game
npm install
npm run build:standalone
```

The command produces `onimal-standalone.html` in the repository root with all CSS and JavaScript inlined.

## Why

The standalone file is derived automatically to avoid divergences between the Svelte components and the distributed HTML. Previous manually maintained files (`onimal-standalone.html`, `onimal-standalone-fixed.html`) have been removed.

Regenerate the standalone file whenever the game code changes.
