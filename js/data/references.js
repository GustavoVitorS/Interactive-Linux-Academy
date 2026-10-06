/* Interactive Linux Academy V6.2 — authoritative documentation registry.
 * Keep external references centralized so Command Explorer, lessons and docs
 * can identify the upstream provider and avoid misleading generic fallbacks.
 */
const documentationReferences={
  pwd:{provider:'GNU Coreutils',type:'official',url:'https://www.gnu.org/software/coreutils/manual/html_node/pwd-invocation.html'},
  ls:{provider:'GNU Coreutils',type:'official',url:'https://www.gnu.org/software/coreutils/manual/html_node/ls-invocation.html'},
  cd:{provider:'GNU Bash',type:'official',url:'https://www.gnu.org/software/bash/manual/html_node/Bourne-Shell-Builtins.html#index-cd'},
  mkdir:{provider:'GNU Coreutils',type:'official',url:'https://www.gnu.org/software/coreutils/manual/html_node/mkdir-invocation.html'},
  touch:{provider:'GNU Coreutils',type:'official',url:'https://www.gnu.org/software/coreutils/manual/html_node/touch-invocation.html'},
  cat:{provider:'GNU Coreutils',type:'official',url:'https://www.gnu.org/software/coreutils/manual/html_node/cat-invocation.html'},
  grep:{provider:'GNU grep',type:'official',url:'https://www.gnu.org/software/grep/manual/grep.html'},
  find:{provider:'GNU Findutils',type:'official',url:'https://www.gnu.org/software/findutils/manual/html_mono/find.html'},
  head:{provider:'GNU Coreutils',type:'official',url:'https://www.gnu.org/software/coreutils/manual/html_node/head-invocation.html'},
  tail:{provider:'GNU Coreutils',type:'official',url:'https://www.gnu.org/software/coreutils/manual/html_node/tail-invocation.html'},
  ps:{provider:'procps-ng manual',type:'manual',url:'https://man7.org/linux/man-pages/man1/ps.1.html'},
  top:{provider:'procps-ng manual',type:'manual',url:'https://man7.org/linux/man-pages/man1/top.1.html'},
  kill:{provider:'util-linux manual',type:'manual',url:'https://man7.org/linux/man-pages/man1/kill.1.html'},
  chmod:{provider:'GNU Coreutils',type:'official',url:'https://www.gnu.org/software/coreutils/manual/html_node/chmod-invocation.html'},
  chown:{provider:'GNU Coreutils',type:'official',url:'https://www.gnu.org/software/coreutils/manual/html_node/chown-invocation.html'},
  whoami:{provider:'GNU Coreutils',type:'official',url:'https://www.gnu.org/software/coreutils/manual/html_node/whoami-invocation.html'},
  id:{provider:'GNU Coreutils',type:'official',url:'https://www.gnu.org/software/coreutils/manual/html_node/id-invocation.html'},
  uname:{provider:'GNU Coreutils',type:'official',url:'https://www.gnu.org/software/coreutils/manual/html_node/uname-invocation.html'},
  df:{provider:'GNU Coreutils',type:'official',url:'https://www.gnu.org/software/coreutils/manual/html_node/df-invocation.html'},
  du:{provider:'GNU Coreutils',type:'official',url:'https://www.gnu.org/software/coreutils/manual/html_node/du-invocation.html'},
  lsblk:{provider:'util-linux manual',type:'manual',url:'https://man7.org/linux/man-pages/man8/lsblk.8.html'},
  ip:{provider:'iproute2 manual',type:'manual',url:'https://man7.org/linux/man-pages/man8/ip.8.html'},
  ping:{provider:'iputils manual',type:'manual',url:'https://man7.org/linux/man-pages/man8/ping.8.html'},
  ssh:{provider:'OpenSSH manual',type:'manual',url:'https://man.openbsd.org/ssh.1'},
  tar:{provider:'GNU tar',type:'official',url:'https://www.gnu.org/software/tar/manual/tar.html'},
  apt:{provider:'Debian APT manual',type:'manual',url:'https://manpages.debian.org/trixie/apt/apt.8.en.html'},
  dnf:{provider:'DNF documentation',type:'official',url:'https://dnf.readthedocs.io/en/stable/command_ref.html'},
  pacman:{provider:'Arch Linux manual',type:'manual',url:'https://man.archlinux.org/man/pacman.8.en'},
  systemctl:{provider:'systemd',type:'official',url:'https://www.freedesktop.org/software/systemd/man/latest/systemctl.html'},
  journalctl:{provider:'systemd',type:'official',url:'https://www.freedesktop.org/software/systemd/man/latest/journalctl.html'},
  rm:{provider:'GNU Coreutils',type:'official',url:'https://www.gnu.org/software/coreutils/manual/html_node/rm-invocation.html'},
  dd:{provider:'GNU Coreutils',type:'official',url:'https://www.gnu.org/software/coreutils/manual/html_node/dd-invocation.html'},
  mkfs:{provider:'util-linux manual',type:'manual',url:'https://man7.org/linux/man-pages/man8/mkfs.8.html'},
  fdisk:{provider:'util-linux manual',type:'manual',url:'https://man7.org/linux/man-pages/man8/fdisk.8.html'},
  cp:{provider:'GNU Coreutils',type:'official',url:'https://www.gnu.org/software/coreutils/manual/html_node/cp-invocation.html'},
  mv:{provider:'GNU Coreutils',type:'official',url:'https://www.gnu.org/software/coreutils/manual/html_node/mv-invocation.html'},
  ln:{provider:'GNU Coreutils',type:'official',url:'https://www.gnu.org/software/coreutils/manual/html_node/ln-invocation.html'},
  less:{provider:'less manual',type:'manual',url:'https://man7.org/linux/man-pages/man1/less.1.html'},
  sort:{provider:'GNU Coreutils',type:'official',url:'https://www.gnu.org/software/coreutils/manual/html_node/sort-invocation.html'},
  uniq:{provider:'GNU Coreutils',type:'official',url:'https://www.gnu.org/software/coreutils/manual/html_node/uniq-invocation.html'},
  cut:{provider:'GNU Coreutils',type:'official',url:'https://www.gnu.org/software/coreutils/manual/html_node/cut-invocation.html'},
  tr:{provider:'GNU Coreutils',type:'official',url:'https://www.gnu.org/software/coreutils/manual/html_node/tr-invocation.html'},
  wc:{provider:'GNU Coreutils',type:'official',url:'https://www.gnu.org/software/coreutils/manual/html_node/wc-invocation.html'},
  sed:{provider:'GNU sed',type:'official',url:'https://www.gnu.org/software/sed/manual/sed.html'},
  awk:{provider:'GNU awk',type:'official',url:'https://www.gnu.org/software/gawk/manual/gawk.html'},
  jobs:{provider:'GNU Bash',type:'official',url:'https://www.gnu.org/software/bash/manual/html_node/Job-Control-Builtins.html#index-jobs'},
  nice:{provider:'GNU Coreutils',type:'official',url:'https://www.gnu.org/software/coreutils/manual/html_node/nice-invocation.html'},
  ss:{provider:'iproute2 manual',type:'manual',url:'https://man7.org/linux/man-pages/man8/ss.8.html'},
  curl:{provider:'curl project',type:'official',url:'https://curl.se/docs/manpage.html'},
  wget:{provider:'GNU Wget',type:'official',url:'https://www.gnu.org/software/wget/manual/wget.html'},
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
  permissions:{provider:'GNU Coreutils',type:'official',url:'https://www.gnu.org/software/coreutils/manual/html_node/File-permissions.html'},
  bash:{provider:'GNU Bash',type:'official',url:'https://www.gnu.org/software/bash/manual/bash.html'},
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
