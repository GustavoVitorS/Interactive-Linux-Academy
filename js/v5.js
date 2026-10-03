/* ==========================================================
   Interactive Linux Academy V5 enhancements
   Product UX, personalization, command inspection,
   distro tools, docs explorer, achievements and split mode.
   ========================================================== */

const v5Messages={
  en:{
    about:'About',searchLabel:'Search',heroOverline:'LEARN • PRACTICE • EVOLVE',heroLinux:'LINUX',heroInteractive:'INTERACTIVE',heroAcademy:'ACADEMY',
    heroLede:'From zero to advanced through an interactive, practical path. Explore the system, run commands and understand how Linux fits together.',
    exploreMap:'Explore the map',principlesTitle:'More knowledge.<br><em>More freedom.</em>',principle1:'Clear documentation',principle2:'Authentic commands',
    principle3:'Interactive environment',principle4:'Hands-on exercises',principle5:'Beginner to advanced',learningPathLabel:'LEARNING PATH',
    mapHeadline:'Your Linux map,<br>connected.',mapIntro:'Explore core concepts visually. Focus a node to reveal its commands and relationship to the rest of the system.',
    personalizeRoute:'Personalize my route',yourProgress:'YOUR PROGRESS',continueLearning:'Continue learning',learnHeadline:'Understand Linux<br>from the inside out.',
    labLabel:'LABORATORY',terminalHeadline:'Terminal in<br>your browser.',openTerminalBtn:'Open terminal',viewCommands:'View commands',
    commandInspector:'COMMAND INSPECTOR',currentChallenge:'CURRENT CHALLENGE',challengeTitle:'Explore your filesystem',
    challengeDescription:'Navigate to Documents and create a notes.txt file.',viewHint:'View hint',distrosLabelTop:'LINUX DISTRIBUTIONS',
    distrosHeadline:'Meet the main distributions.',compareLabel:'COMPARE',compareTitle:'Compare up to three distributions.',
    finderLabel:'FIND YOUR LINUX',finderTitle:'What kind of Linux experience do you want?',finderBeginner:'Simple desktop',
    finderDeveloper:'Development',finderStable:'Stability',finderAdvanced:'Deep control',commandsHeadline:'A Linux quick reference<br>you can actually practice.',
    cheatLabel:'QUICK REFERENCE',cheatTitle:'Search by intent, not only by command name.',cheatPlaceholder:'find a file, check disk, inspect process…',
    docsLabel:'DOCUMENTATION',docsHeadline:'Read the concept.<br>Verify the source.',previous:'Previous',next:'Next',achievementsLabel:'LOCAL ACHIEVEMENTS',
    achievementsTitle:'Small milestones, stored only here.',aboutHeadline:'From a CSS drawing<br>to an interactive Linux product.',
    aboutText:'The project preserves its original Tux experiment while evolving into an open-source learning environment built with HTML, CSS and Vanilla JavaScript.',
    navigate:'navigate',open:'open',close:'close',personalize:'Personalize your learning route',onboardingQuestion:'What do you want to learn?',
    onboardingText:'This only changes the route we highlight. Your choice stays on this device.',routeNew:'I am new to Linux',routeWindows:'I am coming from Windows',
    routeDev:'I want Linux for development',routeDevops:'I want servers / DevOps',routeSecurity:'I want cybersecurity',routeAdvanced:'I already use Linux',
    splitLearn:'Split Learn Mode',practiceWithoutLeaving:'Practice without leaving the lesson',fundamentalsSub:'What Linux is',
    finderIntro:'Choose a goal above to see a few distributions that may fit.',finderResult:'Options that may fit: ',
    compareEmpty:'Choose distributions to compare.',unlocked:'Unlocked',locked:'Locked',lessonRead:'READ',lessonLab:'LAB',lessonChallenge:'CHALLENGE',
    hintText:'Try: cd Documents  →  touch notes.txt',themeDark:'Dark theme',themeLight:'Light theme'
  },
  pt:{
    about:'Sobre',searchLabel:'Buscar',heroOverline:'APRENDA • PRATIQUE • EVOLUA',heroLinux:'LINUX',heroInteractive:'INTERACTIVE',heroAcademy:'ACADEMY',
    heroLede:'Do zero ao avançado em uma trilha interativa e prática. Explore o sistema, execute comandos e entenda como as partes do Linux se conectam.',
    exploreMap:'Explorar o mapa',principlesTitle:'Mais conhecimento.<br><em>Mais liberdade.</em>',principle1:'Documentação clara',principle2:'Comandos autênticos',
    principle3:'Ambiente interativo',principle4:'Exercícios práticos',principle5:'Do básico ao avançado',learningPathLabel:'TRILHA DE APRENDIZADO',
    mapHeadline:'Seu mapa do Linux,<br>conectado.',mapIntro:'Explore os conceitos principais de forma visual. Foque um nó para revelar comandos e sua relação com o restante do sistema.',
    personalizeRoute:'Personalizar minha trilha',yourProgress:'SEU PROGRESSO',continueLearning:'Continuar aprendendo',learnHeadline:'Entenda Linux<br>de dentro para fora.',
    labLabel:'LABORATÓRIO',terminalHeadline:'Terminal no<br>navegador.',openTerminalBtn:'Abrir terminal',viewCommands:'Ver comandos',
    commandInspector:'ANALISADOR DE COMANDO',currentChallenge:'DESAFIO ATUAL',challengeTitle:'Explore o sistema de arquivos',
    challengeDescription:'Entre em Documents e crie um arquivo notes.txt.',viewHint:'Ver dica',distrosLabelTop:'DISTRIBUIÇÕES LINUX',
    distrosHeadline:'Conheça as principais distribuições.',compareLabel:'COMPARAR',compareTitle:'Compare até três distribuições.',
    finderLabel:'ENCONTRE SEU LINUX',finderTitle:'Que tipo de experiência Linux você procura?',finderBeginner:'Desktop simples',
    finderDeveloper:'Desenvolvimento',finderStable:'Estabilidade',finderAdvanced:'Controle profundo',commandsHeadline:'Uma referência Linux<br>que você pode praticar.',
    cheatLabel:'CONSULTA RÁPIDA',cheatTitle:'Pesquise pela intenção, não apenas pelo nome do comando.',cheatPlaceholder:'encontrar arquivo, ver disco, inspecionar processo…',
    docsLabel:'DOCUMENTAÇÃO',docsHeadline:'Leia o conceito.<br>Confira a fonte.',previous:'Anterior',next:'Próximo',achievementsLabel:'CONQUISTAS LOCAIS',
    achievementsTitle:'Pequenos marcos, salvos apenas neste dispositivo.',aboutHeadline:'De um desenho em CSS<br>para um produto interativo Linux.',
    aboutText:'O projeto preserva o experimento original do Tux e evolui para um ambiente open source de aprendizado criado com HTML, CSS e JavaScript puro.',
    navigate:'navegar',open:'abrir',close:'fechar',personalize:'Personalize sua trilha de aprendizado',onboardingQuestion:'O que você quer aprender?',
    onboardingText:'Isso apenas altera a trilha destacada. A escolha fica salva neste dispositivo.',routeNew:'Sou novo no Linux',routeWindows:'Estou vindo do Windows',
    routeDev:'Quero Linux para desenvolvimento',routeDevops:'Quero servidores / DevOps',routeSecurity:'Quero cibersegurança',routeAdvanced:'Já uso Linux',
    splitLearn:'Modo de estudo dividido',practiceWithoutLeaving:'Pratique sem sair da aula',fundamentalsSub:'O que é Linux',
    finderIntro:'Escolha um objetivo acima para ver algumas distribuições que podem fazer sentido.',finderResult:'Opções que podem fazer sentido: ',
    compareEmpty:'Escolha distribuições para comparar.',unlocked:'Desbloqueada',locked:'Bloqueada',
    hintText:'Tente: cd Documents  →  touch notes.txt',themeDark:'Tema escuro',themeLight:'Tema claro'
  }
};

const v5t=key=>v5Messages[getLanguage()]?.[key]??v5Messages.en[key]??key;

function applyV5Translations(){
  document.querySelectorAll('[data-v5-i18n]').forEach(el=>{
    const key=el.dataset.v5I18n;
    if(v5Messages[getLanguage()]?.[key]!=null) el.textContent=v5t(key);
  });
  document.querySelectorAll('[data-v5-i18n-html]').forEach(el=>{
    const key=el.dataset.v5I18nHtml;
    if(v5Messages[getLanguage()]?.[key]!=null) el.innerHTML=v5t(key);
  });
  document.querySelectorAll('[data-v5-i18n-placeholder]').forEach(el=>{
    const key=el.dataset.v5I18nPlaceholder;
    if(v5Messages[getLanguage()]?.[key]!=null) el.placeholder=v5t(key);
  });
}
applyV5Translations();
window.addEventListener('academy:language',()=>setTimeout(applyV5Translations,0));

/* Theme */
const themeToggle=document.querySelector('#themeToggle');
const savedTheme=storage.getItem('linuxAcademy.theme')||'dark';
document.documentElement.dataset.theme=savedTheme;
function syncThemeButton(){
  if(!themeToggle)return;
  const isLight=document.documentElement.dataset.theme==='light';
  themeToggle.textContent=isLight?'☾':'☼';
  themeToggle.setAttribute('aria-label',isLight?v5t('themeDark'):v5t('themeLight'));
}
themeToggle?.addEventListener('click',()=>{
  const next=document.documentElement.dataset.theme==='light'?'dark':'light';
  document.documentElement.dataset.theme=next;
  storage.setItem('linuxAcademy.theme',next);
  syncThemeButton();
});
syncThemeButton();
window.addEventListener('academy:language',syncThemeButton);

/* Active navigation */
const navSectionMap=[
  ['#learn','#learn'],['#terminal','#terminal'],['#distros','#distros'],['#resources','#resources'],['#about','#about']
];
const activeLinks=[...document.querySelectorAll('.nav-links a')];
const navObserver=new IntersectionObserver(entries=>{
  const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
  if(!visible)return;
  activeLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${visible.target.id}`));
},{rootMargin:'-25% 0px -60% 0px',threshold:[0,.05,.2]});
navSectionMap.forEach(([,id])=>{const el=document.querySelector(id);if(el)navObserver.observe(el);});

/* Improve menu UX */
const v5MenuToggle=document.querySelector('#menuToggle');
const v5NavPanel=document.querySelector('#navPanel');
const oldCloseMenu=()=>{v5NavPanel?.classList.remove('open');v5MenuToggle?.setAttribute('aria-expanded','false');document.body.classList.remove('menu-open');};
v5MenuToggle?.addEventListener('click',()=>document.body.classList.toggle('menu-open',v5NavPanel?.classList.contains('open')));
v5NavPanel?.querySelectorAll('a').forEach(a=>a.addEventListener('click',oldCloseMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&v5NavPanel?.classList.contains('open'))oldCloseMenu();});

/* Onboarding / personalized routes */
const onboardingDialog=document.querySelector('#onboardingDialog');
const openOnboarding=document.querySelector('#openOnboarding');
const onboardingOptions=document.querySelector('#onboardingOptions');
const routeKey='linuxAcademy.route';
const routeNodes={
  new:['fundamentals','terminal','filesystem','distros','packages'],
  windows:['fundamentals','windows','distros','terminal','filesystem'],
  development:['fundamentals','terminal','packages','shell','networking'],
  devops:['terminal','filesystem','networking','processes','shell'],
  security:['fundamentals','terminal','networking','permissions','shell'],
  advanced:['processes','networking','shell','packages']
};

function applyRoute(route){
  document.querySelectorAll('.mind-node').forEach(n=>n.classList.toggle('recommended',routeNodes[route]?.includes(n.dataset.mapId)));
  if(route) storage.setItem(routeKey,route);
}
function showOnboarding(){ if(onboardingDialog&&!onboardingDialog.open)onboardingDialog.showModal(); }
openOnboarding?.addEventListener('click',showOnboarding);
onboardingOptions?.querySelectorAll('[data-route]').forEach(btn=>btn.addEventListener('click',()=>{
  applyRoute(btn.dataset.route);
  onboardingDialog?.close();
  document.querySelector('#learning-map')?.scrollIntoView({behavior:'smooth',block:'center'});
}));
const storedRoute=storage.getItem(routeKey);
if(storedRoute)applyRoute(storedRoute);
else setTimeout(()=>{if(!storage.getItem('linuxAcademy.onboardingDismissed'))showOnboarding();},850);
onboardingDialog?.addEventListener('close',()=>storage.setItem('linuxAcademy.onboardingDismissed','1'));

/* Tux reacts to map focus and terminal state */
window.addEventListener('academy:map-focus',e=>{
  if(e.detail&&tux?.lookAt)tux.lookAt(e.detail.x,e.detail.y);
});
window.addEventListener('academy:terminal-command',e=>{
  const name=e.detail?.command||'';
  if(name&&!commands.some(c=>c.name===name)){
    tux?.react?.();
    tux?.speak?.(getLanguage()==='pt'?`"${name}" não está disponível neste laboratório.`:`"${name}" is not available in this lab.`);
  }
});

/* Progress dashboard */
function completedByLevel(){
  const completed=new Set(JSON.parse(storage.getItem('linuxAcademy.completedLessons')||'[]'));
  const result={beginner:[0,0],intermediate:[0,0],advanced:[0,0]};
  lessons.forEach(l=>{result[l.level][1]++;if(completed.has(l.id))result[l.level][0]++;});
  return {completed,result};
}
function renderV5Progress(){
  const {completed,result}=completedByLevel();
  const pct=Math.round((completed.size/Math.max(1,lessons.length))*100);
  const ring=document.querySelector('#progressRing');
  ring?.style.setProperty('--p',pct);
  const ringLabel=document.querySelector('#progressRingLabel');
  if(ringLabel)ringLabel.textContent=`${pct}%`;
  ['beginner','intermediate','advanced'].forEach(level=>{
    const target=document.querySelector(`#${level}Progress`);
    if(target)target.textContent=`${result[level][0]}/${result[level][1]}`;
  });
}
window.addEventListener('academy:lesson-progress',renderV5Progress);
window.addEventListener('academy:progress-reset',renderV5Progress);
window.addEventListener('academy:language',renderV5Progress);
renderV5Progress();

document.querySelector('#continueLearning')?.addEventListener('click',()=>{
  const completed=new Set(JSON.parse(storage.getItem('linuxAcademy.completedLessons')||'[]'));
  const next=lessons.find(l=>!completed.has(l.id));
  if(next){
    document.querySelector(`.level-tabs [data-level="${next.level}"]`)?.click();
    setTimeout(()=>document.querySelector(`[data-lesson-id="${next.id}"]`)?.scrollIntoView({behavior:'smooth',block:'center'}),30);
  }else document.querySelector('#terminal')?.scrollIntoView({behavior:'smooth'});
});

/* Terminal focus + hint */
document.querySelector('#focusTerminal')?.addEventListener('click',()=>{
  document.querySelector('#terminalInput')?.focus();
  document.querySelector('#terminal')?.scrollIntoView({behavior:'smooth',block:'center'});
});
document.querySelector('#missionHint')?.addEventListener('click',()=>{
  const input=document.querySelector('#terminalInput');
  if(input){input.value='cd Documents';input.focus();}
  tux?.speak?.(v5t('hintText'));
});

/* Command inspector */
const inspectorCommand=document.querySelector('#inspectorCommand');
const inspectorParts=document.querySelector('#inspectorParts');
const flagHelp={
  ls:{
    base:{en:'List directory contents',pt:'Lista o conteúdo do diretório'},
    '-l':{en:'Long format',pt:'Formato detalhado'},
    '-a':{en:'Include hidden files',pt:'Inclui arquivos ocultos'},
    '-h':{en:'Human-readable sizes',pt:'Tamanhos legíveis'}
  },
  grep:{
    base:{en:'Search text by pattern',pt:'Pesquisa texto por padrão'},
    '-i':{en:'Ignore case',pt:'Ignora maiúsculas/minúsculas'},
    '-n':{en:'Show line numbers',pt:'Mostra números das linhas'},
    '-r':{en:'Search recursively',pt:'Pesquisa recursivamente'}
  },
  find:{base:{en:'Find files by criteria',pt:'Encontra arquivos por critérios'},'-name':{en:'Match a name pattern',pt:'Compara um padrão de nome'}},
  chmod:{base:{en:'Change file mode bits',pt:'Altera bits de permissão'}},
  ps:{base:{en:'Inspect processes',pt:'Inspeciona processos'},'aux':{en:'Common full process view',pt:'Visão ampla de processos'}},
  ip:{base:{en:'Inspect or configure networking',pt:'Inspeciona ou configura rede'}},
  mkdir:{base:{en:'Create directories',pt:'Cria diretórios'},'-p':{en:'Create parent directories as needed',pt:'Cria diretórios pais quando necessário'}},
  rm:{base:{en:'Remove filesystem entries',pt:'Remove entradas do filesystem'},'-r':{en:'Recursive removal — use carefully',pt:'Remoção recursiva — use com cuidado'},'-f':{en:'Force without prompts',pt:'Força sem confirmação'}}
};
function inspectorDescription(obj){return obj?.[getLanguage()]||obj?.en||'';}
function renderInspector(detail){
  if(!inspectorCommand||!inspectorParts||!detail)return;
  const name=detail.command;
  const args=detail.args||[];
  inspectorCommand.textContent=[name,...args].join(' ');
  inspectorParts.replaceChildren();
  const help=flagHelp[name];
  const pieces=[{token:name,desc:inspectorDescription(help?.base)||((commands.find(c=>c.name===name)?.description||{})[getLanguage()]||commands.find(c=>c.name===name)?.description?.en||v5t('commandInspector'))}];
  args.forEach(arg=>{
    if(arg.startsWith('-')&&arg.length>2&&!help?.[arg]){
      const chars=arg.slice(1).split('');
      chars.forEach(c=>{const key=`-${c}`;pieces.push({token:key,desc:inspectorDescription(help?.[key])||'Option / flag'});});
    }else{
      pieces.push({token:arg,desc:inspectorDescription(help?.[arg])||(arg.startsWith('-')?'Option / flag':'Argument')});
    }
  });
  pieces.slice(0,8).forEach(p=>{
    const span=document.createElement('span');
    const code=document.createElement('code');code.textContent=p.token;
    const b=document.createElement('b');b.textContent=p.desc;
    span.append(code,b);inspectorParts.append(span);
  });
}
window.addEventListener('academy:terminal-command',e=>renderInspector(e.detail));

/* Extended terminal missions */
const missionDefinitions=[
  {id:'navigation',label:{en:'Navigation',pt:'Navegação'},match:d=>['pwd','ls','cd'].includes(d.command)},
  {id:'files',label:{en:'Files',pt:'Arquivos'},match:d=>['mkdir','touch','cat'].includes(d.command)},
  {id:'search',label:{en:'Search',pt:'Busca'},match:d=>['grep','find'].includes(d.command)},
  {id:'permissions',label:{en:'Permissions',pt:'Permissões'},match:d=>['chmod','chown'].includes(d.command)},
  {id:'processes',label:{en:'Processes',pt:'Processos'},match:d=>['ps','top','kill'].includes(d.command)},
  {id:'networking',label:{en:'Networking',pt:'Redes'},match:d=>['ip','ping','ssh'].includes(d.command)},
  {id:'bash',label:{en:'Shell & Bash',pt:'Shell & Bash'},match:d=>['echo','history','export'].includes(d.command)}
];
function missionKey(id){return`linuxAcademy.v5mission.${id}`;}
function renderExtendedMissions(){
  const wrap=document.querySelector('#extendedMissions');if(!wrap)return;
  wrap.replaceChildren();
  missionDefinitions.forEach(m=>{
    const done=storage.getItem(missionKey(m.id))==='done';
    const span=document.createElement('span');span.className=`mission ${done?'done':''}`;
    const i=document.createElement('i');const b=document.createElement('b');b.textContent=m.label[getLanguage()]||m.label.en;
    span.append(i,b);wrap.append(span);
  });
  const doneCount=missionDefinitions.filter(m=>storage.getItem(missionKey(m.id))==='done').length;
  const counter=document.querySelector('#missionCounter');if(counter)counter.textContent=`${String(Math.min(doneCount+1,7)).padStart(2,'0')}/07`;
}
window.addEventListener('academy:terminal-command',e=>{
  missionDefinitions.forEach(m=>{
    if(m.match(e.detail||{}))storage.setItem(missionKey(m.id),'done');
  });
  renderExtendedMissions();
});
window.addEventListener('academy:progress-reset',()=>{
  missionDefinitions.forEach(m=>storage.removeItem(missionKey(m.id)));
  renderExtendedMissions();
});
window.addEventListener('academy:language',renderExtendedMissions);
renderExtendedMissions();

/* Distro comparator + finder */
const localizeV5=v=>typeof v==='string'?v:(v?.[getLanguage()]??v?.en??'');
const compareSelects=[...document.querySelectorAll('[data-compare-slot]')];
function buildCompareSelects(){
  compareSelects.forEach((select,index)=>{
    const current=select.value;
    select.replaceChildren();
    const blank=document.createElement('option');blank.value='';blank.textContent='—';
    select.append(blank);
    distros.forEach(d=>{const opt=document.createElement('option');opt.value=d.id;opt.textContent=d.name;select.append(opt);});
    select.value=current||['debian','fedora','arch'][index]||'';
    select.onchange=renderCompare;
  });
}
function renderCompare(){
  const out=document.querySelector('#distroCompareOutput');if(!out)return;
  out.replaceChildren();
  const chosen=compareSelects.map(s=>distros.find(d=>d.id===s.value)).filter(Boolean);
  if(!chosen.length){out.textContent=v5t('compareEmpty');return;}
  chosen.forEach(d=>{
    const box=document.createElement('div');box.className='compare-mini';
    const strong=document.createElement('strong');strong.textContent=d.name;
    const fam=document.createElement('span');fam.textContent=`${d.family} • ${d.packageManager}`;
    const rel=document.createElement('span');rel.textContent=localizeV5(d.release);
    const diff=document.createElement('span');diff.textContent=localizeV5(d.difficulty);
    box.append(strong,fam,rel,diff);out.append(box);
  });
}
buildCompareSelects();renderCompare();

const finderMap={
  beginner:['ubuntu','mint','popos'],
  developer:['fedora','ubuntu','popos'],
  stable:['debian','mint','opensuse'],
  advanced:['arch','nixos','endeavour']
};
function renderFinder(mode){
  const result=document.querySelector('#finderResult');if(!result)return;
  document.querySelectorAll('[data-finder]').forEach(b=>b.classList.toggle('active',b.dataset.finder===mode));
  if(!mode){result.textContent=v5t('finderIntro');return;}
  const choices=(finderMap[mode]||[]).map(id=>distros.find(d=>d.id===id)).filter(Boolean);
  result.replaceChildren();
  const intro=document.createElement('span');intro.textContent=v5t('finderResult');result.append(intro);
  choices.forEach((d,i)=>{
    const b=document.createElement('button');b.type='button';b.className='finder-result-link';b.textContent=`${i?', ':''}${d.name}`;
    b.addEventListener('click',()=>document.querySelector(`.distro-slide[data-id="${d.id}"]`)?.click());
    result.append(b);
  });
}
document.querySelectorAll('[data-finder]').forEach(b=>b.addEventListener('click',()=>renderFinder(b.dataset.finder)));
renderFinder('');
window.addEventListener('academy:language',()=>{buildCompareSelects();renderCompare();renderFinder(document.querySelector('[data-finder].active')?.dataset.finder||'');});

/* Documentation explorer */
const docsTopics=[
  {id:'filesystem',title:{en:'Filesystem',pt:'Sistema de arquivos'},summary:{en:'Linux organizes files beneath a single root directory, /. Conventional paths such as /etc, /home, /usr and /var have documented roles.',pt:'O Linux organiza arquivos abaixo de um único diretório raiz, /. Caminhos como /etc, /home, /usr e /var possuem funções convencionais documentadas.'},command:'ls /',source:'Filesystem Hierarchy Standard',url:'https://refspecs.linuxfoundation.org/FHS_3.0/fhs/index.html'},
  {id:'permissions',title:{en:'Permissions',pt:'Permissões'},summary:{en:'Read, write and execute bits are evaluated for owner, group and others. Learn to inspect permissions before changing them.',pt:'Bits de leitura, escrita e execução são avaliados para dono, grupo e outros. Aprenda a inspecionar permissões antes de alterá-las.'},command:'ls -la',source:'GNU Coreutils',url:'https://www.gnu.org/software/coreutils/manual/html_node/File-permissions.html'},
  {id:'packages',title:{en:'Packages',pt:'Pacotes'},summary:{en:'Distributions use package managers and repositories to install and update software. The exact tool depends on the distro family.',pt:'Distribuições usam gerenciadores de pacotes e repositórios para instalar e atualizar software. A ferramenta depende da família da distro.'},command:'apt --help',source:'Debian Reference',url:'https://www.debian.org/doc/manuals/debian-reference/'},
  {id:'processes',title:{en:'Processes',pt:'Processos'},summary:{en:'Processes have identifiers and state. Tools such as ps inspect them; signals request actions from a process.',pt:'Processos possuem identificadores e estados. Ferramentas como ps os inspecionam; sinais solicitam ações a um processo.'},command:'ps aux',source:'Linux man-pages',url:'https://man7.org/linux/man-pages/man1/ps.1.html'},
  {id:'networking',title:{en:'Networking',pt:'Redes'},summary:{en:'Use tools such as ip, ping and ssh to inspect interfaces, test reachability and connect to remote systems.',pt:'Use ferramentas como ip, ping e ssh para inspecionar interfaces, testar conectividade e acessar sistemas remotos.'},command:'ip addr',source:'Linux man-pages',url:'https://man7.org/linux/man-pages/man8/ip.8.html'},
  {id:'bash',title:{en:'Shell & Bash',pt:'Shell & Bash'},summary:{en:'The shell parses commands, expands variables, handles pipelines and redirections, and launches programs.',pt:'O shell interpreta comandos, expande variáveis, trata pipelines e redirecionamentos e inicia programas.'},command:'echo $SHELL',source:'GNU Bash Reference Manual',url:'https://www.gnu.org/software/bash/manual/bash.html'},
  {id:'systemd',title:{en:'Services & systemd',pt:'Serviços e systemd'},summary:{en:'On many distributions, systemd manages services and units. Learn status inspection before making changes.',pt:'Em muitas distribuições, o systemd gerencia serviços e units. Aprenda a consultar o estado antes de fazer alterações.'},command:'systemctl status ssh',source:'systemd manuals',url:'https://www.freedesktop.org/software/systemd/man/latest/systemctl.html'}
];
let activeDoc=0;
function renderDocs(){
  const sidebar=document.querySelector('#docsSidebar');
  const body=document.querySelector('#docsArticleBody');
  if(!sidebar||!body)return;
  sidebar.replaceChildren();
  docsTopics.forEach((topic,index)=>{
    const b=document.createElement('button');b.type='button';b.classList.toggle('active',index===activeDoc);b.textContent=localizeV5(topic.title);
    b.addEventListener('click',()=>{activeDoc=index;renderDocs();});sidebar.append(b);
  });
  const topic=docsTopics[activeDoc];
  const breadcrumb=document.querySelector('#docsBreadcrumb');if(breadcrumb)breadcrumb.textContent=localizeV5(topic.title);
  body.replaceChildren();
  const h=document.createElement('h3');h.textContent=localizeV5(topic.title);
  const p=document.createElement('p');p.textContent=localizeV5(topic.summary);
  const pre=document.createElement('pre');const code=document.createElement('code');code.textContent=`$ ${topic.command}`;pre.append(code);
  const actions=document.createElement('div');actions.className='docs-article-actions';
  const tryBtn=document.createElement('button');tryBtn.type='button';tryBtn.className='small-button';tryBtn.textContent=t('tryIt');
  tryBtn.addEventListener('click',()=>{terminal.run(topic.command);document.querySelector('#terminal')?.scrollIntoView({behavior:'smooth'});});
  const link=document.createElement('a');link.href=topic.url;link.target='_blank';link.rel='noopener noreferrer';link.textContent=`${topic.source} ↗`;
  actions.append(tryBtn,link);body.append(h,p,pre,actions);
}
document.querySelector('#docsPrev')?.addEventListener('click',()=>{activeDoc=(activeDoc-1+docsTopics.length)%docsTopics.length;renderDocs();});
document.querySelector('#docsNext')?.addEventListener('click',()=>{activeDoc=(activeDoc+1)%docsTopics.length;renderDocs();});
window.addEventListener('academy:language',renderDocs);
renderDocs();

/* Cheat sheet by intent */
const cheatSearch=document.querySelector('#cheatSearch');
const cheatResults=document.querySelector('#cheatResults');
const intentAliases={
  en:{'find file':['find','locate','ls'],'check disk':['df','du','lsblk'],'process':['ps','top','kill'],'network':['ip','ping','ssh'],'permission':['chmod','chown','ls'],'text':['grep','cat','less']},
  pt:{'arquivo':['find','locate','ls'],'disco':['df','du','lsblk'],'processo':['ps','top','kill'],'rede':['ip','ping','ssh'],'permiss':['chmod','chown','ls'],'texto':['grep','cat','less']}
};
function cheatCandidates(q){
  if(!q)return commands.slice(0,8);
  const direct=commands.filter(c=>[c.name,c.category,localizeV5(c.description),c.syntax].join(' ').toLowerCase().includes(q));
  const alias=Object.entries(intentAliases[getLanguage()]||{}).find(([key])=>q.includes(key))?.[1]||[];
  const merged=[...direct,...alias.map(name=>commands.find(c=>c.name===name)).filter(Boolean)];
  return [...new Map(merged.map(c=>[c.name,c])).values()].slice(0,10);
}
function renderCheat(){
  if(!cheatResults)return;
  const q=(cheatSearch?.value||'').trim().toLowerCase();
  cheatResults.replaceChildren();
  cheatCandidates(q).forEach(c=>{
    const b=document.createElement('button');b.type='button';b.className='cheat-result';
    const code=document.createElement('code');code.textContent=c.name;
    const span=document.createElement('span');span.textContent=localizeV5(c.description);
    b.append(code,span);
    b.addEventListener('click',()=>{terminal.run(c.example||c.name);document.querySelector('#terminal')?.scrollIntoView({behavior:'smooth'});});
    cheatResults.append(b);
  });
}
cheatSearch?.addEventListener('input',renderCheat);
window.addEventListener('academy:language',renderCheat);
renderCheat();

/* Split Learn mode: move the live terminal DOM so state is preserved */
const splitDialog=document.querySelector('#splitLearnDialog');
const splitPane=document.querySelector('#splitLessonPane');
const splitSlot=document.querySelector('#splitTerminalSlot');
const splitClose=document.querySelector('#splitLearnClose');
let terminalPlaceholder=null;
let terminalOriginalParent=null;
function restoreTerminal(){
  const live=document.querySelector('.terminal-window');
  if(live&&terminalPlaceholder?.parentNode){
    terminalPlaceholder.parentNode.insertBefore(live,terminalPlaceholder);
    terminalPlaceholder.remove();
  }else if(live&&terminalOriginalParent)terminalOriginalParent.append(live);
  terminalPlaceholder=null;terminalOriginalParent=null;
}
function openSplitLesson(lesson){
  if(!splitDialog||!splitPane||!splitSlot||!lesson)return;
  const title=localizeV5(lesson.title),desc=localizeV5(lesson.description),output=localizeV5(lesson.output);
  splitPane.replaceChildren();
  const eyebrow=document.createElement('p');eyebrow.className='eyebrow';eyebrow.textContent=`${lesson.level.toUpperCase()} / ${lesson.id}`;
  const h=document.createElement('h2');h.id='splitLessonTitle';h.textContent=title;
  const p=document.createElement('p');p.textContent=desc;
  const pre=document.createElement('pre');const code=document.createElement('code');code.textContent=`$ ${lesson.command}`;pre.append(code);
  const expected=document.createElement('p');expected.textContent=`${t('expectedOutput')}: ${output}`;
  const link=document.createElement('a');link.href=lesson.reference;link.target='_blank';link.rel='noopener noreferrer';link.textContent=`${lesson.source} ↗`;
  splitPane.append(eyebrow,h,p,pre,expected,link);

  const live=document.querySelector('#terminal .terminal-window');
  if(live){
    terminalOriginalParent=live.parentNode;
    terminalPlaceholder=document.createComment('terminal-placeholder');
    terminalOriginalParent.insertBefore(terminalPlaceholder,live);
    splitSlot.append(live);
  }
  splitDialog.showModal();
  setTimeout(()=>document.querySelector('#terminalInput')?.focus(),60);
}
window.addEventListener('academy:split-lesson',e=>openSplitLesson(e.detail?.lesson));
splitClose?.addEventListener('click',()=>splitDialog?.close());
splitDialog?.addEventListener('close',restoreTerminal);
splitDialog?.addEventListener('cancel',()=>setTimeout(restoreTerminal,0));

/* Achievements */
const achievements=[
  {id:'first-command',icon:'>_',name:{en:'First Command',pt:'Primeiro Comando'},test:()=>storage.getItem('linuxAcademy.v5.firstCommand')==='1'},
  {id:'filesystem',icon:'/',name:{en:'Filesystem Explorer',pt:'Explorador do Filesystem'},test:()=>storage.getItem(missionKey('files'))==='done'},
  {id:'permissions',icon:'rwx',name:{en:'Permission Granted',pt:'Permissão Concedida'},test:()=>storage.getItem(missionKey('permissions'))==='done'},
  {id:'processes',icon:'PID',name:{en:'Process Inspector',pt:'Inspetor de Processos'},test:()=>storage.getItem(missionKey('processes'))==='done'},
  {id:'network',icon:'↔',name:{en:'Network Navigator',pt:'Navegador de Redes'},test:()=>storage.getItem(missionKey('networking'))==='done'},
  {id:'bash',icon:'$',name:{en:'Bash Beginner',pt:'Iniciante em Bash'},test:()=>storage.getItem(missionKey('bash'))==='done'}
];
function renderAchievements(){
  const list=document.querySelector('#achievementList');if(!list)return;
  list.replaceChildren();
  achievements.forEach(a=>{
    const unlocked=a.test();
    const item=document.createElement('div');item.className=`achievement-item ${unlocked?'unlocked':''}`;
    const i=document.createElement('i');i.textContent=a.icon;
    const b=document.createElement('b');b.textContent=a.name[getLanguage()]||a.name.en;
    const small=document.createElement('small');small.textContent=unlocked?v5t('unlocked'):v5t('locked');
    item.append(i,b,small);list.append(item);
  });
}
window.addEventListener('academy:terminal-command',()=>{
  storage.setItem('linuxAcademy.v5.firstCommand','1');
  renderAchievements();
});
window.addEventListener('academy:language',renderAchievements);
window.addEventListener('academy:lesson-progress',renderAchievements);
window.addEventListener('academy:progress-reset',renderAchievements);
renderAchievements();

/* Re-apply V5 translations after all dynamic surfaces exist */
applyV5Translations();
