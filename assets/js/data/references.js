/* Interactive Linux Academy V6.2 — authoritative documentation registry.
 * Keep external references centralized so Command Explorer, lessons and docs
 * can identify the upstream provider and avoid misleading generic fallbacks.
 */
const documentationReferences={
  pwd:{provider:'man7.org · GNU Coreutils',type:'manual',url:'https://man7.org/linux/man-pages/man1/pwd.1.html'},
  ls:{provider:'man7.org · GNU Coreutils',type:'manual',url:'https://man7.org/linux/man-pages/man1/ls.1.html'},
  cd:{provider:'man7.org · GNU Bash',type:'manual',url:'https://man7.org/linux/man-pages/man1/bash.1.html'},
  mkdir:{provider:'man7.org · GNU Coreutils',type:'manual',url:'https://man7.org/linux/man-pages/man1/mkdir.1.html'},
  touch:{provider:'man7.org · GNU Coreutils',type:'manual',url:'https://man7.org/linux/man-pages/man1/touch.1.html'},
  cat:{provider:'man7.org · GNU Coreutils',type:'manual',url:'https://man7.org/linux/man-pages/man1/cat.1.html'},
  grep:{provider:'man7.org · GNU grep',type:'manual',url:'https://man7.org/linux/man-pages/man1/grep.1.html'},
  find:{provider:'man7.org · GNU Findutils',type:'manual',url:'https://man7.org/linux/man-pages/man1/find.1.html'},
  head:{provider:'man7.org · GNU Coreutils',type:'manual',url:'https://man7.org/linux/man-pages/man1/head.1.html'},
  tail:{provider:'man7.org · GNU Coreutils',type:'manual',url:'https://man7.org/linux/man-pages/man1/tail.1.html'},
  ps:{provider:'procps-ng manual',type:'manual',url:'https://man7.org/linux/man-pages/man1/ps.1.html'},
  top:{provider:'procps-ng manual',type:'manual',url:'https://man7.org/linux/man-pages/man1/top.1.html'},
  kill:{provider:'util-linux manual',type:'manual',url:'https://man7.org/linux/man-pages/man1/kill.1.html'},
  chmod:{provider:'man7.org · GNU Coreutils',type:'manual',url:'https://man7.org/linux/man-pages/man1/chmod.1.html'},
  chown:{provider:'man7.org · GNU Coreutils',type:'manual',url:'https://man7.org/linux/man-pages/man1/chown.1.html'},
  whoami:{provider:'man7.org · GNU Coreutils',type:'manual',url:'https://man7.org/linux/man-pages/man1/whoami.1.html'},
  id:{provider:'man7.org · GNU Coreutils',type:'manual',url:'https://man7.org/linux/man-pages/man1/id.1.html'},
  uname:{provider:'man7.org · GNU Coreutils',type:'manual',url:'https://man7.org/linux/man-pages/man1/uname.1.html'},
  df:{provider:'man7.org · GNU Coreutils',type:'manual',url:'https://man7.org/linux/man-pages/man1/df.1.html'},
  du:{provider:'man7.org · GNU Coreutils',type:'manual',url:'https://man7.org/linux/man-pages/man1/du.1.html'},
  lsblk:{provider:'util-linux manual',type:'manual',url:'https://man7.org/linux/man-pages/man8/lsblk.8.html'},
  ip:{provider:'iproute2 manual',type:'manual',url:'https://man7.org/linux/man-pages/man8/ip.8.html'},
  ping:{provider:'iputils manual',type:'manual',url:'https://man7.org/linux/man-pages/man8/ping.8.html'},
  ssh:{provider:'OpenSSH manual',type:'manual',url:'https://man.openbsd.org/ssh.1'},
  tar:{provider:'man7.org · GNU tar',type:'manual',url:'https://man7.org/linux/man-pages/man1/tar.1.html'},
  apt:{provider:'Debian APT manual',type:'manual',url:'https://manpages.debian.org/trixie/apt/apt.8.en.html'},
  dnf:{provider:'DNF documentation',type:'official',url:'https://dnf.readthedocs.io/en/stable/command_ref.html'},
  pacman:{provider:'Arch Linux manual',type:'manual',url:'https://man.archlinux.org/man/pacman.8.en'},
  systemctl:{provider:'systemd',type:'official',url:'https://www.freedesktop.org/software/systemd/man/latest/systemctl.html'},
  journalctl:{provider:'systemd',type:'official',url:'https://www.freedesktop.org/software/systemd/man/latest/journalctl.html'},
  rm:{provider:'man7.org · GNU Coreutils',type:'manual',url:'https://man7.org/linux/man-pages/man1/rm.1.html'},
  dd:{provider:'man7.org · GNU Coreutils',type:'manual',url:'https://man7.org/linux/man-pages/man1/dd.1.html'},
  mkfs:{provider:'util-linux manual',type:'manual',url:'https://man7.org/linux/man-pages/man8/mkfs.8.html'},
  fdisk:{provider:'util-linux manual',type:'manual',url:'https://man7.org/linux/man-pages/man8/fdisk.8.html'},
  cp:{provider:'man7.org · GNU Coreutils',type:'manual',url:'https://man7.org/linux/man-pages/man1/cp.1.html'},
  mv:{provider:'man7.org · GNU Coreutils',type:'manual',url:'https://man7.org/linux/man-pages/man1/mv.1.html'},
  ln:{provider:'man7.org · GNU Coreutils',type:'manual',url:'https://man7.org/linux/man-pages/man1/ln.1.html'},
  less:{provider:'less manual',type:'manual',url:'https://man7.org/linux/man-pages/man1/less.1.html'},
  sort:{provider:'man7.org · GNU Coreutils',type:'manual',url:'https://man7.org/linux/man-pages/man1/sort.1.html'},
  uniq:{provider:'man7.org · GNU Coreutils',type:'manual',url:'https://man7.org/linux/man-pages/man1/uniq.1.html'},
  cut:{provider:'man7.org · GNU Coreutils',type:'manual',url:'https://man7.org/linux/man-pages/man1/cut.1.html'},
  tr:{provider:'man7.org · GNU Coreutils',type:'manual',url:'https://man7.org/linux/man-pages/man1/tr.1.html'},
  wc:{provider:'man7.org · GNU Coreutils',type:'manual',url:'https://man7.org/linux/man-pages/man1/wc.1.html'},
  sed:{provider:'man7.org · GNU sed',type:'manual',url:'https://man7.org/linux/man-pages/man1/sed.1.html'},
  awk:{provider:'man7.org · GNU gawk',type:'manual',url:'https://man7.org/linux/man-pages/man1/gawk.1.html'},
  jobs:{provider:'man7.org · GNU Bash',type:'manual',url:'https://man7.org/linux/man-pages/man1/bash.1.html'},
  nice:{provider:'man7.org · GNU Coreutils',type:'manual',url:'https://man7.org/linux/man-pages/man1/nice.1.html'},
  ss:{provider:'iproute2 manual',type:'manual',url:'https://man7.org/linux/man-pages/man8/ss.8.html'},
  curl:{provider:'curl project',type:'official',url:'https://curl.se/docs/manpage.html'},
  wget:{provider:'man7.org · GNU Wget',type:'manual',url:'https://man7.org/linux/man-pages/man1/wget.1.html'},
  scp:{provider:'OpenSSH manual',type:'manual',url:'https://man.openbsd.org/scp.1'},
  findmnt:{provider:'util-linux manual',type:'manual',url:'https://man7.org/linux/man-pages/man8/findmnt.8.html'},
  mount:{provider:'util-linux manual',type:'manual',url:'https://man7.org/linux/man-pages/man8/mount.8.html'},
  umount:{provider:'util-linux manual',type:'manual',url:'https://man7.org/linux/man-pages/man8/umount.8.html'},
  dmesg:{provider:'util-linux manual',type:'manual',url:'https://man7.org/linux/man-pages/man1/dmesg.1.html'},
  git:{provider:'Git',type:'official',url:'https://git-scm.com/docs/git'},
  podman:{provider:'Podman',type:'official',url:'https://docs.podman.io/en/latest/markdown/podman.1.html'},
  docker:{provider:'Docker',type:'official',url:'https://docs.docker.com/reference/cli/docker/'}
};

const topicDocumentationReferences={
  filesystem:{provider:'Filesystem Hierarchy Standard',type:'official',url:'https://refspecs.linuxfoundation.org/FHS_3.0/fhs/index.html'},
  permissions:{provider:'ArchWiki',type:'official',url:'https://wiki.archlinux.org/title/File_permissions_and_attributes'},
  bash:{provider:'man7.org · GNU Bash',type:'manual',url:'https://man7.org/linux/man-pages/man1/bash.1.html'},
  systemd:{provider:'systemd',type:'official',url:'https://www.freedesktop.org/software/systemd/man/latest/'},
  kernel:{provider:'Linux kernel documentation',type:'official',url:'https://docs.kernel.org/'},
  packages:{provider:'Debian Reference',type:'official',url:'https://www.debian.org/doc/manuals/debian-reference/ch02.en.html'},
  processes:{provider:'procps-ng manual',type:'manual',url:'https://man7.org/linux/man-pages/man1/ps.1.html'},
  networking:{provider:'iproute2 manual',type:'manual',url:'https://man7.org/linux/man-pages/man8/ip.8.html'},
  security:{provider:'sudo project',type:'official',url:'https://www.sudo.ws/docs/man/sudo.man/'},
  containers:{provider:'Podman',type:'official',url:'https://docs.podman.io/'},
  git:{provider:'Git',type:'official',url:'https://git-scm.com/docs/git'}
};

const getCommandReference=name=>documentationReferences[name]||null;
const getReferenceLabel=type=>{
  const pt=typeof getLanguage==='function'&&getLanguage()==='pt';
  if(type==='manual')return pt?'Página de manual':'Manual page';
  if(type==='upstream')return pt?'Referência upstream':'Upstream reference';
  return pt?'Documentação oficial':'Official documentation';
};
const getReferenceSourceLabel=()=>typeof getLanguage==='function'&&getLanguage()==='pt'?'Fonte':'Source';
const getMissingReferenceLabel=()=>typeof getLanguage==='function'&&getLanguage()==='pt'?'Referência ainda não vinculada':'Reference not linked yet';
const inferReferenceType=url=>{
  if(!url)return 'official';
  if(/man7\.org|man\.openbsd\.org|man\.archlinux\.org|manpages\.debian\.org/.test(url))return 'manual';
  return 'official';
};
