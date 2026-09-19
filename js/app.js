document.documentElement.classList.add('js');

import { lessons } from './data/lessons.js';
import { applyTranslations, toggleLanguage, getLanguage, t } from './i18n.js';
import { initTux } from './tux.js';
import { initMindMap } from './mindmap.js';
import { initTerminal } from './terminal.js';
import { initCourse } from './course.js';
import { initCommandExplorer } from './commands.js';
import { initDistros } from './distros.js';
import { initSearch } from './search.js';
import { initQuiz } from './quiz.js';

applyTranslations();
const tux = initTux();
initMindMap({ tuxSpeak: tux.speak });

const completedKey = 'linuxAcademy.completedLessons';
const progressLabel = document.querySelector('#progressLabel');
const progressBar = document.querySelector('#progressBar');

function updateProgress() {
  const completed = new Set(JSON.parse(localStorage.getItem(completedKey) || '[]'));
  const quiz = localStorage.getItem('linuxAcademy.quiz') === 'done' ? 1 : 0;
  const challenge = localStorage.getItem('linuxAcademy.challenge') === 'done' ? 1 : 0;
  const total = lessons.length + 2;
  const percent = Math.round(((completed.size + quiz + challenge) / total) * 100);
  progressLabel.textContent = getLanguage() === 'pt' ? `${percent}% concluído` : `${percent}% complete`;
  progressBar.style.width = `${percent}%`;
}

const terminal = initTerminal({
  tuxSpeak: tux.speak,
  onCommand: ({ fs }) => {
    const docs = fs.children?.home?.children?.visitor?.children?.Documents;
    if (docs?.children?.['notes.txt']) {
      localStorage.setItem('linuxAcademy.challenge', 'done');
      const card = document.querySelector('#challengeCard');
      card.classList.add('completed');
      document.querySelector('#challengeStatus').textContent = t('completed');
      tux.speak(t('challengeDone'));
      updateProgress();
    }
  }
});

const course = initCourse({
  onProgressChange: updateProgress,
  terminalRunner: cmd => terminal.run(cmd),
  tuxSpeak: tux.speak
});
const commandData = initCommandExplorer();
const distroData = initDistros({ tuxSpeak: tux.speak });
initSearch({ commands: commandData, distros: distroData, lessons: course.lessons });
initQuiz({ tuxSpeak: tux.speak, onProgressChange: updateProgress });

document.querySelector('#lessonCount').textContent = lessons.length;
document.querySelector('#commandCount').textContent = commandData.length;
document.querySelector('#distroCount').textContent = distroData.length;

function syncChallenge() {
  const done = localStorage.getItem('linuxAcademy.challenge') === 'done';
  document.querySelector('#challengeCard').classList.toggle('completed', done);
  document.querySelector('#challengeStatus').textContent = done ? t('completed') : t('notCompleted');
}

syncChallenge();
updateProgress();

window.addEventListener('academy:progress-reset', () => {
  localStorage.removeItem('linuxAcademy.challenge');
  ['explore', 'create', 'note'].forEach(k => localStorage.removeItem(`linuxAcademy.mission.${k}`));
  const challengeCard = document.querySelector('#challengeCard');
  challengeCard.classList.remove('completed');
  document.querySelector('#challengeStatus').textContent = t('notCompleted');
  document.querySelectorAll('.mission').forEach(m => m.classList.remove('done'));
  document.querySelectorAll('#quizOptions button').forEach(b => b.classList.remove('correct', 'wrong'));
  const feedback = document.querySelector('#quizFeedback');
  feedback.className = 'quiz-feedback';
  feedback.textContent = '';
  tux.speak(t('progressReset'));
  updateProgress();
});

window.addEventListener('academy:language', () => {
  updateProgress();
  syncChallenge();
  renderFsInfo(lastFs);
});

document.querySelector('#languageToggle').addEventListener('click', toggleLanguage);

const menuToggle = document.querySelector('#menuToggle');
const navPanel = document.querySelector('#navPanel');
function closeMenu() {
  navPanel.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}
menuToggle.addEventListener('click', () => {
  const open = navPanel.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
navPanel.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('click', e => {
  if (innerWidth <= 820 && !navPanel.contains(e.target) && !menuToggle.contains(e.target)) closeMenu();
});

const fsInfo = {
  bin: { en: 'Essential command binaries; on many modern systems this path links into /usr.', pt: 'Binários essenciais de comandos; em muitos sistemas modernos este caminho aponta para /usr.' },
  boot: { en: 'Bootloader, kernel and early-boot files.', pt: 'Arquivos do bootloader, kernel e inicialização.' },
  dev: { en: 'Device nodes representing hardware and virtual devices.', pt: 'Nós de dispositivos que representam hardware e dispositivos virtuais.' },
  etc: { en: 'System-wide configuration files.', pt: 'Arquivos de configuração do sistema.' },
  home: { en: 'Personal directories for regular users.', pt: 'Diretórios pessoais de usuários comuns.' },
  media: { en: 'Common mount point for removable media.', pt: 'Ponto comum de montagem para mídias removíveis.' },
  mnt: { en: 'Traditional temporary mount point.', pt: 'Ponto tradicional para montagens temporárias.' },
  opt: { en: 'Optional third-party application software.', pt: 'Software opcional de terceiros.' },
  proc: { en: 'Virtual filesystem exposing process and kernel information.', pt: 'Filesystem virtual que expõe informações de processos e do kernel.' },
  root: { en: 'Home directory for the root user.', pt: 'Diretório pessoal do usuário root.' },
  run: { en: 'Runtime state data since boot.', pt: 'Dados de estado em tempo de execução desde o boot.' },
  srv: { en: 'Data served by system services.', pt: 'Dados fornecidos por serviços do sistema.' },
  sys: { en: 'Virtual filesystem exposing kernel and device information.', pt: 'Filesystem virtual que expõe informações do kernel e dispositivos.' },
  tmp: { en: 'Temporary files; retention depends on the system.', pt: 'Arquivos temporários; a retenção depende do sistema.' },
  usr: { en: 'Most user-space programs, libraries and shared data.', pt: 'Grande parte dos programas, bibliotecas e dados compartilhados do user space.' },
  var: { en: 'Variable data such as logs, caches and spools.', pt: 'Dados variáveis como logs, caches e filas.' }
};

const fsTree = document.querySelector('#filesystemTree');
let lastFs = null;
function renderFsInfo(name) {
  if (!name) return;
  const desc = fsInfo[name]?.[getLanguage()] || fsInfo[name]?.en || '';
  document.querySelector('#filesystemInfo').textContent = `/${name} — ${desc}`;
}
Object.keys(fsInfo).forEach(name => {
  const b = document.createElement('button');
  b.type = 'button';
  b.className = 'fs-button';
  b.textContent = `/${name}`;
  b.addEventListener('click', () => { lastFs = name; renderFsInfo(name); });
  fsTree.append(b);
});

const io = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) {
    e.target.classList.add('in-view');
    io.unobserve(e.target);
  }
}), { threshold: .07 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

const aura = document.querySelector('#cursorAura');
let glowFrame = null;
window.addEventListener('pointermove', e => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (glowFrame) return;
  glowFrame = requestAnimationFrame(() => {
    aura.style.left = `${e.clientX}px`;
    aura.style.top = `${e.clientY}px`;
    glowFrame = null;
  });
}, { passive: true });

const mascotCommand = document.querySelector('#mascotCommand');
const commandSequence = ['whoami', 'uname -a', 'ls -la', 'pwd', 'man bash'];
let commandIndex = 0;
setInterval(() => {
  commandIndex = (commandIndex + 1) % commandSequence.length;
  mascotCommand.textContent = commandSequence[commandIndex];
}, 4000);
