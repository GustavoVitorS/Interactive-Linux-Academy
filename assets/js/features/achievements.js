/* Local achievement system. */
/* Achievements */
const achievements=[
  {id:'first-command',icon:'>_',name:{en:'First Command',pt:'Primeiro Comando'},test:()=>storage.getItem('linuxAcademy.v5.firstCommand')==='1'},
  {id:'filesystem',icon:'/',name:{en:'Filesystem Explorer',pt:'Explorador do Filesystem'},test:()=>storage.getItem(missionKey('files'))==='done'},
  {id:'permissions',icon:'rwx',name:{en:'Permission Granted',pt:'Permissão Concedida'},test:()=>storage.getItem(missionKey('permissions'))==='done'},
  {id:'processes',icon:'PID',name:{en:'Process Inspector',pt:'Inspetor de Processos'},test:()=>storage.getItem(missionKey('processes'))==='done'},
  {id:'network',icon:'↔',name:{en:'Network Navigator',pt:'Navegador de Redes'},test:()=>storage.getItem(missionKey('networking'))==='done'},
  {id:'bash',icon:'$',name:{en:'Bash Beginner',pt:'Iniciante em Bash'},test:()=>storage.getItem(missionKey('bash'))==='done'}
];
function renderAchievements(){
  const list=document.querySelector('#achievementList');if(!list)return;
  list.replaceChildren();
  achievements.forEach(a=>{
    const unlocked=a.test();
    const item=document.createElement('div');item.className=`achievement-item ${unlocked?'unlocked':''}`;
    const i=document.createElement('i');i.textContent=a.icon;
    const b=document.createElement('b');b.textContent=a.name[getLanguage()]||a.name.en;
    const small=document.createElement('small');small.textContent=unlocked?v5t('unlocked'):v5t('locked');
    item.append(i,b,small);list.append(item);
  });
}
window.addEventListener('academy:terminal-command',()=>{
  storage.setItem('linuxAcademy.v5.firstCommand','1');
  renderAchievements();
});
window.addEventListener('academy:language',renderAchievements);
window.addEventListener('academy:lesson-progress',renderAchievements);
window.addEventListener('academy:progress-reset',renderAchievements);
renderAchievements();
