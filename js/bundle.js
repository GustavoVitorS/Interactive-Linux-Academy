(()=>{
'use strict';
const storage=(()=>{
  const memory={};
  const fallback={getItem:k=>Object.prototype.hasOwnProperty.call(memory,k)?memory[k]:null,setItem:(k,v)=>{memory[k]=String(v);},removeItem:k=>{delete memory[k];},clear:()=>{Object.keys(memory).forEach(k=>delete memory[k]);}};
  try{const key='__linux_drawing_storage_test__';window.localStorage.setItem(key,'1');window.localStorage.removeItem(key);return window.localStorage;}catch{return fallback;}
})();

/* --- js/data/lessons.js --- */
const lessons=[
  {id:'linux-model',level:'beginner',title:{en:'Linux: kernel, distribution and user space',pt:'Linux: kernel, distribuição e user space'},description:{en:'Separate the Linux kernel from the complete operating system you use. A distribution combines the kernel with user-space tools, package management, defaults and a software ecosystem.',pt:'Separe o kernel Linux do sistema completo que você utiliza. Uma distribuição combina o kernel com ferramentas de user space, gerenciamento de pacotes, padrões e um ecossistema de software.'},command:'uname -a',output:{en:'Shows kernel and system information in the simulator.',pt:'Mostra informações do kernel e do sistema no simulador.'},reference:'https://docs.kernel.org/',source:'Linux Kernel Documentation'},
  {id:'shell-terminal',level:'beginner',title:{en:'Terminal vs. shell',pt:'Terminal vs. shell'},description:{en:'The terminal is the interface where you type; the shell interprets commands, expands variables, handles redirection and starts programs. Bash is one common shell.',pt:'O terminal é a interface onde você digita; o shell interpreta comandos, expande variáveis, trata redirecionamentos e inicia programas. Bash é um shell comum.'},command:'echo $SHELL',output:{en:'A real system may print a path such as /bin/bash.',pt:'Um sistema real pode mostrar um caminho como /bin/bash.'},reference:'https://www.gnu.org/software/bash/manual/bash.html',source:'GNU Bash Reference Manual'},
  {id:'navigation',level:'beginner',title:{en:'Know where you are',pt:'Saiba onde você está'},description:{en:'Use pwd to print the current working directory, ls to inspect directory entries and cd to change the shell working directory.',pt:'Use pwd para mostrar o diretório atual, ls para inspecionar entradas e cd para alterar o diretório de trabalho do shell.'},command:'pwd',output:{en:'/home/visitor',pt:'/home/visitor'},reference:'https://www.gnu.org/software/coreutils/manual/html_node/pwd-invocation.html',source:'GNU Coreutils'},
  {id:'listing',level:'beginner',title:{en:'Read a directory listing',pt:'Leia a listagem de um diretório'},description:{en:'ls -l adds a long listing and -a includes names beginning with a dot. Learn to read names and metadata before modifying anything.',pt:'ls -l adiciona a listagem detalhada e -a inclui nomes iniciados por ponto. Aprenda a ler nomes e metadados antes de modificar qualquer coisa.'},command:'ls -la',output:{en:'Lists visible and hidden entries in long format.',pt:'Lista entradas visíveis e ocultas em formato detalhado.'},reference:'https://www.gnu.org/software/coreutils/manual/html_node/ls-invocation.html',source:'GNU Coreutils'},
  {id:'files-directories',level:'beginner',title:{en:'Create files and directories',pt:'Crie arquivos e diretórios'},description:{en:'mkdir creates directories. touch can create an empty file when it does not exist. Practice in a disposable directory before using commands on important data.',pt:'mkdir cria diretórios. touch pode criar um arquivo vazio quando ele não existe. Pratique em um diretório descartável antes de usar comandos em dados importantes.'},command:'mkdir linux-lab',output:{en:'Creates a directory named linux-lab.',pt:'Cria um diretório chamado linux-lab.'},reference:'https://www.gnu.org/software/coreutils/manual/coreutils.html',source:'GNU Coreutils'},
  {id:'filesystem-hierarchy',level:'beginner',title:{en:'Understand the filesystem hierarchy',pt:'Entenda a hierarquia do filesystem'},description:{en:'Linux systems organize files beneath /. Paths such as /etc, /home, /usr and /var have conventional roles documented by the Filesystem Hierarchy Standard.',pt:'Sistemas Linux organizam arquivos abaixo de /. Caminhos como /etc, /home, /usr e /var possuem funções convencionais documentadas pelo Filesystem Hierarchy Standard.'},command:'tree /home/visitor',output:{en:'Shows the simulated home hierarchy as a tree.',pt:'Mostra a hierarquia simulada da home em formato de árvore.'},reference:'https://refspecs.linuxfoundation.org/FHS_3.0/fhs/index.html',source:'Filesystem Hierarchy Standard 3.0'},
  {id:'permissions',level:'beginner',title:{en:'Read rwx permissions',pt:'Leia permissões rwx'},description:{en:'Permission bits describe read, write and execute access for owner, group and others. chmod changes mode bits; chown changes ownership. Both deserve care.',pt:'Bits de permissão descrevem leitura, escrita e execução para dono, grupo e outros. chmod altera os bits de modo; chown altera propriedade. Ambos exigem cuidado.'},command:'ls -la',output:{en:'Long listings show a permission string such as -rw-r--r--.',pt:'Listagens detalhadas mostram uma string de permissões como -rw-r--r--.'},reference:'https://www.gnu.org/software/coreutils/manual/html_node/File-permissions.html',source:'GNU Coreutils'},
  {id:'manuals',level:'beginner',title:{en:'Learn to use manuals',pt:'Aprenda a usar os manuais'},description:{en:'man pages are organized into sections. Reading the manual before using an unfamiliar command is one of the most useful Linux habits you can build.',pt:'Páginas man são organizadas em seções. Ler o manual antes de usar um comando desconhecido é um dos hábitos Linux mais úteis que você pode desenvolver.'},command:'man ls',output:{en:'The simulator gives a short learning summary; a real system opens the installed manual page.',pt:'O simulador fornece um resumo; em um sistema real, o comando abre a página de manual instalada.'},reference:'https://man7.org/linux/man-pages/man7/man-pages.7.html',source:'Linux man-pages'},

  {id:'pipes',level:'intermediate',title:{en:'Compose commands with pipes',pt:'Componha comandos com pipes'},description:{en:'A pipe sends the standard output of one command to the standard input of another. This makes small tools composable instead of forcing one large program to do everything.',pt:'Um pipe envia a saída padrão de um comando para a entrada padrão de outro. Isso torna pequenas ferramentas combináveis em vez de exigir um programa enorme para tudo.'},command:'cat Projects/demo/app.log | grep ERROR',output:{en:'Prints matching log lines in a real shell pipeline.',pt:'Mostra as linhas correspondentes em um pipeline de shell real.'},reference:'https://www.gnu.org/software/bash/manual/html_node/Pipelines.html',source:'GNU Bash Reference Manual'},
  {id:'redirection',level:'intermediate',title:{en:'Redirect output deliberately',pt:'Redirecione a saída de forma consciente'},description:{en:'> replaces a file with command output, while >> appends. Redirection is handled by the shell, so understand the target path before pressing Enter.',pt:'> substitui o conteúdo de um arquivo pela saída do comando, enquanto >> adiciona ao final. O redirecionamento é tratado pelo shell; confira o caminho de destino antes de pressionar Enter.'},command:'echo "first note" > Documents/notes.txt',output:{en:'Writes the text into Documents/notes.txt in the virtual filesystem.',pt:'Grava o texto em Documents/notes.txt no filesystem virtual.'},reference:'https://www.gnu.org/software/bash/manual/html_node/Redirections.html',source:'GNU Bash Reference Manual'},
  {id:'search-text',level:'intermediate',title:{en:'Search text with grep',pt:'Pesquise texto com grep'},description:{en:'grep selects lines that match patterns. Start with literal text, then learn options and regular expressions as your searches become more precise.',pt:'grep seleciona linhas que correspondem a padrões. Comece com texto literal e depois aprenda opções e expressões regulares conforme suas buscas ficam mais precisas.'},command:'grep ERROR Projects/demo/app.log',output:{en:'ERROR simulated error',pt:'ERROR simulated error'},reference:'https://www.gnu.org/software/grep/manual/grep.html',source:'GNU grep Manual'},
  {id:'find-files',level:'intermediate',title:{en:'Find files by criteria',pt:'Encontre arquivos por critérios'},description:{en:'find walks a directory hierarchy and evaluates expressions. -name is a common starting point for locating files by name pattern.',pt:'find percorre uma hierarquia de diretórios e avalia expressões. -name é um ponto de partida comum para localizar arquivos por padrão de nome.'},command:'find . -name "*.txt"',output:{en:'Lists matching .txt files below the current directory.',pt:'Lista arquivos .txt correspondentes abaixo do diretório atual.'},reference:'https://www.gnu.org/software/findutils/manual/html_mono/find.html',source:'GNU Findutils'},
  {id:'processes',level:'intermediate',title:{en:'Processes and signals',pt:'Processos e sinais'},description:{en:'Every running program has process state and an identifier. Tools such as ps and top inspect processes; kill sends a signal rather than simply meaning “force stop”.',pt:'Todo programa em execução possui estado e identificador de processo. Ferramentas como ps e top inspecionam processos; kill envia um sinal e não significa apenas “forçar parada”.'},command:'ps aux',output:{en:'Displays a process listing on systems with procps.',pt:'Exibe uma listagem de processos em sistemas com procps.'},reference:'https://man7.org/linux/man-pages/man1/ps.1.html',source:'Linux manual pages'},
  {id:'packages',level:'intermediate',title:{en:'Packages and repositories',pt:'Pacotes e repositórios'},description:{en:'Package managers resolve software from configured repositories. Debian recommends apt for interactive command-line use, while other distribution families use different tools.',pt:'Gerenciadores de pacotes resolvem software a partir dos repositórios configurados. O Debian recomenda apt para uso interativo na linha de comando, enquanto outras famílias usam ferramentas diferentes.'},command:'sudo apt update',output:{en:'Simulated only here; on Debian-family systems it refreshes package metadata.',pt:'Aqui é apenas simulado; em sistemas da família Debian ele atualiza os metadados dos pacotes.'},reference:'https://www.debian.org/doc/manuals/debian-reference/ch02.en.html',source:'Debian Reference'},
  {id:'services',level:'intermediate',title:{en:'Services and systemd units',pt:'Serviços e units do systemd'},description:{en:'On systemd-based distributions, systemctl inspects and controls units. Learn status and logs before start, stop, enable or disable operations.',pt:'Em distribuições baseadas em systemd, systemctl inspeciona e controla units. Aprenda status e logs antes de operações como start, stop, enable ou disable.'},command:'systemctl status ssh',output:{en:'Shows service state on a system where that unit exists.',pt:'Mostra o estado do serviço em um sistema onde essa unit exista.'},reference:'https://www.freedesktop.org/software/systemd/man/latest/systemctl.html',source:'systemd manual'},
  {id:'networking',level:'intermediate',title:{en:'Inspect network configuration',pt:'Inspecione a configuração de rede'},description:{en:'ip from iproute2 is the modern tool for inspecting interfaces, addresses and routes. Begin by observing state before changing network configuration.',pt:'ip, do iproute2, é a ferramenta moderna para inspecionar interfaces, endereços e rotas. Comece observando o estado antes de alterar a configuração de rede.'},command:'ip addr',output:{en:'Shows network interfaces and assigned addresses on a real Linux system.',pt:'Mostra interfaces de rede e endereços atribuídos em um sistema Linux real.'},reference:'https://man7.org/linux/man-pages/man8/ip.8.html',source:'ip(8) manual'},

  {id:'bash-scripts',level:'advanced',title:{en:'Turn command sequences into Bash scripts',pt:'Transforme sequências em scripts Bash'},description:{en:'Scripts combine commands with variables, conditionals, loops and functions. Prefer readable, checked scripts over long one-liners you cannot explain.',pt:'Scripts combinam comandos com variáveis, condicionais, loops e funções. Prefira scripts legíveis e verificados a one-liners longos que você não consegue explicar.'},command:'bash script.sh',output:{en:'Runs script.sh using Bash.',pt:'Executa script.sh usando Bash.'},reference:'https://www.gnu.org/software/bash/manual/bash.html',source:'GNU Bash Reference Manual'},
  {id:'shell-exit-status',level:'advanced',title:{en:'Use exit status for automation',pt:'Use status de saída em automações'},description:{en:'Commands report success or failure with an exit status. Shell conditionals and && / || chains can react to that status, which is fundamental for reliable automation.',pt:'Comandos informam sucesso ou falha por meio de um status de saída. Condicionais do shell e cadeias && / || podem reagir a esse status, algo fundamental para automações confiáveis.'},command:'echo $?',output:{en:'A real shell prints the previous command exit status.',pt:'Um shell real mostra o status de saída do comando anterior.'},reference:'https://www.gnu.org/software/bash/manual/html_node/Exit-Status.html',source:'GNU Bash Reference Manual'},
  {id:'storage',level:'advanced',title:{en:'Inspect block devices before changing disks',pt:'Inspecione dispositivos de bloco antes de alterar discos'},description:{en:'lsblk is useful for understanding disks, partitions and mount relationships. Destructive tools such as mkfs, fdisk and dd should only follow verified device identification and backups.',pt:'lsblk é útil para entender discos, partições e relações de montagem. Ferramentas destrutivas como mkfs, fdisk e dd só devem ser usadas após confirmar o dispositivo e possuir backup.'},command:'lsblk',output:{en:'Lists block devices without modifying them.',pt:'Lista dispositivos de bloco sem modificá-los.'},reference:'https://man7.org/linux/man-pages/man8/lsblk.8.html',source:'lsblk(8) manual'},
  {id:'mounts',level:'advanced',title:{en:'Filesystems and mounts',pt:'Filesystems e montagens'},description:{en:'Linux exposes filesystems through mount points in one directory tree. Learn to inspect mounts and filesystem types before attempting administrative changes.',pt:'Linux expõe filesystems por pontos de montagem em uma única árvore de diretórios. Aprenda a inspecionar montagens e tipos de filesystem antes de realizar alterações administrativas.'},command:'findmnt',output:{en:'On a real system, shows mounted filesystems in a structured view.',pt:'Em um sistema real, mostra filesystems montados em uma visão estruturada.'},reference:'https://man7.org/linux/man-pages/man8/findmnt.8.html',source:'findmnt(8) manual'},
  {id:'logs',level:'advanced',title:{en:'Investigate logs before guessing',pt:'Investigue logs antes de adivinhar'},description:{en:'Logs provide evidence about boot, services and failures. On systemd systems, journalctl can query the journal by boot, unit, priority and time.',pt:'Logs fornecem evidências sobre boot, serviços e falhas. Em sistemas systemd, journalctl pode consultar o journal por boot, unit, prioridade e período.'},command:'journalctl -b',output:{en:'Queries messages from the current boot on a systemd-based system.',pt:'Consulta mensagens do boot atual em um sistema baseado em systemd.'},reference:'https://www.freedesktop.org/software/systemd/man/latest/journalctl.html',source:'systemd journalctl manual'},
  {id:'ssh',level:'advanced',title:{en:'Remote administration with SSH',pt:'Administração remota com SSH'},description:{en:'SSH provides encrypted remote login and command execution. Learn host verification, keys and least-privilege access before administering remote systems.',pt:'SSH fornece login remoto criptografado e execução de comandos. Aprenda verificação de host, chaves e menor privilégio antes de administrar sistemas remotos.'},command:'ssh user@server.example',output:{en:'Example syntax only; this browser lab makes no network connection.',pt:'Apenas exemplo de sintaxe; este laboratório no navegador não realiza conexão de rede.'},reference:'https://man.openbsd.org/ssh',source:'OpenSSH manual'},
  {id:'automation',level:'advanced',title:{en:'Schedule repeatable work',pt:'Agende tarefas repetíveis'},description:{en:'Linux environments commonly schedule recurring work with systemd timers or cron. Keep jobs observable, idempotent where possible and explicit about paths and environment.',pt:'Ambientes Linux normalmente agendam tarefas recorrentes com timers do systemd ou cron. Mantenha tarefas observáveis, idempotentes quando possível e explícitas sobre caminhos e ambiente.'},command:'systemctl list-timers',output:{en:'Lists active systemd timers on a systemd-based system.',pt:'Lista timers ativos em um sistema baseado em systemd.'},reference:'https://www.freedesktop.org/software/systemd/man/latest/systemd.timer.html',source:'systemd.timer manual'},
  {id:'security',level:'advanced',title:{en:'Security starts with least privilege and updates',pt:'Segurança começa com menor privilégio e atualizações'},description:{en:'Use administrative privileges only when required, keep software supported and updated, review permissions and authenticate remote access carefully. Security is a process, not one command.',pt:'Use privilégios administrativos apenas quando necessário, mantenha software suportado e atualizado, revise permissões e autentique acessos remotos com cuidado. Segurança é um processo, não um único comando.'},command:'id',output:{en:'Shows the current user and group identities.',pt:'Mostra as identidades de usuário e grupos atuais.'},reference:'https://man7.org/linux/man-pages/man1/id.1.html',source:'id(1) manual'}
];

/* --- js/data/commands.js --- */
const commands=[
{name:'pwd',category:'Navigation',level:'Beginner',description:{en:'Print the current working directory.',pt:'Mostra o diretório de trabalho atual.'},syntax:'pwd',example:'pwd'},
{name:'ls',category:'Navigation',level:'Beginner',description:{en:'List directory contents. Common options include -l and -a.',pt:'Lista o conteúdo de diretórios. Opções comuns incluem -l e -a.'},syntax:'ls [options] [path]',example:'ls -la'},
{name:'cd',category:'Navigation',level:'Beginner',description:{en:'Change the current working directory.',pt:'Altera o diretório de trabalho atual.'},syntax:'cd [directory]',example:'cd Documents'},
{name:'mkdir',category:'Directories',level:'Beginner',description:{en:'Create one or more directories.',pt:'Cria um ou mais diretórios.'},syntax:'mkdir [options] directory',example:'mkdir projects'},
{name:'touch',category:'Files',level:'Beginner',description:{en:'Create an empty file or update file timestamps.',pt:'Cria um arquivo vazio ou atualiza seus timestamps.'},syntax:'touch file',example:'touch notes.txt'},
{name:'cat',category:'Text',level:'Beginner',description:{en:'Concatenate files and print their content.',pt:'Concatena arquivos e exibe seu conteúdo.'},syntax:'cat file',example:'cat README.txt'},
{name:'grep',category:'Search',level:'Intermediate',description:{en:'Search text using patterns.',pt:'Pesquisa texto utilizando padrões.'},syntax:'grep [options] pattern [file]',example:'grep "error" app.log'},
{name:'find',category:'Search',level:'Intermediate',description:{en:'Search for files and directories in a hierarchy.',pt:'Pesquisa arquivos e diretórios em uma hierarquia.'},syntax:'find path expression',example:'find . -name "*.md"'},
{name:'head',category:'Text',level:'Beginner',description:{en:'Display the beginning of a file.',pt:'Exibe o início de um arquivo.'},syntax:'head [options] file',example:'head -n 20 app.log'},
{name:'tail',category:'Text',level:'Beginner',description:{en:'Display the end of a file; -f can follow appended data.',pt:'Exibe o final de um arquivo; -f pode acompanhar dados adicionados.'},syntax:'tail [options] file',example:'tail -f app.log'},
{name:'ps',category:'Processes',level:'Intermediate',description:{en:'Display information about running processes.',pt:'Exibe informações sobre processos em execução.'},syntax:'ps [options]',example:'ps aux'},
{name:'top',category:'Processes',level:'Intermediate',description:{en:'Interactive real-time process viewer available on many Linux systems.',pt:'Visualizador interativo de processos em tempo real disponível em muitos sistemas Linux.'},syntax:'top',example:'top'},
{name:'kill',category:'Processes',level:'Intermediate',description:{en:'Send a signal to a process by PID.',pt:'Envia um sinal a um processo pelo PID.'},syntax:'kill [-SIGNAL] pid',example:'kill 4242',risk:{en:'Stopping the wrong process can interrupt applications or services.',pt:'Encerrar o processo errado pode interromper aplicativos ou serviços.'}},
{name:'chmod',category:'Permissions',level:'Intermediate',description:{en:'Change file permission bits.',pt:'Altera os bits de permissão de um arquivo.'},syntax:'chmod mode file',example:'chmod u+x script.sh',risk:{en:'Incorrect permissions can expose data or break access.',pt:'Permissões incorretas podem expor dados ou impedir acessos.'}},
{name:'chown',category:'Permissions',level:'Intermediate',description:{en:'Change file owner and/or group.',pt:'Altera o dono e/ou grupo de um arquivo.'},syntax:'chown owner[:group] file',example:'sudo chown user:group file',risk:{en:'Changing ownership of system files can break services or security boundaries.',pt:'Alterar o dono de arquivos do sistema pode quebrar serviços ou limites de segurança.'}},
{name:'whoami',category:'Users',level:'Beginner',description:{en:'Print the effective current username.',pt:'Mostra o nome do usuário efetivo atual.'},syntax:'whoami',example:'whoami'},
{name:'id',category:'Users',level:'Beginner',description:{en:'Display user and group identifiers.',pt:'Exibe identificadores de usuário e grupos.'},syntax:'id [user]',example:'id'},
{name:'uname',category:'System',level:'Beginner',description:{en:'Print system information.',pt:'Exibe informações do sistema.'},syntax:'uname [options]',example:'uname -a'},
{name:'df',category:'Storage',level:'Intermediate',description:{en:'Report filesystem disk space usage.',pt:'Mostra o uso de espaço dos sistemas de arquivos.'},syntax:'df [options]',example:'df -h'},
{name:'du',category:'Storage',level:'Intermediate',description:{en:'Estimate file and directory space usage.',pt:'Estima o espaço usado por arquivos e diretórios.'},syntax:'du [options] path',example:'du -sh Downloads'},
{name:'lsblk',category:'Storage',level:'Intermediate',description:{en:'List block devices in a tree-like format.',pt:'Lista dispositivos de bloco em formato de árvore.'},syntax:'lsblk',example:'lsblk'},
{name:'ip',category:'Network',level:'Intermediate',description:{en:'Show and configure networking information through iproute2.',pt:'Exibe e configura informações de rede por meio do iproute2.'},syntax:'ip object command',example:'ip addr'},
{name:'ping',category:'Network',level:'Beginner',description:{en:'Send ICMP echo requests to test reachability.',pt:'Envia requisições ICMP echo para testar conectividade.'},syntax:'ping host',example:'ping -c 4 example.com'},
{name:'ssh',category:'Network',level:'Intermediate',description:{en:'Open an encrypted remote shell connection.',pt:'Abre uma conexão remota de shell criptografada.'},syntax:'ssh user@host',example:'ssh user@server.example'},
{name:'tar',category:'Archives',level:'Intermediate',description:{en:'Create or extract tar archives.',pt:'Cria ou extrai arquivos tar.'},syntax:'tar [options] archive files',example:'tar -czf backup.tar.gz folder/'},
{name:'apt',category:'Packages',level:'Beginner',description:{en:'High-level package management command used by Debian and derivatives.',pt:'Comando de alto nível para gerenciamento de pacotes usado no Debian e derivados.'},syntax:'apt action package',example:'sudo apt install curl'},
{name:'dnf',category:'Packages',level:'Beginner',description:{en:'Package manager used by Fedora and related distributions.',pt:'Gerenciador de pacotes usado pelo Fedora e distribuições relacionadas.'},syntax:'dnf action package',example:'sudo dnf install curl'},
{name:'pacman',category:'Packages',level:'Intermediate',description:{en:'Package manager used by Arch Linux.',pt:'Gerenciador de pacotes usado pelo Arch Linux.'},syntax:'pacman [options] package',example:'sudo pacman -S curl'},
{name:'systemctl',category:'Administration',level:'Intermediate',description:{en:'Control systemd units on distributions that use systemd.',pt:'Controla units do systemd em distribuições que utilizam systemd.'},syntax:'systemctl action unit',example:'systemctl status ssh'},
{name:'journalctl',category:'Administration',level:'Advanced',description:{en:'Query the systemd journal.',pt:'Consulta o journal do systemd.'},syntax:'journalctl [options]',example:'journalctl -b'},
{name:'rm',category:'Files',level:'Beginner',description:{en:'Remove files or directories.',pt:'Remove arquivos ou diretórios.'},syntax:'rm [options] file',example:'rm old-file.txt',risk:{en:'Deletion is normally immediate. Recursive or forced removal can destroy large amounts of data.',pt:'A exclusão normalmente é imediata. Remoção recursiva ou forçada pode destruir muitos dados.'}},
{name:'dd',category:'Storage',level:'Advanced',description:{en:'Copy and convert raw data between files or block devices.',pt:'Copia e converte dados brutos entre arquivos ou dispositivos de bloco.'},syntax:'dd if=input of=output [options]',example:'dd if=image.iso of=/dev/sdX',risk:{en:'A wrong output device can overwrite an entire disk.',pt:'Escolher o dispositivo de saída errado pode sobrescrever um disco inteiro.'}},
{name:'mkfs',category:'Storage',level:'Advanced',description:{en:'Create a filesystem on a device or partition.',pt:'Cria um sistema de arquivos em um dispositivo ou partição.'},syntax:'mkfs.type device',example:'sudo mkfs.ext4 /dev/sdX1',risk:{en:'Formatting destroys the existing filesystem data on the selected target.',pt:'A formatação destrói os dados do sistema de arquivos existente no alvo selecionado.'}},
{name:'fdisk',category:'Storage',level:'Advanced',description:{en:'Inspect or modify disk partition tables.',pt:'Inspeciona ou modifica tabelas de partição de disco.'},syntax:'fdisk device',example:'sudo fdisk /dev/sdX',risk:{en:'Writing an incorrect partition table can make data inaccessible.',pt:'Gravar uma tabela de partições incorreta pode tornar dados inacessíveis.'}}
];

/* --- js/data/distros.js --- */
const distros=[
  {
    id:'debian',name:'Debian',family:'Debian',packageManager:'APT',release:{en:'Stable / Testing / Unstable',pt:'Estável / Testing / Unstable'},difficulty:{en:'Intermediate',pt:'Intermediário'},desktop:'GNOME, KDE Plasma, Xfce +',color:'#A81D33',logo:'https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/debian.svg',website:'https://www.debian.org/',
    summary:{en:'A community-driven universal operating system known for stability, breadth of architectures and a huge package ecosystem.',pt:'Um sistema operacional universal mantido pela comunidade, conhecido pela estabilidade, ampla variedade de arquiteturas e enorme ecossistema de pacotes.'},
    description:{en:'Debian is one of the foundational Linux distributions and the upstream base for Ubuntu and many other systems. Its Stable branch prioritizes predictability and careful package transitions, while Testing and Unstable provide newer software for users who accept more change.',pt:'Debian é uma das distribuições fundamentais do ecossistema Linux e serve de base para Ubuntu e muitos outros sistemas. O ramo Stable prioriza previsibilidade e transições cuidadosas de pacotes, enquanto Testing e Unstable oferecem software mais recente para quem aceita mais mudanças.'},
    goodFor:{en:['Servers and long-lived systems','Users who value stability','Learning Linux fundamentals'],pt:['Servidores e sistemas de longa duração','Usuários que valorizam estabilidade','Aprender fundamentos do Linux']}
  },
  {
    id:'ubuntu',name:'Ubuntu',family:'Debian',packageManager:'APT / Snap',release:{en:'Regular + LTS',pt:'Regular + LTS'},difficulty:{en:'Beginner friendly',pt:'Amigável para iniciantes'},desktop:'GNOME (Ubuntu customized)',color:'#E95420',logo:'https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/ubuntu.svg',website:'https://ubuntu.com/',
    summary:{en:'A widely adopted Debian-based distribution focused on an accessible desktop, broad hardware support and long-term support releases.',pt:'Uma distribuição baseada em Debian muito popular, focada em desktop acessível, amplo suporte de hardware e versões com suporte de longo prazo.'},
    description:{en:'Ubuntu aims to make Linux approachable on desktops, workstations and servers. Its LTS releases are designed for longer support cycles, while regular releases deliver newer platform changes more frequently.',pt:'Ubuntu busca tornar o Linux acessível em desktops, estações de trabalho e servidores. As versões LTS são pensadas para ciclos mais longos de suporte, enquanto versões regulares entregam novidades de plataforma com maior frequência.'},
    goodFor:{en:['New Linux users','Development workstations','Desktop and server deployments'],pt:['Novos usuários de Linux','Estações de desenvolvimento','Uso em desktop e servidor']}
  },
  {
    id:'fedora',name:'Fedora',family:'Fedora / Red Hat',packageManager:'DNF',release:{en:'Regular',pt:'Regular'},difficulty:{en:'Beginner / Intermediate',pt:'Iniciante / Intermediário'},desktop:'GNOME (Workstation)',color:'#51A2DA',logo:'https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/fedora.svg',website:'https://fedoraproject.org/',
    summary:{en:'A fast-moving community distribution showcasing modern Linux technologies, with Fedora Workstation centered on GNOME.',pt:'Uma distribuição comunitária de evolução rápida que apresenta tecnologias modernas do Linux, com o Fedora Workstation centrado no GNOME.'},
    description:{en:'Fedora often introduces newer Linux technologies earlier than conservative enterprise distributions. Fedora Workstation offers a polished GNOME experience and is popular among developers who want current toolchains without using a rolling release.',pt:'Fedora costuma adotar tecnologias Linux mais novas antes de distribuições empresariais conservadoras. O Fedora Workstation oferece uma experiência GNOME refinada e é popular entre desenvolvedores que querem ferramentas atuais sem usar uma rolling release.'},
    goodFor:{en:['GNOME users','Developers and makers','Users who want current software'],pt:['Usuários do GNOME','Desenvolvedores e makers','Quem busca software atual']}
  },
  {
    id:'popos',name:'Pop!_OS',family:'Ubuntu / Debian',packageManager:'APT / Flatpak',release:{en:'LTS-focused',pt:'Foco em LTS'},difficulty:{en:'Beginner friendly',pt:'Amigável para iniciantes'},desktop:'COSMIC',color:'#48B9C7',logo:'https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/popos.svg',website:'https://system76.com/pop/',
    summary:{en:'System76’s Ubuntu-based distribution, now built around the COSMIC desktop with productivity, tiling and hardware workflows in mind.',pt:'Distribuição da System76 baseada em Ubuntu, agora construída ao redor do desktop COSMIC com foco em produtividade, tiling e fluxos de hardware.'},
    description:{en:'Pop!_OS targets desktop and laptop users who want a productive Linux environment with strong developer and graphics workflows. Modern Pop!_OS releases use System76’s COSMIC desktop rather than GNOME.',pt:'Pop!_OS é voltado a usuários de desktop e notebook que buscam um ambiente Linux produtivo, com bons fluxos para desenvolvimento e gráficos. As versões modernas do Pop!_OS usam o desktop COSMIC da System76 em vez do GNOME.'},
    goodFor:{en:['Desktop productivity','Developers and creators','Tiling-oriented workflows'],pt:['Produtividade no desktop','Desenvolvedores e criadores','Fluxos orientados a tiling']}
  },
  {
    id:'arch',name:'Arch Linux',family:'Arch',packageManager:'pacman',release:{en:'Rolling release',pt:'Rolling release'},difficulty:{en:'Advanced',pt:'Avançado'},desktop:'You choose',color:'#1793D1',logo:'https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/archlinux.svg',website:'https://archlinux.org/',
    summary:{en:'A lightweight, flexible rolling distribution that gives the user direct control over what is installed and configured.',pt:'Uma distribuição rolling, leve e flexível que dá ao usuário controle direto sobre o que será instalado e configurado.'},
    description:{en:'Arch follows a keep-it-simple philosophy and starts from a minimal base. It is highly documented and customizable, but expects the user to understand installation, maintenance and occasional manual interventions.',pt:'Arch segue uma filosofia de simplicidade e parte de uma base mínima. É altamente documentado e personalizável, mas espera que o usuário entenda instalação, manutenção e eventuais intervenções manuais.'},
    goodFor:{en:['Learning Linux deeply','Highly customized systems','Users comfortable with maintenance'],pt:['Aprender Linux profundamente','Sistemas altamente personalizados','Usuários confortáveis com manutenção']}
  },
  {
    id:'mint',name:'Linux Mint',family:'Ubuntu / Debian',packageManager:'APT',release:{en:'Stable',pt:'Estável'},difficulty:{en:'Beginner friendly',pt:'Amigável para iniciantes'},desktop:'Cinnamon, MATE, Xfce',color:'#86BE43',logo:'https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/linuxmint.svg',website:'https://linuxmint.com/',
    summary:{en:'A desktop-focused distribution emphasizing familiarity, convenience and a gentle transition for many Windows users.',pt:'Uma distribuição focada em desktop que prioriza familiaridade, conveniência e uma transição suave para muitos usuários vindos do Windows.'},
    description:{en:'Linux Mint provides a traditional desktop workflow, especially through Cinnamon, and includes practical tools for updates, drivers and everyday desktop use. It is often chosen by people who want Linux to feel familiar quickly.',pt:'Linux Mint oferece um fluxo de desktop tradicional, especialmente com Cinnamon, e inclui ferramentas práticas para atualizações, drivers e uso cotidiano. É frequentemente escolhido por quem quer se adaptar ao Linux rapidamente.'},
    goodFor:{en:['Windows migrants','Everyday desktop use','Users who prefer traditional desktop layouts'],pt:['Quem está migrando do Windows','Uso cotidiano no desktop','Quem prefere layouts tradicionais']}
  },
  {
    id:'opensuse',name:'openSUSE',family:'SUSE',packageManager:'Zypper',release:{en:'Leap / Tumbleweed',pt:'Leap / Tumbleweed'},difficulty:{en:'Intermediate',pt:'Intermediário'},desktop:'KDE Plasma, GNOME +',color:'#73BA25',logo:'https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/opensuse.svg',website:'https://www.opensuse.org/',
    summary:{en:'A community Linux project offering stable and rolling variants, strong administration tools and multiple desktop choices.',pt:'Um projeto Linux comunitário com variantes estáveis e rolling, ferramentas fortes de administração e várias opções de desktop.'},
    description:{en:'openSUSE offers different update models: Leap for a more stable cadence and Tumbleweed for a rolling experience. YaST is one of its signature administration tools, and Btrfs snapshot workflows are a notable part of many installations.',pt:'openSUSE oferece diferentes modelos de atualização: Leap para um ritmo mais estável e Tumbleweed para uma experiência rolling. O YaST é uma de suas ferramentas marcantes de administração, e snapshots com Btrfs fazem parte de muitas instalações.'},
    goodFor:{en:['Desktop and server experimentation','Users who like YaST','Stable or rolling workflows'],pt:['Experimentação em desktop e servidor','Usuários que gostam do YaST','Fluxos estáveis ou rolling']}
  },
  {
    id:'kali',name:'Kali Linux',family:'Debian',packageManager:'APT',release:{en:'Rolling',pt:'Rolling'},difficulty:{en:'Specialized',pt:'Especializada'},desktop:'Xfce, GNOME, KDE +',color:'#557C94',logo:'https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/kalilinux.svg',website:'https://www.kali.org/',
    summary:{en:'A Debian-based platform tailored for penetration testing, security research and professional offensive-security workflows.',pt:'Uma plataforma baseada em Debian voltada a testes de intrusão, pesquisa de segurança e fluxos profissionais de segurança ofensiva.'},
    description:{en:'Kali Linux packages a large security-tool ecosystem and is designed for cybersecurity tasks rather than as a default recommendation for general desktop beginners. Its own documentation emphasizes using official images and understanding the platform’s purpose.',pt:'Kali Linux reúne um grande ecossistema de ferramentas de segurança e é projetado para tarefas de cibersegurança, não como recomendação padrão para iniciantes em desktop. A própria documentação destaca o uso de imagens oficiais e a compreensão do propósito da plataforma.'},
    goodFor:{en:['Authorized security labs','Penetration testing professionals','Cybersecurity training environments'],pt:['Laboratórios de segurança autorizados','Profissionais de pentest','Ambientes de treinamento em cibersegurança']}
  },
  {
    id:'endeavour',name:'EndeavourOS',family:'Arch',packageManager:'pacman / yay',release:{en:'Rolling',pt:'Rolling'},difficulty:{en:'Intermediate',pt:'Intermediário'},desktop:'KDE Plasma + alternatives',color:'#7F3FBF',logo:'https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/endeavouros.svg',website:'https://endeavouros.com/',
    summary:{en:'A terminal-centric Arch-based distribution that lowers the installation barrier while keeping an Arch-like system close to upstream.',pt:'Uma distribuição baseada em Arch e orientada ao terminal que reduz a barreira de instalação mantendo um sistema próximo do Arch original.'},
    description:{en:'EndeavourOS provides an installer and sensible defaults around an Arch-based system while encouraging users to learn the terminal and upstream Arch ecosystem. It remains a rolling distribution and still expects active system maintenance.',pt:'EndeavourOS oferece instalador e padrões convenientes em torno de um sistema baseado em Arch, incentivando o aprendizado do terminal e do ecossistema Arch. Continua sendo rolling release e ainda exige manutenção ativa.'},
    goodFor:{en:['Users moving toward Arch','Terminal-oriented learning','Rolling release desktops'],pt:['Quem quer se aproximar do Arch','Aprendizado orientado ao terminal','Desktops rolling release']}
  },
  {
    id:'nixos',name:'NixOS',family:'Independent',packageManager:'Nix',release:{en:'Stable / Unstable channels',pt:'Canais Stable / Unstable'},difficulty:{en:'Advanced',pt:'Avançado'},desktop:'Many options',color:'#5277C3',logo:'https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/nixos.svg',website:'https://nixos.org/',
    summary:{en:'A declarative Linux distribution built around the Nix package manager, reproducible configuration and transactional system generations.',pt:'Uma distribuição Linux declarativa construída ao redor do gerenciador Nix, configuração reproduzível e gerações transacionais do sistema.'},
    description:{en:'NixOS approaches system management differently: much of the machine can be described declaratively in configuration. This enables reproducibility and rollbacks, but introduces concepts and tooling that are unfamiliar to users coming from traditional distributions.',pt:'NixOS aborda a administração de forma diferente: grande parte da máquina pode ser descrita declarativamente em configuração. Isso permite reprodutibilidade e rollbacks, mas introduz conceitos e ferramentas pouco familiares para quem vem de distribuições tradicionais.'},
    goodFor:{en:['Reproducible environments','Declarative system configuration','Advanced experimentation'],pt:['Ambientes reproduzíveis','Configuração declarativa do sistema','Experimentação avançada']}
  }
];

/* --- js/i18n.js --- */
const messages={
  en:{
    skip:'Skip to content',navLearn:'Learn',navTerminal:'Terminal',navCommands:'Commands',navDistros:'Distros',navRoadmap:'Roadmap',navResources:'Docs',heroPill:'Free • Open source • Browser based',heroTitle:'Learn Linux in a <em>desktop-like</em> experience.',heroText:'Learn commands, understand distributions and practice safely in an interactive environment inspired by the calm, focused feel of a modern GNOME desktop.',startLearning:'Start learning',openTerminal:'Open terminal',lessonsLabel:'Lessons',commandsLabel:'Commands',distrosLabel:'Distros',guideTitle:'Tux Guide',learnEyebrow:'01 / Learning path',learnTitle:'Build Linux knowledge one practical layer at a time.',learnText:'Short explanations, authentic commands and safe browser exercises. Progress is stored only on this device.',localProgress:'Local progress',resetProgress:'Reset progress',beginner:'Beginner',intermediate:'Intermediate',advanced:'Advanced',terminalEyebrow:'02 / Safe practice',terminalTitle:'Practice the command line without touching your real system.',terminalText:'The terminal below is a JavaScript simulation with a virtual filesystem. Commands keep their real Linux names and syntax in every language.',safeOne:'No real shell access',safeTwo:'No filesystem access',safeThree:'No eval() or remote execution',miniChallenge:'Mini challenge',challengeText:'Create <code>notes.txt</code> inside <code>Documents</code>.',challengeHint:'Hint: use <code>cd</code> and then <code>touch</code>.',notCompleted:'Not completed',completed:'Completed ✓',clear:'Clear',commandsEyebrow:'03 / Command explorer',commandsTitle:'Understand what a command does before you run it.',commandsText:'Search by purpose or category. Command names and syntax remain unchanged; explanations follow your selected language.',searchCommands:'Search commands…',distrosEyebrow:'04 / Distribution explorer',distrosTitle:'Meet the Linux ecosystem.',distrosText:'Swipe or use the arrows. Select a distribution to open a GNOME-style detail window with its profile and official website.',distroNotice:'There is no universal “best” Linux distribution. Hardware, workflow, update model and experience level all matter.',conceptsEyebrow:'05 / Core concepts',conceptsTitle:'See how Linux is organized.',conceptsText:'Interactive references for the filesystem, permissions and package managers.',filesystem:'Filesystem',filesystemText:'Select a directory to learn its usual role on a Linux system.',filesystemPrompt:'Choose a directory.',permissions:'Permissions',permissionsText:'Linux permissions are grouped for owner, group and others.',owner:'Owner',group:'Group',others:'Others',rwx:'read • write • execute',rx:'read • execute',r:'read only',packageManagers:'Package managers',sameGoal:'Same goal, different tools.',packageText:'The command changes with the distribution family. The examples remain authentic Linux syntax.',family:'Family',tool:'Tool',installExample:'Install example',windowsEyebrow:'07 / Coming from Windows?',windowsTitle:'Translate familiar ideas into Linux concepts.',windowsText:'These are learning bridges, not exact one-to-one equivalents.',taskManager:'Task Manager',terminalShell:'Terminal + shell',packageRepos:'Package manager / repositories',services:'Services',manyDistros:'on many distros',administrator:'Administrator',knowledgeCheck:'Knowledge check',quizQuestion:'Which command prints the current directory?',quizText:'Choose one answer. Feedback appears immediately.',roadmapEyebrow:'08 / Roadmap',roadmapTitle:'One system, many directions.',roadmapText:'Build a strong foundation and then specialize in development, servers, DevOps or security.',fundamentals:'Fundamentals',packages:'Packages',processes:'Processes',networking:'Networking',administration:'Administration',footerText:'From a CSS Tux experiment to an interactive Linux learning environment.',builtWith:'Built with',viewSource:'View source ↗',distroProfile:'Distribution profile',globalSearch:'Global search',findAnything:'Find anything',globalSearchPlaceholder:'Commands, lessons, distros…',complete:'Mark complete',done:'Completed',tryIt:'Try it',details:'Details',expectedOutput:'Expected output',allCategories:'All categories',noCommands:'No commands match this search.',risk:'Risk',level:'Level',syntaxLabel:'Syntax',docsLink:'Official docs',packageManager:'Package manager',releaseModel:'Release model',difficulty:'Difficulty',desktop:'Desktop',goodFor:'Good for',officialWebsite:'Open official website ↗',whyChoose:'Why it may fit',noResults:'No results found.',lessonType:'Lesson',commandType:'Command',distroType:'Distro',conceptType:'Concept',guideType:'Guide',quizCorrect:'Correct. <code>pwd</code> prints the current working directory.',quizWrong:'Not quite. Try again — the correct command is <code>pwd</code>.',progressReset:'Progress reset locally. Ready for a fresh start.',challengeDone:'Challenge complete! You created notes.txt inside Documents.',tuxWelcome:'Welcome! Ready to learn Linux?',tuxMove:'I am watching your cursor 👀',tuxTerminal:'Type “help” in the terminal to begin.',tuxDistro:'A distro is a set of choices around the Linux kernel.',official:'Official',learnMore:'Learn more',close:'Close',mapEyebrow:'Interactive Linux map',mapTitle:'Linux is not a list of commands.<br><em>It is a connected system.</em>',mapText:'Explore the map, choose a path and learn how the pieces connect from your first terminal command to administration and security.',mapWindowTitle:'Linux Learning Map',mapStartNode:'Start here',mapSecurity:'Security',mapWindows:'From Windows',mapCenterKicker:'Your guide',tuxHint:'Move, hover or click Tux',mapHint:'Click any connected topic to jump directly to that part of the course.',mapJump:'Good choice. Let’s connect this topic to the rest of Linux.',tuxWink:'Still there? 😉',tuxClick:'Hey! I noticed that click 🐧',practiceShortcuts:'Practice shortcuts',missionExplore:'Explore your home directory',missionCreate:'Create a linux-lab directory',missionNote:'Create notes.txt inside Documents',sandboxed:'Sandboxed',terminalHintLine:'Use ↑ ↓ for history and Tab for command completion.',terminalClearHint:'clears the terminal',terminalInputPlaceholder:'type a command…',tuxEvolution:'CSS Tux • evolved from V1',docsEyebrow:'06 / Official references',docsTitle:'Learn with the manuals that Linux users actually rely on.',docsText:'The course summarizes concepts for learning, while these links take you to primary documentation for deeper study and verification.',docsCoreutils:'Primary manual for foundational file and system utilities such as ls, cp, mv, rm, pwd and chmod.',docsBash:'Shell syntax, built-ins, redirection, scripting and interactive behavior.',docsManPages:'Linux interfaces and a curated collection of manual pages, organized by traditional man sections.',docsFhs:'Reference for conventional purposes and placement of directories such as /etc, /home, /usr and /var.',docsDebian:'Practical GNU/Linux tutorials, filesystem, permissions, package management and administration.',docsArch:'Detailed community documentation for Linux configuration, maintenance and troubleshooting.',docsArchPacman:'Official pacman manual covering package queries, synchronization, removal and command syntax.',docsFedora:'Official Fedora documentation for installation, package workflows and system usage.',docsKali:"Official documentation for Kali's specialized penetration-testing and security-auditing platform.",docsKernel:'Official kernel documentation, including user and administrator guides.'
  },
  pt:{
    skip:'Pular para o conteúdo',navLearn:'Aprender',navTerminal:'Terminal',navCommands:'Comandos',navDistros:'Distros',navRoadmap:'Trilha',navResources:'Docs',heroPill:'Grátis • Código aberto • Direto no navegador',heroTitle:'Aprenda Linux em uma experiência <em>inspirada no desktop</em>.',heroText:'Aprenda comandos, entenda distribuições e pratique com segurança em um ambiente interativo inspirado na experiência limpa e focada do GNOME moderno.',startLearning:'Começar a aprender',openTerminal:'Abrir terminal',lessonsLabel:'Aulas',commandsLabel:'Comandos',distrosLabel:'Distros',guideTitle:'Guia Tux',learnEyebrow:'01 / Trilha de aprendizado',learnTitle:'Construa seu conhecimento em Linux, uma camada prática por vez.',learnText:'Explicações curtas, comandos autênticos e exercícios seguros no navegador. Seu progresso fica apenas neste dispositivo.',localProgress:'Progresso local',resetProgress:'Resetar progresso',beginner:'Iniciante',intermediate:'Intermediário',advanced:'Avançado',terminalEyebrow:'02 / Prática segura',terminalTitle:'Pratique a linha de comando sem tocar no seu sistema real.',terminalText:'O terminal abaixo é uma simulação em JavaScript com filesystem virtual. Os comandos mantêm seus nomes e sintaxe reais em qualquer idioma.',safeOne:'Sem acesso ao shell real',safeTwo:'Sem acesso aos seus arquivos',safeThree:'Sem eval() ou execução remota',miniChallenge:'Mini desafio',challengeText:'Crie <code>notes.txt</code> dentro de <code>Documents</code>.',challengeHint:'Dica: use <code>cd</code> e depois <code>touch</code>.',notCompleted:'Não concluído',completed:'Concluído ✓',clear:'Limpar',commandsEyebrow:'03 / Explorador de comandos',commandsTitle:'Entenda o que um comando faz antes de executá-lo.',commandsText:'Pesquise por finalidade ou categoria. Nomes e sintaxe dos comandos não são traduzidos; apenas as explicações acompanham o idioma escolhido.',searchCommands:'Pesquisar comandos…',distrosEyebrow:'04 / Explorador de distribuições',distrosTitle:'Conheça o ecossistema Linux.',distrosText:'Deslize ou use as setas. Selecione uma distribuição para abrir uma janela em estilo GNOME com o perfil e o site oficial.',distroNotice:'Não existe uma distribuição Linux universalmente “melhor”. Hardware, fluxo de trabalho, modelo de atualizações e experiência fazem diferença.',conceptsEyebrow:'05 / Conceitos fundamentais',conceptsTitle:'Veja como o Linux é organizado.',conceptsText:'Referências interativas sobre filesystem, permissões e gerenciadores de pacotes.',filesystem:'Sistema de arquivos',filesystemText:'Selecione um diretório para entender sua função comum em um sistema Linux.',filesystemPrompt:'Escolha um diretório.',permissions:'Permissões',permissionsText:'As permissões Linux são agrupadas para dono, grupo e outros usuários.',owner:'Dono',group:'Grupo',others:'Outros',rwx:'leitura • escrita • execução',rx:'leitura • execução',r:'somente leitura',packageManagers:'Gerenciadores de pacotes',sameGoal:'Mesmo objetivo, ferramentas diferentes.',packageText:'O comando muda conforme a família da distribuição. Os exemplos mantêm a sintaxe real do Linux.',family:'Família',tool:'Ferramenta',installExample:'Exemplo de instalação',windowsEyebrow:'07 / Vindo do Windows?',windowsTitle:'Traduza ideias conhecidas para conceitos do Linux.',windowsText:'Estas comparações são pontes para o aprendizado, não equivalências perfeitas.',taskManager:'Gerenciador de Tarefas',terminalShell:'Terminal + shell',packageRepos:'Gerenciador de pacotes / repositórios',services:'Serviços',manyDistros:'em muitas distros',administrator:'Administrador',knowledgeCheck:'Teste de conhecimento',quizQuestion:'Qual comando mostra o diretório atual?',quizText:'Escolha uma resposta. O feedback aparece imediatamente.',roadmapEyebrow:'08 / Trilha',roadmapTitle:'Um sistema, muitos caminhos.',roadmapText:'Construa uma base sólida e depois se especialize em desenvolvimento, servidores, DevOps ou segurança.',fundamentals:'Fundamentos',packages:'Pacotes',processes:'Processos',networking:'Redes',administration:'Administração',footerText:'De um experimento com Tux em CSS para um ambiente interativo de aprendizado Linux.',builtWith:'Feito com',viewSource:'Ver código-fonte ↗',distroProfile:'Perfil da distribuição',globalSearch:'Busca global',findAnything:'Encontre qualquer conteúdo',globalSearchPlaceholder:'Comandos, aulas, distros…',complete:'Marcar como concluída',done:'Concluída',tryIt:'Testar',details:'Detalhes',expectedOutput:'Saída esperada',allCategories:'Todas as categorias',noCommands:'Nenhum comando corresponde à busca.',risk:'Risco',level:'Nível',syntaxLabel:'Sintaxe',docsLink:'Documentação oficial',packageManager:'Gerenciador de pacotes',releaseModel:'Modelo de lançamento',difficulty:'Dificuldade',desktop:'Desktop',goodFor:'Indicado para',officialWebsite:'Abrir site oficial ↗',whyChoose:'Por que pode fazer sentido',noResults:'Nenhum resultado encontrado.',lessonType:'Aula',commandType:'Comando',distroType:'Distro',conceptType:'Conceito',guideType:'Guia',quizCorrect:'Correto. <code>pwd</code> mostra o diretório de trabalho atual.',quizWrong:'Ainda não. Tente novamente — o comando correto é <code>pwd</code>.',progressReset:'Progresso local resetado. Pronto para recomeçar.',challengeDone:'Desafio concluído! Você criou notes.txt dentro de Documents.',tuxWelcome:'Bem-vindo! Pronto para aprender Linux?',tuxMove:'Estou de olho no seu cursor 👀',tuxTerminal:'Digite “help” no terminal para começar.',tuxDistro:'Uma distro reúne escolhas e ferramentas ao redor do kernel Linux.',official:'Oficial',learnMore:'Saiba mais',close:'Fechar',mapEyebrow:'Mapa Linux interativo',mapTitle:'Linux não é uma lista de comandos.<br><em>É um sistema conectado.</em>',mapText:'Explore o mapa, escolha um caminho e entenda como as peças se conectam desde o primeiro comando no terminal até administração e segurança.',mapWindowTitle:'Mapa de Aprendizado Linux',mapStartNode:'Comece aqui',mapSecurity:'Segurança',mapWindows:'Vindo do Windows',mapCenterKicker:'Seu guia',tuxHint:'Mova, permaneça ou clique no Tux',mapHint:'Clique em qualquer tópico conectado para ir diretamente àquela parte do curso.',mapJump:'Boa escolha. Vamos conectar este assunto ao restante do Linux.',tuxWink:'Ainda por aqui? 😉',tuxClick:'Ei! Eu percebi esse clique 🐧',practiceShortcuts:'Atalhos para praticar',missionExplore:'Explore seu diretório pessoal',missionCreate:'Crie um diretório linux-lab',missionNote:'Crie notes.txt dentro de Documents',sandboxed:'Sandbox seguro',terminalHintLine:'Use ↑ ↓ para o histórico e Tab para completar comandos.',terminalClearHint:'limpa o terminal',terminalInputPlaceholder:'digite um comando…',tuxEvolution:'Tux em CSS • evolução da V1',docsEyebrow:'06 / Referências oficiais',docsTitle:'Aprenda também pelos manuais que usuários Linux realmente consultam.',docsText:'O curso resume conceitos para facilitar o aprendizado; estes links levam à documentação principal para aprofundar e conferir informações.',docsCoreutils:'Manual principal para utilitários fundamentais de arquivos e sistema como ls, cp, mv, rm, pwd e chmod.',docsBash:'Sintaxe do shell, comandos internos, redirecionamento, scripts e comportamento interativo.',docsManPages:'Interfaces Linux e uma coleção selecionada de páginas de manual, organizada pelas seções tradicionais do man.',docsFhs:'Referência para funções e localização convencionais de diretórios como /etc, /home, /usr e /var.',docsDebian:'Tutoriais práticos de GNU/Linux, filesystem, permissões, pacotes e administração.',docsArch:'Documentação comunitária detalhada sobre configuração, manutenção e solução de problemas no Linux.',docsArchPacman:'Manual oficial do pacman cobrindo consultas, sincronização, remoção de pacotes e sintaxe dos comandos.',docsFedora:'Documentação oficial do Fedora para instalação, fluxos de pacotes e uso do sistema.',docsKali:'Documentação oficial da plataforma especializada do Kali para testes de intrusão e auditoria de segurança.',docsKernel:'Documentação oficial do kernel, incluindo guias para usuários e administradores.'
  }
};
let language=storage.getItem('linuxAcademy.language')||'en';
if(!['en','pt'].includes(language))language='en';
const getLanguage=()=>language;
const t=(key)=>messages[language][key]??messages.en[key]??key;
function applyTranslations(){
  document.documentElement.lang=language==='pt'?'pt-BR':'en';
  document.querySelectorAll('[data-i18n]').forEach(el=>{const key=el.dataset.i18n;if(messages[language][key]!=null)el.textContent=messages[language][key];});
  document.querySelectorAll('[data-i18n-html]').forEach(el=>{const key=el.dataset.i18nHtml;if(messages[language][key]!=null)el.innerHTML=messages[language][key];});
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{const key=el.dataset.i18nPlaceholder;if(messages[language][key]!=null)el.placeholder=messages[language][key];});
  const label=document.querySelector('#languageLabel');if(label)label.textContent=language==='en'?'EN':'PT-BR';
  document.title=language==='pt'?'Linux Interactive Academy — Aprenda Linux':'Linux Interactive Academy — Learn Linux';
}
function setLanguage(next){language=next;storage.setItem('linuxAcademy.language',language);applyTranslations();window.dispatchEvent(new CustomEvent('academy:language',{detail:{language}}));}
function toggleLanguage(){setLanguage(language==='en'?'pt':'en');}

/* --- js/tux.js --- */

function initTux() {
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

/* --- js/mindmap.js --- */

function initMindMap({ tuxSpeak } = {}) {
  const stage = document.querySelector('#linuxMindmap');
  const svg = document.querySelector('#mindmapConnectors');
  const hub = document.querySelector('#mindHub');
  const nodes = [...document.querySelectorAll('.mind-node')];
  const start = document.querySelector('#mapStart');
  const visitedKey = 'linuxAcademy.mapVisited';
  let visited = new Set(JSON.parse(storage.getItem(visitedKey) || '[]'));
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
      storage.setItem(visitedKey, JSON.stringify([...visited]));
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

/* --- js/terminal.js --- */

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

function initTerminal({ onCommand, tuxSpeak } = {}) {
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
    if (done) storage.setItem(`linuxAcademy.mission.${key}`, 'done');
  }

  function syncMissions() {
    Object.keys(missions).forEach(key => setMission(key, storage.getItem(`linuxAcademy.mission.${key}`) === 'done'));
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
      Object.keys(missions).forEach(key => storage.removeItem(`linuxAcademy.mission.${key}`));
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

/* --- js/course.js --- */

function initCourse({onProgressChange,terminalRunner,tuxSpeak}){
  const grid=document.querySelector('#lessonGrid');
  const tabs=[...document.querySelectorAll('.tab')];
  let activeLevel='beginner';
  const key='linuxAcademy.completedLessons';
  const read=()=>new Set(JSON.parse(storage.getItem(key)||'[]'));
  const write=set=>{storage.setItem(key,JSON.stringify([...set]));onProgressChange?.();};
  const localize=obj=>typeof obj==='string'?obj:(obj?.[getLanguage()]??obj?.en??'');

  function render(){
    const completed=read();
    grid.replaceChildren();
    lessons.filter(l=>l.level===activeLevel).forEach((lesson,index)=>{
      const card=document.createElement('article');card.className=`lesson-card ${completed.has(lesson.id)?'completed':''}`;
      const num=document.createElement('span');num.className='lesson-num';num.textContent=`${String(index+1).padStart(2,'0')} / ${t(activeLevel)}`;
      const title=document.createElement('h3');title.textContent=localize(lesson.title);
      const desc=document.createElement('p');desc.textContent=localize(lesson.description);
      const cmd=document.createElement('div');cmd.className='lesson-command';cmd.textContent=`$ ${lesson.command}`;
      const detail=document.createElement('details');detail.className='lesson-detail';
      const summary=document.createElement('summary');summary.textContent=t('expectedOutput');
      const expected=document.createElement('p');expected.textContent=localize(lesson.output);detail.append(summary,expected);
      const actions=document.createElement('div');actions.className='lesson-actions';
      const tryBtn=document.createElement('button');tryBtn.className='small-button';tryBtn.type='button';tryBtn.textContent=t('tryIt');
      tryBtn.addEventListener('click',()=>{terminalRunner?.(lesson.command);document.querySelector('#terminal')?.scrollIntoView({behavior:'smooth'});});
      const doneBtn=document.createElement('button');doneBtn.className='small-button complete';doneBtn.type='button';doneBtn.textContent=completed.has(lesson.id)?`${t('done')} ✓`:t('complete');
      doneBtn.addEventListener('click',()=>{const set=read();if(set.has(lesson.id))set.delete(lesson.id);else{set.add(lesson.id);tuxSpeak?.(getLanguage()==='pt'?'Boa! Mais um conceito Linux concluído. 🐧':'Nice! Another Linux concept unlocked. 🐧');}write(set);render();});
      const ref=document.createElement('a');ref.className='lesson-reference';ref.href=lesson.reference;ref.target='_blank';ref.rel='noopener noreferrer';ref.textContent=`${lesson.source || t('official')} ↗`;actions.append(tryBtn,doneBtn,ref);card.append(num,title,desc,cmd,detail,actions);grid.append(card);
    });
  }
  tabs.forEach(tab=>tab.addEventListener('click',()=>{activeLevel=tab.dataset.level;tabs.forEach(x=>{x.classList.toggle('active',x===tab);x.setAttribute('aria-selected',String(x===tab));});render();}));
  document.querySelector('#resetProgress')?.addEventListener('click',()=>{storage.removeItem(key);storage.removeItem('linuxAcademy.quiz');storage.removeItem('linuxAcademy.challenge');window.dispatchEvent(new CustomEvent('academy:progress-reset'));onProgressChange?.();render();});
  window.addEventListener('academy:language',render);
  render();
  return {lessons,readCompleted:read,render};
}

/* --- js/commands.js --- */
const categoryLabels={
  en:{Navigation:'Navigation',Directories:'Directories',Files:'Files',Text:'Text',Search:'Search',Processes:'Processes',Permissions:'Permissions',Users:'Users',System:'System',Storage:'Storage',Network:'Network',Archives:'Archives',Packages:'Packages',Administration:'Administration'},
  pt:{Navigation:'Navegação',Directories:'Diretórios',Files:'Arquivos',Text:'Texto',Search:'Busca',Processes:'Processos',Permissions:'Permissões',Users:'Usuários',System:'Sistema',Storage:'Armazenamento',Network:'Rede',Archives:'Arquivos compactados',Packages:'Pacotes',Administration:'Administração'}
};

const coreutilsReference='https://www.gnu.org/software/coreutils/manual/coreutils.html';
const commandReferences={
  pwd:coreutilsReference,ls:coreutilsReference,mkdir:coreutilsReference,touch:coreutilsReference,cat:coreutilsReference,head:coreutilsReference,tail:coreutilsReference,whoami:coreutilsReference,id:coreutilsReference,uname:coreutilsReference,df:coreutilsReference,du:coreutilsReference,chmod:coreutilsReference,chown:coreutilsReference,rm:coreutilsReference,dd:coreutilsReference,
  grep:'https://www.gnu.org/software/grep/manual/grep.html',find:'https://www.gnu.org/software/findutils/manual/html_mono/find.html',ps:'https://man7.org/linux/man-pages/man1/ps.1.html',kill:'https://man7.org/linux/man-pages/man1/kill.1.html',lsblk:'https://man7.org/linux/man-pages/man8/lsblk.8.html',ip:'https://man7.org/linux/man-pages/man8/ip.8.html',ping:'https://man7.org/linux/man-pages/man8/ping.8.html',ssh:'https://man.openbsd.org/ssh',apt:'https://www.debian.org/doc/manuals/debian-reference/ch02.en.html',dnf:'https://docs.fedoraproject.org/',pacman:'https://man.archlinux.org/man/pacman.8',systemctl:'https://www.freedesktop.org/software/systemd/man/latest/systemctl.html',journalctl:'https://www.freedesktop.org/software/systemd/man/latest/journalctl.html',tar:'https://www.gnu.org/software/tar/manual/tar.html',mkfs:'https://man7.org/linux/man-pages/man8/mkfs.8.html',fdisk:'https://man7.org/linux/man-pages/man8/fdisk.8.html'
};

const levelLabels={en:{Beginner:'Beginner',Intermediate:'Intermediate',Advanced:'Advanced'},pt:{Beginner:'Iniciante',Intermediate:'Intermediário',Advanced:'Avançado'}};
function initCommandExplorer(){
  const grid=document.querySelector('#commandGrid'),search=document.querySelector('#commandSearch'),category=document.querySelector('#commandCategory');
  const localize=v=>typeof v==='string'?v:(v?.[getLanguage()]??v?.en??'');
  function buildCategories(){const selected=category.value||'all';category.replaceChildren();const all=document.createElement('option');all.value='all';all.textContent=t('allCategories');category.append(all);[...new Set(commands.map(c=>c.category))].sort().forEach(c=>{const o=document.createElement('option');o.value=c;o.textContent=categoryLabels[getLanguage()][c]||c;category.append(o);});category.value=[...category.options].some(o=>o.value===selected)?selected:'all';}
  function render(){const q=search.value.trim().toLowerCase(),cat=category.value;const lang=getLanguage();const filtered=commands.filter(c=>(cat==='all'||c.category===cat)&&(!q||[c.name,c.category,localize(c.description),c.example].join(' ').toLowerCase().includes(q)));grid.replaceChildren();if(!filtered.length){const e=document.createElement('div');e.className='empty-state';e.textContent=t('noCommands');grid.append(e);return;}filtered.forEach(c=>{const card=document.createElement('article');card.className='command-card';const head=document.createElement('header');const h=document.createElement('h3');h.textContent=c.name;const badge=document.createElement('span');badge.className=`badge ${c.risk?'risk':''}`;badge.textContent=c.risk?t('risk'):(levelLabels[lang][c.level]||c.level);head.append(h,badge);const p=document.createElement('p');p.textContent=localize(c.description);const syntax=document.createElement('div');syntax.className='command-syntax';syntax.innerHTML=`<span>${t('syntaxLabel')}</span><code></code>`;syntax.querySelector('code').textContent=c.syntax;const pre=document.createElement('pre');pre.textContent=c.example;const ref=document.createElement('a');ref.className='command-reference';ref.href=commandReferences[c.name]||'https://man7.org/linux/man-pages/';ref.target='_blank';ref.rel='noopener noreferrer';ref.textContent=`${t('docsLink')} ↗`;card.append(head,p,syntax,pre);if(c.risk){const r=document.createElement('div');r.className='risk-note';r.textContent=`⚠ ${localize(c.risk)}`;card.append(r);}card.append(ref);grid.append(card);});}
  search.addEventListener('input',render);category.addEventListener('change',render);window.addEventListener('academy:language',()=>{buildCategories();render();});buildCategories();render();return commands;
}

/* --- js/distros.js --- */

function initDistros({tuxSpeak}={}){
  const carousel=document.querySelector('#distroCarousel');
  const prev=document.querySelector('#distroPrev');
  const next=document.querySelector('#distroNext');
  const progress=document.querySelector('#distroProgress');
  const dialog=document.querySelector('#distroDialog');
  const body=document.querySelector('#distroModalBody');
  const close=document.querySelector('#distroClose');
  const localize=v=>typeof v==='string'?v:(v?.[getLanguage()]??v?.en??'');
  let activeId=null;

  const safeLink=url=>{try{const u=new URL(url);return ['https:','http:'].includes(u.protocol)?u.href:'#';}catch{return '#';}};
  function createLogo(d,cls=''){
    const wrap=document.createElement('div');wrap.className=cls||'distro-logo-box';
    const img=document.createElement('img');img.src=d.logo;img.alt=`${d.name} logo`;img.loading='lazy';img.decoding='async';
    img.addEventListener('error',()=>{wrap.textContent=d.name.slice(0,2).toUpperCase();wrap.classList.add('logo-fallback');},{once:true});
    wrap.append(img);return wrap;
  }
  function renderCarousel(){
    carousel.replaceChildren();
    distros.forEach(d=>{
      const card=document.createElement('button');card.type='button';card.className='distro-slide';card.dataset.id=d.id;card.style.setProperty('--distro-color',d.color);card.setAttribute('aria-label',`${d.name} — ${t('learnMore')}`);
      const logo=createLogo(d);
      const family=document.createElement('small');family.textContent=d.family;
      const h=document.createElement('h3');h.textContent=d.name;
      const p=document.createElement('p');p.textContent=localize(d.summary);
      const footer=document.createElement('div');footer.className='distro-card-footer';const s=document.createElement('strong');s.textContent=localize(d.difficulty);const arrow=document.createElement('span');arrow.textContent='↗';footer.append(s,arrow);
      card.append(logo,family,h,p,footer);card.addEventListener('click',()=>openDistro(d.id));carousel.append(card);
    });
    updateProgress();
  }
  function openDistro(id){
    const d=distros.find(x=>x.id===id);if(!d)return;activeId=id;body.replaceChildren();
    const hero=document.createElement('div');hero.className='modal-hero';const logo=createLogo(d,'modal-logo');const copy=document.createElement('div');const h=document.createElement('h2');h.id='distroModalTitle';h.textContent=d.name;const sub=document.createElement('p');sub.textContent=`${d.family} • ${localize(d.release)}`;copy.append(h,sub);hero.append(logo,copy);
    const desc=document.createElement('p');desc.className='modal-description';desc.textContent=localize(d.description);
    const meta=document.createElement('div');meta.className='modal-meta';[
      [t('packageManager'),d.packageManager],[t('releaseModel'),localize(d.release)],[t('difficulty'),localize(d.difficulty)],[t('desktop'),d.desktop]
    ].forEach(([k,v])=>{const box=document.createElement('div');const label=document.createElement('span');label.textContent=k;const strong=document.createElement('strong');strong.textContent=v;box.append(label,strong);meta.append(box);});
    const list=document.createElement('div');list.className='modal-list';const lt=document.createElement('strong');lt.textContent=t('goodFor');const ul=document.createElement('ul');localize(d.goodFor).forEach(item=>{const li=document.createElement('li');li.textContent=item;ul.append(li)});list.append(lt,ul);
    const link=document.createElement('a');link.className='button primary official-link';link.href=safeLink(d.website);link.target='_blank';link.rel='noopener noreferrer';link.textContent=t('officialWebsite');
    body.append(hero,desc,meta,list,link);if(!dialog.open)dialog.showModal();tuxSpeak?.(t('tuxDistro'));
  }
  function scrollByCard(dir){const first=carousel.querySelector('.distro-slide');const amount=(first?.getBoundingClientRect().width||280)+16;carousel.scrollBy({left:dir*amount,behavior:'smooth'});}
  function updateProgress(){const max=Math.max(1,carousel.scrollWidth-carousel.clientWidth);const pct=Math.min(100,Math.max(10,((carousel.scrollLeft+carousel.clientWidth)/Math.max(carousel.scrollWidth,1))*100));progress.style.width=`${pct}%`;prev.disabled=carousel.scrollLeft<4;next.disabled=carousel.scrollLeft>=max-4;}
  prev.addEventListener('click',()=>scrollByCard(-1));next.addEventListener('click',()=>scrollByCard(1));carousel.addEventListener('scroll',()=>requestAnimationFrame(updateProgress),{passive:true});window.addEventListener('resize',updateProgress,{passive:true});
  close.addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
  window.addEventListener('academy:language',()=>{renderCarousel();if(activeId&&dialog.open)openDistro(activeId);});
  renderCarousel();return distros;
}

/* --- js/search.js --- */
function initSearch({commands,distros,lessons}){
  const dialog=document.querySelector('#searchDialog'),trigger=document.querySelector('#searchTrigger'),close=document.querySelector('#searchClose'),input=document.querySelector('#globalSearch'),results=document.querySelector('#searchResults');
  const localize=v=>typeof v==='string'?v:(v?.[getLanguage()]??v?.en??'');
  function items(){
    const concepts=[
      {type:t('conceptType'),title:t('filesystem'),desc:t('filesystemText'),target:'#concepts'},
      {type:t('conceptType'),title:t('permissions'),desc:t('permissionsText'),target:'#concepts'},
      {type:t('conceptType'),title:t('packageManagers'),desc:t('packageText'),target:'#concepts'},
      {type:t('guideType'),title:t('windowsTitle'),desc:t('windowsText'),target:'#windows-linux'},
      {type:t('guideType'),title:t('roadmapTitle'),desc:t('roadmapText'),target:'#roadmap'},
      {type:t('guideType'),title:t('mapWindowTitle'),desc:t('mapText'),target:'#home'},
      {type:t('guideType'),title:t('docsTitle'),desc:t('docsText'),target:'#resources'}
    ];
    return [...commands.map(x=>({type:t('commandType'),title:x.name,desc:localize(x.description),target:'#commands'})),...distros.map(x=>({type:t('distroType'),title:x.name,desc:localize(x.summary),target:'#distros'})),...lessons.map(x=>({type:t('lessonType'),title:localize(x.title),desc:localize(x.description),target:'#learn'})),...concepts];
  }
  function render(){const q=input.value.trim().toLowerCase();results.replaceChildren();const all=items();const list=(q?all.filter(i=>[i.title,i.desc,i.type].join(' ').toLowerCase().includes(q)):all.slice(0,8)).slice(0,18);list.forEach(item=>{const b=document.createElement('button');b.type='button';b.className='search-result';const small=document.createElement('small');small.textContent=item.type;const strong=document.createElement('strong');strong.textContent=item.title;const span=document.createElement('span');span.textContent=item.desc;b.append(small,strong,span);b.addEventListener('click',()=>{dialog.close();document.querySelector(item.target)?.scrollIntoView({behavior:'smooth'});});results.append(b);});if(!list.length){const p=document.createElement('p');p.className='empty-state';p.textContent=t('noResults');results.append(p);}}
  function open(){dialog.showModal();input.value='';render();setTimeout(()=>input.focus(),30)}
  trigger.addEventListener('click',open);close.addEventListener('click',()=>dialog.close());input.addEventListener('input',render);window.addEventListener('academy:language',render);document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();open()}if(e.key==='Escape'&&dialog.open)dialog.close();});
}

/* --- js/quiz.js --- */
function initQuiz({tuxSpeak,onProgressChange}={}){
  const options=[...document.querySelectorAll('#quizOptions button')],feedback=document.querySelector('#quizFeedback');let last=null;
  function show(ok){feedback.className=`quiz-feedback ${ok?'success':'error'}`;feedback.innerHTML=ok?t('quizCorrect'):t('quizWrong');}
  options.forEach(btn=>btn.addEventListener('click',()=>{options.forEach(b=>b.classList.remove('correct','wrong'));const ok=btn.dataset.answer==='pwd';last=ok;btn.classList.add(ok?'correct':'wrong');show(ok);if(ok){storage.setItem('linuxAcademy.quiz','done');tuxSpeak?.(t('quizCorrect').replace(/<[^>]+>/g,''));onProgressChange?.();}}));
  window.addEventListener('academy:language',()=>{if(last!==null)show(last);});
}

/* --- js/app.js --- */
document.documentElement.classList.add('js');


applyTranslations();
const tux = initTux();
initMindMap({ tuxSpeak: tux.speak });

const completedKey = 'linuxAcademy.completedLessons';
const progressLabel = document.querySelector('#progressLabel');
const progressBar = document.querySelector('#progressBar');

function updateProgress() {
  const completed = new Set(JSON.parse(storage.getItem(completedKey) || '[]'));
  const quiz = storage.getItem('linuxAcademy.quiz') === 'done' ? 1 : 0;
  const challenge = storage.getItem('linuxAcademy.challenge') === 'done' ? 1 : 0;
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
      storage.setItem('linuxAcademy.challenge', 'done');
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
  const done = storage.getItem('linuxAcademy.challenge') === 'done';
  document.querySelector('#challengeCard').classList.toggle('completed', done);
  document.querySelector('#challengeStatus').textContent = done ? t('completed') : t('notCompleted');
}

syncChallenge();
updateProgress();

window.addEventListener('academy:progress-reset', () => {
  storage.removeItem('linuxAcademy.challenge');
  ['explore', 'create', 'note'].forEach(k => storage.removeItem(`linuxAcademy.mission.${k}`));
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

})();
