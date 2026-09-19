#!/usr/bin/env python3
"""Build the browser-safe classic JS bundle used by GitHub Pages.
No external packages are required.
"""
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
ORDER = [
    'js/data/lessons.js', 'js/data/commands.js', 'js/data/distros.js',
    'js/i18n.js', 'js/tux.js', 'js/mindmap.js', 'js/terminal.js',
    'js/course.js', 'js/commands.js', 'js/distros.js', 'js/search.js',
    'js/quiz.js', 'js/app.js'
]
HEADER = """(()=>{\n'use strict';\nconst storage=(()=>{\n  const memory={};\n  const fallback={getItem:k=>Object.prototype.hasOwnProperty.call(memory,k)?memory[k]:null,setItem:(k,v)=>{memory[k]=String(v);},removeItem:k=>{delete memory[k];},clear:()=>{Object.keys(memory).forEach(k=>delete memory[k]);}};\n  try{const key='__linux_drawing_storage_test__';window.localStorage.setItem(key,'1');window.localStorage.removeItem(key);return window.localStorage;}catch{return fallback;}\n})();\n"""
parts = [HEADER]
for rel in ORDER:
    source = (ROOT / rel).read_text(encoding='utf-8')
    lines = []
    for line in source.splitlines():
        if line.lstrip().startswith('import '):
            continue
        line = (line.replace('export const ', 'const ')
                    .replace('export function ', 'function ')
                    .replace('export let ', 'let ')
                    .replace('export class ', 'class ')
                    .replace('localStorage', 'storage'))
        lines.append(line)
    parts.append(f'\n/* --- {rel} --- */\n' + '\n'.join(lines) + '\n')
parts.append('\n})();\n')
output = ROOT / 'js/bundle.js'
output.write_text(''.join(parts), encoding='utf-8')
print(f'Built {output.relative_to(ROOT)} ({output.stat().st_size} bytes)')
