/* Active section navigation and mobile menu UX. */
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
