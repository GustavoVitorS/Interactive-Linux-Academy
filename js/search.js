import { getLanguage, t } from './i18n.js';
export function initSearch({commands,distros,lessons}){
  const dialog=document.querySelector('#searchDialog'),trigger=document.querySelector('#searchTrigger'),close=document.querySelector('#searchClose'),input=document.querySelector('#globalSearch'),results=document.querySelector('#searchResults');
  const localize=v=>typeof v==='string'?v:(v?.[getLanguage()]??v?.en??'');
  function items(){
    const concepts=[
      {type:t('conceptType'),title:t('filesystem'),desc:t('filesystemText'),target:'#concepts'},
      {type:t('conceptType'),title:t('permissions'),desc:t('permissionsText'),target:'#concepts'},
      {type:t('conceptType'),title:t('packageManagers'),desc:t('packageText'),target:'#concepts'},
      {type:t('guideType'),title:t('windowsTitle'),desc:t('windowsText'),target:'#windows-linux'},
      {type:t('guideType'),title:t('roadmapTitle'),desc:t('roadmapText'),target:'#roadmap'},
      {type:t('guideType'),title:t('mapWindowTitle'),desc:t('mapText'),target:'#home'},
      {type:t('guideType'),title:t('docsTitle'),desc:t('docsText'),target:'#resources'}
    ];
    return [...commands.map(x=>({type:t('commandType'),title:x.name,desc:localize(x.description),target:'#commands'})),...distros.map(x=>({type:t('distroType'),title:x.name,desc:localize(x.summary),target:'#distros'})),...lessons.map(x=>({type:t('lessonType'),title:localize(x.title),desc:localize(x.description),target:'#learn'})),...concepts];
  }
  function render(){const q=input.value.trim().toLowerCase();results.replaceChildren();const all=items();const list=(q?all.filter(i=>[i.title,i.desc,i.type].join(' ').toLowerCase().includes(q)):all.slice(0,8)).slice(0,18);list.forEach(item=>{const b=document.createElement('button');b.type='button';b.className='search-result';const small=document.createElement('small');small.textContent=item.type;const strong=document.createElement('strong');strong.textContent=item.title;const span=document.createElement('span');span.textContent=item.desc;b.append(small,strong,span);b.addEventListener('click',()=>{dialog.close();document.querySelector(item.target)?.scrollIntoView({behavior:'smooth'});});results.append(b);});if(!list.length){const p=document.createElement('p');p.className='empty-state';p.textContent=t('noResults');results.append(p);}}
  function open(){dialog.showModal();input.value='';render();setTimeout(()=>input.focus(),30)}
  trigger.addEventListener('click',open);close.addEventListener('click',()=>dialog.close());input.addEventListener('input',render);window.addEventListener('academy:language',render);document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();open()}if(e.key==='Escape'&&dialog.open)dialog.close();});
}
