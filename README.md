# Interactive Linux Academy V6.2 — Documentation Integrity & UI Consistency

Interactive Linux Academy is an open-source, browser-based Linux learning environment built with HTML, CSS and Vanilla JavaScript. V6.2 preserves the V6.1 Academic Edition while making documentation provenance, bilingual UI consistency and distribution comparison state more trustworthy.

## V6.2 highlights

- **58/58 Command Explorer entries have a specific documentation mapping.** There is no generic `man7.org/linux/man-pages/` fallback on command cards.
- Source-aware labels distinguish **Official documentation**, **Manual page** and provider/source metadata.
- Command references are centralized in `js/data/references.js`.
- GNU utilities route to GNU manuals, curl to the curl project, Git to Git documentation, Podman to Podman docs, Docker to Docker Docs, OpenSSH tools to OpenBSD/OpenSSH manuals, package managers to their appropriate upstream/distribution references, and util-linux/iproute2/procps tools to exact manual pages where appropriate.
- Added `tools/check_references.py` plus `REFERENCE_AUDIT.md` for development-time reference auditing.
- Fixed Light Mode readability in the filesystem directory explorer.
- Distro-specific hover/focus colors now remain visible in both Dark and Light themes.
- Fixed the PT-BR translation of **Continue where you stopped** → **Continuar de onde parei**.
- Distro comparison now uses one source of truth, defaults to Debian/Fedora/Arch Linux and prevents duplicate selections.
- Invalid legacy comparator state is sanitized on load.
- External documentation links open with `noopener noreferrer`.

## Documentation integrity policy

The project uses this priority order:

1. Official upstream project documentation.
2. Official distribution documentation.
3. Authoritative upstream manual pages.
4. Exact Linux/manual-page renderings when appropriate.
5. Reputable references only when no stronger primary source exists.

`man7.org` remains a useful technical reference, but V6.2 does **not** present it as the official documentation for unrelated commands. When a command points to a manual page, the UI says **Manual page / Página de manual** rather than universally saying **Official documentation**.

See [`REFERENCE_AUDIT.md`](REFERENCE_AUDIT.md) for the complete 58-command mapping.

## Safe terminal

The terminal is still a JavaScript simulation. It never executes commands on the visitor's machine, accesses the host filesystem, opens real SSH connections or evaluates arbitrary code.

## Build

The maintainable source lives in `js/`. Rebuild the classic GitHub Pages / `file://` bundle with:

```bash
python3 tools/build_bundle.py
```

Reference coverage can be checked offline with:

```bash
python3 tools/check_references.py --offline
```

On a networked development machine, omit `--offline` to test HTTP destinations.

## Run locally

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Evolution

- **V1** — CSS Tux drawing.
- **V4** — interactive Linux learning map and browser terminal.
- **V5** — editorial product redesign and integrated learning tools.
- **V6** — Academic Edition: deeper curriculum, progressive assessment, statistics, accessible theming and a full learning pipeline.
- **V6.1** — visual consistency, Light Mode refinements, editorial headings and infinite curriculum marquee.
- **V6.2** — documentation integrity, reference provenance, complete comparator state integrity, i18n cleanup and Light Mode distro/filesystem polish.

## License

MIT. See `LICENSE`.
