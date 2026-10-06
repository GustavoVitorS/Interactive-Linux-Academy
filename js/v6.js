/* Interactive Linux Academy V6 — Academic Edition */
const v6Messages={
  en:{dashboardLabel:'ACADEMIC PROGRESS',dashboardTitle:'Your Linux learning record',overallProgress:'Overall progress',lessonsCompleted:'Lessons',challengesCompleted:'Challenges',quizAccuracy:'Quiz accuracy',autoAdvance:'Auto advance',quizHelper:'Answer, read the explanation, then continue automatically.',resultsLabel:'YOUR RESULTS',resultsTitle:'Knowledge statistics',accuracy:'Accuracy',testsCompleted:'Tests',correctAnswers:'Correct',incorrectAnswers:'Incorrect',curriculumLabel:'CURRICULUM',curriculumTitle:'One system, many learning paths.',curriculumText:'Build a foundation, then move toward administration, networking, automation, security and containers.',aboutHeadline:'From a CSS drawing to an open-source Linux academy.',aboutText:'V6 turns the project into an academic learning environment: structured curriculum, labs, quizzes, local progress, documentation and a safe terminal simulator.',resumeLearning:'Continue where you stopped'},
  pt:{dashboardLabel:'PROGRESSO ACADÊMICO',dashboardTitle:'Seu registro de aprendizado Linux',overallProgress:'Progresso geral',lessonsCompleted:'Aulas',challengesCompleted:'Desafios',quizAccuracy:'Precisão nos testes',autoAdvance:'Avanço automático',quizHelper:'Responda, leia a explicação e continue automaticamente.',resultsLabel:'SEUS RESULTADOS',resultsTitle:'Estatísticas de conhecimento',accuracy:'Precisão',testsCompleted:'Testes',correctAnswers:'Acertos',incorrectAnswers:'Erros',curriculumLabel:'TRILHA',curriculumTitle:'Um sistema, muitos caminhos.',curriculumText:'Construa uma base sólida e depois avance para administração, redes, automação, segurança e containers.',aboutHeadline:'De um desenho em CSS para uma academia Linux open source.',aboutText:'A V6 transforma o projeto em um ambiente acadêmico: currículo estruturado, laboratórios, testes, progresso local, documentação e terminal seguro.',resumeLearning:'Continuar de onde parei'}
};
const v6t=k=>v6Messages[getLanguage()]?.[k]??v6Messages.en[k]??k;
function applyV6Translations(){document.querySelectorAll('[data-v6-i18n]').forEach(el=>{const v=v6t(el.dataset.v6I18n);if(v!=null)el.textContent=v;});}
function syncV6Title(){document.title=getLanguage()==='pt'?'Interactive Linux Academy V6 — Edição Acadêmica':'Interactive Linux Academy V6 — Academic Edition';}
applyV6Translations();syncV6Title();window.addEventListener('academy:language',()=>{applyV6Translations();syncV6Title();});

/* theme button keeps static icon markup and updates accessible name only */
function syncV6Theme(){if(!themeToggle)return;const light=document.documentElement.dataset.theme==='light';themeToggle.innerHTML='<span class="theme-icon" aria-hidden="true"></span>';themeToggle.setAttribute('aria-label',light?v5t('themeDark'):v5t('themeLight'));document.querySelector('meta[name="theme-color"]')?.setAttribute('content',light?'#f5f7fb':'#070a0f');}
themeToggle?.addEventListener('click',()=>setTimeout(syncV6Theme,0));window.addEventListener('academy:language',syncV6Theme);syncV6Theme();

/* Academic dashboard + resume */
const quizStatsKey='linuxAcademy.quizStats.v6';
function readQuizStats(){try{return JSON.parse(storage.getItem(quizStatsKey)||'{}')}catch{return {}}}
function renderAcademicDashboard(){
  const completed=new Set(JSON.parse(storage.getItem('linuxAcademy.completedLessons')||'[]'));const stats=readQuizStats();const pct=Math.round(completed.size/Math.max(1,lessons.length)*100);
  const labs=lessons.filter(l=>l.type==='LAB'&&completed.has(l.id)).length;const challenges=lessons.filter(l=>l.type==='CHALLENGE'&&completed.has(l.id)).length;
  const set=(id,v)=>{const el=document.querySelector(id);if(el)el.textContent=v};set('#metricOverall',pct+'%');set('#metricLessons',`${completed.size}/${lessons.length}`);set('#metricLabs',labs);set('#metricChallenges',challenges);set('#metricQuizAccuracy',stats.questions?Math.round(stats.correct/stats.questions*100)+'%':'—');
  set('#statAccuracy',stats.questions?Math.round(stats.correct/stats.questions*100)+'%':'—');set('#statTests',stats.tests||0);set('#statCorrect',stats.correct||0);set('#statIncorrect',stats.incorrect||0);
}
['academy:lesson-progress','academy:progress-reset','academy:quiz-complete'].forEach(e=>window.addEventListener(e,renderAcademicDashboard));renderAcademicDashboard();
document.querySelector('#resumeLastLesson')?.addEventListener('click',()=>{const id=storage.getItem('linuxAcademy.lastLesson');const lesson=lessons.find(l=>l.id===id);if(lesson){document.querySelector(`.level-tabs [data-level="${lesson.level}"]`)?.click();setTimeout(()=>document.querySelector(`[data-lesson-id="${id}"]`)?.scrollIntoView({behavior:'smooth',block:'center'}),60);}else document.querySelector('#learn')?.scrollIntoView({behavior:'smooth'});});

/* Curriculum infinite carousel — V6.1 uses a compositor-friendly CSS marquee. */
const curriculumModules=[
 ['01','Foundations','Fundamentos','kernel • GNU/Linux • distros'],['02','Terminal','Terminal','pwd • ls • cd • man'],['03','Filesystem','Sistema de arquivos','FHS • /etc • /var • /proc'],['04','File management','Arquivos','cp • mv • rm • ln'],['05','Text processing','Texto','grep • sed • awk • sort'],['06','Permissions','Permissões','rwx • chmod • chown • sudo'],['07','Packages','Pacotes','apt • dnf • pacman • rpm'],['08','Processes','Processos','ps • top • signals • jobs'],['09','Systemd','Systemd','units • services • journal'],['10','Networking','Redes','ip • ss • curl • ssh'],['11','Storage','Armazenamento','df • du • lsblk • mounts'],['12','Shell & Bash','Shell & Bash','variables • pipes • loops'],['13','Troubleshooting','Diagnóstico','journal • dmesg • evidence'],['14','Security','Segurança','least privilege • SSH • firewall'],['15','Servers','Servidores','services • sockets • logs'],['16','Containers','Containers','namespaces • cgroups • OCI'],['17','Development','Desenvolvimento','Git • PATH • tooling'],['18','Administration','Administração','boot • timers • performance']
];
const viewport=document.querySelector('#curriculumViewport'),track=document.querySelector('#curriculumTrack');
function makeCurriculumCard(m){
  const card=document.createElement('div');
  card.className='curriculum-card';
  card.setAttribute('role','listitem');
  card.innerHTML=`<small>${m[0]}</small><strong>${getLanguage()==='pt'?m[2]:m[1]}</strong><p>${m[3]}</p>`;
  return card;
}
function buildCurriculum(){
  if(!track||!viewport)return;
  track.replaceChildren();
  for(let copy=0;copy<2;copy++){
    const sequence=document.createElement('div');
    sequence.className='curriculum-sequence';
    sequence.dataset.copy=String(copy+1);
    if(copy===1)sequence.setAttribute('aria-hidden','true');
    curriculumModules.forEach(m=>sequence.append(makeCurriculumCard(m)));
    track.append(sequence);
  }
}
if(viewport){buildCurriculum();window.addEventListener('academy:language',()=>requestAnimationFrame(buildCurriculum));}

/* richer docs topics */
docsTopics.push(
 {id:'users',title:{en:'Users & groups',pt:'Usuários e grupos'},summary:{en:'Linux permissions and process ownership are built around user and group identities. Inspect identity before changing access.',pt:'Permissões e propriedade de processos são construídas em torno de identidades de usuários e grupos. Inspecione a identidade antes de alterar acesso.'},command:'id',source:'Linux man-pages',url:'https://man7.org/linux/man-pages/man1/id.1.html'},
 {id:'storage',title:{en:'Storage',pt:'Armazenamento'},summary:{en:'Use df, du, lsblk and findmnt to answer different questions about capacity, directory usage, block devices and mounts.',pt:'Use df, du, lsblk e findmnt para responder perguntas diferentes sobre capacidade, uso de diretórios, dispositivos de bloco e montagens.'},command:'lsblk',source:'Linux man-pages',url:'https://man7.org/linux/man-pages/man8/lsblk.8.html'},
 {id:'security',title:{en:'Security',pt:'Segurança'},summary:{en:'Security begins with updates, least privilege, reviewed services, permissions and careful remote access.',pt:'Segurança começa com atualizações, menor privilégio, revisão de serviços, permissões e acesso remoto cuidadoso.'},command:'id',source:'sudo / Linux manuals',url:'https://www.sudo.ws/docs/man/sudo.man/'},
 {id:'troubleshooting',title:{en:'Troubleshooting',pt:'Diagnóstico'},summary:{en:'Define the symptom, collect logs and system state, then change one thing at a time. Evidence beats guesswork.',pt:'Defina o sintoma, colete logs e estado do sistema e altere uma coisa por vez. Evidências vencem palpites.'},command:'journalctl -b -p warning',source:'systemd journalctl',url:'https://www.freedesktop.org/software/systemd/man/latest/journalctl.html'}
);renderDocs();

/* expand achievement set with real quiz condition */
if(!achievements.some(a=>a.id==='quiz-master'))achievements.push({id:'quiz-master',icon:'100',name:{en:'Quiz Master',pt:'Mestre dos Testes'},test:()=>readQuizStats().bestScore===100});
window.addEventListener('academy:quiz-complete',()=>{renderAchievements();renderAcademicDashboard();});renderAchievements();

/* reset V6 academic state only after user confirmation */
const resetBtn=document.querySelector('#resetProgress');if(resetBtn){const clone=resetBtn.cloneNode(true);resetBtn.replaceWith(clone);clone.addEventListener('click',()=>{const ok=confirm(getLanguage()==='pt'?'Apagar todo o progresso local, resultados e conquistas deste dispositivo?':'Clear all local progress, quiz results and achievements on this device?');if(!ok)return;['linuxAcademy.completedLessons','linuxAcademy.quiz','linuxAcademy.challenge','linuxAcademy.quizStats.v6','linuxAcademy.lastLesson','linuxAcademy.v5.firstCommand'].forEach(k=>storage.removeItem(k));missionDefinitions.forEach(m=>storage.removeItem(missionKey(m.id)));window.dispatchEvent(new CustomEvent('academy:progress-reset'));location.reload();});}

applyV6Translations();renderAcademicDashboard();
