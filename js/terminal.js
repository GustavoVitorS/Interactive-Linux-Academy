import { t, getLanguage } from './i18n.js';
import { commands } from './data/commands.js';

const clone = obj => JSON.parse(JSON.stringify(obj));
const baseFs = {
  type: 'dir', children: {
    home: { type: 'dir', children: { visitor: { type: 'dir', children: {
      Documents: { type: 'dir', children: {
        'welcome.txt': { type: 'file', content: 'Practice here. Try mkdir, touch, cat, cp, mv, grep and find.' }
      } },
      Downloads: { type: 'dir', children: {} },
      Projects: { type: 'dir', children: { demo: { type: 'dir', children: {
        'app.log': { type: 'file', content: 'INFO boot complete\nWARN demo warning\nERROR simulated error\nINFO ready' }
      } } } },
      'README.txt': { type: 'file', content: 'Welcome to Linux Interactive Academy. This terminal is a safe browser simulation.' },
      '.bashrc': { type: 'file', content: '# simulated bash configuration\nalias ll="ls -la"' }
    } } } },
    etc: { type: 'dir', children: { 'os-release': { type: 'file', content: 'NAME="Linux Academy Web"\nID=linux-academy' } } },
    tmp: { type: 'dir', children: {} },
    usr: { type: 'dir', children: { bin: { type: 'dir', children: {} } } },
    var: { type: 'dir', children: { log: { type: 'dir', children: { 'academy.log': { type: 'file', content: 'academy started\nterminal ready' } } } } }
  }
};

export function initTerminal({ onCommand, tuxSpeak } = {}) {
  const output = document.querySelector('#terminalOutput');
  const form = document.querySelector('#terminalForm');
  const input = document.querySelector('#terminalInput');
  const prompt = document.querySelector('#terminalPrompt');
  const clearButton = document.querySelector('#terminalClear');
  const chips = [...document.querySelectorAll('#terminalChips [data-command]')];
  const missions = {
    explore: document.querySelector('#missionExplore'),
    create: document.querySelector('#missionCreate'),
    note: document.querySelector('#missionNote')
  };

  let fs = clone(baseFs);
  let cwd = ['home', 'visitor'];
  let history = [];
  let historyIndex = 0;
  let exploredPwd = false;
  let exploredLs = false;

  const pathString = () => '/' + cwd.join('/');
  const displayPath = () => pathString() === '/home/visitor' ? '~' : pathString().replace('/home/visitor', '~');
  const updatePrompt = () => { prompt.textContent = `visitor@linux-academy:${displayPath()}$`; };
  const print = (text = '', type = '') => {
    const p = document.createElement('div');
    p.className = `terminal-line ${type}`;
    p.textContent = String(text);
    output.append(p);
    output.scrollTop = output.scrollHeight;
  };

  const resolve = (path = '.') => {
    if (path === '~') return ['home', 'visitor'];
    const parts = path.startsWith('/') ? [] : [...cwd];
    path.split('/').filter(Boolean).forEach(part => {
      if (part === '.') return;
      if (part === '..') parts.pop();
      else if (part === '~') parts.splice(0, parts.length, 'home', 'visitor');
      else parts.push(part);
    });
    return parts;
  };

  const getNode = parts => {
    let node = fs;
    for (const part of parts) {
      if (node.type !== 'dir' || !node.children[part]) return null;
      node = node.children[part];
    }
    return node;
  };

  const parentAndName = path => {
    const parts = resolve(path);
    const name = parts.pop();
    return [getNode(parts), name, parts];
  };

  const parse = line => {
    const m = line.match(/(?:[^\s"']+|"[^"]*"|'[^']*')+/g) || [];
    return m.map(s => s.replace(/^("|')|("|')$/g, ''));
  };

  const listNode = (node, showAll = false, long = false) => {
    if (!node || node.type !== 'dir') return null;
    const names = Object.keys(node.children).filter(n => showAll || !n.startsWith('.')).sort();
    if (!long) return names.join('  ');
    return names.map(n => `${node.children[n].type === 'dir' ? 'drwxr-xr-x' : '-rw-r--r--'}  visitor visitor  ${n}`).join('\n');
  };

  const treeText = (node, prefix = '', depth = 0) => {
    if (!node || node.type !== 'dir' || depth > 6) return '';
    const entries = Object.entries(node.children).filter(([n]) => !n.startsWith('.')).sort(([a], [b]) => a.localeCompare(b));
    return entries.map(([name, child], index) => {
      const last = index === entries.length - 1;
      const branch = last ? '└── ' : '├── ';
      const line = `${prefix}${branch}${name}${child.type === 'dir' ? '/' : ''}`;
      if (child.type !== 'dir') return line;
      const nextPrefix = prefix + (last ? '    ' : '│   ');
      const below = treeText(child, nextPrefix, depth + 1);
      return below ? `${line}\n${below}` : line;
    }).join('\n');
  };

  function fileText(path) {
    const node = getNode(resolve(path));
    if (!node) return { error: `${path}: No such file or directory` };
    if (node.type !== 'file') return { error: `${path}: Is a directory` };
    return { text: node.content };
  }

  function setMission(key, done = true) {
    if (!missions[key]) return;
    missions[key].classList.toggle('done', done);
    if (done) localStorage.setItem(`linuxAcademy.mission.${key}`, 'done');
  }

  function syncMissions() {
    Object.keys(missions).forEach(key => setMission(key, localStorage.getItem(`linuxAcademy.mission.${key}`) === 'done'));
  }

  function checkState(commandName) {
    if (commandName === 'pwd') exploredPwd = true;
    if (commandName === 'ls') exploredLs = true;
    if (exploredPwd && exploredLs) setMission('explore');
    const home = fs.children?.home?.children?.visitor;
    if (home?.children?.['linux-lab']?.type === 'dir') setMission('create');
    const docs = home?.children?.Documents;
    if (docs?.children?.['notes.txt']) setMission('note');
  }

  const terminalCommands = {
    help() {
      print('Available commands:', 'info');
      print('pwd  ls  cd  mkdir  rmdir  touch  cat  echo  cp  mv  rm  tree');
      print('grep  find  head  tail  wc  whoami  id  hostname  uname  date  history  man');
      print('ps  top  kill  chmod  chown  df  du  lsblk  findmnt  ip  ping  ssh');
      print('systemctl  journalctl  bash  sudo  apt  dnf  pacman  zypper  apk');
      print('clear  neofetch  cowsay  fortune  reset');
      print('Tip: use ↑/↓ for history and Tab for command completion.', 'muted');
    },
    pwd() { print(pathString()); },
    ls(args) {
      const flags = args.filter(a => a.startsWith('-')).join('');
      const target = args.find(a => !a.startsWith('-')) || '.';
      const node = getNode(resolve(target));
      if (!node) return print(`ls: cannot access '${target}': No such file or directory`, 'error');
      if (node.type === 'file') return print(target);
      print(listNode(node, flags.includes('a'), flags.includes('l')));
    },
    cd(args) {
      const target = args[0] || '~';
      const parts = resolve(target);
      const node = getNode(parts);
      if (!node) return print(`cd: ${target}: No such file or directory`, 'error');
      if (node.type !== 'dir') return print(`cd: ${target}: Not a directory`, 'error');
      cwd = parts;
      updatePrompt();
    },
    mkdir(args) {
      if (!args.length) return print('mkdir: missing operand', 'error');
      args.filter(a => !a.startsWith('-')).forEach(path => {
        const [parent, name] = parentAndName(path);
        if (!parent || parent.type !== 'dir' || !name) return print(`mkdir: cannot create '${path}'`, 'error');
        if (parent.children[name]) return print(`mkdir: cannot create directory '${path}': File exists`, 'error');
        parent.children[name] = { type: 'dir', children: {} };
      });
    },
    rmdir(args) {
      if (!args.length) return print('rmdir: missing operand', 'error');
      args.forEach(path => {
        const [parent, name] = parentAndName(path);
        const node = parent?.children?.[name];
        if (!node) return print(`rmdir: failed to remove '${path}': No such file or directory`, 'error');
        if (node.type !== 'dir') return print(`rmdir: failed to remove '${path}': Not a directory`, 'error');
        if (Object.keys(node.children).length) return print(`rmdir: failed to remove '${path}': Directory not empty`, 'error');
        delete parent.children[name];
      });
    },
    touch(args) {
      if (!args.length) return print('touch: missing file operand', 'error');
      args.forEach(path => {
        const [parent, name] = parentAndName(path);
        if (!parent || parent.type !== 'dir' || !name) return print(`touch: cannot touch '${path}'`, 'error');
        if (!parent.children[name]) parent.children[name] = { type: 'file', content: '' };
      });
    },
    cat(args) {
      if (!args.length) return print('cat: missing file operand', 'error');
      args.forEach(path => {
        const result = fileText(path);
        if (result.error) print(`cat: ${result.error}`, 'error'); else print(result.text);
      });
    },
    echo(args, rawLine) {
      if(rawLine.trim()==='echo $SHELL') return print('/bin/bash');
      if(rawLine.trim()==='echo $?') return print('0');
      const redirect = rawLine.match(/^echo\s+(.+?)\s*(>>|>)\s*([^\s]+)\s*$/);
      if (redirect) {
        let [, text, op, path] = redirect;
        text = text.replace(/^("|')|("|')$/g, '');
        const [parent, name] = parentAndName(path);
        if (!parent || parent.type !== 'dir') return print(`echo: ${path}: No such file or directory`, 'error');
        const previous = parent.children[name]?.type === 'file' ? parent.children[name].content : '';
        parent.children[name] = { type: 'file', content: op === '>>' && previous ? `${previous}\n${text}` : text };
        return;
      }
      print(args.join(' '));
    },
    cp(args) {
      if (args.length < 2) return print('cp: missing file operand', 'error');
      const source = getNode(resolve(args[0]));
      if (!source) return print(`cp: cannot stat '${args[0]}': No such file or directory`, 'error');
      if (source.type !== 'file') return print('cp: simulator currently copies files only', 'error');
      const [parent, name] = parentAndName(args[1]);
      if (!parent || parent.type !== 'dir') return print(`cp: cannot create '${args[1]}'`, 'error');
      parent.children[name] = clone(source);
    },
    mv(args) {
      if (args.length < 2) return print('mv: missing file operand', 'error');
      const [sourceParent, sourceName] = parentAndName(args[0]);
      const source = sourceParent?.children?.[sourceName];
      if (!source) return print(`mv: cannot stat '${args[0]}': No such file or directory`, 'error');
      const [targetParent, targetName] = parentAndName(args[1]);
      if (!targetParent || targetParent.type !== 'dir') return print(`mv: cannot move to '${args[1]}'`, 'error');
      targetParent.children[targetName] = source;
      delete sourceParent.children[sourceName];
    },
    rm(args) {
      const paths = args.filter(a => !a.startsWith('-'));
      const recursive = args.some(a => a.includes('r'));
      if (!paths.length) return print('rm: missing operand', 'error');
      paths.forEach(path => {
        const [parent, name] = parentAndName(path);
        const node = parent?.children?.[name];
        if (!node) return print(`rm: cannot remove '${path}': No such file or directory`, 'error');
        if (node.type === 'dir' && !recursive) return print(`rm: cannot remove '${path}': Is a directory`, 'error');
        delete parent.children[name];
      });
    },
    tree(args) {
      const target = args[0] || '.';
      const node = getNode(resolve(target));
      if (!node) return print(`${target}: No such file or directory`, 'error');
      if (node.type === 'file') return print(target);
      print(`${target}\n${treeText(node) || '(empty)'}`);
    },
    grep(args) {
      if (args.length < 2) return print('grep: usage: grep PATTERN FILE', 'error');
      const pattern = args[0];
      const result = fileText(args[1]);
      if (result.error) return print(`grep: ${result.error}`, 'error');
      const hits = result.text.split('\n').filter(line => line.toLowerCase().includes(pattern.toLowerCase()));
      print(hits.join('\n'));
    },
    find(args) {
      const rootPath = args[0] && !args[0].startsWith('-') ? args[0] : '.';
      const nameIndex = args.indexOf('-name');
      const pattern = nameIndex >= 0 ? args[nameIndex + 1] : null;
      const rootParts = resolve(rootPath);
      const root = getNode(rootParts);
      if (!root || root.type !== 'dir') return print(`find: '${rootPath}': No such directory`, 'error');
      const regex = pattern ? new RegExp('^' + pattern.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*').replace(/\?/g, '.') + '$') : null;
      const results = [];
      function walk(node, parts) {
        Object.entries(node.children).forEach(([name, child]) => {
          const next = [...parts, name];
          if (!regex || regex.test(name)) results.push('/' + next.join('/'));
          if (child.type === 'dir') walk(child, next);
        });
      }
      walk(root, rootParts);
      print(results.join('\n'));
    },
    head(args) {
      const path = args.at(-1);
      if (!path) return print('head: missing file operand', 'error');
      const result = fileText(path);
      if (result.error) return print(`head: ${result.error}`, 'error');
      const nIndex = args.indexOf('-n');
      const count = nIndex >= 0 ? Number(args[nIndex + 1]) || 10 : 10;
      print(result.text.split('\n').slice(0, count).join('\n'));
    },
    tail(args) {
      const path = args.at(-1);
      if (!path) return print('tail: missing file operand', 'error');
      const result = fileText(path);
      if (result.error) return print(`tail: ${result.error}`, 'error');
      const nIndex = args.indexOf('-n');
      const count = nIndex >= 0 ? Number(args[nIndex + 1]) || 10 : 10;
      print(result.text.split('\n').slice(-count).join('\n'));
    },
    wc(args) {
      const path = args.at(-1);
      if (!path) return print('wc: missing file operand', 'error');
      const result = fileText(path);
      if (result.error) return print(`wc: ${result.error}`, 'error');
      const lines = result.text ? result.text.split('\n').length : 0;
      const words = result.text.trim() ? result.text.trim().split(/\s+/).length : 0;
      print(`${lines} ${words} ${result.text.length} ${path}`);
    },
    clear() { output.replaceChildren(); },
    whoami() { print('visitor'); },
    id() { print('uid=1000(visitor) gid=1000(visitor) groups=1000(visitor),27(sudo)'); },
    hostname() { print('linux-academy'); },
    uname(args) { print(args.includes('-a') ? 'Linux linux-academy 6.1.0 virtual x86_64 GNU/Linux' : 'Linux'); },
    date() { print(new Date().toString()); },
    history() { history.forEach((h, i) => print(`${String(i + 1).padStart(3)}  ${h}`)); },
    man(args) {
      if (!args[0]) return print('What manual page do you want?', 'error');
      const name = args[0];
      const doc = commands.find(c => c.name === name);
      if (doc) {
        const lang = getLanguage();
        const local = v => typeof v === 'string' ? v : (v?.[lang] ?? v?.en ?? '');
        let text = `${name.toUpperCase()} — learning manual\n\n${local(doc.description)}\n\nSYNOPSIS\n  ${doc.syntax}\n\nEXAMPLE\n  ${doc.example}`;
        if (doc.risk) text += `\n\nWARNING\n  ${local(doc.risk)}`;
        text += '\n\nThis is a safe summary. Open the Command Explorer and official documentation for the complete manual.';
        return print(text);
      }
      if (name === 'bash') return print('BASH — GNU Bourne-Again SHell\n\nBash is a shell and command language. This lab simulates only selected shell behavior.\nOfficial manual: https://www.gnu.org/software/bash/manual/bash.html');
      print(`No simulated manual entry for ${name}. Try the Command Explorer or an official man page.`, 'muted');
    },
    neofetch() {
      print('      .--.        visitor@linux-academy\n     |o_o |       ---------------------\n     |:_/ |       OS: Linux Academy Web\n    //   \\ \\      Kernel: Browser\n   (|     | )     Shell: virtual-shell\n  /\'\\_   _/`\\     Terminal: Practice Lab\n  \\___)=(___/     Theme: GNOME Dark');
    },
    cowsay(args) {
      const msg = args.join(' ') || 'Linux is fun.';
      print(` ${'_'.repeat(Math.min(msg.length + 2, 54))}\n< ${msg.slice(0, 50)} >\n ${'-'.repeat(Math.min(msg.length + 2, 54))}\n        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||`);
    },
    fortune() {
      const lines = ['Read the manual, then experiment in a safe place.', 'Small commands become powerful when you understand composition.', 'Backups are easier than recovery.'];
      print(lines[Math.floor(Math.random() * lines.length)]);
    },
    sudo(args) {
      if (!args.length) return print('sudo: a command is required', 'error');
      const [name, ...rest] = args;
      if (['apt', 'dnf', 'pacman', 'zypper', 'apk'].includes(name)) return terminalCommands[name](rest, args.join(' '));
      print(`Simulation: sudo would request elevated privileges before running: ${args.join(' ')}\nNothing was executed on your real system.`, 'info');
    },
    apt(args) {
      const action = args[0] || 'help';
      if (action === 'install') print(`Simulation: apt would install ${args.slice(1).join(' ') || 'a package'}. No package was changed.`, 'success');
      else if (action === 'update') print('Simulation: apt would refresh package indexes. No network request was made.', 'success');
      else print('Simulated apt: try "apt update" or "apt install curl".', 'info');
    },
    dnf(args) {
      if (args[0] === 'install') print(`Simulation: dnf would install ${args.slice(1).join(' ') || 'a package'}. No package was changed.`, 'success');
      else print('Simulated dnf: try "dnf install curl".', 'info');
    },
    pacman(args) {
      if (args.includes('-S')) print(`Simulation: pacman would install ${args.filter(a => !a.startsWith('-')).join(' ') || 'a package'}. No package was changed.`, 'success');
      else print('Simulated pacman: try "pacman -S curl".', 'info');
    },
    zypper(args) {
      if (['install','in'].includes(args[0])) print(`Simulation: zypper would install ${args.slice(1).join(' ') || 'a package'}. No package was changed.`, 'success');
      else print('Simulated zypper: try "zypper install curl".', 'info');
    },
    apk(args) {
      if (args[0]==='add') print(`Simulation: apk would add ${args.slice(1).join(' ') || 'a package'}. No package was changed.`, 'success');
      else print('Simulated apk: try "apk add curl".', 'info');
    },
    ps(args) { print('USER       PID %CPU %MEM COMMAND\nvisitor   1337  0.1  0.4 virtual-shell\nvisitor   1452  0.0  0.2 academy-ui'); },
    top() { print('top — simulated snapshot\nTasks: 2 total, 1 running, 1 sleeping\n%Cpu(s): 2.0 us, 1.0 sy, 97.0 id\nPID   USER      COMMAND\n1337  visitor   virtual-shell\n1452  visitor   academy-ui'); },
    kill(args) { if(!args.length)return print('kill: usage: kill PID','error'); print(`Simulation: signal would be sent to PID ${args.at(-1)}. No real process was affected.`, 'info'); },
    chmod(args) { if(args.length<2)return print('chmod: missing operand','error'); print(`Simulation: mode ${args[0]} would be applied to ${args.slice(1).join(' ')}.`, 'success'); },
    chown(args) { if(args.length<2)return print('chown: missing operand','error'); print(`Simulation: ownership of ${args.slice(1).join(' ')} would change to ${args[0]}.`, 'success'); },
    df() { print('Filesystem      Size  Used Avail Use% Mounted on\nvirtual-root    20G   4.2G   15G  22% /'); },
    du(args) { print(`12K\t${args.at(-1)||'.'}`); },
    lsblk() { print('NAME   SIZE TYPE MOUNTPOINTS\nvda     20G disk \n└─vda1  20G part /'); },
    findmnt() { print('TARGET SOURCE    FSTYPE OPTIONS\n/      /dev/vda1 ext4   rw,relatime'); },
    ip(args) { if(args[0]==='route') print('default via 192.0.2.1 dev eth0\n192.0.2.0/24 dev eth0 proto kernel'); else print('1: lo: <LOOPBACK,UP> mtu 65536\n    inet 127.0.0.1/8 scope host lo\n2: eth0: <BROADCAST,MULTICAST,UP> mtu 1500\n    inet 192.0.2.10/24 scope global eth0'); },
    ping(args) { const host=args.filter(a=>!a.startsWith('-')).at(-1)||'example.com'; print(`PING ${host} (192.0.2.20): simulated\n64 bytes from 192.0.2.20: icmp_seq=1 ttl=64 time=12.4 ms\n--- ${host} ping statistics ---\n1 packets transmitted, 1 received, 0% packet loss`); },
    ssh(args) { const target=args.at(-1)||'user@server.example'; print(`Simulation only: an SSH client would attempt an encrypted connection to ${target}.\nNo network connection was made by this browser lab.`, 'info'); },
    systemctl(args) { const action=args[0]||'status',unit=args[1]||'ssh'; if(action==='list-timers')return print('NEXT                        UNIT               ACTIVATES\nFri 18:00                   demo.timer         demo.service'); print(`● ${unit}.service - Simulated service\n   Loaded: loaded\n   Active: active (running)\nAction requested: ${action}`); },
    journalctl(args) { print('Sep 18 10:00:01 linux-academy systemd[1]: Started Simulated Academy.\nSep 18 10:00:02 linux-academy academy[1337]: terminal ready\nSep 18 10:00:04 linux-academy academy[1337]: learning session active'); },
    bash(args) { if(!args.length)return print('GNU bash, version simulated\nThis lab does not execute arbitrary scripts.','info'); print(`Simulation: Bash would read and execute ${args.join(' ')}. Arbitrary code execution is disabled here.`, 'info'); },
    reset() {
      fs = clone(baseFs);
      cwd = ['home', 'visitor'];
      history = [];
      historyIndex = 0;
      exploredPwd = false;
      exploredLs = false;
      Object.keys(missions).forEach(key => localStorage.removeItem(`linuxAcademy.mission.${key}`));
      syncMissions();
      updatePrompt();
      print('Virtual filesystem reset.', 'success');
    }
  };

  function run(line, echo = true) {
    const trimmed = line.trim();
    if (!trimmed) return;
    if (echo) print(`${prompt.textContent} ${trimmed}`, 'command');
    history.push(trimmed);
    historyIndex = history.length;
    const simplePipe=trimmed.match(/^cat\s+([^|]+?)\s*\|\s*grep\s+(.+)$/);
    if(simplePipe){
      const path=simplePipe[1].trim();const pattern=simplePipe[2].trim().replace(/^("|')|("|')$/g,'');const result=fileText(path);
      if(result.error) print(`cat: ${result.error}`,'error'); else print(result.text.split('\n').filter(line=>line.toLowerCase().includes(pattern.toLowerCase())).join('\n'));
      checkState('grep');onCommand?.({command:'grep',args:[pattern,path],cwd:pathString(),fs});return;
    }
    const [name, ...args] = parse(trimmed);
    const fn = terminalCommands[name];
    if (fn) fn(args, trimmed); else print(`command not found: ${name}\nTry "help" to see available commands.`, 'error');
    checkState(name);
    const detail = { command: name, args, cwd: pathString(), fs };
    onCommand?.(detail);
    window.dispatchEvent(new CustomEvent('academy:terminal-command', { detail }));
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    const line = input.value;
    input.value = '';
    run(line);
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      historyIndex = Math.max(0, historyIndex - 1);
      input.value = history[historyIndex] || '';
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      historyIndex = Math.min(history.length, historyIndex + 1);
      input.value = history[historyIndex] || '';
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      const value = input.value.trim();
      if (!value || value.includes(' ')) return;
      const matches = Object.keys(terminalCommands).filter(name => name.startsWith(value)).sort();
      if (matches.length === 1) input.value = `${matches[0]} `;
      else if (matches.length > 1) print(matches.join('  '), 'muted');
    }
  });

  document.addEventListener('keydown', e => {
    if (e.ctrlKey && e.key.toLowerCase() === 'l' && document.activeElement === input) {
      e.preventDefault();
      terminalCommands.clear();
    }
  });

  clearButton.addEventListener('click', () => commands.clear());
  chips.forEach(chip => chip.addEventListener('click', () => {
    input.value = chip.dataset.command;
    input.focus();
  }));
  output.addEventListener('click', () => input.focus());

  output.replaceChildren();
    print('Linux Interactive Academy — Practice Lab', 'info');
  print('This is a safe browser simulation. Type "help" to see available commands.');
  print('Try: pwd   ls -la   cd Documents   cat welcome.txt', 'muted');
  updatePrompt();
  syncMissions();
  tuxSpeak?.(t('tuxTerminal'));

  return { run, getFs: () => fs, getCwd: pathString };
}
