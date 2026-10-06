function initCourse({onProgressChange,terminalRunner,tuxSpeak}){
  const grid=document.querySelector('#lessonGrid');
  const tabs=[...document.querySelectorAll('.tab')];
  let activeLevel='beginner';
  const key='linuxAcademy.completedLessons';
  const read=()=>new Set(JSON.parse(storage.getItem(key)||'[]'));
  const write=set=>{
    storage.setItem(key,JSON.stringify([...set]));
    onProgressChange?.();
    window.dispatchEvent(new CustomEvent('academy:lesson-progress',{detail:{completed:[...set]}}));
  };
  const localize=obj=>typeof obj==='string'?obj:(obj?.[getLanguage()]??obj?.en??'');
  const labIds=new Set(['files-directories','pipes','redirection','search-text','find-files','packages','networking','bash-scripting']);
  const challengeIds=new Set(['permissions','processes','services','storage','security']);
  const typeFor=lesson=>lesson.type|| (labIds.has(lesson.id)?'LAB':challengeIds.has(lesson.id)?'CHALLENGE':'READ');
  const minutesFor=(lesson,index)=>lesson.minutes||[6,8,10,12][(index+lesson.level.length)%4];

  function render(){
    if(!grid)return;
    const completed=read();
    grid.replaceChildren();
    lessons.filter(l=>l.level===activeLevel).forEach((lesson,index)=>{
      const card=document.createElement('article');
      card.className=`lesson-card ${completed.has(lesson.id)?'completed':''}`;
      card.dataset.lessonId=lesson.id;

      const num=document.createElement('span');
      num.className='lesson-num';
      num.textContent=`${String(index+1).padStart(2,'0')} / ${lesson.module ? lesson.module.toUpperCase() : t(activeLevel)}`;

      const heading=document.createElement('div');
      heading.className='lesson-title-wrap';
      const title=document.createElement('h3');
      title.textContent=localize(lesson.title);
      const meta=document.createElement('div');
      meta.className='lesson-meta-row';
      const type=document.createElement('span');
      type.textContent=typeFor(lesson);
      const time=document.createElement('span');
      time.textContent=`${minutesFor(lesson,index)} min`;
      meta.append(type,time);
      heading.append(title,meta);

      const desc=document.createElement('p');
      desc.textContent=localize(lesson.description);

      const cmd=document.createElement('div');
      cmd.className='lesson-command';
      cmd.textContent=`$ ${lesson.command}`;

      const detail=document.createElement('details');
      detail.className='lesson-detail';
      const summary=document.createElement('summary');
      summary.textContent=t('expectedOutput');
      const expected=document.createElement('p');
      expected.textContent=localize(lesson.output);
      detail.append(summary,expected);

      const actions=document.createElement('div');
      actions.className='lesson-actions';

      const tryBtn=document.createElement('button');
      tryBtn.className='small-button';
      tryBtn.type='button';
      tryBtn.textContent=t('tryIt');
      tryBtn.addEventListener('click',()=>{
        storage.setItem('linuxAcademy.lastLesson',lesson.id);
        terminalRunner?.(lesson.command);
        document.querySelector('#terminal')?.scrollIntoView({behavior:'smooth'});
      });

      const splitBtn=document.createElement('button');
      splitBtn.className='small-button split-learn-button';
      splitBtn.type='button';
      splitBtn.textContent=getLanguage()==='pt'?'Abrir modo dividido':'Open split mode';
      splitBtn.addEventListener('click',()=>{storage.setItem('linuxAcademy.lastLesson',lesson.id);window.dispatchEvent(new CustomEvent('academy:split-lesson',{detail:{lesson}}));});

      const doneBtn=document.createElement('button');
      doneBtn.className='small-button complete';
      doneBtn.type='button';
      doneBtn.textContent=completed.has(lesson.id)?`${t('done')} ✓`:t('complete');
      doneBtn.addEventListener('click',()=>{
        const set=read();
        if(set.has(lesson.id)) set.delete(lesson.id);
        else {
          storage.setItem('linuxAcademy.lastLesson',lesson.id);
          set.add(lesson.id);
          tuxSpeak?.(getLanguage()==='pt'?'Boa! Mais um conceito Linux concluído. 🐧':'Nice! Another Linux concept unlocked. 🐧');
        }
        write(set);
        render();
      });

      const ref=document.createElement('a');
      ref.className='lesson-reference';
      ref.href=lesson.reference;
      ref.target='_blank';
      ref.rel='noopener noreferrer';
      const refType=lesson.referenceType||inferReferenceType(lesson.reference);
      const refProvider=lesson.source||getReferenceLabel(refType);
      ref.textContent=`${getReferenceLabel(refType)} · ${refProvider} ↗`;
      ref.setAttribute('aria-label',`${getReferenceLabel(refType)} — ${refProvider}`);

      actions.append(tryBtn,splitBtn,doneBtn,ref);
      card.append(num,heading,desc,cmd,detail,actions);
      grid.append(card);
    });
  }

  tabs.forEach(tab=>tab.addEventListener('click',()=>{
    activeLevel=tab.dataset.level;
    tabs.forEach(x=>{
      x.classList.toggle('active',x===tab);
      x.setAttribute('aria-selected',String(x===tab));
    });
    render();
  }));

  document.querySelector('#resetProgress')?.addEventListener('click',()=>{
    storage.removeItem(key);
    storage.removeItem('linuxAcademy.quiz');
    storage.removeItem('linuxAcademy.challenge');
    window.dispatchEvent(new CustomEvent('academy:progress-reset'));
    onProgressChange?.();
    render();
  });

  window.addEventListener('academy:language',render);
  render();
  return {lessons,readCompleted:read,render,getActiveLevel:()=>activeLevel};
}
