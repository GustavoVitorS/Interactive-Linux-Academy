#!/usr/bin/env python3
"""Validate V6.3 RC command reference URLs during development.

No runtime dependency: this script is not used by the GitHub Pages site.
It verifies registry coverage locally and, unless --offline is supplied,
performs HTTP requests with urllib to detect obvious broken destinations.
"""
from __future__ import annotations
import argparse, re, sys, urllib.request, urllib.error
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
COMMANDS=ROOT/'assets/js/data/commands.js'
REFS=ROOT/'assets/js/data/references.js'
GENERIC='https://man7.org/linux/man-pages/'

names=re.findall(r"\{name:'([^']+)'",COMMANDS.read_text(encoding='utf-8'))
text=REFS.read_text(encoding='utf-8')
refs={m.group(1):{'provider':m.group(2),'type':m.group(3),'url':m.group(4)} for m in re.finditer(r"^\s{2}([a-zA-Z0-9_]+):\{provider:'([^']+)',type:'([^']+)',url:'([^']+)'\}",text,re.M)}

parser=argparse.ArgumentParser()
parser.add_argument('--offline',action='store_true',help='Only check coverage/URL structure.')
parser.add_argument('--timeout',type=float,default=10)
args=parser.parse_args()

missing=[name for name in names if name not in refs]
generic=[name for name in names if refs.get(name,{}).get('url')==GENERIC]

# V6.3 RC resilience guard: direct GNU documentation endpoints were observed
# timing out during regression testing. Keep runtime documentation on exact
# mirrored manual pages until the upstream route is intentionally restored.
active_sources=[ROOT/'index.html', ROOT/'assets/js/data/references.js', ROOT/'assets/js/data/lessons.js', ROOT/'assets/js/features/terminal.js']
gnu_direct=[]
for source in active_sources:
    if source.exists() and re.search(r'https?://(?:www\.)?gnu\.org', source.read_text(encoding='utf-8')):
        gnu_direct.append(str(source.relative_to(ROOT)))
print(f'Commands: {len(names)}')
print(f'Specific references: {len(names)-len(missing)}')
print(f'Missing: {len(missing)}')
print(f'Generic man7 fallbacks: {len(generic)}')
print(f'Direct GNU runtime URLs: {len(gnu_direct)}')
if missing: print('Missing:',', '.join(missing))
if generic: print('Generic:',', '.join(generic))
if gnu_direct: print('Direct GNU URLs in:', ', '.join(gnu_direct))

failures=[]
if not args.offline:
    for name in names:
        ref=refs.get(name)
        if not ref: continue
        req=urllib.request.Request(ref['url'],headers={'User-Agent':'Interactive-Linux-Academy-reference-check/6.3-rc'})
        try:
            with urllib.request.urlopen(req,timeout=args.timeout) as response:
                code=getattr(response,'status',200)
                final=response.geturl()
                print(f'OK {code:3} {name:10} {ref["provider"]} -> {final}')
                if code>=400: failures.append((name,code,final))
        except Exception as exc:
            failures.append((name,'ERR',str(exc)))
            print(f'ERR     {name:10} {exc}')

if missing or generic or gnu_direct or failures:
    if failures: print(f'Network failures: {len(failures)}')
    sys.exit(1)
print('Reference registry passed.')
