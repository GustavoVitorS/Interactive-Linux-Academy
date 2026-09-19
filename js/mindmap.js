import { t } from './i18n.js';

export function initMindMap({ tuxSpeak } = {}) {
  const stage = document.querySelector('#linuxMindmap');
  const svg = document.querySelector('#mindmapConnectors');
  const hub = document.querySelector('#mindHub');
  const nodes = [...document.querySelectorAll('.mind-node')];
  const start = document.querySelector('#mapStart');
  const visitedKey = 'linuxAcademy.mapVisited';
  let visited = new Set(JSON.parse(localStorage.getItem(visitedKey) || '[]'));
  let raf = null;

  function centerInStage(el) {
    const s = stage.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    return {
      x: r.left - s.left + r.width / 2,
      y: r.top - s.top + r.height / 2
    };
  }

  function connectorColor(node) {
    if (node.classList.contains('node-start') || node.classList.contains('node-terminal') || node.classList.contains('node-filesystem') || node.classList.contains('node-permissions') || node.classList.contains('node-distros')) return 'beginner';
    if (node.classList.contains('node-packages') || node.classList.contains('node-processes') || node.classList.contains('node-network')) return 'intermediate';
    return 'advanced';
  }

  function draw() {
    raf = null;
    if (!stage || !svg || !hub || matchMedia('(max-width: 820px)').matches) {
      svg?.replaceChildren();
      return;
    }
    const width = stage.clientWidth;
    const height = stage.clientHeight;
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    svg.replaceChildren();
    const c = centerInStage(hub);
    nodes.forEach(node => {
      const n = centerInStage(node);
      const dx = n.x - c.x;
      const bend = Math.max(58, Math.abs(dx) * .38);
      const c1x = c.x + Math.sign(dx || 1) * bend;
      const c2x = n.x - Math.sign(dx || 1) * bend;
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', `M ${c.x} ${c.y} C ${c1x} ${c.y}, ${c2x} ${n.y}, ${n.x} ${n.y}`);
      path.classList.add('mind-connector', `connector-${connectorColor(node)}`);
      path.dataset.forNode = node.dataset.mapId;
      if (visited.has(node.dataset.mapId)) path.classList.add('visited');
      svg.append(path);
    });
  }

  function requestDraw() {
    if (!raf) raf = requestAnimationFrame(draw);
  }

  function setActive(node, active) {
    node.classList.toggle('is-linked', active);
    svg?.querySelector(`[data-for-node="${node.dataset.mapId}"]`)?.classList.toggle('active', active);
  }

  function activateNode(node) {
    const id = node.dataset.mapId;
    if (id) {
      visited.add(id);
      localStorage.setItem(visitedKey, JSON.stringify([...visited]));
      node.classList.add('visited');
      svg?.querySelector(`[data-for-node="${id}"]`)?.classList.add('visited');
    }
    const level = node.dataset.level;
    if (level) document.querySelector(`.level-tabs [data-level="${level}"]`)?.click();
    const target = document.querySelector(node.dataset.target);
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    tuxSpeak?.(t('mapJump'));
  }

  nodes.forEach(node => {
    if (visited.has(node.dataset.mapId)) node.classList.add('visited');
    node.addEventListener('mouseenter', () => setActive(node, true));
    node.addEventListener('mouseleave', () => setActive(node, false));
    node.addEventListener('focus', () => setActive(node, true));
    node.addEventListener('blur', () => setActive(node, false));
    node.addEventListener('click', () => activateNode(node));
  });

  start?.addEventListener('click', () => {
    const first = document.querySelector('.mind-node.node-start');
    if (first) activateNode(first);
  });

  const ro = new ResizeObserver(requestDraw);
  ro.observe(stage);
  ro.observe(hub);
  nodes.forEach(n => ro.observe(n));
  window.addEventListener('resize', requestDraw, { passive: true });
  window.addEventListener('academy:language', requestDraw);
  requestDraw();

  return { redraw: requestDraw };
}
