# Changelog

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
