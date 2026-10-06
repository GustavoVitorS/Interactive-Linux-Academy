# Security Policy

Interactive Linux Academy is a static educational website. The Terminal Lab is intentionally simulated and must never gain access to a visitor's real shell or filesystem.

## Security model

The project should not:

- execute arbitrary user-provided JavaScript;
- use `eval()` or `new Function()`;
- execute host commands;
- store credentials or API keys in the repository;
- request unnecessary browser permissions;
- send learning progress to remote analytics services.

Progress is stored locally with `localStorage`.

## Reporting a vulnerability

Please avoid publishing exploitable details in a public bug report before the maintainer can review them. Prefer GitHub's private vulnerability reporting / Security Advisory flow for this repository when available.

For ordinary non-sensitive security hardening suggestions, a normal issue or pull request is welcome.

## Supported version

The current V6.3 release candidate and the latest published stable release are the versions intended to receive security fixes.

## Dependency surface

There is no npm runtime dependency tree. Optional visual resources may be loaded from approved external font/icon CDNs; core application logic is self-hosted.
