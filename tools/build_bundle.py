#!/usr/bin/env python3
"""Build the classic browser bundle used by GitHub Pages and file://.

The source files under js/ are the maintainable source of truth.
No third-party Python packages are required.
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ORDER = [
    "js/runtime.js",
    "js/data/lessons.js",
    "js/data/commands.js",
    "js/data/distros.js",
    "js/i18n.js",
    "js/tux.js",
    "js/mindmap.js",
    "js/terminal.js",
    "js/course.js",
    "js/commands.js",
    "js/distros.js",
    "js/search.js",
    "js/quiz.js",
    "js/app.js",
    "js/v5.js",
]

parts = ["(()=>{", "'use strict';"]
for rel in ORDER:
    path = ROOT / rel
    if not path.exists():
        raise SystemExit(f"Missing source file: {rel}")
    parts.append(f"\n/* --- {rel} --- */\n")
    parts.append(path.read_text(encoding="utf-8").rstrip())
parts.append("\n})();\n")

out = ROOT / "js/bundle.js"
out.write_text("\n".join(parts), encoding="utf-8")
print(f"Built {out.relative_to(ROOT)} from {len(ORDER)} source files.")
