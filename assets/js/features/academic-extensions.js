/* Academic documentation augmentation, quiz achievement and reset behavior. */
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
