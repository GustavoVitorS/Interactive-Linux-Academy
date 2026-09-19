import { t } from './i18n.js';
export function initQuiz({tuxSpeak,onProgressChange}={}){
  const options=[...document.querySelectorAll('#quizOptions button')],feedback=document.querySelector('#quizFeedback');let last=null;
  function show(ok){feedback.className=`quiz-feedback ${ok?'success':'error'}`;feedback.innerHTML=ok?t('quizCorrect'):t('quizWrong');}
  options.forEach(btn=>btn.addEventListener('click',()=>{options.forEach(b=>b.classList.remove('correct','wrong'));const ok=btn.dataset.answer==='pwd';last=ok;btn.classList.add(ok?'correct':'wrong');show(ok);if(ok){localStorage.setItem('linuxAcademy.quiz','done');tuxSpeak?.(t('quizCorrect').replace(/<[^>]+>/g,''));onProgressChange?.();}}));
  window.addEventListener('academy:language',()=>{if(last!==null)show(last);});
}
