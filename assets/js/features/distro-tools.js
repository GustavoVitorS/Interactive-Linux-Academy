/* Distribution comparator and recommendation tools. */
/* Distro comparator + finder */
const localizeV5=v=>typeof v==='string'?v:(v?.[getLanguage()]??v?.en??'');
const compareSelects=[...document.querySelectorAll('[data-compare-slot]')];
const compareStorageKey='linuxAcademy.distroComparison.v62';
const compareDefaults=['debian','fedora','arch'];
function sanitizeCompareSelection(value){
  const validIds=new Set(distros.map(d=>d.id));
  const raw=Array.isArray(value)?value:[];
  const used=new Set();
  const result=[];
  for(let i=0;i<3;i++){
    const candidate=raw[i];
    if(candidate&&validIds.has(candidate)&&!used.has(candidate)){result[i]=candidate;used.add(candidate);continue;}
    const fallback=[...compareDefaults,...distros.map(d=>d.id)].find(id=>validIds.has(id)&&!used.has(id));
    result[i]=fallback||'';if(fallback)used.add(fallback);
  }
  return result;
}
function readCompareSelection(){
  try{
    const current=storage.getItem(compareStorageKey);
    if(current)return sanitizeCompareSelection(JSON.parse(current));
    for(const legacyKey of ['linuxAcademy.distroComparison','linuxAcademy.distroComparison.v61']){
      const legacy=storage.getItem(legacyKey);if(legacy)return sanitizeCompareSelection(JSON.parse(legacy));
    }
    return [...compareDefaults];
  }catch{return [...compareDefaults];}
}
let comparisonSelection=readCompareSelection();
function saveCompareSelection(){storage.setItem(compareStorageKey,JSON.stringify(comparisonSelection));}
function buildCompareSelects(){
  comparisonSelection=sanitizeCompareSelection(comparisonSelection);
  compareSelects.forEach((select,index)=>{
    select.replaceChildren();
    select.setAttribute('aria-label',getLanguage()==='pt'?`Distribuição ${index+1}`:`Distribution ${index+1}`);
    distros.forEach(d=>{
      const opt=document.createElement('option');opt.value=d.id;opt.textContent=d.name;
      opt.disabled=comparisonSelection.some((id,slot)=>slot!==index&&id===d.id);
      select.append(opt);
    });
    select.value=comparisonSelection[index]||'';
    select.onchange=()=>{
      const next=[...comparisonSelection];next[index]=select.value;
      comparisonSelection=sanitizeCompareSelection(next);saveCompareSelection();buildCompareSelects();renderCompare();
    };
  });
  saveCompareSelection();
}
function renderCompare(){
  const out=document.querySelector('#distroCompareOutput');if(!out)return;
  out.replaceChildren();
  comparisonSelection=sanitizeCompareSelection(comparisonSelection);
  const chosen=comparisonSelection.map(id=>distros.find(d=>d.id===id)).filter(Boolean);
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
