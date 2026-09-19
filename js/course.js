import { lessons } from './data/lessons.js';
import { getLanguage, t } from './i18n.js';

export function initCourse({onProgressChange,terminalRunner,tuxSpeak}){
  const grid=document.querySelector('#lessonGrid');
  const tabs=[...document.querySelectorAll('.tab')];
  let activeLevel='beginner';
  const key='linuxAcademy.completedLessons';
  const read=()=>new Set(JSON.parse(localStorage.getItem(key)||'[]'));
  const write=set=>{localStorage.setItem(key,JSON.stringify([...set]));onProgressChange?.();};
  const localize=obj=>typeof obj==='string'?obj:(obj?.[getLanguage()]??obj?.en??'');

  function render(){
    const completed=read();
    grid.replaceChildren();
    lessons.filter(l=>l.level===activeLevel).forEach((lesson,index)=>{
      const card=document.createElement('article');card.className=`lesson-card ${completed.has(lesson.id)?'completed':''}`;
      const num=document.createElement('span');num.className='lesson-num';num.textContent=`${String(index+1).padStart(2,'0')} / ${t(activeLevel)}`;
      const title=document.createElement('h3');title.textContent=localize(lesson.title);
      const desc=document.createElement('p');desc.textContent=localize(lesson.description);
      const cmd=document.createElement('div');cmd.className='lesson-command';cmd.textContent=`$ ${lesson.command}`;
      const detail=document.createElement('details');detail.className='lesson-detail';
      const summary=document.createElement('summary');summary.textContent=t('expectedOutput');
      const expected=document.createElement('p');expected.textContent=localize(lesson.output);detail.append(summary,expected);
      const actions=document.createElement('div');actions.className='lesson-actions';
      const tryBtn=document.createElement('button');tryBtn.className='small-button';tryBtn.type='button';tryBtn.textContent=t('tryIt');
      tryBtn.addEventListener('click',()=>{terminalRunner?.(lesson.command);document.querySelector('#terminal')?.scrollIntoView({behavior:'smooth'});});
      const doneBtn=document.createElement('button');doneBtn.className='small-button complete';doneBtn.type='button';doneBtn.textContent=completed.has(lesson.id)?`${t('done')} ✓`:t('complete');
      doneBtn.addEventListener('click',()=>{const set=read();if(set.has(lesson.id))set.delete(lesson.id);else{set.add(lesson.id);tuxSpeak?.(getLanguage()==='pt'?'Boa! Mais um conceito Linux concluído. 🐧':'Nice! Another Linux concept unlocked. 🐧');}write(set);render();});
      const ref=document.createElement('a');ref.className='lesson-reference';ref.href=lesson.reference;ref.target='_blank';ref.rel='noopener noreferrer';ref.textContent=`${lesson.source || t('official')} ↗`;actions.append(tryBtn,doneBtn,ref);card.append(num,title,desc,cmd,detail,actions);grid.append(card);
    });
  }
  tabs.forEach(tab=>tab.addEventListener('click',()=>{activeLevel=tab.dataset.level;tabs.forEach(x=>{x.classList.toggle('active',x===tab);x.setAttribute('aria-selected',String(x===tab));});render();}));
  document.querySelector('#resetProgress')?.addEventListener('click',()=>{localStorage.removeItem(key);localStorage.removeItem('linuxAcademy.quiz');localStorage.removeItem('linuxAcademy.challenge');window.dispatchEvent(new CustomEvent('academy:progress-reset'));onProgressChange?.();render();});
  window.addEventListener('academy:language',render);
  render();
  return {lessons,readCompleted:read,render};
}
