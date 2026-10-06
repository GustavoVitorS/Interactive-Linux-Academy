/* Infinite academic curriculum strip. */
const curriculumModules=[
 ['01','Foundations','Fundamentos','kernel • GNU/Linux • distros'],['02','Terminal','Terminal','pwd • ls • cd • man'],['03','Filesystem','Sistema de arquivos','FHS • /etc • /var • /proc'],['04','File management','Arquivos','cp • mv • rm • ln'],['05','Text processing','Texto','grep • sed • awk • sort'],['06','Permissions','Permissões','rwx • chmod • chown • sudo'],['07','Packages','Pacotes','apt • dnf • pacman • rpm'],['08','Processes','Processos','ps • top • signals • jobs'],['09','Systemd','Systemd','units • services • journal'],['10','Networking','Redes','ip • ss • curl • ssh'],['11','Storage','Armazenamento','df • du • lsblk • mounts'],['12','Shell & Bash','Shell & Bash','variables • pipes • loops'],['13','Troubleshooting','Diagnóstico','journal • dmesg • evidence'],['14','Security','Segurança','least privilege • SSH • firewall'],['15','Servers','Servidores','services • sockets • logs'],['16','Containers','Containers','namespaces • cgroups • OCI'],['17','Development','Desenvolvimento','Git • PATH • tooling'],['18','Administration','Administração','boot • timers • performance']
];
const viewport=document.querySelector('#curriculumViewport'),track=document.querySelector('#curriculumTrack');
function makeCurriculumCard(m){
  const card=document.createElement('div');
  card.className='curriculum-card';
  card.setAttribute('role','listitem');
  const index=document.createElement('small');index.textContent=m[0];
  const title=document.createElement('strong');title.textContent=getLanguage()==='pt'?m[2]:m[1];
  const meta=document.createElement('p');meta.textContent=m[3];
  card.append(index,title,meta);
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
