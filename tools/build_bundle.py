#!/usr/bin/env python3
"""Build/check the classic browser bundle used by GitHub Pages and file://.

Maintainable source code lives under assets/js/core, assets/js/features and assets/js/data.
The generated assets/js/bundle.js is intentionally committed so GitHub Pages works
without Node, npm or a build service.
"""
from pathlib import Path
import argparse, sys

ROOT=Path(__file__).resolve().parents[1]
ORDER_FILE=ROOT/'tools/build_order.txt'
OUT=ROOT/'assets/js/bundle.js'

def order():
    entries=[]
    for raw in ORDER_FILE.read_text(encoding='utf-8').splitlines():
        rel=raw.strip()
        if rel and not rel.startswith('#'): entries.append(rel)
    return entries

def render():
    parts=["(()=>{", "'use strict';"]
    for rel in order():
        path=ROOT/rel
        if not path.exists(): raise SystemExit(f'Missing source file: {rel}')
        parts.append(f"\n/* --- {rel} --- */\n")
        parts.append(path.read_text(encoding='utf-8').rstrip())
    parts.append("\n})();\n")
    return "\n".join(parts)

def main():
    parser=argparse.ArgumentParser()
    parser.add_argument('--check',action='store_true',help='fail when bundle.js is stale instead of rewriting it')
    args=parser.parse_args()
    expected=render()
    if args.check:
        if not OUT.exists() or OUT.read_text(encoding='utf-8')!=expected:
            print('bundle.js is stale. Run: python3 tools/build_bundle.py',file=sys.stderr)
            return 1
        print(f'Bundle is current ({len(order())} source files).')
        return 0
    OUT.write_text(expected,encoding='utf-8')
    print(f'Built {OUT.relative_to(ROOT)} from {len(order())} source files.')
    return 0
if __name__=='__main__': raise SystemExit(main())
