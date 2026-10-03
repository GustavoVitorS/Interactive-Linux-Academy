# Changelog

## V5.0.0 — Editorial Product Redesign

### Design
- Rebuilt the visual system around a dark editorial Linux/GNOME-inspired product language.
- Added V5 color, typography, spacing, radius, surface and motion tokens.
- Reworked the hero, navigation, learning map, terminal, curriculum, distro area, docs and footer.
- Reduced repetitive generic-card and SaaS-template patterns.
- Added dedicated tablet and mobile compositions.

### Learning experience
- Added personalized first-visit learning routes.
- Rebuilt lessons as an editorial curriculum.
- Added Split Learn Mode.
- Added Command Inspector.
- Added progressive terminal missions.
- Added Quick Reference / cheat sheet.
- Added local achievement states and an expanded progress dashboard.

### Linux distributions
- Preserved the 10-distro explorer.
- Added distro comparison for up to three distributions.
- Added a goal-based distro finder.

### Documentation and search
- Added a documentation explorer with topic navigation and Try in Terminal actions.
- Expanded global Ctrl/Cmd + K search across lessons, commands, distros, docs, concepts and challenges.
- Added keyboard navigation for search results.

### Interaction
- Preserved Tux eye tracking, blink, wink, click and idle behavior.
- Added reactions to learning-map focus, challenge progress and unsupported terminal commands.
- Added semantic motion and reduced-motion support.

### Architecture
- Restored maintainable JavaScript source modules as the source of truth.
- Added `tools/build_bundle.py` to regenerate `js/bundle.js`.
- Preserved static GitHub Pages compatibility with no framework/backend requirement.

### QA
- Removed learning-map node collisions at target responsive widths.
- Removed document-level horizontal overflow at tested widths.
- Validated the JS source and generated bundle with Node syntax checks.
- Verified EN/PT-BR switching, terminal output, Command Inspector, global search, distro dialog and personalized-route highlighting in browser automation.
