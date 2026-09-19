import { distros } from './data/distros.js';
import { getLanguage, t } from './i18n.js';

export function initDistros({tuxSpeak}={}){
  const carousel=document.querySelector('#distroCarousel');
  const prev=document.querySelector('#distroPrev');
  const next=document.querySelector('#distroNext');
  const progress=document.querySelector('#distroProgress');
  const dialog=document.querySelector('#distroDialog');
  const body=document.querySelector('#distroModalBody');
  const close=document.querySelector('#distroClose');
  const localize=v=>typeof v==='string'?v:(v?.[getLanguage()]??v?.en??'');
  let activeId=null;

  const safeLink=url=>{try{const u=new URL(url);return ['https:','http:'].includes(u.protocol)?u.href:'#';}catch{return '#';}};
  function createLogo(d,cls=''){
    const wrap=document.createElement('div');wrap.className=cls||'distro-logo-box';
    const img=document.createElement('img');img.src=d.logo;img.alt=`${d.name} logo`;img.loading='lazy';img.decoding='async';
    img.addEventListener('error',()=>{wrap.textContent=d.name.slice(0,2).toUpperCase();wrap.classList.add('logo-fallback');},{once:true});
    wrap.append(img);return wrap;
  }
  function renderCarousel(){
    carousel.replaceChildren();
    distros.forEach(d=>{
      const card=document.createElement('button');card.type='button';card.className='distro-slide';card.dataset.id=d.id;card.style.setProperty('--distro-color',d.color);card.setAttribute('aria-label',`${d.name} — ${t('learnMore')}`);
      const logo=createLogo(d);
      const family=document.createElement('small');family.textContent=d.family;
      const h=document.createElement('h3');h.textContent=d.name;
      const p=document.createElement('p');p.textContent=localize(d.summary);
      const footer=document.createElement('div');footer.className='distro-card-footer';const s=document.createElement('strong');s.textContent=localize(d.difficulty);const arrow=document.createElement('span');arrow.textContent='↗';footer.append(s,arrow);
      card.append(logo,family,h,p,footer);card.addEventListener('click',()=>openDistro(d.id));carousel.append(card);
    });
    updateProgress();
  }
  function openDistro(id){
    const d=distros.find(x=>x.id===id);if(!d)return;activeId=id;body.replaceChildren();
    const hero=document.createElement('div');hero.className='modal-hero';const logo=createLogo(d,'modal-logo');const copy=document.createElement('div');const h=document.createElement('h2');h.id='distroModalTitle';h.textContent=d.name;const sub=document.createElement('p');sub.textContent=`${d.family} • ${localize(d.release)}`;copy.append(h,sub);hero.append(logo,copy);
    const desc=document.createElement('p');desc.className='modal-description';desc.textContent=localize(d.description);
    const meta=document.createElement('div');meta.className='modal-meta';[
      [t('packageManager'),d.packageManager],[t('releaseModel'),localize(d.release)],[t('difficulty'),localize(d.difficulty)],[t('desktop'),d.desktop]
    ].forEach(([k,v])=>{const box=document.createElement('div');const label=document.createElement('span');label.textContent=k;const strong=document.createElement('strong');strong.textContent=v;box.append(label,strong);meta.append(box);});
    const list=document.createElement('div');list.className='modal-list';const lt=document.createElement('strong');lt.textContent=t('goodFor');const ul=document.createElement('ul');localize(d.goodFor).forEach(item=>{const li=document.createElement('li');li.textContent=item;ul.append(li)});list.append(lt,ul);
    const link=document.createElement('a');link.className='button primary official-link';link.href=safeLink(d.website);link.target='_blank';link.rel='noopener noreferrer';link.textContent=t('officialWebsite');
    body.append(hero,desc,meta,list,link);if(!dialog.open)dialog.showModal();tuxSpeak?.(t('tuxDistro'));
  }
  function scrollByCard(dir){const first=carousel.querySelector('.distro-slide');const amount=(first?.getBoundingClientRect().width||280)+16;carousel.scrollBy({left:dir*amount,behavior:'smooth'});}
  function updateProgress(){const max=Math.max(1,carousel.scrollWidth-carousel.clientWidth);const pct=Math.min(100,Math.max(10,((carousel.scrollLeft+carousel.clientWidth)/Math.max(carousel.scrollWidth,1))*100));progress.style.width=`${pct}%`;prev.disabled=carousel.scrollLeft<4;next.disabled=carousel.scrollLeft>=max-4;}
  prev.addEventListener('click',()=>scrollByCard(-1));next.addEventListener('click',()=>scrollByCard(1));carousel.addEventListener('scroll',()=>requestAnimationFrame(updateProgress),{passive:true});window.addEventListener('resize',updateProgress,{passive:true});
  close.addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
  window.addEventListener('academy:language',()=>{renderCarousel();if(activeId&&dialog.open)openDistro(activeId);});
  renderCarousel();return distros;
}
