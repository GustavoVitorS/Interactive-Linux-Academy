import { t } from './i18n.js';

export function initTux() {
  const wrap = document.querySelector('#tuxWrap');
  const tux = document.querySelector('#tux');
  const head = document.querySelector('#tuxHead');
  const pupils = [...document.querySelectorAll('.pupil')];
  const leftEye = document.querySelector('#tuxEyeLeft');
  const rightEye = document.querySelector('#tuxEyeRight');
  const speech = document.querySelector('#tuxSpeech');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  let lastMove = Date.now();
  let target = { x: innerWidth / 2, y: innerHeight / 2 };
  let frame = null;
  let blinkTimer = null;
  let dwellTimer = null;
  let reactionTimer = null;
  let movedOnce = false;
  let winkedThisVisit = false;

  function speak(text) {
    if (speech) speech.textContent = text;
  }

  function setEyeOpen(eye, value) {
    eye?.style.setProperty('--eye-open', String(value));
  }

  function closeBoth() {
    setEyeOpen(leftEye, .08);
    setEyeOpen(rightEye, .08);
  }

  function openBoth() {
    setEyeOpen(leftEye, 1);
    setEyeOpen(rightEye, 1);
  }

  function blink() {
    if (reduced) return;
    closeBoth();
    setTimeout(openBoth, 125);
    scheduleBlink();
  }

  function wink() {
    if (reduced) return;
    const eye = Math.random() > .5 ? leftEye : rightEye;
    setEyeOpen(eye, .06);
    tux.classList.add('is-winking');
    speak(t('tuxWink'));
    setTimeout(() => {
      setEyeOpen(eye, 1);
      tux.classList.remove('is-winking');
    }, 260);
  }

  function scheduleBlink() {
    clearTimeout(blinkTimer);
    blinkTimer = setTimeout(blink, 3200 + Math.random() * 3600);
  }

  function update() {
    frame = null;
    if (reduced || !tux) return;
    const rect = tux.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height * .28;
    const dx = target.x - cx;
    const dy = target.y - cy;
    const angle = Math.atan2(dy, dx);
    const dist = Math.min(1, Math.hypot(dx, dy) / 430);
    const px = Math.cos(angle) * 7.5 * dist;
    const py = Math.sin(angle) * 6.1 * dist;
    pupils.forEach(p => {
      p.style.setProperty('--px', `${px}px`);
      p.style.setProperty('--py', `${py}px`);
    });
    const nx = Math.max(-1, Math.min(1, dx / 520));
    const ny = Math.max(-1, Math.min(1, dy / 420));
    wrap.style.setProperty('--body-x', `${nx * 4}px`);
    wrap.style.setProperty('--body-y', `${ny * 2.5}px`);
    wrap.style.setProperty('--body-r', `${nx * 1.15}deg`);
    head.style.setProperty('--head-r', `${nx * 3.1}deg`);
  }

  function move(x, y) {
    target = { x, y };
    lastMove = Date.now();
    tux.classList.remove('is-idle');
    if (!movedOnce) {
      movedOnce = true;
      setTimeout(() => speak(t('tuxMove')), 260);
    }
    if (!frame) frame = requestAnimationFrame(update);
  }

  function react() {
    if (reduced) {
      speak(t('tuxClick'));
      return;
    }
    clearTimeout(reactionTimer);
    tux.classList.remove('react-happy', 'react-surprised');
    void tux.offsetWidth;
    tux.classList.add(Math.random() > .45 ? 'react-happy' : 'react-surprised');
    speak(t('tuxClick'));
    reactionTimer = setTimeout(() => tux.classList.remove('react-happy', 'react-surprised'), 850);
  }

  window.addEventListener('pointermove', e => move(e.clientX, e.clientY), { passive: true });
  window.addEventListener('pointerdown', e => move(e.clientX, e.clientY), { passive: true });

  wrap?.addEventListener('pointerenter', () => {
    winkedThisVisit = false;
    clearTimeout(dwellTimer);
    dwellTimer = setTimeout(() => {
      if (!winkedThisVisit) {
        winkedThisVisit = true;
        wink();
      }
    }, 1850);
  });
  wrap?.addEventListener('pointerleave', () => clearTimeout(dwellTimer));
  wrap?.addEventListener('click', react);
  wrap?.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      react();
    }
  });

  if (!reduced) {
    setInterval(() => {
      if (Date.now() - lastMove > 5200) tux.classList.add('is-idle');
    }, 2400);
    scheduleBlink();
  }

  speak(t('tuxWelcome'));
  window.addEventListener('academy:language', () => speak(t('tuxWelcome')));
  return { speak, blink, wink, react };
}
