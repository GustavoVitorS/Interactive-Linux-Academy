/* ==========================================================
   Interactive Linux Academy consolidated editorial headings
   Visual consistency, theme regressions and editorial headings.
   ========================================================== */
const v61Headings={
  map:{selector:'.map-editorial h2',en:'YOUR <span class="section-title__accent">LINUX</span> MAP,<br>CONNECTED.',pt:'SEU MAPA DO <span class="section-title__accent">LINUX</span>,<br>CONECTADO.'},
  learn:{selector:'#learn .editorial-heading h2',en:'UNDERSTAND <span class="section-title__accent">LINUX</span><br>FROM THE INSIDE OUT.',pt:'ENTENDA O <span class="section-title__accent">LINUX</span><br>DE DENTRO PARA FORA.'},
  terminal:{selector:'#terminal .terminal-heading-v5 h2',en:'PRACTICE IN THE <span class="section-title__accent">TERMINAL</span><br>IN YOUR BROWSER.',pt:'PRATIQUE NO <span class="section-title__accent">TERMINAL</span><br>DIRETO NO NAVEGADOR.'},
  distros:{selector:'#distros .editorial-heading h2',en:'EXPLORE THE MAIN <span class="section-title__accent">DISTRIBUTIONS</span>.',pt:'EXPLORE AS PRINCIPAIS <span class="section-title__accent">DISTRIBUIÇÕES</span>.'},
  commands:{selector:'#commands .editorial-heading h2',en:'A <span class="section-title__accent">LINUX</span> REFERENCE<br>YOU CAN PRACTICE.',pt:'UMA REFERÊNCIA <span class="section-title__accent">LINUX</span><br>QUE VOCÊ PODE PRATICAR.'},
  docs:{selector:'#resources .editorial-heading h2',en:'READ THE CONCEPT.<br><span class="section-title__accent">VERIFY</span> THE SOURCE.',pt:'LEIA O CONCEITO.<br><span class="section-title__accent">CONFIRA</span> A FONTE.'},
  concepts:{selector:'#concepts .editorial-heading h2',en:'SEE HOW <span class="section-title__accent">LINUX</span><br>IS ORGANIZED.',pt:'VEJA COMO O <span class="section-title__accent">LINUX</span><br>É ORGANIZADO.'},
  windows:{selector:'#windows-linux .section-heading h2',en:'TRANSLATE FAMILIAR IDEAS<br>INTO <span class="section-title__accent">LINUX</span> CONCEPTS.',pt:'TRADUZA IDEIAS CONHECIDAS<br>PARA CONCEITOS DO <span class="section-title__accent">LINUX</span>.'},
  curriculum:{selector:'#roadmap .curriculum-heading-v6 h2',en:'ONE SYSTEM,<br>MANY <span class="section-title__accent">PATHS</span>.',pt:'UM SISTEMA,<br>MUITOS <span class="section-title__accent">CAMINHOS</span>.'},
  about:{selector:'#about h2',en:'FROM A CSS DRAWING<br>TO AN <span class="section-title__accent">INTERACTIVE</span> LINUX ACADEMY.',pt:'DE UM DESENHO EM CSS<br>PARA UMA ACADEMIA <span class="section-title__accent">LINUX</span> INTERATIVA.'}
};
function applyV61Headings(){
  const lang=getLanguage()==='pt'?'pt':'en';
  Object.values(v61Headings).forEach(item=>{
    const el=document.querySelector(item.selector);
    if(!el)return;
    el.classList.add('v61-editorial-title');
    setSafeRichText(el,item[lang]);
  });
}
function syncV61Document(){
  document.documentElement.dataset.version='6.1';
  document.title=getLanguage()==='pt'?'Interactive Linux Academy consolidated editorial headings — Refinamento Visual':'Interactive Linux Academy consolidated editorial headings — Visual Consistency Update';
}
function applyV61(){applyV61Headings();syncV61Document();}
applyV61();
window.addEventListener('academy:language',()=>setTimeout(applyV61,0));
