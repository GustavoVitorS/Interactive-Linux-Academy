function initQuiz({tuxSpeak,onProgressChange}={}){
  const root=document.querySelector('#quiz');
  if(!root)return;
  const questionEl=document.querySelector('#quizQuestionText');
  const metaEl=document.querySelector('#quizQuestionMeta');
  const topicEl=document.querySelector('#quizTopic');
  const optionsEl=document.querySelector('#quizOptions');
  const feedback=document.querySelector('#quizFeedback');
  const progress=document.querySelector('#quizQuestionProgress');
  const nextBtn=document.querySelector('#quizNext');
  const resultEl=document.querySelector('#quizResultSummary');
  const statsKey='linuxAcademy.quizStats.v6';
  const questions=[
    {topic:'filesystem',q:{en:'Which command prints the current working directory?',pt:'Qual comando mostra o diretório de trabalho atual?'},options:['pwd','mkdir','touch','grep'],answer:'pwd',explain:{en:'pwd means print working directory.',pt:'pwd significa print working directory e mostra o diretório atual.'}},
    {topic:'navigation',q:{en:'Which command changes the shell working directory?',pt:'Qual comando altera o diretório de trabalho do shell?'},options:['cd','ls','cat','ps'],answer:'cd',explain:{en:'cd changes the current directory of the shell.',pt:'cd altera o diretório atual do shell.'}},
    {topic:'permissions',q:{en:'Which command changes permission mode bits?',pt:'Qual comando altera os bits de permissão?'},options:['chmod','chown','grep','uname'],answer:'chmod',explain:{en:'chmod changes file mode bits; chown changes ownership.',pt:'chmod altera bits de modo; chown altera propriedade.'}},
    {topic:'processes',q:{en:'Which command is commonly used to inspect processes?',pt:'Qual comando é usado com frequência para inspecionar processos?'},options:['ps','mkdir','tar','pwd'],answer:'ps',explain:{en:'ps displays process information.',pt:'ps exibe informações sobre processos.'}},
    {topic:'networking',q:{en:'Which modern tool inspects Linux addresses and routes?',pt:'Qual ferramenta moderna inspeciona endereços e rotas Linux?'},options:['ip','touch','wc','chmod'],answer:'ip',explain:{en:'ip from iproute2 handles links, addresses and routes.',pt:'ip, do iproute2, trabalha com links, endereços e rotas.'}},
    {topic:'packages',q:{en:'Which package manager is used by Arch Linux?',pt:'Qual gerenciador de pacotes é usado pelo Arch Linux?'},options:['pacman','apt','dnf','zypper'],answer:'pacman',explain:{en:'Arch Linux uses pacman.',pt:'Arch Linux usa pacman.'}},
    {topic:'systemd',q:{en:'Which command inspects and controls systemd units?',pt:'Qual comando inspeciona e controla units do systemd?'},options:['systemctl','journalctl','grep','df'],answer:'systemctl',explain:{en:'systemctl manages and inspects systemd units.',pt:'systemctl gerencia e inspeciona units do systemd.'}},
    {topic:'storage',q:{en:'Which command lists block devices without formatting them?',pt:'Qual comando lista dispositivos de bloco sem formatá-los?'},options:['lsblk','mkfs','dd','rm'],answer:'lsblk',explain:{en:'lsblk lists block devices and relationships without modifying them.',pt:'lsblk lista dispositivos de bloco e relações sem modificá-los.'}},
    {topic:'bash',q:{en:'What does a pipe (|) connect?',pt:'O que um pipe (|) conecta?'},options:['stdout → stdin','files → permissions','users → groups','kernel → bootloader'],answer:'stdout → stdin',explain:{en:'A pipeline connects one command output to the next command input.',pt:'Um pipeline conecta a saída de um comando à entrada do próximo.'}},
    {topic:'security',q:{en:'What is the safest general principle for administrative privileges?',pt:'Qual é o princípio geral mais seguro para privilégios administrativos?'},options:['least privilege','always use root','disable updates','share passwords'],answer:'least privilege',explain:{en:'Use only the privileges required for the task.',pt:'Use apenas os privilégios necessários para a tarefa.'}}
  ];
  let index=0,correct=0,wrong=0,streak=0,bestStreak=0,mistakes=[],locked=false,manual=false,timer=null;
  const localize=v=>typeof v==='string'?v:(v?.[getLanguage()]??v?.en??'');
  const readStats=()=>{try{return JSON.parse(storage.getItem(statsKey)||'{}')}catch{return {}}};
  const saveStats=(score)=>{
    const s=readStats();
    s.tests=(s.tests||0)+1;s.questions=(s.questions||0)+questions.length;s.correct=(s.correct||0)+correct;s.incorrect=(s.incorrect||0)+wrong;
    s.bestScore=Math.max(s.bestScore||0,score);s.latestScore=score;s.bestStreak=Math.max(s.bestStreak||0,bestStreak);s.lastCompleted=Date.now();
    storage.setItem(statsKey,JSON.stringify(s));storage.setItem('linuxAcademy.quiz','done');
    window.dispatchEvent(new CustomEvent('academy:quiz-complete',{detail:{score,correct,wrong,bestStreak,stats:s}}));
    onProgressChange?.();
  };
  function render(){
    clearTimeout(timer);locked=false;feedback.className='quiz-feedback';feedback.textContent='';resultEl.hidden=true;nextBtn.hidden=true;
    const q=questions[index];
    topicEl.textContent=(getLanguage()==='pt'?'TÓPICO: ':'TOPIC: ')+q.topic.toUpperCase();
    metaEl.textContent=`${getLanguage()==='pt'?'Pergunta':'Question'} ${index+1} / ${questions.length}`;
    questionEl.textContent=localize(q.q);progress.style.width=`${((index)/questions.length)*100}%`;
    optionsEl.replaceChildren();
    q.options.forEach(opt=>{const b=document.createElement('button');b.type='button';b.dataset.answer=opt;const code=document.createElement('code');code.textContent=opt;b.append(code);b.addEventListener('click',()=>answer(opt,b));optionsEl.append(b);});
  }
  function answer(value,button){
    if(locked)return;locked=true;const q=questions[index],ok=value===q.answer;
    [...optionsEl.children].forEach(b=>{b.disabled=true;if(b.dataset.answer===q.answer)b.classList.add('correct');});
    if(!ok){button.classList.add('wrong');wrong++;streak=0;mistakes.push({index,selected:value});}else{correct++;streak++;bestStreak=Math.max(bestStreak,streak);}
    feedback.className=`quiz-feedback ${ok?'success':'error'}`;
    feedback.textContent=`${ok?(getLanguage()==='pt'?'Correto.':'Correct.'):(getLanguage()==='pt'?'Não é essa.':'Not quite.')} ${localize(q.explain)}`;
    tuxSpeak?.(ok?(getLanguage()==='pt'?'Boa! Continue assim.':'Nice! Keep going.'):(getLanguage()==='pt'?'Quase. Veja a explicação.':'Close. Check the explanation.'));
    if(index===questions.length-1){timer=setTimeout(finish,manual?999999:1250);nextBtn.hidden=false;nextBtn.textContent=getLanguage()==='pt'?'Ver resultado':'View result';nextBtn.onclick=finish;}
    else{nextBtn.hidden=false;nextBtn.textContent=getLanguage()==='pt'?'Próxima':'Next';nextBtn.onclick=next;if(!manual)timer=setTimeout(next,1250);}
  }
  function next(){if(!locked)return;index++;render();}
  function finish(){clearTimeout(timer);const score=Math.round(correct/questions.length*100);progress.style.width='100%';saveStats(score);optionsEl.replaceChildren();feedback.textContent='';nextBtn.hidden=true;resultEl.hidden=false;
    resultEl.innerHTML=`<strong>${getLanguage()==='pt'?'TESTE CONCLUÍDO':'TEST COMPLETE'}</strong><b>${correct} / ${questions.length}</b><span>${score}% ${getLanguage()==='pt'?'de acerto':'accuracy'}</span><small>${getLanguage()==='pt'?'Maior sequência':'Best streak'}: ${bestStreak}</small><div class="quiz-result-actions"><button type="button" id="quizRetry">${getLanguage()==='pt'?'Refazer teste':'Retry test'}</button><button type="button" id="quizContinue">${getLanguage()==='pt'?'Continuar aprendendo':'Continue learning'}</button></div>`;
    resultEl.querySelector('#quizRetry')?.addEventListener('click',reset);resultEl.querySelector('#quizContinue')?.addEventListener('click',()=>document.querySelector('#learn')?.scrollIntoView({behavior:'smooth'}));
    if(score===100)tuxSpeak?.(getLanguage()==='pt'?'100%! Excelente trabalho. 🐧':'100%! Excellent work. 🐧');
  }
  function reset(){index=0;correct=0;wrong=0;streak=0;bestStreak=0;mistakes=[];render();}
  document.querySelector('#quizAutoAdvance')?.addEventListener('change',e=>{manual=!e.target.checked;});
  window.addEventListener('academy:language',()=>{if(!resultEl.hidden){finish();}else render();});
  window.addEventListener('academy:progress-reset',()=>{storage.removeItem(statsKey);reset();});
  render();
  return{readStats,reset,questions};
}
