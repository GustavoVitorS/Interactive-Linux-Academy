# Architecture — Interactive Linux Academy V6.3 RC

V6.3 is a consolidation release. The visual product remains intentionally close to V6.2.5, while the maintainable source is reorganized so contributors no longer have to understand historical `v5.js`, `v6.js`, `v6.1.js`, `v6.2.js` or stacked version CSS files.

## Runtime model

The public site is a static application:

- HTML5
- CSS
- Vanilla JavaScript
- `localStorage`
- no backend
- no account system
- no database
- no runtime API requirement

`index.html` loads six CSS layers and one generated classic JavaScript bundle:

```text
assets/css/tokens.css
assets/css/base.css
assets/css/layout.css
assets/css/components.css
assets/css/themes.css
assets/css/responsive.css
assets/js/bundle.js
```

`assets/js/bundle.js` is generated. Do not maintain features by editing the bundle directly.

All deployable front-end assets are grouped under `assets/`: CSS in `assets/css/`, JavaScript in `assets/js/`, icons in `assets/icons/`, and README/release screenshots in `assets/images/previews/`. This keeps the repository root focused on project metadata, documentation and the application entry point.

## JavaScript source

```text
assets/js/
├── core/
│   ├── storage.js
│   ├── dom.js
│   ├── i18n.js
│   ├── product-i18n.js
│   ├── theme.js
│   ├── release-i18n.js
│   ├── app.js
│   ├── release.js
│   └── product-i18n-finalize.js
├── features/
│   ├── tux.js
│   ├── mindmap.js
│   ├── terminal.js
│   ├── course.js
│   ├── commands.js
│   ├── distros.js
│   ├── search.js
│   ├── quiz.js
│   ├── navigation.js
│   ├── onboarding.js
│   ├── progress.js
│   ├── terminal-tools.js
│   ├── distro-tools.js
│   ├── learning-tools.js
│   ├── achievements.js
│   ├── academic-dashboard.js
│   ├── curriculum.js
│   ├── academic-extensions.js
│   └── editorial-headings.js
├── data/
│   ├── lessons.js
│   ├── commands.js
│   ├── distros.js
│   └── references.js
└── bundle.js            # generated
```

The explicit build order is stored in `tools/build_order.txt` and used by `tools/build_bundle.py`.

## CSS source

- `assets/css/tokens.css`: shared custom properties and design tokens.
- `assets/css/base.css`: reset, document defaults, focus helpers and basic element rules.
- `assets/css/layout.css`: shells, sections and major page composition.
- `assets/css/components.css`: product components and their states.
- `assets/css/themes.css`: theme-specific Dark/Light overrides.
- `assets/css/responsive.css`: media/container queries.

The historical visual cascade was consolidated from the V6.2.5 source. `CSS_CONSOLIDATION_MAP.md` records the migration mapping.

## Data model

Academic content is data-driven.

### Lessons

`assets/js/data/lessons.js` contains bilingual lesson objects. A lesson must have a unique `id`, valid `level`, bilingual title/description/output, a real command/example, a source label and HTTPS reference.

### Commands

`assets/js/data/commands.js` contains the Command Explorer catalog. Command names and syntax are never translated.

### Documentation references

`assets/js/data/references.js` is the centralized provenance registry. Command cards should not invent URLs or fall back to a generic documentation homepage.

### Distros

`assets/js/data/distros.js` contains bilingual distribution profiles and official project sites.

## Event model

Features communicate through browser events rather than importing a framework state manager. Important examples include:

- `academy:language`
- `academy:lesson-progress`
- `academy:progress-reset`
- `academy:terminal-command`
- `academy:map-focus`
- `academy:split-lesson`
- `academy:quiz-complete`

This allows the static bundle to remain loosely coupled while preserving simple browser compatibility.

## Local persistence

Progress is local to the browser/device. Keys are namespaced with `linuxAcademy.*`. They may include language, theme, completed lessons, route choice, missions, quiz statistics, last lesson and comparison state.

No local progress is sent to a server.

## Terminal security boundary

The Terminal Lab is a JavaScript simulator with an in-memory virtual filesystem. It does **not**:

- execute a host shell;
- run a Linux kernel;
- access visitor files;
- perform real `sudo`, package installation or service management;
- establish SSH connections;
- evaluate arbitrary JavaScript.

Commands are implemented as explicit JavaScript handlers. User input is printed with `textContent`; maintainable source avoids `innerHTML`/`insertAdjacentHTML` sinks.

## Content Security Policy

The site includes a CSP suitable for the current static architecture. Runtime scripts are self-hosted. The policy still permits the existing font stylesheet and distro SVG CDN because those visual dependencies are intentionally retained in the RC to avoid a release-candidate redesign or redistribution changes.

The site must continue functioning if those optional visual resources fail: system-font fallbacks and text content remain available.

## Build

```bash
python3 tools/build_bundle.py
```

Check that the committed bundle matches source:

```bash
python3 tools/build_bundle.py --check
```

## Validation

```bash
python3 tools/validate_project.py
python3 tools/check_references.py --offline
node --check assets/js/bundle.js
```

CI runs the same deterministic checks on pushes and pull requests.
