# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## App desktop (Electron)

L'app può essere eseguita come applicazione nativa per macOS e Windows.

| Comando | Cosa fa |
| --- | --- |
| `pnpm electron:dev` | Avvia Vite e apre l'app in Electron con hot reload |
| `pnpm electron:start` | Build in `dist-app/` e avvio dell'app senza installer |
| `pnpm electron:build:mac` | Crea i `.dmg` (Apple Silicon e Intel) in `release/` |
| `pnpm electron:build:win` | Crea l'installer `.exe` per Windows in `release/` |

Note:
- La build per Electron va in `dist-app/`, separata da `dist/` (usata per GitHub Pages).
- Le app non sono firmate: su macOS aprire la prima volta con tasto destro → Apri, su Windows confermare l'avviso di SmartScreen.
