/* Product-level translations used by consolidated V6.3 features. */
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
    if(v5Messages[getLanguage()]?.[key]!=null) setSafeRichText(el,v5t(key));
  });
  document.querySelectorAll('[data-v5-i18n-placeholder]').forEach(el=>{
    const key=el.dataset.v5I18nPlaceholder;
    if(v5Messages[getLanguage()]?.[key]!=null) el.placeholder=v5t(key);
  });
}
applyV5Translations();
window.addEventListener('academy:language',()=>setTimeout(applyV5Translations,0));
