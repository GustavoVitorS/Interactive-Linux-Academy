/* Documentation explorer, quick reference and Split Learn mode. */
/* Documentation explorer */
const docsTopics=[
  {id:'filesystem',title:{en:'Filesystem',pt:'Sistema de arquivos'},summary:{en:'Linux organizes files beneath a single root directory, /. Conventional paths such as /etc, /home, /usr and /var have documented roles.',pt:'O Linux organiza arquivos abaixo de um único diretório raiz, /. Caminhos como /etc, /home, /usr e /var possuem funções convencionais documentadas.'},command:'ls /',referenceId:'filesystem'},
  {id:'permissions',title:{en:'Permissions',pt:'Permissões'},summary:{en:'Read, write and execute bits are evaluated for owner, group and others. Learn to inspect permissions before changing them.',pt:'Bits de leitura, escrita e execução são avaliados para dono, grupo e outros. Aprenda a inspecionar permissões antes de alterá-las.'},command:'ls -la',referenceId:'permissions'},
  {id:'packages',title:{en:'Packages',pt:'Pacotes'},summary:{en:'Distributions use package managers and repositories to install and update software. The exact tool depends on the distro family.',pt:'Distribuições usam gerenciadores de pacotes e repositórios para instalar e atualizar software. A ferramenta depende da família da distro.'},command:'apt --help',referenceId:'packages'},
  {id:'processes',title:{en:'Processes',pt:'Processos'},summary:{en:'Processes have identifiers and state. Tools such as ps inspect them; signals request actions from a process.',pt:'Processos possuem identificadores e estados. Ferramentas como ps os inspecionam; sinais solicitam ações a um processo.'},command:'ps aux',referenceId:'processes'},
  {id:'networking',title:{en:'Networking',pt:'Redes'},summary:{en:'Use tools such as ip, ping and ssh to inspect interfaces, test reachability and connect to remote systems.',pt:'Use ferramentas como ip, ping e ssh para inspecionar interfaces, testar conectividade e acessar sistemas remotos.'},command:'ip addr',referenceId:'networking'},
  {id:'bash',title:{en:'Shell & Bash',pt:'Shell & Bash'},summary:{en:'The shell parses commands, expands variables, handles pipelines and redirections, and launches programs.',pt:'O shell interpreta comandos, expande variáveis, trata pipelines e redirecionamentos e inicia programas.'},command:'echo $SHELL',referenceId:'bash'},
  {id:'systemd',title:{en:'Services & systemd',pt:'Serviços e systemd'},summary:{en:'On many distributions, systemd manages services and units. Learn status inspection before making changes.',pt:'Em muitas distribuições, o systemd gerencia serviços e units. Aprenda a consultar o estado antes de fazer alterações.'},command:'systemctl status ssh',referenceId:'systemd'}
]
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
  const topicRef=topicDocumentationReferences[topic.referenceId]||null;const refType=topicRef?.type||'official';const link=document.createElement('a');link.href=topicRef?.url||'#';link.target='_blank';link.rel='noopener noreferrer';link.className='docs-source-link';link.setAttribute('aria-label',`${getReferenceLabel(refType)} — ${topicRef?.provider||''}`);const label=document.createElement('span');label.textContent=getReferenceLabel(refType);const provider=document.createElement('small');provider.textContent=`${topicRef?.provider||getMissingReferenceLabel()} ↗`;link.append(label,provider);
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
  const link=document.createElement('a');link.href=lesson.reference;link.target='_blank';link.rel='noopener noreferrer';const lessonRefType=lesson.referenceType||inferReferenceType(lesson.reference);const lessonProvider=lesson.source||getReferenceLabel(lessonRefType);link.textContent=`${getReferenceLabel(lessonRefType)} · ${lessonProvider} ↗`;link.setAttribute('aria-label',`${getReferenceLabel(lessonRefType)} — ${lessonProvider}`);
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
