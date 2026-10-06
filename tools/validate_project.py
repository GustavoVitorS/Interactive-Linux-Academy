#!/usr/bin/env python3
"""Offline structural/content validation for Interactive Linux Academy V6.3 RC.

The validator intentionally avoids network access so pull requests stay deterministic.
Use check_references.py separately when you explicitly want HTTP validation.
"""
from __future__ import annotations
from pathlib import Path
from html.parser import HTMLParser
import json, re, subprocess, sys

ROOT=Path(__file__).resolve().parents[1]
ERRORS=[]; WARNINGS=[]; CHECKS=[]

def ok(label,detail=''):
    CHECKS.append((label,detail))
def fail(msg): ERRORS.append(msg)
def warn(msg): WARNINGS.append(msg)

def load_var(path:Path,var:str):
    script=f"""const fs=require('fs'),vm=require('vm');const c={{}};vm.createContext(c);let s=fs.readFileSync({json.dumps(str(path))},'utf8');vm.runInContext(s+'\\nthis.__out={var};',c);process.stdout.write(JSON.stringify(c.__out));"""
    cp=subprocess.run(['node','-e',script],capture_output=True,text=True)
    if cp.returncode: raise RuntimeError(cp.stderr)
    return json.loads(cp.stdout)

def load_refs(path:Path):
    script=f"""const fs=require('fs'),vm=require('vm');const c={{}};vm.createContext(c);let s=fs.readFileSync({json.dumps(str(path))},'utf8');vm.runInContext(s+'\\nthis.__out={{commands:documentationReferences,topics:topicDocumentationReferences}};',c);process.stdout.write(JSON.stringify(c.__out));"""
    cp=subprocess.run(['node','-e',script],capture_output=True,text=True)
    if cp.returncode: raise RuntimeError(cp.stderr)
    return json.loads(cp.stdout)

class Inspector(HTMLParser):
    def __init__(self): super().__init__(); self.ids=[]; self.local=[]; self.blank=[]; self.attrs=[]
    def handle_starttag(self,tag,attrs):
        d=dict(attrs); self.attrs.append((tag,d))
        if 'id' in d:self.ids.append(d['id'])
        for key in ('src','href'):
            v=d.get(key,'')
            if v and not (v.startswith(('http://','https://','#','mailto:','tel:','data:','javascript:'))): self.local.append((tag,key,v))
        if tag=='a' and d.get('target')=='_blank':self.blank.append(d)

html=(ROOT/'index.html').read_text(encoding='utf-8')
parser=Inspector(); parser.feed(html)
# HTML IDs
seen=set(); duplicates=[]
for i in parser.ids:
    if i in seen: duplicates.append(i)
    seen.add(i)
if duplicates: fail('Duplicate HTML ids: '+', '.join(sorted(set(duplicates))))
else: ok('HTML ids',f'{len(parser.ids)} unique ids')
# Local assets
missing=[]
for tag,key,v in parser.local:
    clean=v.split('?',1)[0].split('#',1)[0]
    if clean and not (ROOT/clean).exists(): missing.append(v)
if missing: fail('Missing local assets: '+', '.join(sorted(set(missing))))
else: ok('Local assets',f'{len(parser.local)} references resolved')
# Asset directory architecture
required_asset_dirs=[ROOT/'assets/css',ROOT/'assets/js',ROOT/'assets/images/previews',ROOT/'assets/icons']
missing_dirs=[str(d.relative_to(ROOT)) for d in required_asset_dirs if not d.is_dir()]
if missing_dirs: fail('Missing organized asset directories: '+', '.join(missing_dirs))
else: ok('Asset architecture','CSS, JavaScript, icons and README previews are grouped under assets/')
if (ROOT/'css').exists() or (ROOT/'js').exists(): fail('Root-level css/ or js/ directory remains after assets consolidation')
# External blank safety
bad_blank=[d.get('href','') for d in parser.blank if 'noopener' not in d.get('rel','') or 'noreferrer' not in d.get('rel','')]
if bad_blank: fail('target=_blank missing noopener/noreferrer: '+', '.join(bad_blank))
else: ok('External link safety',f'{len(parser.blank)} target=_blank links protected')
# CSS architecture
expected_css=['assets/css/tokens.css','assets/css/base.css','assets/css/layout.css','assets/css/components.css','assets/css/themes.css','assets/css/responsive.css']
linked=[d.get('href') for tag,d in parser.attrs if tag=='link' and d.get('rel')=='stylesheet' and d.get('href','').startswith('assets/css/')]
if linked!=expected_css: fail(f'CSS link order differs. Expected {expected_css}, got {linked}')
else: ok('CSS architecture','6 consolidated stylesheets loaded in documented order')
legacy_css=['css/style.css','css/v5.css','css/v6.css','css/v6.1.css','css/v6.2.css','assets/css/style.css','assets/css/v5.css','assets/css/v6.css','assets/css/v6.1.css','assets/css/v6.2.css']
for rel in legacy_css:
    if (ROOT/rel).exists(): fail(f'Legacy CSS still present: {rel}')
legacy_js=['js/v5.js','js/v6.js','js/v6.1.js','js/v6.2.js','assets/js/v5.js','assets/js/v6.js','assets/js/v6.1.js','assets/js/v6.2.js','assets/js/runtime.js','assets/js/i18n.js','assets/js/app.js','assets/js/terminal.js','assets/js/course.js','assets/js/commands.js','assets/js/distros.js','assets/js/search.js','assets/js/quiz.js','assets/js/tux.js','assets/js/mindmap.js']
for rel in legacy_js:
    if (ROOT/rel).exists(): fail(f'Legacy JS source still present: {rel}')
# CSP + terminal disclosure
if 'Content-Security-Policy' not in html: fail('Content Security Policy meta tag missing')
else: ok('CSP','meta policy present')
if 'terminalSimulationTitle' not in html: fail('Visible terminal simulation disclosure missing')
else: ok('Terminal disclosure','visible simulated-environment notice present')

lessons=load_var(ROOT/'assets/js/data/lessons.js','lessons')
commands=load_var(ROOT/'assets/js/data/commands.js','commands')
distros=load_var(ROOT/'assets/js/data/distros.js','distros')
refs=load_refs(ROOT/'assets/js/data/references.js')
# Commands
names=[c.get('name') for c in commands]
if len(set(names))!=len(names): fail('Duplicate command names detected')
missing_ref=[n for n in names if n not in refs['commands']]
if missing_ref: fail('Commands missing references: '+', '.join(missing_ref))
generic=[n for n,r in refs['commands'].items() if r.get('url')=='https://man7.org/linux/man-pages/']
if generic: fail('Generic man7 command fallbacks: '+', '.join(generic))
for c in commands:
    for lang in ('en','pt'):
        if not c.get('description',{}).get(lang): fail(f"Command {c.get('name')} missing {lang} description")
    for key in ('syntax','example','category','level'):
        if not c.get(key): fail(f"Command {c.get('name')} missing {key}")
for n,r in refs['commands'].items():
    if not str(r.get('url','')).startswith('https://'): fail(f'Reference for {n} is not HTTPS')
    if r.get('type') not in ('official','manual','upstream'): fail(f'Unknown reference type for {n}: {r.get("type")}')
ok('Command catalog',f'{len(commands)} unique commands; {len(missing_ref)} missing references; {len(generic)} generic fallbacks')
# Lessons
ids=[l.get('id') for l in lessons]
if len(set(ids))!=len(ids): fail('Duplicate lesson ids detected')
valid_levels={'beginner','intermediate','advanced'}
source_domain_rules=[
 ('ArchWiki','archlinux.org'),('GNU Bash','man7.org'),('GNU Coreutils','man7.org'),('GNU grep','man7.org'),('GNU Findutils','man7.org'),('GNU sed','man7.org'),('GNU gawk','man7.org'),
 ('systemd','freedesktop.org'),('Debian','debian.org'),('OpenSSH','openbsd.org'),('curl','curl.se'),('Podman','podman.io'),('Git','git-scm.com'),('Kernel','kernel.org'),('Filesystem Hierarchy','linuxfoundation.org'),('nftables','nftables.org'),('sudo','sudo.ws')]
for l in lessons:
    lid=l.get('id','?')
    if l.get('level') not in valid_levels: fail(f'Lesson {lid} invalid level: {l.get("level")}')
    for field in ('title','description','output'):
        obj=l.get(field,{})
        for lang in ('en','pt'):
            if not isinstance(obj,dict) or not obj.get(lang): fail(f'Lesson {lid} missing {field}.{lang}')
    for field in ('command','reference','source'):
        if not l.get(field): fail(f'Lesson {lid} missing {field}')
    if l.get('reference') and not l['reference'].startswith('https://'): fail(f'Lesson {lid} reference is not HTTPS')
    src=l.get('source',''); url=l.get('reference','')
    for marker,domain in source_domain_rules:
        if marker.lower() in src.lower() and domain not in url:
            fail(f'Lesson {lid} source/url mismatch: {src} -> {url}')
ok('Lesson catalog',f'{len(lessons)} unique bilingual lessons with source/reference fields')
# Distros
dids=[d.get('id') for d in distros]
if len(set(dids))!=len(dids): fail('Duplicate distro ids detected')
for d in distros:
    did=d.get('id','?')
    if not str(d.get('website','')).startswith('https://'): fail(f'Distro {did} website is not HTTPS')
    for field in ('release','difficulty','summary','description','goodFor'):
        obj=d.get(field,{})
        for lang in ('en','pt'):
            if not isinstance(obj,dict) or not obj.get(lang): fail(f'Distro {did} missing {field}.{lang}')
ok('Distro catalog',f'{len(distros)} unique bilingual distribution profiles')
# i18n coverage from HTML
files={'i18n':(ROOT/'assets/js/core/i18n.js').read_text(),'v5':(ROOT/'assets/js/core/product-i18n.js').read_text(),'v6':(ROOT/'assets/js/core/release-i18n.js').read_text()}
attrs=[('data-i18n','i18n'),('data-i18n-html','i18n'),('data-i18n-placeholder','i18n'),('data-v5-i18n','v5'),('data-v5-i18n-html','v5'),('data-v5-i18n-placeholder','v5'),('data-v6-i18n','v6')]
for attr,src in attrs:
    keys=set(re.findall(fr'{attr}="([^"]+)"',html))
    missing=[k for k in keys if not re.search(fr'\b{re.escape(k)}\s*:',files[src])]
    if missing: fail(f'{attr} keys missing in {src}: '+', '.join(sorted(missing)))
ok('i18n markup coverage','HTML translation keys found in their registries')
# Dangerous DOM sinks in maintainable source
maint=list((ROOT/'assets/js/core').glob('*.js'))+list((ROOT/'assets/js/features').glob('*.js'))
sinks=[]
for p in maint:
    text=p.read_text()
    if '.innerHTML' in text or 'insertAdjacentHTML' in text: sinks.append(str(p.relative_to(ROOT)))
if sinks: fail('Avoidable HTML injection sinks remain in: '+', '.join(sinks))
else: ok('DOM safety','no innerHTML/insertAdjacentHTML in maintainable JS')
# Build order contains no version layers
order=(ROOT/'tools/build_order.txt').read_text()
if re.search(r'assets/js/(?:v5|v6(?:\.1|\.2)?)\.js',order): fail('Version-layer JS remains in build order')
else: ok('JS architecture',f'{len([x for x in order.splitlines() if x.strip()])} responsibility-based source modules')

report=['# V6.3 RC Validation Report','',f'- Errors: **{len(ERRORS)}**',f'- Warnings: **{len(WARNINGS)}**',f'- Passed checks: **{len(CHECKS)}**','', '## Passed checks','']
for label,detail in CHECKS: report.append(f'- **{label}:** {detail}')
if WARNINGS:
    report+=['','## Warnings','']+[f'- {w}' for w in WARNINGS]
if ERRORS:
    report+=['','## Errors','']+[f'- {e}' for e in ERRORS]
(ROOT/'VALIDATION_REPORT.md').write_text('\n'.join(report)+'\n',encoding='utf-8')
print('\n'.join(report[:8]))
if ERRORS:
    for e in ERRORS: print('ERROR:',e,file=sys.stderr)
    raise SystemExit(1)
print('Validation passed.')
