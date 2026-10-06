/* Personalized learning-route onboarding and Tux contextual reactions. */
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
