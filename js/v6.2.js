/* Interactive Linux Academy V6.2 — Documentation Integrity & UI Consistency */
const v62Messages={
  en:{releaseTitle:'Interactive Linux Academy V6.2 — Documentation Integrity'},
  pt:{releaseTitle:'Interactive Linux Academy V6.2 — Integridade da Documentação'}
};
function syncV62Title(){document.title=v62Messages[getLanguage()]?.releaseTitle||v62Messages.en.releaseTitle;}
function secureExternalReferences(){
  document.querySelectorAll('a[target="_blank"]').forEach(a=>{
    a.rel='noopener noreferrer';
    if(!a.title&&a.href){
      try{a.title=getLanguage()==='pt'?'Abrir referência em uma nova aba':'Open reference in a new tab';}catch{}
    }
  });
}
function migrateLegacyComparator(){
  const legacyKeys=['linuxAcademy.distroComparison','linuxAcademy.distroComparison.v61'];
  legacyKeys.forEach(key=>{
    try{
      const value=JSON.parse(storage.getItem(key)||'null');
      if(Array.isArray(value)&&!storage.getItem('linuxAcademy.distroComparison.v62')){
        storage.setItem('linuxAcademy.distroComparison.v62',JSON.stringify(sanitizeCompareSelection(value)));
        comparisonSelection=readCompareSelection();buildCompareSelects();renderCompare();
      }
      storage.removeItem(key);
    }catch{storage.removeItem(key);}
  });
}
function auditReferenceRegistry(){
  const missing=commands.map(c=>c.name).filter(name=>!getCommandReference(name));
  const generic=Object.entries(documentationReferences).filter(([,ref])=>ref.url==='https://man7.org/linux/man-pages/').map(([name])=>name);
  return{commands:commands.length,linked:commands.length-missing.length,missing,genericFallbacks:generic};
}
window.AcademyReferenceAudit=auditReferenceRegistry;
document.body.dataset.release='6.2';
migrateLegacyComparator();syncV62Title();secureExternalReferences();
window.addEventListener('academy:language',()=>{setTimeout(syncV62Title,0);requestAnimationFrame(secureExternalReferences);});
