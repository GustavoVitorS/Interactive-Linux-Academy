/* Learning progress summary and resume action. */
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
