# QA Report — Interactive Linux Academy V6.3 RC

Browser QA was executed with Chromium against an in-memory rendering of the final consolidated HTML/CSS/JS. This avoids the sandbox environment's administrator policy that blocks direct `localhost`/`file://` navigation while still executing the finished bundle and styles.

## Responsive matrix

| Viewport | Horizontal overflow | Learning-map node overlaps |
|---|---:|---:|
| 320x568 | 0 px | 0 |
| 360x800 | 0 px | 0 |
| 390x844 | 0 px | 0 |
| 412x968 | 0 px | 0 |
| 768x1024 | 0 px | 0 |
| 1032x1376 | 0 px | 0 |
| 1280x800 | 0 px | 0 |
| 1366x768 | 0 px | 0 |
| 1440x900 | 0 px | 0 |
| 1920x1080 | 0 px | 0 |
| 2560x1080 | 0 px | 0 |

## Functional smoke test

- Language switch: **EN->PT-BR**
- Theme switch: **dark->light**
- Terminal `pwd`: **PASS**
- Global search dialog: **PASS**
- Distro comparator distinct defaults: **PASS** (`debian / fedora / arch`)
- Quiz initial options rendered: **4**
- JavaScript console/page errors: **0**

## Static validation

- `python3 tools/validate_project.py`: PASS
- `python3 tools/check_references.py --offline`: PASS
- `python3 tools/build_bundle.py --check`: PASS
- `node --check` for maintainable JS and generated bundle: PASS

## Asset-route regression after repository cleanup

The RC asset layout was reorganized so deployable front-end files now live below `assets/`. Static route checks returned HTTP **200** for:

- `/`
- `/assets/css/tokens.css`
- `/assets/css/components.css`
- `/assets/js/bundle.js`
- `/assets/icons/favicon.svg`
- `/assets/images/previews/preview-v63-dark.png`

`tools/validate_project.py` also verifies that root-level `css/` and `js/` directories are absent, the six stylesheet links use the documented `assets/css/` order, and all local paths referenced by `index.html` resolve.
