# AGENTS.md

## Design System Rules

- UI colors must use design-system tokens.
- In Android Compose, define UI colors in `AppColors` and consume them from that object.
- Do not use `Color(0xFF...)` directly inside Composables.
- In the web app, use `--dojeon-color-*` CSS variables from `src/index.css` instead of hard-coded UI color values.
- Preserve existing package, function, and Theme structure unless a task explicitly requires changing it.
