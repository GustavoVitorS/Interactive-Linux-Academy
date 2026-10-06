# Contributing

Thanks for helping improve Interactive Linux Academy. Contributions are especially welcome when they make Linux explanations more accurate, improve accessibility, fix simulator behavior, or make the codebase easier to maintain.

## Before opening a pull request

1. Fork/clone the repository.
2. Make changes in the maintainable files under `assets/js/core`, `assets/js/features`, `assets/js/data`, `assets/css/`, or `index.html`.
3. Do **not** edit only `assets/js/bundle.js`.
4. Rebuild the bundle:

```bash
python3 tools/build_bundle.py
```

5. Run the offline checks:

```bash
python3 tools/validate_project.py
python3 tools/check_references.py --offline
python3 tools/build_bundle.py --check
node --check assets/js/bundle.js
```

## Content contributions

When changing a Linux explanation:

- preserve command names/syntax exactly;
- distinguish distribution-specific behavior from generic Linux behavior;
- prefer upstream or authoritative documentation;
- use a precise page instead of a generic documentation homepage;
- keep PT-BR and English versions aligned;
- do not present simulated terminal behavior as a real Linux system result.

If a lesson is simplified for beginners, state the simplification rather than turning it into a universal claim.

## Reference policy

Preferred order:

1. upstream project documentation;
2. official distribution documentation;
3. authoritative upstream/manual page;
4. exact manual-page renderings;
5. reputable reference when no stronger source exists.

Command references are centralized in `assets/js/data/references.js`.

## UI contributions

V6.3 is a release candidate. Avoid redesigns in bug-fix pull requests. Preserve:

- Dark/Light readability;
- PT-BR/EN behavior;
- keyboard navigation;
- `prefers-reduced-motion`;
- mobile layouts;
- the approved V6 visual identity.

## Reporting a content error

Use the **Content error** issue template. Please include the exact lesson/command, what appears wrong, and an authoritative source supporting the correction.

## Generated files

`assets/js/bundle.js` is generated and committed for GitHub Pages/file compatibility. It should change when JavaScript source changes.
