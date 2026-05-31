# brielos.com — Marketing UI Kit (self-contained bundle)

Open `index.html` in any browser — no server, no build step, no external CSS.

## Files

- `index.html` — entry point; loads React + Babel from CDN and the JSX files
- `styles.css` — design-system tokens **+** UI-kit styles, inlined into one file
- `Header.jsx` — sticky vellum header (exports `Header`)
- `Hero.jsx` — editorial hero (exports `Hero`)
- `ArkeCard.jsx` — deployment card + line glyphs (exports `ArkeCard`, `ArkeGlyph`)
- `Sections.jsx` — exports four components to window:
    - `PhilosophyLaws` · Three Laws of Structural Integrity
    - `MethodologyGrid` · Clear Signal Design™ method
    - `CTABlock` · diagnostic CTA
    - `Footer` · mono rubric
- `App.jsx` — page router; mounts to `#root`

## Notes

- All CSS variables (`--vellum`, `--obsidian-ink`, `--rule`, `--ether-gold`, …) are defined at the top of `styles.css`.
- Components share scope via `window.X = X` exports (required when loading multiple Babel files).
- Network is needed once to fetch React + Babel from unpkg. Otherwise fully offline.
