# Changelog

## V6.3.0-rc.1 — Release Candidate / Codebase Consolidation

### Architecture
- Grouped deployable CSS, JavaScript, icons and preview media under `assets/` to keep the repository root clean.
- Consolidated five historical CSS layers into `tokens.css`, `base.css`, `layout.css`, `components.css`, `themes.css` and `responsive.css`.
- Reorganized maintainable JavaScript into `assets/js/core`, `assets/js/features` and `assets/js/data`.
- Removed production `v5.js`, `v6.js`, `v6.1.js` and `v6.2.js` version layers.
- Added explicit `tools/build_order.txt` and `build_bundle.py --check`.
- Preserved `assets/js/bundle.js` as a generated GitHub Pages/file-compatible artifact.

### Quality and validation
- Added `tools/validate_project.py`.
- Added deterministic GitHub Actions validation.
- Added `VALIDATION_REPORT.md` and `QA_REPORT.md`.
- Tested responsive layouts from 320px through 2560px with zero page-level horizontal overflow and zero learning-map node overlaps in the browser harness.
- Syntax-checked all maintainable JavaScript and the generated bundle.

### Content and documentation
- Added `CONTENT_AUDIT.md` covering all 65 lessons and 58 commands.
- Corrected the permissions lesson source label to match its ArchWiki reference.
- Preserved 58/58 command-specific reference coverage and the no-generic-fallback policy.

### Security and transparency
- Added a visible Terminal Lab notice explaining the simulator boundary.
- Removed avoidable `innerHTML` / `insertAdjacentHTML` usage from maintainable JavaScript.
- Added DOM helpers for safe author-controlled rich text and SVG construction.
- Added a Content Security Policy for the static deployment.
- Added `SECURITY.md`.

### Open-source readiness
- Added `ARCHITECTURE.md`, `CONTRIBUTING.md` and `CODE_OF_CONDUCT.md`.
- Added bug, content-error and feature-request issue templates plus a pull-request checklist.
- Preserved the V6.2.5 visual identity instead of introducing another redesign.

## V6.2.5 — Footer Author Identity

- Replaced the previous “Built with / HTML • CSS • Vanilla JS” footer block with **Gustavo Vitor**.
- Added an inline GitHub SVG icon beside the author name.
- The author link opens `https://github.com/GustavoVitorS` in a new tab with `noopener noreferrer`.
- Added keyboard focus, hover, Light Mode and mobile styling without changing the existing source-code link.

## V6.2.4 — Resilient GNU Documentation Routing

- Reproduced direct `www.gnu.org` documentation timeouts independently of the application.
- Removed direct GNU documentation URLs from runtime UI sources.
- Routed GNU Coreutils, Bash, grep, Findutils, tar, sed, gawk and Wget references to exact command/manual pages on `man7.org`.
- Reclassified mirrored GNU links as **Manual page / Página de manual** instead of **Official documentation**.
- Updated lesson references and Documentation cards so they no longer send users to `www.gnu.org`.
- Updated the terminal's Bash reference to the mirrored Bash manual page.
- Regenerated `REFERENCE_AUDIT.md` with the resilient routing policy.
- Extended `tools/check_references.py --offline` to fail if direct GNU runtime links are accidentally reintroduced.
- Preserved all V6.2.3 visual, academic, theme-toggle and accessibility behavior.

## V6.2.3 — Theme Toggle Icon Refinement

- Replaced the CSS-drawn theme glyphs with crisp inline SVG icons.
- Dark theme now shows a recognizable sun with a center disc and eight rays.
- Light theme now shows a clean crescent moon.
- Improved geometric centering, hover/focus feedback and mobile sizing.
- Theme button title and aria-label now update with the active language.
- Preserved reduced-motion behavior and the existing V6.2 academic UI.


## V6.2 — Documentation Integrity & UI Consistency

### Documentation
- Removed the generic man7 homepage fallback from Command Explorer.
- Added a centralized `js/data/references.js` registry covering all 58 commands.
- Added source-aware labels for official documentation vs. manual pages.
- Added provider metadata to command cards.
- Added safe external-link attributes and accessible labels.
- Added `tools/check_references.py` and `REFERENCE_AUDIT.md`.

### Light Mode
- Fixed the unreadable filesystem directory detail/placeholder panel.
- Strengthened distro-specific hover/focus colors while preserving readable text.
- Preserved V6.1 progress-ring, Windows → Linux and typography fixes.

### i18n
- Fixed the academic dashboard resume action in PT-BR: `Continuar de onde parei`.
- Documentation labels and source metadata update live when switching languages.
- Comparator accessible labels update between PT-BR and EN.

### Distro comparator
- Defaults are now Debian, Fedora and Arch Linux.
- Duplicate distributions are disabled across the three selectors.
- Selector values and rendered comparison content use the same `comparisonSelection` state.
- Invalid/duplicate persisted state is sanitized during load and migration.

### Architecture
- Added V6.2 CSS/JS layers without removing the approved V6.1 design.
- Rebuilt `js/bundle.js` from source files.

## V6.2.1 — Learning Map visual consistency

- Fixed Light Mode contrast for the **Personalize my route / Personalizar minha trilha** button.
- Standardized every learning-map status indicator to the same green dot used by the previously highlighted nodes.
- Preserved the existing map interactions, visited state logic, bilingual UI, and V6.2 functionality.

## V6.2.2 — Learning Map Border Consistency
- Standardized all eight learning-map node borders to the same green visual language.
- Kept all status dots green.
- Added consistent green hover/focus treatment in Dark and Light themes.
- No progress logic or navigation behavior was changed.
