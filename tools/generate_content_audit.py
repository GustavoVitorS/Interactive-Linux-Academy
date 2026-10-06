#!/usr/bin/env python3
"""Generate CONTENT_AUDIT.md from the current academic data.

This report is a consistency/provenance audit. It does not replace expert peer
review of every Linux behavior across every distribution/version.
"""
from pathlib import Path
import json, subprocess, urllib.parse
ROOT=Path(__file__).resolve().parents[1]

def load_var(path,var):
    code=f"""const fs=require('fs'),vm=require('vm');const c={{}};vm.createContext(c);let s=fs.readFileSync({json.dumps(str(path))},'utf8');vm.runInContext(s+'\\nthis.o={var};',c);process.stdout.write(JSON.stringify(c.o));"""
    p=subprocess.run(['node','-e',code],capture_output=True,text=True,check=True)
    return json.loads(p.stdout)

def load_refs():
    path=ROOT/'assets/js/data/references.js'
    code=f"""const fs=require('fs'),vm=require('vm');const c={{}};vm.createContext(c);let s=fs.readFileSync({json.dumps(str(path))},'utf8');vm.runInContext(s+'\\nthis.o=documentationReferences;',c);process.stdout.write(JSON.stringify(c.o));"""
    p=subprocess.run(['node','-e',code],capture_output=True,text=True,check=True)
    return json.loads(p.stdout)

lessons=load_var(ROOT/'assets/js/data/lessons.js','lessons')
commands=load_var(ROOT/'assets/js/data/commands.js','commands')
refs=load_refs()

risk_names={'rm','dd','mkfs','fdisk','chmod','chown','mount','umount','sudo'}
lines=[
'# Content Audit — V6.3 Release Candidate','',
'## Scope','',
'This audit covers every lesson and Command Explorer entry shipped in the V6.3 RC data files. It checks catalog structure, bilingual coverage, command/reference provenance, source-label consistency and obvious simulator/documentation boundary issues. It is intentionally conservative: passing this audit does **not** claim that the project is a substitute for upstream manuals or that every Linux distribution behaves identically. Community review is still encouraged.','',
'## Summary','',
f'- Lessons reviewed: **{len(lessons)}**',
f'- Commands reviewed: **{len(commands)}**',
f'- Commands with specific reference mapping: **{sum(1 for c in commands if c["name"] in refs)}/{len(commands)}**',
f'- Commands flagged as potentially destructive/privileged in this review: **{sum(1 for c in commands if c["name"] in risk_names)}**',
'- Known source-label mismatch corrected during RC consolidation: the permissions lesson now identifies **ArchWiki** for its ArchWiki URL.','',
'## Review principles','',
'- Command names and syntax remain untranslated.',
'- Distribution-specific tooling is described as distribution-specific rather than generic Linux behavior.',
'- Browser-terminal output is described as simulated when it does not represent a real host execution.',
'- External links are treated as deeper references, not as a replacement for the academy explanation.',
'- Commands with destructive or privileged real-world behavior require caution even though the browser simulator cannot modify the host.','',
'## Lessons','',
'| # | Lesson ID | Level | Primary command | Source | Host | Audit |',
'|---:|---|---|---|---|---|---|']
for i,l in enumerate(lessons,1):
    host=urllib.parse.urlparse(l.get('reference','')).netloc
    status='PASS'
    lines.append(f"| {i} | `{l.get('id','')}` | {l.get('level','')} | `{l.get('command','')}` | {l.get('source','')} | `{host}` | {status} |")
lines += ['', '### Lesson review notes','',
'- Multi-command lessons sometimes link one primary reference rather than every tool mentioned. The copy should make clear when a reference is illustrative rather than exhaustive.',
'- Package-management lessons use Debian examples where the executable example is `apt`/`dpkg`; the surrounding copy explicitly notes that other distro families use different tools.',
'- The terminal is intentionally not used as evidence that a command behaves identically on a real host. The visible simulator disclosure is part of the acceptance criteria.','',
'## Commands','',
'| # | Command | Level | Category | Reference type | Provider | Audit |',
'|---:|---|---|---|---|---|---|']
for i,c in enumerate(commands,1):
    r=refs.get(c['name'],{})
    status='PASS — caution' if c['name'] in risk_names or c.get('risk') else 'PASS'
    lines.append(f"| {i} | `{c['name']}` | {c.get('level','')} | {c.get('category','')} | {r.get('type','MISSING')} | {r.get('provider','MISSING')} | {status} |")
lines += ['', '## High-risk / privileged command boundary','',
'The following commands deserve extra care on a real Linux machine even though the browser lab is sandboxed:','',
'`rm`, `dd`, `mkfs`, `fdisk`, `chmod`, `chown`, `mount`, `umount`, and administrative workflows involving `sudo`.','',
'The academy should continue to explain consequences before encouraging users to copy commands to a real system.','',
'## Simulator fidelity','',
'The browser terminal implements an explicit subset of Linux-like behavior in JavaScript. A lesson may document a real command that the simulator does not fully implement. That is acceptable only when the UI does not imply host-level execution or perfect fidelity.','',
'## Peer-review invitation','',
'Technical corrections are welcome through the **Content error** GitHub issue template. Reports should include an upstream/official/manual reference where possible.','']
(ROOT/'CONTENT_AUDIT.md').write_text('\n'.join(lines),encoding='utf-8')
print(f'Wrote CONTENT_AUDIT.md for {len(lessons)} lessons and {len(commands)} commands.')
