function initSearch({commands,distros,lessons}){
  const dialog=document.querySelector('#searchDialog');
  const trigger=document.querySelector('#searchTrigger');
  const close=document.querySelector('#searchClose');
  const input=document.querySelector('#globalSearch');
  const results=document.querySelector('#searchResults');
  if(!dialog||!trigger||!close||!input||!results)return;

  const localize=v=>typeof v==='string'?v:(v?.[getLanguage()]??v?.en??'');
  let activeIndex=-1;
  let currentButtons=[];

  function items(){
    const concepts=[
      {type:t('conceptType'),title:t('filesystem'),desc:t('filesystemText'),target:'#concepts'},
      {type:t('conceptType'),title:t('permissions'),desc:t('permissionsText'),target:'#concepts'},
      {type:t('conceptType'),title:t('packageManagers'),desc:t('packageText'),target:'#concepts'},
      {type:t('guideType'),title:t('windowsTitle'),desc:t('windowsText'),target:'#windows-linux'},
      {type:t('guideType'),title:t('roadmapTitle'),desc:t('roadmapText'),target:'#roadmap'},
      {type:t('guideType'),title:t('mapWindowTitle'),desc:t('mapText'),target:'#learning-map'},
      {type:t('guideType'),title:t('docsTitle'),desc:t('docsText'),target:'#resources'},
      {type:getLanguage()==='pt'?'Desafio':'Challenge',title:getLanguage()==='pt'?'Missões do terminal':'Terminal missions',desc:'pwd • ls • mkdir • grep • chmod • ps • ip',target:'#terminal'},
      {type:getLanguage()==='pt'?'Referência':'Reference',title:getLanguage()==='pt'?'Consulta rápida Linux':'Linux quick reference',desc:getLanguage()==='pt'?'Pesquise comandos por intenção.':'Search commands by intent.',target:'#commands'}
    ];
    return [
      ...commands.map(x=>({type:t('commandType'),title:x.name,desc:localize(x.description),target:'#commands'})),
      ...distros.map(x=>({type:t('distroType'),title:x.name,desc:localize(x.summary),target:'#distros'})),
      ...lessons.map(x=>({type:t('lessonType'),title:localize(x.title),desc:localize(x.description),target:'#learn'})),
      ...concepts
    ];
  }

  function syncActive(){
    currentButtons.forEach((b,i)=>{
      const active=i===activeIndex;
      b.classList.toggle('is-active',active);
      b.setAttribute('aria-selected',String(active));
    });
    currentButtons[activeIndex]?.scrollIntoView({block:'nearest'});
  }

  function activate(item){
    dialog.close();
    document.querySelector(item.target)?.scrollIntoView({behavior:'smooth',block:'start'});
  }

  function render(){
    const q=input.value.trim().toLowerCase();
    results.replaceChildren();
    activeIndex=-1;
    const all=items();
    const list=(q?all.filter(i=>[i.title,i.desc,i.type].join(' ').toLowerCase().includes(q)):all.slice(0,10)).slice(0,24);
    currentButtons=[];
    list.forEach(item=>{
      const b=document.createElement('button');
      b.type='button';
      b.className='search-result';
      b.setAttribute('role','option');
      const small=document.createElement('small');small.textContent=item.type;
      const strong=document.createElement('strong');strong.textContent=item.title;
      const span=document.createElement('span');span.textContent=item.desc;
      b.append(small,strong,span);
      b.addEventListener('click',()=>activate(item));
      b._searchItem=item;
      currentButtons.push(b);
      results.append(b);
    });
    if(!list.length){
      const p=document.createElement('p');
      p.className='empty-state';
      p.textContent=t('noResults');
      results.append(p);
    }
  }

  function open(){
    if(!dialog.open)dialog.showModal();
    input.value='';
    render();
    setTimeout(()=>input.focus(),30);
  }

  function closeDialog(){ if(dialog.open)dialog.close(); }

  trigger.addEventListener('click',open);
  close.addEventListener('click',closeDialog);
  input.addEventListener('input',render);
  input.addEventListener('keydown',e=>{
    if(!currentButtons.length)return;
    if(e.key==='ArrowDown'){
      e.preventDefault();
      activeIndex=(activeIndex+1)%currentButtons.length;
      syncActive();
    }else if(e.key==='ArrowUp'){
      e.preventDefault();
      activeIndex=(activeIndex-1+currentButtons.length)%currentButtons.length;
      syncActive();
    }else if(e.key==='Enter'&&activeIndex>=0){
      e.preventDefault();
      const item=currentButtons[activeIndex]._searchItem;
      if(item)activate(item);
    }
  });
  window.addEventListener('academy:language',render);
  document.addEventListener('keydown',e=>{
    if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){
      e.preventDefault();
      open();
    }
    if(e.key==='Escape'&&dialog.open)closeDialog();
  });
}
