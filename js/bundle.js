(()=>{
'use strict';

/* --- js/runtime.js --- */

const storage=(()=>{
  const memory={};
  const fallback={
    getItem:k=>Object.prototype.hasOwnProperty.call(memory,k)?memory[k]:null,
    setItem:(k,v)=>{memory[k]=String(v);},
    removeItem:k=>{delete memory[k];},
    clear:()=>{Object.keys(memory).forEach(k=>delete memory[k]);}
  };
  try{
    const key='__interactive_linux_academy_storage_test__';
    window.localStorage.setItem(key,'1');
    window.localStorage.removeItem(key);
    return window.localStorage;
  }catch{
    return fallback;
  }
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
  {id:'ssh',level:'advanced',title:{en:'Remote administration with SSH',pt:'Administração remota com SSH'},description:{en:'SSH provides encrypted remote login and command execution. Learn host verification, keys and least-privilege access before administering remote systems.',pt:'SSH fornece login remoto criptografado e execução de comandos. Aprenda verificação de host, chaves e menor privilégio antes de administrar sistemas remotos.'},command:'ssh user@server.example',output:{en:'Example syntax only; this browser lab makes no network connection.',pt:'Apenas exemplo de sintaxe; este laboratório no navegador não realiza conexão de rede.'},reference:'https://man.openbsd.org/ssh.1',source:'OpenSSH manual'},
  {id:'automation',level:'advanced',title:{en:'Schedule repeatable work',pt:'Agende tarefas repetíveis'},description:{en:'Linux environments commonly schedule recurring work with systemd timers or cron. Keep jobs observable, idempotent where possible and explicit about paths and environment.',pt:'Ambientes Linux normalmente agendam tarefas recorrentes com timers do systemd ou cron. Mantenha tarefas observáveis, idempotentes quando possível e explícitas sobre caminhos e ambiente.'},command:'systemctl list-timers',output:{en:'Lists active systemd timers on a systemd-based system.',pt:'Lista timers ativos em um sistema baseado em systemd.'},reference:'https://www.freedesktop.org/software/systemd/man/latest/systemd.timer.html',source:'systemd.timer manual'},
  {id:'security',level:'advanced',title:{en:'Security starts with least privilege and updates',pt:'Segurança começa com menor privilégio e atualizações'},description:{en:'Use administrative privileges only when required, keep software supported and updated, review permissions and authenticate remote access carefully. Security is a process, not one command.',pt:'Use privilégios administrativos apenas quando necessário, mantenha software suportado e atualizado, revise permissões e autentique acessos remotos com cuidado. Segurança é um processo, não um único comando.'},command:'id',output:{en:'Shows the current user and group identities.',pt:'Mostra as identidades de usuário e grupos atuais.'},reference:'https://man7.org/linux/man-pages/man1/id.1.html',source:'id(1) manual'}
,
  {id:'open-source',level:'beginner',module:'foundations',type:'READ',minutes:7,title:{en:'Open source and Linux communities',pt:'Código aberto e comunidades Linux'},description:{en:'Linux is developed in public across many projects. Licenses, maintainers, distributions and upstream communities shape how software reaches users.',pt:'Linux é desenvolvido publicamente em muitos projetos. Licenças, mantenedores, distribuições e comunidades upstream moldam como o software chega aos usuários.'},command:'uname -a',output:{en:'Inspect the system identity before learning how its software is assembled.',pt:'Inspecione a identidade do sistema antes de aprender como seu software é montado.'},reference:'https://www.kernel.org/',source:'kernel.org'},
  {id:'distribution-model',level:'beginner',module:'foundations',type:'READ',minutes:8,title:{en:'What a distribution actually adds',pt:'O que uma distribuição realmente adiciona'},description:{en:'A distribution combines the Linux kernel with user-space software, package repositories, defaults, installers and support policies.',pt:'Uma distribuição combina o kernel Linux com software de user space, repositórios, padrões, instaladores e políticas de suporte.'},command:'cat /etc/os-release',output:{en:'A real system exposes distribution identity in /etc/os-release.',pt:'Um sistema real expõe a identidade da distribuição em /etc/os-release.'},reference:'https://www.freedesktop.org/software/systemd/man/latest/os-release.html',source:'os-release specification'},
  {id:'paths',level:'beginner',module:'terminal',type:'LAB',minutes:8,title:{en:'Absolute and relative paths',pt:'Caminhos absolutos e relativos'},description:{en:'Absolute paths begin at /. Relative paths are resolved from the current working directory. Understanding the difference prevents many navigation mistakes.',pt:'Caminhos absolutos começam em /. Caminhos relativos são resolvidos a partir do diretório atual. Entender a diferença evita muitos erros de navegação.'},command:'cd /home/visitor/Documents',output:{en:'Move using an absolute path inside the simulated filesystem.',pt:'Mova-se usando um caminho absoluto no filesystem simulado.'},reference:'https://www.gnu.org/software/bash/manual/html_node/Bourne-Shell-Builtins.html',source:'GNU Bash Manual'},
  {id:'copy-move',level:'beginner',module:'files',type:'LAB',minutes:9,title:{en:'Copy and move files safely',pt:'Copie e mova arquivos com segurança'},description:{en:'cp duplicates files and mv renames or relocates them. Inspect the destination before overwriting important data.',pt:'cp duplica arquivos e mv renomeia ou desloca arquivos. Confira o destino antes de sobrescrever dados importantes.'},command:'cp README.txt Documents/README-copy.txt',output:{en:'Create a copy in a practice directory.',pt:'Crie uma cópia em um diretório de prática.'},reference:'https://www.gnu.org/software/coreutils/manual/coreutils.html',source:'GNU Coreutils'},
  {id:'links',level:'intermediate',module:'files',type:'READ',minutes:10,title:{en:'Hard links and symbolic links',pt:'Hard links e links simbólicos'},description:{en:'Links let multiple pathnames refer to data. Symbolic links store another pathname; hard links reference the same inode on the same filesystem.',pt:'Links permitem que vários caminhos se refiram a dados. Links simbólicos armazenam outro caminho; hard links referenciam o mesmo inode no mesmo filesystem.'},command:'ln -s target shortcut',output:{en:'Symbolic links are useful for aliases and versioned paths.',pt:'Links simbólicos são úteis para aliases e caminhos versionados.'},reference:'https://www.gnu.org/software/coreutils/manual/html_node/ln-invocation.html',source:'GNU Coreutils'},
  {id:'text-less',level:'beginner',module:'text',type:'LAB',minutes:7,title:{en:'Read long text with less',pt:'Leia textos longos com less'},description:{en:'less is designed for interactive reading without loading an entire file into a visual editor. It supports search and navigation.',pt:'less é voltado à leitura interativa sem carregar todo o arquivo em um editor visual. Ele suporta busca e navegação.'},command:'less README.txt',output:{en:'Use q to leave less on a real system.',pt:'Use q para sair do less em um sistema real.'},reference:'https://man7.org/linux/man-pages/man1/less.1.html',source:'Linux manual pages'},
  {id:'sort-uniq',level:'intermediate',module:'text',type:'LAB',minutes:10,title:{en:'Sort and deduplicate text streams',pt:'Ordene e remova duplicatas em fluxos de texto'},description:{en:'sort orders lines; uniq collapses adjacent duplicates. They become much more useful when composed in pipelines.',pt:'sort ordena linhas; uniq agrupa duplicatas adjacentes. Eles ficam muito mais úteis quando combinados em pipelines.'},command:'sort names.txt | uniq',output:{en:'uniq expects matching lines to be adjacent, so sort is commonly used first.',pt:'uniq espera linhas iguais adjacentes, por isso sort costuma vir antes.'},reference:'https://www.gnu.org/software/coreutils/manual/coreutils.html',source:'GNU Coreutils'},
  {id:'cut-tr-wc',level:'intermediate',module:'text',type:'LAB',minutes:11,title:{en:'Extract, transform and count text',pt:'Extraia, transforme e conte texto'},description:{en:'cut selects fields, tr translates characters and wc counts lines, words or bytes. These small tools are foundations of shell text processing.',pt:'cut seleciona campos, tr traduz caracteres e wc conta linhas, palavras ou bytes. Essas ferramentas são bases do processamento de texto no shell.'},command:'wc -l README.txt',output:{en:'Count lines before building more complex pipelines.',pt:'Conte linhas antes de montar pipelines mais complexos.'},reference:'https://www.gnu.org/software/coreutils/manual/coreutils.html',source:'GNU Coreutils'},
  {id:'sed-basics',level:'intermediate',module:'text',type:'LAB',minutes:12,title:{en:'Stream editing with sed',pt:'Edição de fluxo com sed'},description:{en:'sed applies editing expressions to streams. Start with substitutions and previews before using in-place modifications.',pt:'sed aplica expressões de edição a fluxos. Comece com substituições e visualizações antes de usar modificações in-place.'},command:'sed "s/Linux/GNU\\/Linux/" README.txt',output:{en:'Without -i, sed prints transformed output rather than modifying the file.',pt:'Sem -i, sed imprime a saída transformada em vez de modificar o arquivo.'},reference:'https://www.gnu.org/software/sed/manual/sed.html',source:'GNU sed Manual'},
  {id:'awk-basics',level:'advanced',module:'text',type:'LAB',minutes:14,title:{en:'Field-oriented processing with awk',pt:'Processamento por campos com awk'},description:{en:'awk processes records and fields and can express filtering, calculations and formatted output in a compact language.',pt:'awk processa registros e campos e pode expressar filtros, cálculos e saída formatada em uma linguagem compacta.'},command:'awk "{print $1}" data.txt',output:{en:'Use simple field extraction before moving to larger awk programs.',pt:'Use extração simples de campos antes de avançar para programas awk maiores.'},reference:'https://www.gnu.org/software/gawk/manual/gawk.html',source:'GNU Awk Manual'},
  {id:'groups',level:'beginner',module:'permissions',type:'READ',minutes:8,title:{en:'Users, groups and identity',pt:'Usuários, grupos e identidade'},description:{en:'Linux access decisions often involve numeric user and group IDs. id shows the identities and supplementary groups associated with a user.',pt:'Decisões de acesso no Linux frequentemente envolvem IDs numéricos de usuário e grupo. id mostra identidades e grupos suplementares associados a um usuário.'},command:'id',output:{en:'Inspect identity before changing ownership or permissions.',pt:'Inspecione a identidade antes de alterar dono ou permissões.'},reference:'https://man7.org/linux/man-pages/man1/id.1.html',source:'Linux man-pages'},
  {id:'umask',level:'intermediate',module:'permissions',type:'READ',minutes:10,title:{en:'Default permissions and umask',pt:'Permissões padrão e umask'},description:{en:'umask removes permission bits from defaults used when applications create files and directories. It does not retroactively change existing files.',pt:'umask remove bits de permissão dos padrões usados quando aplicativos criam arquivos e diretórios. Ele não altera retroativamente arquivos existentes.'},command:'umask',output:{en:'Read the current mask before changing it.',pt:'Leia a máscara atual antes de alterá-la.'},reference:'https://www.gnu.org/software/bash/manual/html_node/Bourne-Shell-Builtins.html',source:'GNU Bash Manual'},
  {id:'sudo-model',level:'intermediate',module:'permissions',type:'READ',minutes:10,title:{en:'Administrative work with sudo',pt:'Trabalho administrativo com sudo'},description:{en:'sudo can execute a command under another user according to policy. Treat privilege elevation as a deliberate boundary, not a prefix to add automatically.',pt:'sudo pode executar um comando como outro usuário de acordo com políticas. Trate elevação de privilégio como um limite deliberado, não como um prefixo automático.'},command:'sudo -l',output:{en:'Review permitted commands before administrative work.',pt:'Revise comandos permitidos antes de tarefas administrativas.'},reference:'https://www.sudo.ws/docs/man/sudo.man/',source:'sudo manual'},
  {id:'repositories',level:'intermediate',module:'packages',type:'READ',minutes:10,title:{en:'Repositories, metadata and dependencies',pt:'Repositórios, metadados e dependências'},description:{en:'Package managers use configured repositories and metadata to resolve software versions and dependencies. Repository trust matters because packages execute on your system.',pt:'Gerenciadores usam repositórios e metadados configurados para resolver versões e dependências. A confiança no repositório importa porque pacotes executam no seu sistema.'},command:'apt list --upgradable',output:{en:'Inspect available updates before applying them on a real Debian-family system.',pt:'Inspecione atualizações disponíveis antes de aplicá-las em um sistema real da família Debian.'},reference:'https://www.debian.org/doc/manuals/debian-reference/ch02.en.html',source:'Debian Reference'},
  {id:'rpm-dpkg',level:'intermediate',module:'packages',type:'REFERENCE',minutes:11,title:{en:'Low-level package databases',pt:'Bancos de pacotes de baixo nível'},description:{en:'Debian-family systems commonly expose dpkg while RPM-based systems expose rpm. Higher-level tools usually handle dependency resolution and repositories.',pt:'Sistemas da família Debian costumam expor dpkg e sistemas baseados em RPM expõem rpm. Ferramentas de nível mais alto normalmente lidam com dependências e repositórios.'},command:'dpkg -l',output:{en:'Inspect package database entries without changing the system.',pt:'Inspecione entradas do banco de pacotes sem alterar o sistema.'},reference:'https://www.debian.org/doc/manuals/debian-reference/ch02.en.html',source:'Debian Reference'},
  {id:'jobs',level:'intermediate',module:'processes',type:'LAB',minutes:10,title:{en:'Shell jobs: foreground and background',pt:'Jobs do shell: foreground e background'},description:{en:'Interactive shells track jobs launched from the current session. jobs, bg and fg help manage them without confusing shell jobs with the entire process table.',pt:'Shells interativos acompanham jobs iniciados na sessão atual. jobs, bg e fg ajudam a gerenciá-los sem confundir jobs do shell com toda a tabela de processos.'},command:'jobs',output:{en:'A real interactive shell lists jobs associated with that shell.',pt:'Um shell interativo real lista jobs associados àquele shell.'},reference:'https://www.gnu.org/software/bash/manual/html_node/Job-Control-Basics.html',source:'GNU Bash Manual'},
  {id:'nice',level:'advanced',module:'processes',type:'READ',minutes:11,title:{en:'Scheduling priority with nice and renice',pt:'Prioridade de escalonamento com nice e renice'},description:{en:'nice values influence CPU scheduling priority for normal processes. They are hints within the scheduler, not guarantees of performance.',pt:'Valores nice influenciam a prioridade de CPU de processos normais. São indicações ao escalonador, não garantias de desempenho.'},command:'nice -n 10 command',output:{en:'Start lower-priority work deliberately on a real system.',pt:'Inicie tarefas de menor prioridade de forma deliberada em um sistema real.'},reference:'https://man7.org/linux/man-pages/man1/nice.1.html',source:'Linux man-pages'},
  {id:'systemd-units',level:'intermediate',module:'systemd',type:'READ',minutes:11,title:{en:'Understand systemd units',pt:'Entenda units do systemd'},description:{en:'systemd represents services, sockets, timers, mounts and other resources as units. Learn unit states before changing them.',pt:'systemd representa serviços, sockets, timers, montagens e outros recursos como units. Aprenda os estados antes de alterá-los.'},command:'systemctl list-units --type=service',output:{en:'Inspect loaded service units on a real systemd machine.',pt:'Inspecione units de serviço carregadas em uma máquina systemd real.'},reference:'https://www.freedesktop.org/software/systemd/man/latest/systemd.unit.html',source:'systemd.unit'},
  {id:'systemd-enable',level:'advanced',module:'systemd',type:'CHALLENGE',minutes:12,title:{en:'Start now vs enable at boot',pt:'Iniciar agora vs habilitar no boot'},description:{en:'start affects the current runtime. enable configures activation relationships for future boots. They are related but not the same action.',pt:'start afeta o runtime atual. enable configura relações de ativação para boots futuros. São ações relacionadas, mas diferentes.'},command:'systemctl is-enabled ssh',output:{en:'Inspect enablement state before making persistent changes.',pt:'Inspecione o estado de habilitação antes de mudanças persistentes.'},reference:'https://www.freedesktop.org/software/systemd/man/latest/systemctl.html',source:'systemctl manual'},
  {id:'journal-filters',level:'advanced',module:'logs',type:'LAB',minutes:12,title:{en:'Filter the systemd journal',pt:'Filtre o journal do systemd'},description:{en:'journalctl can filter by unit, boot, priority and time range. Narrow evidence before reading thousands of lines.',pt:'journalctl pode filtrar por unit, boot, prioridade e período. Restrinja as evidências antes de ler milhares de linhas.'},command:'journalctl -u ssh -b',output:{en:'Query one unit in the current boot on a real system.',pt:'Consulte uma unit no boot atual em um sistema real.'},reference:'https://www.freedesktop.org/software/systemd/man/latest/journalctl.html',source:'journalctl manual'},
  {id:'ip-routes',level:'intermediate',module:'networking',type:'LAB',minutes:11,title:{en:'Addresses, links and routes with ip',pt:'Endereços, links e rotas com ip'},description:{en:'ip organizes networking into objects such as link, address and route. Inspect those views before changing network state.',pt:'ip organiza rede em objetos como link, address e route. Inspecione essas visões antes de alterar o estado da rede.'},command:'ip route',output:{en:'Display the routing table on a real Linux system.',pt:'Mostre a tabela de rotas em um sistema Linux real.'},reference:'https://man7.org/linux/man-pages/man8/ip.8.html',source:'ip(8)'},
  {id:'ss-sockets',level:'intermediate',module:'networking',type:'LAB',minutes:10,title:{en:'Inspect sockets with ss',pt:'Inspecione sockets com ss'},description:{en:'ss reports socket information and is commonly used to inspect listening TCP/UDP endpoints and established connections.',pt:'ss mostra informações de sockets e é usado para inspecionar endpoints TCP/UDP em escuta e conexões estabelecidas.'},command:'ss -tulpn',output:{en:'Inspect listening sockets; some process details may require privileges.',pt:'Inspecione sockets em escuta; alguns detalhes de processos podem exigir privilégios.'},reference:'https://man7.org/linux/man-pages/man8/ss.8.html',source:'ss(8)'},
  {id:'curl-wget',level:'intermediate',module:'networking',type:'LAB',minutes:10,title:{en:'HTTP transfers with curl and wget',pt:'Transferências HTTP com curl e wget'},description:{en:'curl is oriented around transferring data across protocols; wget is commonly used for non-interactive downloads. Learn to verify destinations and TLS errors.',pt:'curl é voltado a transferir dados por protocolos; wget é usado com frequência para downloads não interativos. Aprenda a verificar destinos e erros TLS.'},command:'curl -I https://example.com',output:{en:'Request response headers on a real connected system.',pt:'Solicite cabeçalhos de resposta em um sistema real conectado.'},reference:'https://curl.se/docs/manpage.html',source:'curl documentation'},
  {id:'scp',level:'advanced',module:'networking',type:'READ',minutes:10,title:{en:'Copy files through SSH',pt:'Copie arquivos via SSH'},description:{en:'scp copies files over SSH. Host verification and destination paths deserve the same care as an interactive SSH session.',pt:'scp copia arquivos sobre SSH. Verificação do host e caminhos de destino exigem o mesmo cuidado de uma sessão SSH interativa.'},command:'scp notes.txt user@host:/tmp/',output:{en:'Example syntax only; the browser lab does not connect to networks.',pt:'Apenas sintaxe de exemplo; o laboratório no navegador não conecta à rede.'},reference:'https://man.openbsd.org/scp.1',source:'OpenSSH manual'},
  {id:'mount-inspect',level:'advanced',module:'storage',type:'LAB',minutes:12,title:{en:'Inspect mounts and free space',pt:'Inspecione montagens e espaço livre'},description:{en:'df reports filesystem capacity, du estimates directory usage and findmnt presents mount relationships. Use all three to answer different storage questions.',pt:'df mostra capacidade do filesystem, du estima uso de diretórios e findmnt apresenta relações de montagem. Use os três para responder perguntas diferentes.'},command:'df -h',output:{en:'Review capacity without modifying any storage.',pt:'Revise capacidade sem modificar armazenamento.'},reference:'https://man7.org/linux/man-pages/man1/df.1.html',source:'GNU/Linux manual pages'},
  {id:'fstab',level:'advanced',module:'storage',type:'REFERENCE',minutes:13,title:{en:'Persistent mounts and /etc/fstab',pt:'Montagens persistentes e /etc/fstab'},description:{en:'/etc/fstab describes filesystems that may be mounted automatically or by explicit requests. A bad entry can affect boot, so validate carefully.',pt:'/etc/fstab descreve filesystems que podem ser montados automaticamente ou por solicitações explícitas. Uma entrada incorreta pode afetar o boot, então valide com cuidado.'},command:'cat /etc/fstab',output:{en:'Read configuration before attempting changes on a real system.',pt:'Leia a configuração antes de tentar alterações em um sistema real.'},reference:'https://man7.org/linux/man-pages/man5/fstab.5.html',source:'fstab(5)'},
  {id:'bash-variables',level:'intermediate',module:'bash',type:'LAB',minutes:10,title:{en:'Variables, expansion and quoting',pt:'Variáveis, expansão e quoting'},description:{en:'Shell expansion happens before command execution. Quoting controls how spaces, wildcards and special characters are interpreted.',pt:'Expansão do shell acontece antes da execução do comando. Quoting controla como espaços, curingas e caracteres especiais são interpretados.'},command:'echo "$HOME"',output:{en:'Double quotes preserve spaces while still allowing parameter expansion.',pt:'Aspas duplas preservam espaços enquanto permitem expansão de parâmetros.'},reference:'https://www.gnu.org/software/bash/manual/html_node/Shell-Parameter-Expansion.html',source:'GNU Bash Manual'},
  {id:'bash-conditionals',level:'advanced',module:'bash',type:'LAB',minutes:13,title:{en:'Conditionals and exit status',pt:'Condicionais e status de saída'},description:{en:'if, test and command exit statuses let scripts make decisions. Reliable scripts check the outcome of commands rather than assuming success.',pt:'if, test e status de saída permitem que scripts tomem decisões. Scripts confiáveis verificam resultados em vez de presumir sucesso.'},command:'test -f README.txt && echo found',output:{en:'Use exit status to make simple conditional decisions.',pt:'Use status de saída para decisões condicionais simples.'},reference:'https://www.gnu.org/software/bash/manual/html_node/Conditional-Constructs.html',source:'GNU Bash Manual'},
  {id:'bash-loops',level:'advanced',module:'bash',type:'LAB',minutes:14,title:{en:'Loops and functions in Bash',pt:'Loops e funções em Bash'},description:{en:'for and while repeat work; functions package reusable command sequences. Favor readable scripts with clear inputs and failure handling.',pt:'for e while repetem tarefas; funções agrupam sequências reutilizáveis. Prefira scripts legíveis com entradas e tratamento de falhas claros.'},command:'for f in *.txt; do echo "$f"; done',output:{en:'Iterate over matching names while preserving quoting.',pt:'Itere sobre nomes correspondentes preservando quoting.'},reference:'https://www.gnu.org/software/bash/manual/html_node/Looping-Constructs.html',source:'GNU Bash Manual'},
  {id:'dmesg',level:'advanced',module:'troubleshooting',type:'READ',minutes:10,title:{en:'Kernel messages with dmesg',pt:'Mensagens do kernel com dmesg'},description:{en:'dmesg reads the kernel ring buffer, which can reveal device detection, driver and boot information. Access may be restricted by policy.',pt:'dmesg lê o ring buffer do kernel, que pode revelar detecção de dispositivos, drivers e boot. O acesso pode ser restringido por política.'},command:'dmesg | tail',output:{en:'Review recent kernel messages on systems where access is permitted.',pt:'Revise mensagens recentes do kernel em sistemas onde o acesso é permitido.'},reference:'https://man7.org/linux/man-pages/man1/dmesg.1.html',source:'dmesg(1)'},
  {id:'troubleshoot-method',level:'advanced',module:'troubleshooting',type:'CHALLENGE',minutes:14,title:{en:'Troubleshoot from evidence, not guesses',pt:'Solucione problemas com evidências, não palpites'},description:{en:'Start by defining the symptom, scope and recent changes. Inspect logs, state and resources before changing configuration.',pt:'Comece definindo sintoma, escopo e mudanças recentes. Inspecione logs, estado e recursos antes de alterar configuração.'},command:'journalctl -b -p warning',output:{en:'Filter relevant evidence before deciding what to change.',pt:'Filtre evidências relevantes antes de decidir o que alterar.'},reference:'https://www.freedesktop.org/software/systemd/man/latest/journalctl.html',source:'journalctl manual'},
  {id:'least-privilege',level:'advanced',module:'security',type:'READ',minutes:11,title:{en:'Least privilege as a daily habit',pt:'Menor privilégio como hábito diário'},description:{en:'Run ordinary work as an unprivileged user and elevate only for operations that actually require it. Review ownership and service privileges regularly.',pt:'Execute tarefas comuns como usuário sem privilégios e eleve apenas quando realmente necessário. Revise dono de arquivos e privilégios de serviços regularmente.'},command:'id',output:{en:'Know your current identity before administrative commands.',pt:'Saiba sua identidade atual antes de comandos administrativos.'},reference:'https://www.sudo.ws/docs/man/sudo.man/',source:'sudo manual'},
  {id:'ssh-hardening',level:'advanced',module:'security',type:'REFERENCE',minutes:13,title:{en:'SSH keys and host verification',pt:'Chaves SSH e verificação de host'},description:{en:'Public-key authentication avoids sending reusable passwords to remote hosts, while host key verification helps detect unexpected server identity changes.',pt:'Autenticação por chave pública evita enviar senhas reutilizáveis a hosts remotos, enquanto verificação da chave do host ajuda a detectar mudanças inesperadas de identidade.'},command:'ssh -v user@host',output:{en:'Verbose mode can explain authentication and host-key decisions on a real connection.',pt:'Modo verbose pode explicar decisões de autenticação e chave do host em uma conexão real.'},reference:'https://man.openbsd.org/ssh.1',source:'OpenSSH manual'},
  {id:'firewall-concepts',level:'advanced',module:'security',type:'READ',minutes:12,title:{en:'Firewall concepts before commands',pt:'Conceitos de firewall antes dos comandos'},description:{en:'A firewall evaluates traffic against policy. Learn addresses, protocols, ports, direction and default policy before choosing a frontend such as nftables or firewalld.',pt:'Um firewall avalia tráfego contra políticas. Aprenda endereços, protocolos, portas, direção e política padrão antes de escolher um frontend como nftables ou firewalld.'},command:'ss -tulpn',output:{en:'Inventory listening services before defining filtering policy.',pt:'Inventarie serviços em escuta antes de definir políticas de filtragem.'},reference:'https://wiki.nftables.org/wiki-nftables/index.php/Main_Page',source:'nftables documentation'},
  {id:'server-service-model',level:'advanced',module:'servers',type:'READ',minutes:11,title:{en:'How Linux services fit together',pt:'Como serviços Linux se conectam'},description:{en:'A typical server combines a daemon, configuration, permissions, network sockets, logs and a service manager. Troubleshooting requires connecting those layers.',pt:'Um servidor típico combina daemon, configuração, permissões, sockets de rede, logs e gerenciador de serviços. Solucionar problemas exige conectar essas camadas.'},command:'systemctl status ssh',output:{en:'Inspect service state before editing configuration.',pt:'Inspecione o estado do serviço antes de editar configuração.'},reference:'https://www.freedesktop.org/software/systemd/man/latest/systemctl.html',source:'systemctl manual'},
  {id:'containers-concepts',level:'advanced',module:'containers',type:'READ',minutes:12,title:{en:'Containers, namespaces and cgroups',pt:'Containers, namespaces e cgroups'},description:{en:'Linux containers isolate process views with namespaces and constrain resources with cgroups. Container engines add image, network and lifecycle tooling around those kernel features.',pt:'Containers Linux isolam visões de processos com namespaces e limitam recursos com cgroups. Engines adicionam imagens, rede e ciclo de vida ao redor desses recursos do kernel.'},command:'ps aux',output:{en:'Container concepts start from ordinary Linux processes.',pt:'Conceitos de containers começam em processos Linux comuns.'},reference:'https://docs.kernel.org/admin-guide/cgroup-v2.html',source:'Linux Kernel Documentation'},
  {id:'podman-docker',level:'advanced',module:'containers',type:'REFERENCE',minutes:10,title:{en:'Container engines: Podman and Docker',pt:'Engines de container: Podman e Docker'},description:{en:'Podman and Docker provide workflows around OCI images and containers. Their command surfaces overlap, but architecture and defaults can differ.',pt:'Podman e Docker fornecem fluxos ao redor de imagens e containers OCI. As interfaces de comando se sobrepõem, mas arquitetura e padrões podem diferir.'},command:'podman --help',output:{en:'Use official engine documentation for host-specific setup.',pt:'Use a documentação oficial da engine para configuração específica do host.'},reference:'https://docs.podman.io/',source:'Podman Documentation'},
  {id:'git-dev',level:'intermediate',module:'development',type:'LAB',minutes:10,title:{en:'Git as part of a Linux development environment',pt:'Git como parte do ambiente de desenvolvimento Linux'},description:{en:'Git, SSH keys, editors and language tooling are common parts of a Linux workstation. Keep project and system package responsibilities separate.',pt:'Git, chaves SSH, editores e ferramentas de linguagem são partes comuns de uma workstation Linux. Separe responsabilidades do projeto e dos pacotes do sistema.'},command:'git status',output:{en:'Inspect repository state before staging or committing changes.',pt:'Inspecione o estado do repositório antes de adicionar ou commitar mudanças.'},reference:'https://git-scm.com/docs/git',source:'Git Documentation'},
  {id:'env-vars',level:'intermediate',module:'development',type:'READ',minutes:9,title:{en:'Environment variables and PATH',pt:'Variáveis de ambiente e PATH'},description:{en:'Environment variables pass configuration into processes. PATH is a colon-separated list the shell searches for executable commands.',pt:'Variáveis de ambiente passam configuração aos processos. PATH é uma lista separada por dois-pontos que o shell pesquisa por executáveis.'},command:'echo $PATH',output:{en:'Inspect PATH before changing shell startup files.',pt:'Inspecione PATH antes de alterar arquivos de inicialização do shell.'},reference:'https://www.gnu.org/software/bash/manual/html_node/Shell-Variables.html',source:'GNU Bash Manual'},
  {id:'cron-timers',level:'advanced',module:'administration',type:'REFERENCE',minutes:12,title:{en:'cron and systemd timers',pt:'cron e timers do systemd'},description:{en:'cron schedules commands by calendar expressions. systemd timers integrate scheduling with units and journal logging. Choose based on the environment and observability needs.',pt:'cron agenda comandos por expressões de calendário. Timers do systemd integram agendamento com units e journal. Escolha conforme ambiente e necessidade de observabilidade.'},command:'systemctl list-timers',output:{en:'Inspect existing schedules before creating new ones.',pt:'Inspecione agendamentos existentes antes de criar novos.'},reference:'https://www.freedesktop.org/software/systemd/man/latest/systemd.timer.html',source:'systemd.timer'},
  {id:'performance',level:'advanced',module:'administration',type:'READ',minutes:13,title:{en:'Observe CPU, memory, disk and load',pt:'Observe CPU, memória, disco e carga'},description:{en:'Performance troubleshooting starts with measurement. Process activity, memory pressure, filesystem capacity and I/O provide different parts of the picture.',pt:'Diagnóstico de performance começa com medição. Atividade de processos, pressão de memória, capacidade do filesystem e I/O mostram partes diferentes do quadro.'},command:'top',output:{en:'Start with observation before tuning kernel or service settings.',pt:'Comece observando antes de ajustar kernel ou serviços.'},reference:'https://man7.org/linux/man-pages/man1/top.1.html',source:'top(1)'}
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
,
{name:'cp',category:'Files',level:'Beginner',description:{en:'Copy files or directories.',pt:'Copia arquivos ou diretórios.'},syntax:'cp [options] source destination',example:'cp README.txt Documents/README-copy.txt'},
{name:'mv',category:'Files',level:'Beginner',description:{en:'Move or rename files and directories.',pt:'Move ou renomeia arquivos e diretórios.'},syntax:'mv source destination',example:'mv old.txt new.txt'},
{name:'ln',category:'Files',level:'Intermediate',description:{en:'Create hard or symbolic links.',pt:'Cria hard links ou links simbólicos.'},syntax:'ln [options] target link',example:'ln -s target shortcut'},
{name:'less',category:'Text',level:'Beginner',description:{en:'Read text interactively one screen at a time.',pt:'Lê texto interativamente uma tela por vez.'},syntax:'less file',example:'less README.txt'},
{name:'sort',category:'Text',level:'Intermediate',description:{en:'Sort lines of text.',pt:'Ordena linhas de texto.'},syntax:'sort [options] file',example:'sort names.txt'},
{name:'uniq',category:'Text',level:'Intermediate',description:{en:'Report or omit adjacent duplicate lines.',pt:'Mostra ou remove linhas duplicadas adjacentes.'},syntax:'uniq [options] file',example:'sort names.txt | uniq'},
{name:'cut',category:'Text',level:'Intermediate',description:{en:'Select fields or character ranges from lines.',pt:'Seleciona campos ou intervalos de caracteres das linhas.'},syntax:'cut [options] file',example:'cut -d: -f1 /etc/passwd'},
{name:'tr',category:'Text',level:'Intermediate',description:{en:'Translate or delete characters.',pt:'Traduz ou remove caracteres.'},syntax:'tr SET1 SET2',example:'tr a-z A-Z'},
{name:'wc',category:'Text',level:'Beginner',description:{en:'Count lines, words or bytes.',pt:'Conta linhas, palavras ou bytes.'},syntax:'wc [options] file',example:'wc -l README.txt'},
{name:'sed',category:'Text',level:'Intermediate',description:{en:'Transform text streams with editing expressions.',pt:'Transforma fluxos de texto com expressões de edição.'},syntax:'sed [options] script file',example:'sed "s/foo/bar/" file.txt'},
{name:'awk',category:'Text',level:'Advanced',description:{en:'Process records and fields with the awk language.',pt:'Processa registros e campos com a linguagem awk.'},syntax:'awk program [file]',example:'awk "{print $1}" data.txt'},
{name:'jobs',category:'Processes',level:'Intermediate',description:{en:'List jobs associated with the current shell.',pt:'Lista jobs associados ao shell atual.'},syntax:'jobs',example:'jobs'},
{name:'nice',category:'Processes',level:'Advanced',description:{en:'Start a program with an adjusted scheduling priority.',pt:'Inicia um programa com prioridade de escalonamento ajustada.'},syntax:'nice -n adjustment command',example:'nice -n 10 command'},
{name:'ss',category:'Network',level:'Intermediate',description:{en:'Inspect network sockets.',pt:'Inspeciona sockets de rede.'},syntax:'ss [options]',example:'ss -tulpn'},
{name:'curl',category:'Network',level:'Intermediate',description:{en:'Transfer data to or from URLs.',pt:'Transfere dados de ou para URLs.'},syntax:'curl [options] URL',example:'curl -I https://example.com'},
{name:'wget',category:'Network',level:'Intermediate',description:{en:'Retrieve files over network protocols.',pt:'Obtém arquivos por protocolos de rede.'},syntax:'wget [options] URL',example:'wget https://example.com/file'},
{name:'scp',category:'Network',level:'Intermediate',description:{en:'Copy files through SSH.',pt:'Copia arquivos por SSH.'},syntax:'scp source user@host:path',example:'scp notes.txt user@host:/tmp/'},
{name:'findmnt',category:'Storage',level:'Intermediate',description:{en:'Display mounted filesystems in a structured view.',pt:'Exibe filesystems montados de forma estruturada.'},syntax:'findmnt [options]',example:'findmnt'},
{name:'mount',category:'Storage',level:'Advanced',description:{en:'Attach a filesystem to the directory tree.',pt:'Anexa um filesystem à árvore de diretórios.'},syntax:'mount [options] device directory',example:'mount | head'},
{name:'umount',category:'Storage',level:'Advanced',description:{en:'Detach a mounted filesystem.',pt:'Desanexa um filesystem montado.'},syntax:'umount target',example:'sudo umount /mnt/example'},
{name:'dmesg',category:'Administration',level:'Advanced',description:{en:'Read messages from the kernel ring buffer.',pt:'Lê mensagens do ring buffer do kernel.'},syntax:'dmesg [options]',example:'dmesg | tail'},
{name:'git',category:'Development',level:'Intermediate',description:{en:'Distributed version control tool.',pt:'Ferramenta distribuída de controle de versão.'},syntax:'git command [options]',example:'git status'},
{name:'podman',category:'Containers',level:'Advanced',description:{en:'Manage OCI containers and images with Podman.',pt:'Gerencia containers e imagens OCI com Podman.'},syntax:'podman command [options]',example:'podman ps'},
{name:'docker',category:'Containers',level:'Advanced',description:{en:'Manage containers and images with Docker.',pt:'Gerencia containers e imagens com Docker.'},syntax:'docker command [options]',example:'docker ps'}
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

/* --- js/data/references.js --- */

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
  return { speak, blink, wink, react, lookAt: move };
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
    stage?.classList.toggle('is-focusing', active);
    svg?.querySelector(`[data-for-node="${node.dataset.mapId}"]`)?.classList.toggle('active', active);
    if (active) {
      const rect=node.getBoundingClientRect();
      window.dispatchEvent(new CustomEvent('academy:map-focus',{detail:{id:node.dataset.mapId,x:rect.left+rect.width/2,y:rect.top+rect.height/2}}));
    } else {
      window.dispatchEvent(new CustomEvent('academy:map-blur'));
    }
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
  const write=set=>{
    storage.setItem(key,JSON.stringify([...set]));
    onProgressChange?.();
    window.dispatchEvent(new CustomEvent('academy:lesson-progress',{detail:{completed:[...set]}}));
  };
  const localize=obj=>typeof obj==='string'?obj:(obj?.[getLanguage()]??obj?.en??'');
  const labIds=new Set(['files-directories','pipes','redirection','search-text','find-files','packages','networking','bash-scripting']);
  const challengeIds=new Set(['permissions','processes','services','storage','security']);
  const typeFor=lesson=>lesson.type|| (labIds.has(lesson.id)?'LAB':challengeIds.has(lesson.id)?'CHALLENGE':'READ');
  const minutesFor=(lesson,index)=>lesson.minutes||[6,8,10,12][(index+lesson.level.length)%4];

  function render(){
    if(!grid)return;
    const completed=read();
    grid.replaceChildren();
    lessons.filter(l=>l.level===activeLevel).forEach((lesson,index)=>{
      const card=document.createElement('article');
      card.className=`lesson-card ${completed.has(lesson.id)?'completed':''}`;
      card.dataset.lessonId=lesson.id;

      const num=document.createElement('span');
      num.className='lesson-num';
      num.textContent=`${String(index+1).padStart(2,'0')} / ${lesson.module ? lesson.module.toUpperCase() : t(activeLevel)}`;

      const heading=document.createElement('div');
      heading.className='lesson-title-wrap';
      const title=document.createElement('h3');
      title.textContent=localize(lesson.title);
      const meta=document.createElement('div');
      meta.className='lesson-meta-row';
      const type=document.createElement('span');
      type.textContent=typeFor(lesson);
      const time=document.createElement('span');
      time.textContent=`${minutesFor(lesson,index)} min`;
      meta.append(type,time);
      heading.append(title,meta);

      const desc=document.createElement('p');
      desc.textContent=localize(lesson.description);

      const cmd=document.createElement('div');
      cmd.className='lesson-command';
      cmd.textContent=`$ ${lesson.command}`;

      const detail=document.createElement('details');
      detail.className='lesson-detail';
      const summary=document.createElement('summary');
      summary.textContent=t('expectedOutput');
      const expected=document.createElement('p');
      expected.textContent=localize(lesson.output);
      detail.append(summary,expected);

      const actions=document.createElement('div');
      actions.className='lesson-actions';

      const tryBtn=document.createElement('button');
      tryBtn.className='small-button';
      tryBtn.type='button';
      tryBtn.textContent=t('tryIt');
      tryBtn.addEventListener('click',()=>{
        storage.setItem('linuxAcademy.lastLesson',lesson.id);
        terminalRunner?.(lesson.command);
        document.querySelector('#terminal')?.scrollIntoView({behavior:'smooth'});
      });

      const splitBtn=document.createElement('button');
      splitBtn.className='small-button split-learn-button';
      splitBtn.type='button';
      splitBtn.textContent=getLanguage()==='pt'?'Abrir modo dividido':'Open split mode';
      splitBtn.addEventListener('click',()=>{storage.setItem('linuxAcademy.lastLesson',lesson.id);window.dispatchEvent(new CustomEvent('academy:split-lesson',{detail:{lesson}}));});

      const doneBtn=document.createElement('button');
      doneBtn.className='small-button complete';
      doneBtn.type='button';
      doneBtn.textContent=completed.has(lesson.id)?`${t('done')} ✓`:t('complete');
      doneBtn.addEventListener('click',()=>{
        const set=read();
        if(set.has(lesson.id)) set.delete(lesson.id);
        else {
          storage.setItem('linuxAcademy.lastLesson',lesson.id);
          set.add(lesson.id);
          tuxSpeak?.(getLanguage()==='pt'?'Boa! Mais um conceito Linux concluído. 🐧':'Nice! Another Linux concept unlocked. 🐧');
        }
        write(set);
        render();
      });

      const ref=document.createElement('a');
      ref.className='lesson-reference';
      ref.href=lesson.reference;
      ref.target='_blank';
      ref.rel='noopener noreferrer';
      const refType=lesson.referenceType||inferReferenceType(lesson.reference);
      const refProvider=lesson.source||getReferenceLabel(refType);
      ref.textContent=`${getReferenceLabel(refType)} · ${refProvider} ↗`;
      ref.setAttribute('aria-label',`${getReferenceLabel(refType)} — ${refProvider}`);

      actions.append(tryBtn,splitBtn,doneBtn,ref);
      card.append(num,heading,desc,cmd,detail,actions);
      grid.append(card);
    });
  }

  tabs.forEach(tab=>tab.addEventListener('click',()=>{
    activeLevel=tab.dataset.level;
    tabs.forEach(x=>{
      x.classList.toggle('active',x===tab);
      x.setAttribute('aria-selected',String(x===tab));
    });
    render();
  }));

  document.querySelector('#resetProgress')?.addEventListener('click',()=>{
    storage.removeItem(key);
    storage.removeItem('linuxAcademy.quiz');
    storage.removeItem('linuxAcademy.challenge');
    window.dispatchEvent(new CustomEvent('academy:progress-reset'));
    onProgressChange?.();
    render();
  });

  window.addEventListener('academy:language',render);
  render();
  return {lessons,readCompleted:read,render,getActiveLevel:()=>activeLevel};
}

/* --- js/commands.js --- */

const categoryLabels={
  en:{Navigation:'Navigation',Directories:'Directories',Files:'Files',Text:'Text',Search:'Search',Processes:'Processes',Permissions:'Permissions',Users:'Users',System:'System',Storage:'Storage',Network:'Network',Archives:'Archives',Packages:'Packages',Administration:'Administration'},
  pt:{Navigation:'Navegação',Directories:'Diretórios',Files:'Arquivos',Text:'Texto',Search:'Busca',Processes:'Processos',Permissions:'Permissões',Users:'Usuários',System:'Sistema',Storage:'Armazenamento',Network:'Rede',Archives:'Arquivos compactados',Packages:'Pacotes',Administration:'Administração'}
};

const levelLabels={en:{Beginner:'Beginner',Intermediate:'Intermediate',Advanced:'Advanced'},pt:{Beginner:'Iniciante',Intermediate:'Intermediário',Advanced:'Avançado'}};
function initCommandExplorer(){
  const grid=document.querySelector('#commandGrid'),search=document.querySelector('#commandSearch'),category=document.querySelector('#commandCategory');
  const localize=v=>typeof v==='string'?v:(v?.[getLanguage()]??v?.en??'');
  function buildCategories(){const selected=category.value||'all';category.replaceChildren();const all=document.createElement('option');all.value='all';all.textContent=t('allCategories');category.append(all);[...new Set(commands.map(c=>c.category))].sort().forEach(c=>{const o=document.createElement('option');o.value=c;o.textContent=categoryLabels[getLanguage()][c]||c;category.append(o);});category.value=[...category.options].some(o=>o.value===selected)?selected:'all';}
  function render(){const q=search.value.trim().toLowerCase(),cat=category.value;const lang=getLanguage();const filtered=commands.filter(c=>(cat==='all'||c.category===cat)&&(!q||[c.name,c.category,localize(c.description),c.example].join(' ').toLowerCase().includes(q)));grid.replaceChildren();if(!filtered.length){const e=document.createElement('div');e.className='empty-state';e.textContent=t('noCommands');grid.append(e);return;}filtered.forEach(c=>{const card=document.createElement('article');card.className='command-card';const head=document.createElement('header');const h=document.createElement('h3');h.textContent=c.name;const badge=document.createElement('span');badge.className=`badge ${c.risk?'risk':''}`;badge.textContent=c.risk?t('risk'):(levelLabels[lang][c.level]||c.level);head.append(h,badge);const p=document.createElement('p');p.textContent=localize(c.description);const syntax=document.createElement('div');syntax.className='command-syntax';syntax.innerHTML=`<span>${t('syntaxLabel')}</span><code></code>`;syntax.querySelector('code').textContent=c.syntax;const pre=document.createElement('pre');pre.textContent=c.example;const reference=getCommandReference(c.name);card.append(head,p,syntax,pre);if(c.risk){const r=document.createElement('div');r.className='risk-note';r.textContent=`⚠ ${localize(c.risk)}`;card.append(r);}const refWrap=document.createElement('div');refWrap.className='command-reference-wrap';if(reference){const ref=document.createElement('a');ref.className='command-reference';ref.href=reference.url;ref.target='_blank';ref.rel='noopener noreferrer';ref.textContent=`${getReferenceLabel(reference.type)} ↗`;ref.setAttribute('aria-label',`${getReferenceLabel(reference.type)}: ${c.name} — ${reference.provider}`);const source=document.createElement('small');source.className='command-reference-source';source.textContent=`${getReferenceSourceLabel()}: ${reference.provider}`;refWrap.append(ref,source);}else{const missing=document.createElement('span');missing.className='command-reference-missing';missing.textContent=getMissingReferenceLabel();refWrap.append(missing);}card.append(refWrap);grid.append(card);});}
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
  const dialog=document.querySelector('#searchDialog');
  const trigger=document.querySelector('#searchTrigger');
  const close=document.querySelector('#searchClose');
  const input=document.querySelector('#globalSearch');
  const results=document.querySelector('#searchResults');
  if(!dialog||!trigger||!close||!input||!results)return;

  const localize=v=>typeof v==='string'?v:(v?.[getLanguage()]??v?.en??'');
  let activeIndex=-1;
  let currentButtons=[];

  function items(){
    const concepts=[
      {type:t('conceptType'),title:t('filesystem'),desc:t('filesystemText'),target:'#concepts'},
      {type:t('conceptType'),title:t('permissions'),desc:t('permissionsText'),target:'#concepts'},
      {type:t('conceptType'),title:t('packageManagers'),desc:t('packageText'),target:'#concepts'},
      {type:t('guideType'),title:t('windowsTitle'),desc:t('windowsText'),target:'#windows-linux'},
      {type:t('guideType'),title:t('roadmapTitle'),desc:t('roadmapText'),target:'#roadmap'},
      {type:t('guideType'),title:t('mapWindowTitle'),desc:t('mapText'),target:'#learning-map'},
      {type:t('guideType'),title:t('docsTitle'),desc:t('docsText'),target:'#resources'},
      {type:getLanguage()==='pt'?'Desafio':'Challenge',title:getLanguage()==='pt'?'Missões do terminal':'Terminal missions',desc:'pwd • ls • mkdir • grep • chmod • ps • ip',target:'#terminal'},
      {type:getLanguage()==='pt'?'Referência':'Reference',title:getLanguage()==='pt'?'Consulta rápida Linux':'Linux quick reference',desc:getLanguage()==='pt'?'Pesquise comandos por intenção.':'Search commands by intent.',target:'#commands'}
    ];
    const docs=(typeof docsTopics!=='undefined'?docsTopics:[]).map(x=>({type:getLanguage()==='pt'?'DOC':'DOC',title:localize(x.title),desc:localize(x.summary),target:'#resources'}));
    const quizTopics=['filesystem','navigation','permissions','processes','networking','packages','systemd','storage','bash','security'].map(x=>({type:getLanguage()==='pt'?'TESTE':'QUIZ',title:x,desc:getLanguage()==='pt'?'Tópico do teste de conhecimento':'Knowledge-check topic',target:'#knowledge'}));
    const paths=[
      {type:getLanguage()==='pt'?'TRILHA':'PATH',title:getLanguage()==='pt'?'Fundamentos Linux':'Linux Foundations',desc:'kernel • GNU/Linux • distros',target:'#roadmap'},
      {type:getLanguage()==='pt'?'TRILHA':'PATH',title:getLanguage()==='pt'?'Administração':'Administration',desc:'systemd • logs • storage • performance',target:'#roadmap'},
      {type:getLanguage()==='pt'?'TRILHA':'PATH',title:getLanguage()==='pt'?'Segurança':'Security',desc:'permissions • SSH • least privilege',target:'#roadmap'}
    ];
    return [
      ...commands.map(x=>({type:t('commandType'),title:x.name,desc:localize(x.description),target:'#commands'})),
      ...distros.map(x=>({type:t('distroType'),title:x.name,desc:localize(x.summary),target:'#distros'})),
      ...lessons.map(x=>({type:t('lessonType'),title:localize(x.title),desc:localize(x.description),target:'#learn'})),
      ...docs,...quizTopics,...paths,...concepts
    ];
  }

  function syncActive(){
    currentButtons.forEach((b,i)=>{
      const active=i===activeIndex;
      b.classList.toggle('is-active',active);
      b.setAttribute('aria-selected',String(active));
    });
    currentButtons[activeIndex]?.scrollIntoView({block:'nearest'});
  }

  function activate(item){
    dialog.close();
    document.querySelector(item.target)?.scrollIntoView({behavior:'smooth',block:'start'});
  }

  function render(){
    const q=input.value.trim().toLowerCase();
    results.replaceChildren();
    activeIndex=-1;
    const all=items();
    const list=(q?all.filter(i=>[i.title,i.desc,i.type].join(' ').toLowerCase().includes(q)):all.slice(0,10)).slice(0,24);
    currentButtons=[];
    list.forEach(item=>{
      const b=document.createElement('button');
      b.type='button';
      b.className='search-result';
      b.setAttribute('role','option');
      const small=document.createElement('small');small.textContent=item.type;
      const strong=document.createElement('strong');strong.textContent=item.title;
      const span=document.createElement('span');span.textContent=item.desc;
      b.append(small,strong,span);
      b.addEventListener('click',()=>activate(item));
      b._searchItem=item;
      currentButtons.push(b);
      results.append(b);
    });
    if(!list.length){
      const p=document.createElement('p');
      p.className='empty-state';
      p.textContent=t('noResults');
      results.append(p);
    }
  }

  function open(){
    if(!dialog.open)dialog.showModal();
    input.value='';
    render();
    setTimeout(()=>input.focus(),30);
  }

  function closeDialog(){ if(dialog.open)dialog.close(); }

  trigger.addEventListener('click',open);
  close.addEventListener('click',closeDialog);
  input.addEventListener('input',render);
  input.addEventListener('keydown',e=>{
    if(!currentButtons.length)return;
    if(e.key==='ArrowDown'){
      e.preventDefault();
      activeIndex=(activeIndex+1)%currentButtons.length;
      syncActive();
    }else if(e.key==='ArrowUp'){
      e.preventDefault();
      activeIndex=(activeIndex-1+currentButtons.length)%currentButtons.length;
      syncActive();
    }else if(e.key==='Enter'&&activeIndex>=0){
      e.preventDefault();
      const item=currentButtons[activeIndex]._searchItem;
      if(item)activate(item);
    }
  });
  window.addEventListener('academy:language',render);
  document.addEventListener('keydown',e=>{
    if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){
      e.preventDefault();
      open();
    }
    if(e.key==='Escape'&&dialog.open)closeDialog();
  });
}

/* --- js/quiz.js --- */

function initQuiz({tuxSpeak,onProgressChange}={}){
  const root=document.querySelector('#quiz');
  if(!root)return;
  const questionEl=document.querySelector('#quizQuestionText');
  const metaEl=document.querySelector('#quizQuestionMeta');
  const topicEl=document.querySelector('#quizTopic');
  const optionsEl=document.querySelector('#quizOptions');
  const feedback=document.querySelector('#quizFeedback');
  const progress=document.querySelector('#quizQuestionProgress');
  const nextBtn=document.querySelector('#quizNext');
  const resultEl=document.querySelector('#quizResultSummary');
  const statsKey='linuxAcademy.quizStats.v6';
  const questions=[
    {topic:'filesystem',q:{en:'Which command prints the current working directory?',pt:'Qual comando mostra o diretório de trabalho atual?'},options:['pwd','mkdir','touch','grep'],answer:'pwd',explain:{en:'pwd means print working directory.',pt:'pwd significa print working directory e mostra o diretório atual.'}},
    {topic:'navigation',q:{en:'Which command changes the shell working directory?',pt:'Qual comando altera o diretório de trabalho do shell?'},options:['cd','ls','cat','ps'],answer:'cd',explain:{en:'cd changes the current directory of the shell.',pt:'cd altera o diretório atual do shell.'}},
    {topic:'permissions',q:{en:'Which command changes permission mode bits?',pt:'Qual comando altera os bits de permissão?'},options:['chmod','chown','grep','uname'],answer:'chmod',explain:{en:'chmod changes file mode bits; chown changes ownership.',pt:'chmod altera bits de modo; chown altera propriedade.'}},
    {topic:'processes',q:{en:'Which command is commonly used to inspect processes?',pt:'Qual comando é usado com frequência para inspecionar processos?'},options:['ps','mkdir','tar','pwd'],answer:'ps',explain:{en:'ps displays process information.',pt:'ps exibe informações sobre processos.'}},
    {topic:'networking',q:{en:'Which modern tool inspects Linux addresses and routes?',pt:'Qual ferramenta moderna inspeciona endereços e rotas Linux?'},options:['ip','touch','wc','chmod'],answer:'ip',explain:{en:'ip from iproute2 handles links, addresses and routes.',pt:'ip, do iproute2, trabalha com links, endereços e rotas.'}},
    {topic:'packages',q:{en:'Which package manager is used by Arch Linux?',pt:'Qual gerenciador de pacotes é usado pelo Arch Linux?'},options:['pacman','apt','dnf','zypper'],answer:'pacman',explain:{en:'Arch Linux uses pacman.',pt:'Arch Linux usa pacman.'}},
    {topic:'systemd',q:{en:'Which command inspects and controls systemd units?',pt:'Qual comando inspeciona e controla units do systemd?'},options:['systemctl','journalctl','grep','df'],answer:'systemctl',explain:{en:'systemctl manages and inspects systemd units.',pt:'systemctl gerencia e inspeciona units do systemd.'}},
    {topic:'storage',q:{en:'Which command lists block devices without formatting them?',pt:'Qual comando lista dispositivos de bloco sem formatá-los?'},options:['lsblk','mkfs','dd','rm'],answer:'lsblk',explain:{en:'lsblk lists block devices and relationships without modifying them.',pt:'lsblk lista dispositivos de bloco e relações sem modificá-los.'}},
    {topic:'bash',q:{en:'What does a pipe (|) connect?',pt:'O que um pipe (|) conecta?'},options:['stdout → stdin','files → permissions','users → groups','kernel → bootloader'],answer:'stdout → stdin',explain:{en:'A pipeline connects one command output to the next command input.',pt:'Um pipeline conecta a saída de um comando à entrada do próximo.'}},
    {topic:'security',q:{en:'What is the safest general principle for administrative privileges?',pt:'Qual é o princípio geral mais seguro para privilégios administrativos?'},options:['least privilege','always use root','disable updates','share passwords'],answer:'least privilege',explain:{en:'Use only the privileges required for the task.',pt:'Use apenas os privilégios necessários para a tarefa.'}}
  ];
  let index=0,correct=0,wrong=0,streak=0,bestStreak=0,mistakes=[],locked=false,manual=false,timer=null;
  const localize=v=>typeof v==='string'?v:(v?.[getLanguage()]??v?.en??'');
  const readStats=()=>{try{return JSON.parse(storage.getItem(statsKey)||'{}')}catch{return {}}};
  const saveStats=(score)=>{
    const s=readStats();
    s.tests=(s.tests||0)+1;s.questions=(s.questions||0)+questions.length;s.correct=(s.correct||0)+correct;s.incorrect=(s.incorrect||0)+wrong;
    s.bestScore=Math.max(s.bestScore||0,score);s.latestScore=score;s.bestStreak=Math.max(s.bestStreak||0,bestStreak);s.lastCompleted=Date.now();
    storage.setItem(statsKey,JSON.stringify(s));storage.setItem('linuxAcademy.quiz','done');
    window.dispatchEvent(new CustomEvent('academy:quiz-complete',{detail:{score,correct,wrong,bestStreak,stats:s}}));
    onProgressChange?.();
  };
  function render(){
    clearTimeout(timer);locked=false;feedback.className='quiz-feedback';feedback.textContent='';resultEl.hidden=true;nextBtn.hidden=true;
    const q=questions[index];
    topicEl.textContent=(getLanguage()==='pt'?'TÓPICO: ':'TOPIC: ')+q.topic.toUpperCase();
    metaEl.textContent=`${getLanguage()==='pt'?'Pergunta':'Question'} ${index+1} / ${questions.length}`;
    questionEl.textContent=localize(q.q);progress.style.width=`${((index)/questions.length)*100}%`;
    optionsEl.replaceChildren();
    q.options.forEach(opt=>{const b=document.createElement('button');b.type='button';b.dataset.answer=opt;const code=document.createElement('code');code.textContent=opt;b.append(code);b.addEventListener('click',()=>answer(opt,b));optionsEl.append(b);});
  }
  function answer(value,button){
    if(locked)return;locked=true;const q=questions[index],ok=value===q.answer;
    [...optionsEl.children].forEach(b=>{b.disabled=true;if(b.dataset.answer===q.answer)b.classList.add('correct');});
    if(!ok){button.classList.add('wrong');wrong++;streak=0;mistakes.push({index,selected:value});}else{correct++;streak++;bestStreak=Math.max(bestStreak,streak);}
    feedback.className=`quiz-feedback ${ok?'success':'error'}`;
    feedback.textContent=`${ok?(getLanguage()==='pt'?'Correto.':'Correct.'):(getLanguage()==='pt'?'Não é essa.':'Not quite.')} ${localize(q.explain)}`;
    tuxSpeak?.(ok?(getLanguage()==='pt'?'Boa! Continue assim.':'Nice! Keep going.'):(getLanguage()==='pt'?'Quase. Veja a explicação.':'Close. Check the explanation.'));
    if(index===questions.length-1){timer=setTimeout(finish,manual?999999:1250);nextBtn.hidden=false;nextBtn.textContent=getLanguage()==='pt'?'Ver resultado':'View result';nextBtn.onclick=finish;}
    else{nextBtn.hidden=false;nextBtn.textContent=getLanguage()==='pt'?'Próxima':'Next';nextBtn.onclick=next;if(!manual)timer=setTimeout(next,1250);}
  }
  function next(){if(!locked)return;index++;render();}
  function finish(){clearTimeout(timer);const score=Math.round(correct/questions.length*100);progress.style.width='100%';saveStats(score);optionsEl.replaceChildren();feedback.textContent='';nextBtn.hidden=true;resultEl.hidden=false;
    resultEl.innerHTML=`<strong>${getLanguage()==='pt'?'TESTE CONCLUÍDO':'TEST COMPLETE'}</strong><b>${correct} / ${questions.length}</b><span>${score}% ${getLanguage()==='pt'?'de acerto':'accuracy'}</span><small>${getLanguage()==='pt'?'Maior sequência':'Best streak'}: ${bestStreak}</small><div class="quiz-result-actions"><button type="button" id="quizRetry">${getLanguage()==='pt'?'Refazer teste':'Retry test'}</button><button type="button" id="quizContinue">${getLanguage()==='pt'?'Continuar aprendendo':'Continue learning'}</button></div>`;
    resultEl.querySelector('#quizRetry')?.addEventListener('click',reset);resultEl.querySelector('#quizContinue')?.addEventListener('click',()=>document.querySelector('#learn')?.scrollIntoView({behavior:'smooth'}));
    if(score===100)tuxSpeak?.(getLanguage()==='pt'?'100%! Excelente trabalho. 🐧':'100%! Excellent work. 🐧');
  }
  function reset(){index=0;correct=0;wrong=0;streak=0;bestStreak=0;mistakes=[];render();}
  document.querySelector('#quizAutoAdvance')?.addEventListener('change',e=>{manual=!e.target.checked;});
  window.addEventListener('academy:language',()=>{if(!resultEl.hidden){finish();}else render();});
  window.addEventListener('academy:progress-reset',()=>{storage.removeItem(statsKey);reset();});
  render();
  return{readStats,reset,questions};
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

/* --- js/v5.js --- */

/* ==========================================================
   Interactive Linux Academy V5 enhancements
   Product UX, personalization, command inspection,
   distro tools, docs explorer, achievements and split mode.
   ========================================================== */

const v5Messages={
  en:{
    about:'About',searchLabel:'Search',heroOverline:'LEARN • PRACTICE • EVOLVE',heroLinux:'LINUX',heroInteractive:'INTERACTIVE',heroAcademy:'ACADEMY',
    heroLede:'From zero to advanced through an interactive, practical path. Explore the system, run commands and understand how Linux fits together.',
    exploreMap:'Explore the map',principlesTitle:'More knowledge.<br><em>More freedom.</em>',principle1:'Clear documentation',principle2:'Authentic commands',
    principle3:'Interactive environment',principle4:'Hands-on exercises',principle5:'Beginner to advanced',learningPathLabel:'LEARNING PATH',
    mapHeadline:'Your Linux map,<br>connected.',mapIntro:'Explore core concepts visually. Focus a node to reveal its commands and relationship to the rest of the system.',
    personalizeRoute:'Personalize my route',yourProgress:'YOUR PROGRESS',continueLearning:'Continue learning',learnHeadline:'Understand Linux<br>from the inside out.',
    labLabel:'LABORATORY',terminalHeadline:'Terminal in<br>your browser.',openTerminalBtn:'Open terminal',viewCommands:'View commands',
    commandInspector:'COMMAND INSPECTOR',currentChallenge:'CURRENT CHALLENGE',challengeTitle:'Explore your filesystem',
    challengeDescription:'Navigate to Documents and create a notes.txt file.',viewHint:'View hint',distrosLabelTop:'LINUX DISTRIBUTIONS',
    distrosHeadline:'Meet the main distributions.',compareLabel:'COMPARE',compareTitle:'Compare up to three distributions.',
    finderLabel:'FIND YOUR LINUX',finderTitle:'What kind of Linux experience do you want?',finderBeginner:'Simple desktop',
    finderDeveloper:'Development',finderStable:'Stability',finderAdvanced:'Deep control',commandsHeadline:'A Linux quick reference<br>you can actually practice.',
    cheatLabel:'QUICK REFERENCE',cheatTitle:'Search by intent, not only by command name.',cheatPlaceholder:'find a file, check disk, inspect process…',
    docsLabel:'DOCUMENTATION',docsHeadline:'Read the concept.<br>Verify the source.',previous:'Previous',next:'Next',achievementsLabel:'LOCAL ACHIEVEMENTS',
    achievementsTitle:'Small milestones, stored only here.',aboutHeadline:'From a CSS drawing<br>to an interactive Linux product.',
    aboutText:'The project preserves its original Tux experiment while evolving into an open-source learning environment built with HTML, CSS and Vanilla JavaScript.',
    navigate:'navigate',open:'open',close:'close',personalize:'Personalize your learning route',onboardingQuestion:'What do you want to learn?',
    onboardingText:'This only changes the route we highlight. Your choice stays on this device.',routeNew:'I am new to Linux',routeWindows:'I am coming from Windows',
    routeDev:'I want Linux for development',routeDevops:'I want servers / DevOps',routeSecurity:'I want cybersecurity',routeAdvanced:'I already use Linux',
    splitLearn:'Split Learn Mode',practiceWithoutLeaving:'Practice without leaving the lesson',fundamentalsSub:'What Linux is',
    finderIntro:'Choose a goal above to see a few distributions that may fit.',finderResult:'Options that may fit: ',
    compareEmpty:'Choose distributions to compare.',unlocked:'Unlocked',locked:'Locked',lessonRead:'READ',lessonLab:'LAB',lessonChallenge:'CHALLENGE',
    hintText:'Try: cd Documents  →  touch notes.txt',themeDark:'Dark theme',themeLight:'Light theme'
  },
  pt:{
    about:'Sobre',searchLabel:'Buscar',heroOverline:'APRENDA • PRATIQUE • EVOLUA',heroLinux:'LINUX',heroInteractive:'INTERACTIVE',heroAcademy:'ACADEMY',
    heroLede:'Do zero ao avançado em uma trilha interativa e prática. Explore o sistema, execute comandos e entenda como as partes do Linux se conectam.',
    exploreMap:'Explorar o mapa',principlesTitle:'Mais conhecimento.<br><em>Mais liberdade.</em>',principle1:'Documentação clara',principle2:'Comandos autênticos',
    principle3:'Ambiente interativo',principle4:'Exercícios práticos',principle5:'Do básico ao avançado',learningPathLabel:'TRILHA DE APRENDIZADO',
    mapHeadline:'Seu mapa do Linux,<br>conectado.',mapIntro:'Explore os conceitos principais de forma visual. Foque um nó para revelar comandos e sua relação com o restante do sistema.',
    personalizeRoute:'Personalizar minha trilha',yourProgress:'SEU PROGRESSO',continueLearning:'Continuar aprendendo',learnHeadline:'Entenda Linux<br>de dentro para fora.',
    labLabel:'LABORATÓRIO',terminalHeadline:'Terminal no<br>navegador.',openTerminalBtn:'Abrir terminal',viewCommands:'Ver comandos',
    commandInspector:'ANALISADOR DE COMANDO',currentChallenge:'DESAFIO ATUAL',challengeTitle:'Explore o sistema de arquivos',
    challengeDescription:'Entre em Documents e crie um arquivo notes.txt.',viewHint:'Ver dica',distrosLabelTop:'DISTRIBUIÇÕES LINUX',
    distrosHeadline:'Conheça as principais distribuições.',compareLabel:'COMPARAR',compareTitle:'Compare até três distribuições.',
    finderLabel:'ENCONTRE SEU LINUX',finderTitle:'Que tipo de experiência Linux você procura?',finderBeginner:'Desktop simples',
    finderDeveloper:'Desenvolvimento',finderStable:'Estabilidade',finderAdvanced:'Controle profundo',commandsHeadline:'Uma referência Linux<br>que você pode praticar.',
    cheatLabel:'CONSULTA RÁPIDA',cheatTitle:'Pesquise pela intenção, não apenas pelo nome do comando.',cheatPlaceholder:'encontrar arquivo, ver disco, inspecionar processo…',
    docsLabel:'DOCUMENTAÇÃO',docsHeadline:'Leia o conceito.<br>Confira a fonte.',previous:'Anterior',next:'Próximo',achievementsLabel:'CONQUISTAS LOCAIS',
    achievementsTitle:'Pequenos marcos, salvos apenas neste dispositivo.',aboutHeadline:'De um desenho em CSS<br>para um produto interativo Linux.',
    aboutText:'O projeto preserva o experimento original do Tux e evolui para um ambiente open source de aprendizado criado com HTML, CSS e JavaScript puro.',
    navigate:'navegar',open:'abrir',close:'fechar',personalize:'Personalize sua trilha de aprendizado',onboardingQuestion:'O que você quer aprender?',
    onboardingText:'Isso apenas altera a trilha destacada. A escolha fica salva neste dispositivo.',routeNew:'Sou novo no Linux',routeWindows:'Estou vindo do Windows',
    routeDev:'Quero Linux para desenvolvimento',routeDevops:'Quero servidores / DevOps',routeSecurity:'Quero cibersegurança',routeAdvanced:'Já uso Linux',
    splitLearn:'Modo de estudo dividido',practiceWithoutLeaving:'Pratique sem sair da aula',fundamentalsSub:'O que é Linux',
    finderIntro:'Escolha um objetivo acima para ver algumas distribuições que podem fazer sentido.',finderResult:'Opções que podem fazer sentido: ',
    compareEmpty:'Escolha distribuições para comparar.',unlocked:'Desbloqueada',locked:'Bloqueada',
    hintText:'Tente: cd Documents  →  touch notes.txt',themeDark:'Tema escuro',themeLight:'Tema claro'
  }
};

const v5t=key=>v5Messages[getLanguage()]?.[key]??v5Messages.en[key]??key;

function applyV5Translations(){
  document.querySelectorAll('[data-v5-i18n]').forEach(el=>{
    const key=el.dataset.v5I18n;
    if(v5Messages[getLanguage()]?.[key]!=null) el.textContent=v5t(key);
  });
  document.querySelectorAll('[data-v5-i18n-html]').forEach(el=>{
    const key=el.dataset.v5I18nHtml;
    if(v5Messages[getLanguage()]?.[key]!=null) el.innerHTML=v5t(key);
  });
  document.querySelectorAll('[data-v5-i18n-placeholder]').forEach(el=>{
    const key=el.dataset.v5I18nPlaceholder;
    if(v5Messages[getLanguage()]?.[key]!=null) el.placeholder=v5t(key);
  });
}
applyV5Translations();
window.addEventListener('academy:language',()=>setTimeout(applyV5Translations,0));

/* Theme */
const themeToggle=document.querySelector('#themeToggle');
const savedTheme=storage.getItem('linuxAcademy.theme')||'dark';
document.documentElement.dataset.theme=savedTheme;
function syncThemeButton(){
  if(!themeToggle)return;
  const isLight=document.documentElement.dataset.theme==='light';
  themeToggle.textContent=isLight?'☾':'☼';
  themeToggle.setAttribute('aria-label',isLight?v5t('themeDark'):v5t('themeLight'));
}
themeToggle?.addEventListener('click',()=>{
  const next=document.documentElement.dataset.theme==='light'?'dark':'light';
  document.documentElement.dataset.theme=next;
  storage.setItem('linuxAcademy.theme',next);
  syncThemeButton();
});
syncThemeButton();
window.addEventListener('academy:language',syncThemeButton);

/* Active navigation */
const navSectionMap=[
  ['#learn','#learn'],['#terminal','#terminal'],['#distros','#distros'],['#resources','#resources'],['#about','#about']
];
const activeLinks=[...document.querySelectorAll('.nav-links a')];
const navObserver=new IntersectionObserver(entries=>{
  const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
  if(!visible)return;
  activeLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${visible.target.id}`));
},{rootMargin:'-25% 0px -60% 0px',threshold:[0,.05,.2]});
navSectionMap.forEach(([,id])=>{const el=document.querySelector(id);if(el)navObserver.observe(el);});

/* Improve menu UX */
const v5MenuToggle=document.querySelector('#menuToggle');
const v5NavPanel=document.querySelector('#navPanel');
const oldCloseMenu=()=>{v5NavPanel?.classList.remove('open');v5MenuToggle?.setAttribute('aria-expanded','false');document.body.classList.remove('menu-open');};
v5MenuToggle?.addEventListener('click',()=>document.body.classList.toggle('menu-open',v5NavPanel?.classList.contains('open')));
v5NavPanel?.querySelectorAll('a').forEach(a=>a.addEventListener('click',oldCloseMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&v5NavPanel?.classList.contains('open'))oldCloseMenu();});

/* Onboarding / personalized routes */
const onboardingDialog=document.querySelector('#onboardingDialog');
const openOnboarding=document.querySelector('#openOnboarding');
const onboardingOptions=document.querySelector('#onboardingOptions');
const routeKey='linuxAcademy.route';
const routeNodes={
  new:['fundamentals','terminal','filesystem','distros','packages'],
  windows:['fundamentals','windows','distros','terminal','filesystem'],
  development:['fundamentals','terminal','packages','shell','networking'],
  devops:['terminal','filesystem','networking','processes','shell'],
  security:['fundamentals','terminal','networking','permissions','shell'],
  advanced:['processes','networking','shell','packages']
};

function applyRoute(route){
  document.querySelectorAll('.mind-node').forEach(n=>n.classList.toggle('recommended',routeNodes[route]?.includes(n.dataset.mapId)));
  if(route) storage.setItem(routeKey,route);
}
function showOnboarding(){ if(onboardingDialog&&!onboardingDialog.open)onboardingDialog.showModal(); }
openOnboarding?.addEventListener('click',showOnboarding);
onboardingOptions?.querySelectorAll('[data-route]').forEach(btn=>btn.addEventListener('click',()=>{
  applyRoute(btn.dataset.route);
  onboardingDialog?.close();
  document.querySelector('#learning-map')?.scrollIntoView({behavior:'smooth',block:'center'});
}));
const storedRoute=storage.getItem(routeKey);
if(storedRoute)applyRoute(storedRoute);
else setTimeout(()=>{if(!storage.getItem('linuxAcademy.onboardingDismissed'))showOnboarding();},850);
onboardingDialog?.addEventListener('close',()=>storage.setItem('linuxAcademy.onboardingDismissed','1'));

/* Tux reacts to map focus and terminal state */
window.addEventListener('academy:map-focus',e=>{
  if(e.detail&&tux?.lookAt)tux.lookAt(e.detail.x,e.detail.y);
});
window.addEventListener('academy:terminal-command',e=>{
  const name=e.detail?.command||'';
  if(name&&!commands.some(c=>c.name===name)){
    tux?.react?.();
    tux?.speak?.(getLanguage()==='pt'?`"${name}" não está disponível neste laboratório.`:`"${name}" is not available in this lab.`);
  }
});

/* Progress dashboard */
function completedByLevel(){
  const completed=new Set(JSON.parse(storage.getItem('linuxAcademy.completedLessons')||'[]'));
  const result={beginner:[0,0],intermediate:[0,0],advanced:[0,0]};
  lessons.forEach(l=>{result[l.level][1]++;if(completed.has(l.id))result[l.level][0]++;});
  return {completed,result};
}
function renderV5Progress(){
  const {completed,result}=completedByLevel();
  const pct=Math.round((completed.size/Math.max(1,lessons.length))*100);
  const ring=document.querySelector('#progressRing');
  ring?.style.setProperty('--p',pct);
  const ringLabel=document.querySelector('#progressRingLabel');
  if(ringLabel)ringLabel.textContent=`${pct}%`;
  ['beginner','intermediate','advanced'].forEach(level=>{
    const target=document.querySelector(`#${level}Progress`);
    if(target)target.textContent=`${result[level][0]}/${result[level][1]}`;
  });
}
window.addEventListener('academy:lesson-progress',renderV5Progress);
window.addEventListener('academy:progress-reset',renderV5Progress);
window.addEventListener('academy:language',renderV5Progress);
renderV5Progress();

document.querySelector('#continueLearning')?.addEventListener('click',()=>{
  const completed=new Set(JSON.parse(storage.getItem('linuxAcademy.completedLessons')||'[]'));
  const next=lessons.find(l=>!completed.has(l.id));
  if(next){
    document.querySelector(`.level-tabs [data-level="${next.level}"]`)?.click();
    setTimeout(()=>document.querySelector(`[data-lesson-id="${next.id}"]`)?.scrollIntoView({behavior:'smooth',block:'center'}),30);
  }else document.querySelector('#terminal')?.scrollIntoView({behavior:'smooth'});
});

/* Terminal focus + hint */
document.querySelector('#focusTerminal')?.addEventListener('click',()=>{
  document.querySelector('#terminalInput')?.focus();
  document.querySelector('#terminal')?.scrollIntoView({behavior:'smooth',block:'center'});
});
document.querySelector('#missionHint')?.addEventListener('click',()=>{
  const input=document.querySelector('#terminalInput');
  if(input){input.value='cd Documents';input.focus();}
  tux?.speak?.(v5t('hintText'));
});

/* Command inspector */
const inspectorCommand=document.querySelector('#inspectorCommand');
const inspectorParts=document.querySelector('#inspectorParts');
const flagHelp={
  ls:{
    base:{en:'List directory contents',pt:'Lista o conteúdo do diretório'},
    '-l':{en:'Long format',pt:'Formato detalhado'},
    '-a':{en:'Include hidden files',pt:'Inclui arquivos ocultos'},
    '-h':{en:'Human-readable sizes',pt:'Tamanhos legíveis'}
  },
  grep:{
    base:{en:'Search text by pattern',pt:'Pesquisa texto por padrão'},
    '-i':{en:'Ignore case',pt:'Ignora maiúsculas/minúsculas'},
    '-n':{en:'Show line numbers',pt:'Mostra números das linhas'},
    '-r':{en:'Search recursively',pt:'Pesquisa recursivamente'}
  },
  find:{base:{en:'Find files by criteria',pt:'Encontra arquivos por critérios'},'-name':{en:'Match a name pattern',pt:'Compara um padrão de nome'}},
  chmod:{base:{en:'Change file mode bits',pt:'Altera bits de permissão'}},
  ps:{base:{en:'Inspect processes',pt:'Inspeciona processos'},'aux':{en:'Common full process view',pt:'Visão ampla de processos'}},
  ip:{base:{en:'Inspect or configure networking',pt:'Inspeciona ou configura rede'}},
  mkdir:{base:{en:'Create directories',pt:'Cria diretórios'},'-p':{en:'Create parent directories as needed',pt:'Cria diretórios pais quando necessário'}},
  rm:{base:{en:'Remove filesystem entries',pt:'Remove entradas do filesystem'},'-r':{en:'Recursive removal — use carefully',pt:'Remoção recursiva — use com cuidado'},'-f':{en:'Force without prompts',pt:'Força sem confirmação'}}
};
function inspectorDescription(obj){return obj?.[getLanguage()]||obj?.en||'';}
function renderInspector(detail){
  if(!inspectorCommand||!inspectorParts||!detail)return;
  const name=detail.command;
  const args=detail.args||[];
  inspectorCommand.textContent=[name,...args].join(' ');
  inspectorParts.replaceChildren();
  const help=flagHelp[name];
  const pieces=[{token:name,desc:inspectorDescription(help?.base)||((commands.find(c=>c.name===name)?.description||{})[getLanguage()]||commands.find(c=>c.name===name)?.description?.en||v5t('commandInspector'))}];
  args.forEach(arg=>{
    if(arg.startsWith('-')&&arg.length>2&&!help?.[arg]){
      const chars=arg.slice(1).split('');
      chars.forEach(c=>{const key=`-${c}`;pieces.push({token:key,desc:inspectorDescription(help?.[key])||'Option / flag'});});
    }else{
      pieces.push({token:arg,desc:inspectorDescription(help?.[arg])||(arg.startsWith('-')?'Option / flag':'Argument')});
    }
  });
  pieces.slice(0,8).forEach(p=>{
    const span=document.createElement('span');
    const code=document.createElement('code');code.textContent=p.token;
    const b=document.createElement('b');b.textContent=p.desc;
    span.append(code,b);inspectorParts.append(span);
  });
}
window.addEventListener('academy:terminal-command',e=>renderInspector(e.detail));

/* Extended terminal missions */
const missionDefinitions=[
  {id:'navigation',label:{en:'Navigation',pt:'Navegação'},match:d=>['pwd','ls','cd'].includes(d.command)},
  {id:'files',label:{en:'Files',pt:'Arquivos'},match:d=>['mkdir','touch','cat'].includes(d.command)},
  {id:'search',label:{en:'Search',pt:'Busca'},match:d=>['grep','find'].includes(d.command)},
  {id:'permissions',label:{en:'Permissions',pt:'Permissões'},match:d=>['chmod','chown'].includes(d.command)},
  {id:'processes',label:{en:'Processes',pt:'Processos'},match:d=>['ps','top','kill'].includes(d.command)},
  {id:'networking',label:{en:'Networking',pt:'Redes'},match:d=>['ip','ping','ssh'].includes(d.command)},
  {id:'bash',label:{en:'Shell & Bash',pt:'Shell & Bash'},match:d=>['echo','history','export'].includes(d.command)}
];
function missionKey(id){return`linuxAcademy.v5mission.${id}`;}
function renderExtendedMissions(){
  const wrap=document.querySelector('#extendedMissions');if(!wrap)return;
  wrap.replaceChildren();
  missionDefinitions.forEach(m=>{
    const done=storage.getItem(missionKey(m.id))==='done';
    const span=document.createElement('span');span.className=`mission ${done?'done':''}`;
    const i=document.createElement('i');const b=document.createElement('b');b.textContent=m.label[getLanguage()]||m.label.en;
    span.append(i,b);wrap.append(span);
  });
  const doneCount=missionDefinitions.filter(m=>storage.getItem(missionKey(m.id))==='done').length;
  const counter=document.querySelector('#missionCounter');if(counter)counter.textContent=`${String(Math.min(doneCount+1,7)).padStart(2,'0')}/07`;
}
window.addEventListener('academy:terminal-command',e=>{
  missionDefinitions.forEach(m=>{
    if(m.match(e.detail||{}))storage.setItem(missionKey(m.id),'done');
  });
  renderExtendedMissions();
});
window.addEventListener('academy:progress-reset',()=>{
  missionDefinitions.forEach(m=>storage.removeItem(missionKey(m.id)));
  renderExtendedMissions();
});
window.addEventListener('academy:language',renderExtendedMissions);
renderExtendedMissions();

/* Distro comparator + finder */
const localizeV5=v=>typeof v==='string'?v:(v?.[getLanguage()]??v?.en??'');
const compareSelects=[...document.querySelectorAll('[data-compare-slot]')];
const compareStorageKey='linuxAcademy.distroComparison.v62';
const compareDefaults=['debian','fedora','arch'];
function sanitizeCompareSelection(value){
  const validIds=new Set(distros.map(d=>d.id));
  const raw=Array.isArray(value)?value:[];
  const used=new Set();
  const result=[];
  for(let i=0;i<3;i++){
    const candidate=raw[i];
    if(candidate&&validIds.has(candidate)&&!used.has(candidate)){result[i]=candidate;used.add(candidate);continue;}
    const fallback=[...compareDefaults,...distros.map(d=>d.id)].find(id=>validIds.has(id)&&!used.has(id));
    result[i]=fallback||'';if(fallback)used.add(fallback);
  }
  return result;
}
function readCompareSelection(){
  try{
    const current=storage.getItem(compareStorageKey);
    if(current)return sanitizeCompareSelection(JSON.parse(current));
    for(const legacyKey of ['linuxAcademy.distroComparison','linuxAcademy.distroComparison.v61']){
      const legacy=storage.getItem(legacyKey);if(legacy)return sanitizeCompareSelection(JSON.parse(legacy));
    }
    return [...compareDefaults];
  }catch{return [...compareDefaults];}
}
let comparisonSelection=readCompareSelection();
function saveCompareSelection(){storage.setItem(compareStorageKey,JSON.stringify(comparisonSelection));}
function buildCompareSelects(){
  comparisonSelection=sanitizeCompareSelection(comparisonSelection);
  compareSelects.forEach((select,index)=>{
    select.replaceChildren();
    select.setAttribute('aria-label',getLanguage()==='pt'?`Distribuição ${index+1}`:`Distribution ${index+1}`);
    distros.forEach(d=>{
      const opt=document.createElement('option');opt.value=d.id;opt.textContent=d.name;
      opt.disabled=comparisonSelection.some((id,slot)=>slot!==index&&id===d.id);
      select.append(opt);
    });
    select.value=comparisonSelection[index]||'';
    select.onchange=()=>{
      const next=[...comparisonSelection];next[index]=select.value;
      comparisonSelection=sanitizeCompareSelection(next);saveCompareSelection();buildCompareSelects();renderCompare();
    };
  });
  saveCompareSelection();
}
function renderCompare(){
  const out=document.querySelector('#distroCompareOutput');if(!out)return;
  out.replaceChildren();
  comparisonSelection=sanitizeCompareSelection(comparisonSelection);
  const chosen=comparisonSelection.map(id=>distros.find(d=>d.id===id)).filter(Boolean);
  if(!chosen.length){out.textContent=v5t('compareEmpty');return;}
  chosen.forEach(d=>{
    const box=document.createElement('div');box.className='compare-mini';
    const strong=document.createElement('strong');strong.textContent=d.name;
    const fam=document.createElement('span');fam.textContent=`${d.family} • ${d.packageManager}`;
    const rel=document.createElement('span');rel.textContent=localizeV5(d.release);
    const diff=document.createElement('span');diff.textContent=localizeV5(d.difficulty);
    box.append(strong,fam,rel,diff);out.append(box);
  });
}
buildCompareSelects();renderCompare();

const finderMap={
  beginner:['ubuntu','mint','popos'],
  developer:['fedora','ubuntu','popos'],
  stable:['debian','mint','opensuse'],
  advanced:['arch','nixos','endeavour']
};
function renderFinder(mode){
  const result=document.querySelector('#finderResult');if(!result)return;
  document.querySelectorAll('[data-finder]').forEach(b=>b.classList.toggle('active',b.dataset.finder===mode));
  if(!mode){result.textContent=v5t('finderIntro');return;}
  const choices=(finderMap[mode]||[]).map(id=>distros.find(d=>d.id===id)).filter(Boolean);
  result.replaceChildren();
  const intro=document.createElement('span');intro.textContent=v5t('finderResult');result.append(intro);
  choices.forEach((d,i)=>{
    const b=document.createElement('button');b.type='button';b.className='finder-result-link';b.textContent=`${i?', ':''}${d.name}`;
    b.addEventListener('click',()=>document.querySelector(`.distro-slide[data-id="${d.id}"]`)?.click());
    result.append(b);
  });
}
document.querySelectorAll('[data-finder]').forEach(b=>b.addEventListener('click',()=>renderFinder(b.dataset.finder)));
renderFinder('');
window.addEventListener('academy:language',()=>{buildCompareSelects();renderCompare();renderFinder(document.querySelector('[data-finder].active')?.dataset.finder||'');});

/* Documentation explorer */
const docsTopics=[
  {id:'filesystem',title:{en:'Filesystem',pt:'Sistema de arquivos'},summary:{en:'Linux organizes files beneath a single root directory, /. Conventional paths such as /etc, /home, /usr and /var have documented roles.',pt:'O Linux organiza arquivos abaixo de um único diretório raiz, /. Caminhos como /etc, /home, /usr e /var possuem funções convencionais documentadas.'},command:'ls /',referenceId:'filesystem'},
  {id:'permissions',title:{en:'Permissions',pt:'Permissões'},summary:{en:'Read, write and execute bits are evaluated for owner, group and others. Learn to inspect permissions before changing them.',pt:'Bits de leitura, escrita e execução são avaliados para dono, grupo e outros. Aprenda a inspecionar permissões antes de alterá-las.'},command:'ls -la',referenceId:'permissions'},
  {id:'packages',title:{en:'Packages',pt:'Pacotes'},summary:{en:'Distributions use package managers and repositories to install and update software. The exact tool depends on the distro family.',pt:'Distribuições usam gerenciadores de pacotes e repositórios para instalar e atualizar software. A ferramenta depende da família da distro.'},command:'apt --help',referenceId:'packages'},
  {id:'processes',title:{en:'Processes',pt:'Processos'},summary:{en:'Processes have identifiers and state. Tools such as ps inspect them; signals request actions from a process.',pt:'Processos possuem identificadores e estados. Ferramentas como ps os inspecionam; sinais solicitam ações a um processo.'},command:'ps aux',referenceId:'processes'},
  {id:'networking',title:{en:'Networking',pt:'Redes'},summary:{en:'Use tools such as ip, ping and ssh to inspect interfaces, test reachability and connect to remote systems.',pt:'Use ferramentas como ip, ping e ssh para inspecionar interfaces, testar conectividade e acessar sistemas remotos.'},command:'ip addr',referenceId:'networking'},
  {id:'bash',title:{en:'Shell & Bash',pt:'Shell & Bash'},summary:{en:'The shell parses commands, expands variables, handles pipelines and redirections, and launches programs.',pt:'O shell interpreta comandos, expande variáveis, trata pipelines e redirecionamentos e inicia programas.'},command:'echo $SHELL',referenceId:'bash'},
  {id:'systemd',title:{en:'Services & systemd',pt:'Serviços e systemd'},summary:{en:'On many distributions, systemd manages services and units. Learn status inspection before making changes.',pt:'Em muitas distribuições, o systemd gerencia serviços e units. Aprenda a consultar o estado antes de fazer alterações.'},command:'systemctl status ssh',referenceId:'systemd'}
]
let activeDoc=0;
function renderDocs(){
  const sidebar=document.querySelector('#docsSidebar');
  const body=document.querySelector('#docsArticleBody');
  if(!sidebar||!body)return;
  sidebar.replaceChildren();
  docsTopics.forEach((topic,index)=>{
    const b=document.createElement('button');b.type='button';b.classList.toggle('active',index===activeDoc);b.textContent=localizeV5(topic.title);
    b.addEventListener('click',()=>{activeDoc=index;renderDocs();});sidebar.append(b);
  });
  const topic=docsTopics[activeDoc];
  const breadcrumb=document.querySelector('#docsBreadcrumb');if(breadcrumb)breadcrumb.textContent=localizeV5(topic.title);
  body.replaceChildren();
  const h=document.createElement('h3');h.textContent=localizeV5(topic.title);
  const p=document.createElement('p');p.textContent=localizeV5(topic.summary);
  const pre=document.createElement('pre');const code=document.createElement('code');code.textContent=`$ ${topic.command}`;pre.append(code);
  const actions=document.createElement('div');actions.className='docs-article-actions';
  const tryBtn=document.createElement('button');tryBtn.type='button';tryBtn.className='small-button';tryBtn.textContent=t('tryIt');
  tryBtn.addEventListener('click',()=>{terminal.run(topic.command);document.querySelector('#terminal')?.scrollIntoView({behavior:'smooth'});});
  const topicRef=topicDocumentationReferences[topic.referenceId]||null;const refType=topicRef?.type||'official';const link=document.createElement('a');link.href=topicRef?.url||'#';link.target='_blank';link.rel='noopener noreferrer';link.className='docs-source-link';link.setAttribute('aria-label',`${getReferenceLabel(refType)} — ${topicRef?.provider||''}`);const label=document.createElement('span');label.textContent=getReferenceLabel(refType);const provider=document.createElement('small');provider.textContent=`${topicRef?.provider||getMissingReferenceLabel()} ↗`;link.append(label,provider);
  actions.append(tryBtn,link);body.append(h,p,pre,actions);
}
document.querySelector('#docsPrev')?.addEventListener('click',()=>{activeDoc=(activeDoc-1+docsTopics.length)%docsTopics.length;renderDocs();});
document.querySelector('#docsNext')?.addEventListener('click',()=>{activeDoc=(activeDoc+1)%docsTopics.length;renderDocs();});
window.addEventListener('academy:language',renderDocs);
renderDocs();

/* Cheat sheet by intent */
const cheatSearch=document.querySelector('#cheatSearch');
const cheatResults=document.querySelector('#cheatResults');
const intentAliases={
  en:{'find file':['find','locate','ls'],'check disk':['df','du','lsblk'],'process':['ps','top','kill'],'network':['ip','ping','ssh'],'permission':['chmod','chown','ls'],'text':['grep','cat','less']},
  pt:{'arquivo':['find','locate','ls'],'disco':['df','du','lsblk'],'processo':['ps','top','kill'],'rede':['ip','ping','ssh'],'permiss':['chmod','chown','ls'],'texto':['grep','cat','less']}
};
function cheatCandidates(q){
  if(!q)return commands.slice(0,8);
  const direct=commands.filter(c=>[c.name,c.category,localizeV5(c.description),c.syntax].join(' ').toLowerCase().includes(q));
  const alias=Object.entries(intentAliases[getLanguage()]||{}).find(([key])=>q.includes(key))?.[1]||[];
  const merged=[...direct,...alias.map(name=>commands.find(c=>c.name===name)).filter(Boolean)];
  return [...new Map(merged.map(c=>[c.name,c])).values()].slice(0,10);
}
function renderCheat(){
  if(!cheatResults)return;
  const q=(cheatSearch?.value||'').trim().toLowerCase();
  cheatResults.replaceChildren();
  cheatCandidates(q).forEach(c=>{
    const b=document.createElement('button');b.type='button';b.className='cheat-result';
    const code=document.createElement('code');code.textContent=c.name;
    const span=document.createElement('span');span.textContent=localizeV5(c.description);
    b.append(code,span);
    b.addEventListener('click',()=>{terminal.run(c.example||c.name);document.querySelector('#terminal')?.scrollIntoView({behavior:'smooth'});});
    cheatResults.append(b);
  });
}
cheatSearch?.addEventListener('input',renderCheat);
window.addEventListener('academy:language',renderCheat);
renderCheat();

/* Split Learn mode: move the live terminal DOM so state is preserved */
const splitDialog=document.querySelector('#splitLearnDialog');
const splitPane=document.querySelector('#splitLessonPane');
const splitSlot=document.querySelector('#splitTerminalSlot');
const splitClose=document.querySelector('#splitLearnClose');
let terminalPlaceholder=null;
let terminalOriginalParent=null;
function restoreTerminal(){
  const live=document.querySelector('.terminal-window');
  if(live&&terminalPlaceholder?.parentNode){
    terminalPlaceholder.parentNode.insertBefore(live,terminalPlaceholder);
    terminalPlaceholder.remove();
  }else if(live&&terminalOriginalParent)terminalOriginalParent.append(live);
  terminalPlaceholder=null;terminalOriginalParent=null;
}
function openSplitLesson(lesson){
  if(!splitDialog||!splitPane||!splitSlot||!lesson)return;
  const title=localizeV5(lesson.title),desc=localizeV5(lesson.description),output=localizeV5(lesson.output);
  splitPane.replaceChildren();
  const eyebrow=document.createElement('p');eyebrow.className='eyebrow';eyebrow.textContent=`${lesson.level.toUpperCase()} / ${lesson.id}`;
  const h=document.createElement('h2');h.id='splitLessonTitle';h.textContent=title;
  const p=document.createElement('p');p.textContent=desc;
  const pre=document.createElement('pre');const code=document.createElement('code');code.textContent=`$ ${lesson.command}`;pre.append(code);
  const expected=document.createElement('p');expected.textContent=`${t('expectedOutput')}: ${output}`;
  const link=document.createElement('a');link.href=lesson.reference;link.target='_blank';link.rel='noopener noreferrer';const lessonRefType=lesson.referenceType||inferReferenceType(lesson.reference);const lessonProvider=lesson.source||getReferenceLabel(lessonRefType);link.textContent=`${getReferenceLabel(lessonRefType)} · ${lessonProvider} ↗`;link.setAttribute('aria-label',`${getReferenceLabel(lessonRefType)} — ${lessonProvider}`);
  splitPane.append(eyebrow,h,p,pre,expected,link);

  const live=document.querySelector('#terminal .terminal-window');
  if(live){
    terminalOriginalParent=live.parentNode;
    terminalPlaceholder=document.createComment('terminal-placeholder');
    terminalOriginalParent.insertBefore(terminalPlaceholder,live);
    splitSlot.append(live);
  }
  splitDialog.showModal();
  setTimeout(()=>document.querySelector('#terminalInput')?.focus(),60);
}
window.addEventListener('academy:split-lesson',e=>openSplitLesson(e.detail?.lesson));
splitClose?.addEventListener('click',()=>splitDialog?.close());
splitDialog?.addEventListener('close',restoreTerminal);
splitDialog?.addEventListener('cancel',()=>setTimeout(restoreTerminal,0));

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

/* Re-apply V5 translations after all dynamic surfaces exist */
applyV5Translations();

/* --- js/v6.js --- */

/* Interactive Linux Academy V6 — Academic Edition */
const v6Messages={
  en:{dashboardLabel:'ACADEMIC PROGRESS',dashboardTitle:'Your Linux learning record',overallProgress:'Overall progress',lessonsCompleted:'Lessons',challengesCompleted:'Challenges',quizAccuracy:'Quiz accuracy',autoAdvance:'Auto advance',quizHelper:'Answer, read the explanation, then continue automatically.',resultsLabel:'YOUR RESULTS',resultsTitle:'Knowledge statistics',accuracy:'Accuracy',testsCompleted:'Tests',correctAnswers:'Correct',incorrectAnswers:'Incorrect',curriculumLabel:'CURRICULUM',curriculumTitle:'One system, many learning paths.',curriculumText:'Build a foundation, then move toward administration, networking, automation, security and containers.',aboutHeadline:'From a CSS drawing to an open-source Linux academy.',aboutText:'V6 turns the project into an academic learning environment: structured curriculum, labs, quizzes, local progress, documentation and a safe terminal simulator.',resumeLearning:'Continue where you stopped'},
  pt:{dashboardLabel:'PROGRESSO ACADÊMICO',dashboardTitle:'Seu registro de aprendizado Linux',overallProgress:'Progresso geral',lessonsCompleted:'Aulas',challengesCompleted:'Desafios',quizAccuracy:'Precisão nos testes',autoAdvance:'Avanço automático',quizHelper:'Responda, leia a explicação e continue automaticamente.',resultsLabel:'SEUS RESULTADOS',resultsTitle:'Estatísticas de conhecimento',accuracy:'Precisão',testsCompleted:'Testes',correctAnswers:'Acertos',incorrectAnswers:'Erros',curriculumLabel:'TRILHA',curriculumTitle:'Um sistema, muitos caminhos.',curriculumText:'Construa uma base sólida e depois avance para administração, redes, automação, segurança e containers.',aboutHeadline:'De um desenho em CSS para uma academia Linux open source.',aboutText:'A V6 transforma o projeto em um ambiente acadêmico: currículo estruturado, laboratórios, testes, progresso local, documentação e terminal seguro.',resumeLearning:'Continuar de onde parei'}
};
const v6t=k=>v6Messages[getLanguage()]?.[k]??v6Messages.en[k]??k;
function applyV6Translations(){document.querySelectorAll('[data-v6-i18n]').forEach(el=>{const v=v6t(el.dataset.v6I18n);if(v!=null)el.textContent=v;});}
function syncV6Title(){document.title=getLanguage()==='pt'?'Interactive Linux Academy V6 — Edição Acadêmica':'Interactive Linux Academy V6 — Academic Edition';}
applyV6Translations();syncV6Title();window.addEventListener('academy:language',()=>{applyV6Translations();syncV6Title();});

/* theme button keeps static icon markup and updates accessible name only */
function syncV6Theme(){if(!themeToggle)return;const light=document.documentElement.dataset.theme==='light';themeToggle.innerHTML='<span class="theme-icon" aria-hidden="true"></span>';themeToggle.setAttribute('aria-label',light?v5t('themeDark'):v5t('themeLight'));document.querySelector('meta[name="theme-color"]')?.setAttribute('content',light?'#f5f7fb':'#070a0f');}
themeToggle?.addEventListener('click',()=>setTimeout(syncV6Theme,0));window.addEventListener('academy:language',syncV6Theme);syncV6Theme();

/* Academic dashboard + resume */
const quizStatsKey='linuxAcademy.quizStats.v6';
function readQuizStats(){try{return JSON.parse(storage.getItem(quizStatsKey)||'{}')}catch{return {}}}
function renderAcademicDashboard(){
  const completed=new Set(JSON.parse(storage.getItem('linuxAcademy.completedLessons')||'[]'));const stats=readQuizStats();const pct=Math.round(completed.size/Math.max(1,lessons.length)*100);
  const labs=lessons.filter(l=>l.type==='LAB'&&completed.has(l.id)).length;const challenges=lessons.filter(l=>l.type==='CHALLENGE'&&completed.has(l.id)).length;
  const set=(id,v)=>{const el=document.querySelector(id);if(el)el.textContent=v};set('#metricOverall',pct+'%');set('#metricLessons',`${completed.size}/${lessons.length}`);set('#metricLabs',labs);set('#metricChallenges',challenges);set('#metricQuizAccuracy',stats.questions?Math.round(stats.correct/stats.questions*100)+'%':'—');
  set('#statAccuracy',stats.questions?Math.round(stats.correct/stats.questions*100)+'%':'—');set('#statTests',stats.tests||0);set('#statCorrect',stats.correct||0);set('#statIncorrect',stats.incorrect||0);
}
['academy:lesson-progress','academy:progress-reset','academy:quiz-complete'].forEach(e=>window.addEventListener(e,renderAcademicDashboard));renderAcademicDashboard();
document.querySelector('#resumeLastLesson')?.addEventListener('click',()=>{const id=storage.getItem('linuxAcademy.lastLesson');const lesson=lessons.find(l=>l.id===id);if(lesson){document.querySelector(`.level-tabs [data-level="${lesson.level}"]`)?.click();setTimeout(()=>document.querySelector(`[data-lesson-id="${id}"]`)?.scrollIntoView({behavior:'smooth',block:'center'}),60);}else document.querySelector('#learn')?.scrollIntoView({behavior:'smooth'});});

/* Curriculum infinite carousel — V6.1 uses a compositor-friendly CSS marquee. */
const curriculumModules=[
 ['01','Foundations','Fundamentos','kernel • GNU/Linux • distros'],['02','Terminal','Terminal','pwd • ls • cd • man'],['03','Filesystem','Sistema de arquivos','FHS • /etc • /var • /proc'],['04','File management','Arquivos','cp • mv • rm • ln'],['05','Text processing','Texto','grep • sed • awk • sort'],['06','Permissions','Permissões','rwx • chmod • chown • sudo'],['07','Packages','Pacotes','apt • dnf • pacman • rpm'],['08','Processes','Processos','ps • top • signals • jobs'],['09','Systemd','Systemd','units • services • journal'],['10','Networking','Redes','ip • ss • curl • ssh'],['11','Storage','Armazenamento','df • du • lsblk • mounts'],['12','Shell & Bash','Shell & Bash','variables • pipes • loops'],['13','Troubleshooting','Diagnóstico','journal • dmesg • evidence'],['14','Security','Segurança','least privilege • SSH • firewall'],['15','Servers','Servidores','services • sockets • logs'],['16','Containers','Containers','namespaces • cgroups • OCI'],['17','Development','Desenvolvimento','Git • PATH • tooling'],['18','Administration','Administração','boot • timers • performance']
];
const viewport=document.querySelector('#curriculumViewport'),track=document.querySelector('#curriculumTrack');
function makeCurriculumCard(m){
  const card=document.createElement('div');
  card.className='curriculum-card';
  card.setAttribute('role','listitem');
  card.innerHTML=`<small>${m[0]}</small><strong>${getLanguage()==='pt'?m[2]:m[1]}</strong><p>${m[3]}</p>`;
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

/* --- js/v6.1.js --- */

/* ==========================================================
   Interactive Linux Academy V6.1
   Visual consistency, theme regressions and editorial headings.
   ========================================================== */
const v61Headings={
  map:{selector:'.map-editorial h2',en:'YOUR <span class="section-title__accent">LINUX</span> MAP,<br>CONNECTED.',pt:'SEU MAPA DO <span class="section-title__accent">LINUX</span>,<br>CONECTADO.'},
  learn:{selector:'#learn .editorial-heading h2',en:'UNDERSTAND <span class="section-title__accent">LINUX</span><br>FROM THE INSIDE OUT.',pt:'ENTENDA O <span class="section-title__accent">LINUX</span><br>DE DENTRO PARA FORA.'},
  terminal:{selector:'#terminal .terminal-heading-v5 h2',en:'PRACTICE IN THE <span class="section-title__accent">TERMINAL</span><br>IN YOUR BROWSER.',pt:'PRATIQUE NO <span class="section-title__accent">TERMINAL</span><br>DIRETO NO NAVEGADOR.'},
  distros:{selector:'#distros .editorial-heading h2',en:'EXPLORE THE MAIN <span class="section-title__accent">DISTRIBUTIONS</span>.',pt:'EXPLORE AS PRINCIPAIS <span class="section-title__accent">DISTRIBUIÇÕES</span>.'},
  commands:{selector:'#commands .editorial-heading h2',en:'A <span class="section-title__accent">LINUX</span> REFERENCE<br>YOU CAN PRACTICE.',pt:'UMA REFERÊNCIA <span class="section-title__accent">LINUX</span><br>QUE VOCÊ PODE PRATICAR.'},
  docs:{selector:'#resources .editorial-heading h2',en:'READ THE CONCEPT.<br><span class="section-title__accent">VERIFY</span> THE SOURCE.',pt:'LEIA O CONCEITO.<br><span class="section-title__accent">CONFIRA</span> A FONTE.'},
  concepts:{selector:'#concepts .editorial-heading h2',en:'SEE HOW <span class="section-title__accent">LINUX</span><br>IS ORGANIZED.',pt:'VEJA COMO O <span class="section-title__accent">LINUX</span><br>É ORGANIZADO.'},
  windows:{selector:'#windows-linux .section-heading h2',en:'TRANSLATE FAMILIAR IDEAS<br>INTO <span class="section-title__accent">LINUX</span> CONCEPTS.',pt:'TRADUZA IDEIAS CONHECIDAS<br>PARA CONCEITOS DO <span class="section-title__accent">LINUX</span>.'},
  curriculum:{selector:'#roadmap .curriculum-heading-v6 h2',en:'ONE SYSTEM,<br>MANY <span class="section-title__accent">PATHS</span>.',pt:'UM SISTEMA,<br>MUITOS <span class="section-title__accent">CAMINHOS</span>.'},
  about:{selector:'#about h2',en:'FROM A CSS DRAWING<br>TO AN <span class="section-title__accent">INTERACTIVE</span> LINUX ACADEMY.',pt:'DE UM DESENHO EM CSS<br>PARA UMA ACADEMIA <span class="section-title__accent">LINUX</span> INTERATIVA.'}
};
function applyV61Headings(){
  const lang=getLanguage()==='pt'?'pt':'en';
  Object.values(v61Headings).forEach(item=>{
    const el=document.querySelector(item.selector);
    if(!el)return;
    el.classList.add('v61-editorial-title');
    el.innerHTML=item[lang];
  });
}
function syncV61Document(){
  document.documentElement.dataset.version='6.1';
  document.title=getLanguage()==='pt'?'Interactive Linux Academy V6.1 — Refinamento Visual':'Interactive Linux Academy V6.1 — Visual Consistency Update';
}
function applyV61(){applyV61Headings();syncV61Document();}
applyV61();
window.addEventListener('academy:language',()=>setTimeout(applyV61,0));

/* --- js/v6.2.js --- */

/* Interactive Linux Academy V6.2 — Documentation Integrity & UI Consistency */
const v62Messages={
  en:{releaseTitle:'Interactive Linux Academy V6.2 — Documentation Integrity'},
  pt:{releaseTitle:'Interactive Linux Academy V6.2 — Integridade da Documentação'}
};
function syncV62Title(){document.title=v62Messages[getLanguage()]?.releaseTitle||v62Messages.en.releaseTitle;}
function secureExternalReferences(){
  document.querySelectorAll('a[target="_blank"]').forEach(a=>{
    a.rel='noopener noreferrer';
    if(!a.title&&a.href){
      try{a.title=getLanguage()==='pt'?'Abrir referência em uma nova aba':'Open reference in a new tab';}catch{}
    }
  });
}
function migrateLegacyComparator(){
  const legacyKeys=['linuxAcademy.distroComparison','linuxAcademy.distroComparison.v61'];
  legacyKeys.forEach(key=>{
    try{
      const value=JSON.parse(storage.getItem(key)||'null');
      if(Array.isArray(value)&&!storage.getItem('linuxAcademy.distroComparison.v62')){
        storage.setItem('linuxAcademy.distroComparison.v62',JSON.stringify(sanitizeCompareSelection(value)));
        comparisonSelection=readCompareSelection();buildCompareSelects();renderCompare();
      }
      storage.removeItem(key);
    }catch{storage.removeItem(key);}
  });
}
function auditReferenceRegistry(){
  const missing=commands.map(c=>c.name).filter(name=>!getCommandReference(name));
  const generic=Object.entries(documentationReferences).filter(([,ref])=>ref.url==='https://man7.org/linux/man-pages/').map(([name])=>name);
  return{commands:commands.length,linked:commands.length-missing.length,missing,genericFallbacks:generic};
}
window.AcademyReferenceAudit=auditReferenceRegistry;
document.body.dataset.release='6.2';
migrateLegacyComparator();syncV62Title();secureExternalReferences();
window.addEventListener('academy:language',()=>{setTimeout(syncV62Title,0);requestAnimationFrame(secureExternalReferences);});

})();
