/* Terminal focus controls, command inspector and guided missions. */
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
