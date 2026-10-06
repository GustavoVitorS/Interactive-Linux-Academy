/* Academic dashboard and resume-learning behavior. */
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
