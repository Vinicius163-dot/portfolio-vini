export type Lang = "pt" | "en" | "es" | "fr" | "it";

export const DEFAULT_LANG: Lang = "pt";

export const LANGUAGES: { code: Lang; label: string }[] = [
  { code: "pt", label: "PT-BR" },
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
  { code: "fr", label: "FR" },
  { code: "it", label: "IT" },
];

export type Translation = {
  nav: { about: string; projects: string; skills: string; work: string; contacts: string };
  availability: { available: string; busy: string; unavailable: string };
  hero: {
    eyebrow: string;
    titleLines: [string, string];
    projectsBtn: string;
    projectsAria: string;
  };
  services: {
    annotation: string;
    subtitle: string;
    items: { title: string; description: string; tags: [string, string] }[];
  };
  about: {
    annotation: string;
    title: string;
    description: string;
    statLabels: [string, string, string];
  };
  skills: {
    annotation: string;
    title: string;
    tail: string;
    groupTitles: [string, string, string, string];
  };
  work: {
    annotation: string;
    title: string;
    totalLabel: string;
    totalValue: string;
    itemsExtras: { periodSub: string; role: string }[];
  };
  projects: {
    annotation: string;
    title: string;
    syncedWith: string;
    errorPrefix: string;
    errorSuffix: string;
    empty: string;
    noDescription: string;
    updatedPrefix: string;
    starsTitle: string;
    forksTitle: string;
  };
  contact: { annotation: string; title: string; description: string };
  cmdk: {
    placeholder: string;
    empty: string;
    navigate: string;
    actions: string;
    links: string;
    sendEmail: string;
    downloadCv: string;
    copyEmail: string;
    navHelp: string;
    selectHelp: string;
    closeHelp: string;
  };
  footer: { copyright: string; backToTop: string };
  header: { homeAria: string; cmdkAria: string; menuAria: string; langAria: string };
};

export const translations: Record<Lang, Translation> = {
  pt: {
    nav: { about: "Sobre", projects: "Projetos", skills: "Skills", work: "Carreira", contacts: "Contato" },
    availability: {
      available: "Disponível para projetos",
      busy: "Ocupado no momento",
      unavailable: "Indisponível",
    },
    hero: {
      eyebrow:
        "Meu objetivo é <em>escrever código limpo, confiável e fácil de manter</em>, que escala bem em produção.",
      titleLines: ["Software", "Engineer"],
      projectsBtn: "Projetos",
      projectsAria: "Ir para projetos",
    },
    services: {
      annotation: "... /serviços ...",
      subtitle: "Projetando e entregando produtos confiáveis, escaláveis e responsivos.",
      items: [
        {
          title: "Backend Engineering",
          description:
            "APIs e serviços confiáveis com arquitetura sólida, camadas de dados limpas e código manutenível no centro.",
          tags: ["REST & GraphQL", "Microsserviços"],
        },
        {
          title: "Frontend Development",
          description:
            "Interfaces responsivas com React, TypeScript e tooling moderno para experiências rápidas, consistentes e confiáveis.",
          tags: ["React & Next.js", "Design systems"],
        },
        {
          title: "Performance & Scale",
          description:
            "Produtos rápidos e mobile-first otimizados para velocidade, observabilidade e performance estável sob carga.",
          tags: ["Cache & filas", "Observabilidade"],
        },
        {
          title: "Cloud & DevOps",
          description:
            "Setups cloud-native com pipelines automatizadas, containerização e IaC para releases previsíveis e seguros.",
          tags: ["AWS & Docker", "Pipelines CI/CD"],
        },
      ],
    },
    about: {
      annotation: "... /Sobre mim ...",
      title:
        "Olá! Sou o Vinícius, <em>Software Engineer & Solutions Architect</em>. Mais de <em>5 anos</em> de experiência.",
      description:
        "Projeto e construo sistemas em produção de ponta a ponta, da arquitetura cloud à experiência frontend. Foco em entregar software confiável que escala — simples onde pode ser, robusto onde precisa ser.",
      statLabels: ["Anos de Experiência", "Projetos Entregues", "Clientes Atendidos"],
    },
    skills: {
      annotation: "... /skills ...",
      title: "Skills",
      tail: "Algumas das minhas <em>tecnologias, tópicos e ferramentas favoritas</em> que já trabalhei",
      groupTitles: ["Backend", "Frontend", "Cloud", "DevOps"],
    },
    work: {
      annotation: "... /carreira ...",
      title: "Carreira",
      totalLabel: "Total",
      totalValue: "5+ anos",
      itemsExtras: [
        { periodSub: "1 ano+", role: "Solutions Architect" },
        { periodSub: "2 anos", role: "Software Engineer" },
        { periodSub: "2 anos", role: "Backend Developer" },
        { periodSub: "1 ano", role: "Junior Developer" },
      ],
    },
    projects: {
      annotation: "... /projetos ...",
      title: "Projetos",
      syncedWith: "Sincronizado em tempo real com",
      errorPrefix: "Não consegui carregar os repositórios agora (",
      errorSuffix: "). Tenta recarregar mais tarde.",
      empty: "Nenhum repositório público encontrado ainda.",
      noDescription: "Sem descrição.",
      updatedPrefix: "Atualizado",
      starsTitle: "Estrelas",
      forksTitle: "Forks",
    },
    contact: {
      annotation: "... /contato ...",
      title: "Vamos <em>construir algo</em> juntos.",
      description:
        "Aberto a posições full-time e consultoria estratégica. Manda uma mensagem e a gente desenha o próximo produto.",
    },
    cmdk: {
      placeholder: "Buscar por seção, projeto ou ação...",
      empty: "Nenhum resultado encontrado.",
      navigate: "Navegar",
      actions: "Ações",
      links: "Links",
      sendEmail: "Enviar email",
      downloadCv: "Baixar CV",
      copyEmail: "Copiar email",
      navHelp: "↑↓ navegar",
      selectHelp: "↵ selecionar",
      closeHelp: "esc fechar",
    },
    footer: { copyright: "© 2026 Vinícius. Feito com carinho.", backToTop: "Voltar ao topo ↑" },
    header: {
      homeAria: "Início",
      cmdkAria: "Abrir command palette",
      menuAria: "Abrir navegação",
      langAria: "Selecionar idioma",
    },
  },

  en: {
    nav: { about: "About", projects: "Projects", skills: "Skills", work: "Work", contacts: "Contacts" },
    availability: {
      available: "Available for projects",
      busy: "Currently busy",
      unavailable: "Not available",
    },
    hero: {
      eyebrow:
        "My goal is to <em>write maintainable, clean and reliable code</em> that scales well in production.",
      titleLines: ["Software", "Engineer"],
      projectsBtn: "Projects",
      projectsAria: "Go to projects",
    },
    services: {
      annotation: "... /services ...",
      subtitle: "Designing and shipping reliable, scalable and responsive products.",
      items: [
        {
          title: "Backend Engineering",
          description:
            "Reliable APIs and services with strong architecture, clean data layers, and maintainable code at the core.",
          tags: ["REST & GraphQL", "Microservices"],
        },
        {
          title: "Frontend Development",
          description:
            "Responsive interfaces using React, TypeScript, and modern tooling for fast, consistent, reliable experiences.",
          tags: ["React & Next.js", "Design systems"],
        },
        {
          title: "Performance & Scale",
          description:
            "Fast, mobile-first products optimized for speed, observability, and dependable performance under load.",
          tags: ["Caching & queues", "Observability"],
        },
        {
          title: "Cloud & DevOps",
          description:
            "Cloud-native setups with automated pipelines, containerization, and IaC for predictable, safe releases.",
          tags: ["AWS & Docker", "CI/CD pipelines"],
        },
      ],
    },
    about: {
      annotation: "... /About me ...",
      title:
        "Hello! I'm Vinícius, a <em>Software Engineer & Solutions Architect</em>. More than <em>5 years</em> of experience.",
      description:
        "I design and build production systems end-to-end, from cloud architecture to frontend experience. I focus on shipping reliable software that scales — simple where it can be, robust where it has to be.",
      statLabels: ["Years Of Experience", "Projects Delivered", "Clients Served"],
    },
    skills: {
      annotation: "... /skills ...",
      title: "Skills",
      tail: "Some of my <em>favorite technologies, topics, or tools</em> that I worked with",
      groupTitles: ["Backend", "Frontend", "Cloud", "DevOps"],
    },
    work: {
      annotation: "... /work ...",
      title: "Work",
      totalLabel: "Total",
      totalValue: "5+ years",
      itemsExtras: [
        { periodSub: "1 year+", role: "Solutions Architect" },
        { periodSub: "2 years", role: "Software Engineer" },
        { periodSub: "2 years", role: "Backend Developer" },
        { periodSub: "1 year", role: "Junior Developer" },
      ],
    },
    projects: {
      annotation: "... /projects ...",
      title: "Projects",
      syncedWith: "Synced live with",
      errorPrefix: "Couldn't load repositories right now (",
      errorSuffix: "). Try reloading later.",
      empty: "No public repositories yet.",
      noDescription: "No description.",
      updatedPrefix: "Updated",
      starsTitle: "Stars",
      forksTitle: "Forks",
    },
    contact: {
      annotation: "... /contacts ...",
      title: "Let's <em>build something</em> together.",
      description:
        "Open to full-time roles and strategic consulting. Drop a line and let's map the next product.",
    },
    cmdk: {
      placeholder: "Search by section, project, or action...",
      empty: "No results found.",
      navigate: "Navigate",
      actions: "Actions",
      links: "Links",
      sendEmail: "Send email",
      downloadCv: "Download CV",
      copyEmail: "Copy email",
      navHelp: "↑↓ navigate",
      selectHelp: "↵ select",
      closeHelp: "esc close",
    },
    footer: { copyright: "© 2026 Vinícius. Built with care.", backToTop: "Back to top ↑" },
    header: {
      homeAria: "Home",
      cmdkAria: "Open command palette",
      menuAria: "Open navigation",
      langAria: "Select language",
    },
  },

  es: {
    nav: { about: "Sobre", projects: "Proyectos", skills: "Skills", work: "Trabajo", contacts: "Contacto" },
    availability: {
      available: "Disponible para proyectos",
      busy: "Ocupado actualmente",
      unavailable: "No disponible",
    },
    hero: {
      eyebrow:
        "Mi objetivo es <em>escribir código limpio, confiable y mantenible</em> que escala bien en producción.",
      titleLines: ["Software", "Engineer"],
      projectsBtn: "Proyectos",
      projectsAria: "Ir a proyectos",
    },
    services: {
      annotation: "... /servicios ...",
      subtitle: "Diseñando y entregando productos confiables, escalables y responsivos.",
      items: [
        {
          title: "Backend Engineering",
          description:
            "APIs y servicios confiables con arquitectura sólida, capas de datos limpias y código mantenible en el centro.",
          tags: ["REST & GraphQL", "Microservicios"],
        },
        {
          title: "Frontend Development",
          description:
            "Interfaces responsivas con React, TypeScript y herramientas modernas para experiencias rápidas, consistentes y confiables.",
          tags: ["React & Next.js", "Design systems"],
        },
        {
          title: "Performance & Scale",
          description:
            "Productos rápidos y mobile-first optimizados para velocidad, observabilidad y rendimiento estable bajo carga.",
          tags: ["Caché y colas", "Observabilidad"],
        },
        {
          title: "Cloud & DevOps",
          description:
            "Setups cloud-native con pipelines automatizadas, contenedorización e IaC para releases predecibles y seguros.",
          tags: ["AWS & Docker", "Pipelines CI/CD"],
        },
      ],
    },
    about: {
      annotation: "... /Sobre mí ...",
      title:
        "¡Hola! Soy Vinícius, <em>Software Engineer & Solutions Architect</em>. Más de <em>5 años</em> de experiencia.",
      description:
        "Diseño y construyo sistemas en producción de punta a punta, desde la arquitectura cloud hasta la experiencia frontend. Me enfoco en entregar software confiable que escala — simple cuando puede serlo, robusto cuando debe serlo.",
      statLabels: ["Años de Experiencia", "Proyectos Entregados", "Clientes Atendidos"],
    },
    skills: {
      annotation: "... /skills ...",
      title: "Skills",
      tail: "Algunas de mis <em>tecnologías, temas y herramientas favoritas</em> con las que he trabajado",
      groupTitles: ["Backend", "Frontend", "Cloud", "DevOps"],
    },
    work: {
      annotation: "... /trabajo ...",
      title: "Trabajo",
      totalLabel: "Total",
      totalValue: "5+ años",
      itemsExtras: [
        { periodSub: "1 año+", role: "Solutions Architect" },
        { periodSub: "2 años", role: "Software Engineer" },
        { periodSub: "2 años", role: "Backend Developer" },
        { periodSub: "1 año", role: "Junior Developer" },
      ],
    },
    projects: {
      annotation: "... /proyectos ...",
      title: "Proyectos",
      syncedWith: "Sincronizado en tiempo real con",
      errorPrefix: "No pude cargar los repositorios ahora (",
      errorSuffix: "). Intenta recargar más tarde.",
      empty: "Aún no hay repositorios públicos.",
      noDescription: "Sin descripción.",
      updatedPrefix: "Actualizado",
      starsTitle: "Estrellas",
      forksTitle: "Forks",
    },
    contact: {
      annotation: "... /contacto ...",
      title: "<em>Construyamos algo</em> juntos.",
      description:
        "Abierto a posiciones full-time y consultoría estratégica. Mándame un mensaje y diseñamos el próximo producto.",
    },
    cmdk: {
      placeholder: "Buscar por sección, proyecto o acción...",
      empty: "No se encontraron resultados.",
      navigate: "Navegar",
      actions: "Acciones",
      links: "Enlaces",
      sendEmail: "Enviar correo",
      downloadCv: "Descargar CV",
      copyEmail: "Copiar correo",
      navHelp: "↑↓ navegar",
      selectHelp: "↵ seleccionar",
      closeHelp: "esc cerrar",
    },
    footer: { copyright: "© 2026 Vinícius. Hecho con cariño.", backToTop: "Volver arriba ↑" },
    header: {
      homeAria: "Inicio",
      cmdkAria: "Abrir paleta de comandos",
      menuAria: "Abrir navegación",
      langAria: "Seleccionar idioma",
    },
  },

  fr: {
    nav: { about: "À propos", projects: "Projets", skills: "Skills", work: "Carrière", contacts: "Contact" },
    availability: {
      available: "Disponible pour des projets",
      busy: "Actuellement occupé",
      unavailable: "Indisponible",
    },
    hero: {
      eyebrow:
        "Mon objectif est <em>d'écrire du code propre, fiable et maintenable</em> qui scale bien en production.",
      titleLines: ["Software", "Engineer"],
      projectsBtn: "Projets",
      projectsAria: "Aller aux projets",
    },
    services: {
      annotation: "... /services ...",
      subtitle: "Concevoir et livrer des produits fiables, scalables et réactifs.",
      items: [
        {
          title: "Backend Engineering",
          description:
            "APIs et services fiables avec une architecture solide, des couches de données propres et du code maintenable au cœur.",
          tags: ["REST & GraphQL", "Microservices"],
        },
        {
          title: "Frontend Development",
          description:
            "Interfaces réactives avec React, TypeScript et un tooling moderne pour des expériences rapides, cohérentes et fiables.",
          tags: ["React & Next.js", "Design systems"],
        },
        {
          title: "Performance & Scale",
          description:
            "Produits rapides et mobile-first optimisés pour la vitesse, l'observabilité et une performance fiable sous charge.",
          tags: ["Cache & files", "Observabilité"],
        },
        {
          title: "Cloud & DevOps",
          description:
            "Setups cloud-native avec pipelines automatisées, conteneurisation et IaC pour des releases prévisibles et sûres.",
          tags: ["AWS & Docker", "Pipelines CI/CD"],
        },
      ],
    },
    about: {
      annotation: "... /À propos ...",
      title:
        "Salut ! Je suis Vinícius, <em>Software Engineer & Solutions Architect</em>. Plus de <em>5 ans</em> d'expérience.",
      description:
        "Je conçois et construis des systèmes en production de bout en bout, de l'architecture cloud à l'expérience frontend. Je me concentre sur la livraison de logiciels fiables qui scalent — simples quand ils peuvent l'être, robustes quand ils doivent l'être.",
      statLabels: ["Années d'Expérience", "Projets Livrés", "Clients Servis"],
    },
    skills: {
      annotation: "... /skills ...",
      title: "Skills",
      tail: "Quelques-unes de mes <em>technologies, sujets et outils favoris</em> avec lesquels j'ai travaillé",
      groupTitles: ["Backend", "Frontend", "Cloud", "DevOps"],
    },
    work: {
      annotation: "... /carrière ...",
      title: "Carrière",
      totalLabel: "Total",
      totalValue: "5+ ans",
      itemsExtras: [
        { periodSub: "1 an+", role: "Solutions Architect" },
        { periodSub: "2 ans", role: "Software Engineer" },
        { periodSub: "2 ans", role: "Backend Developer" },
        { periodSub: "1 an", role: "Junior Developer" },
      ],
    },
    projects: {
      annotation: "... /projets ...",
      title: "Projets",
      syncedWith: "Synchronisé en temps réel avec",
      errorPrefix: "Impossible de charger les dépôts maintenant (",
      errorSuffix: "). Essaie de recharger plus tard.",
      empty: "Aucun dépôt public pour le moment.",
      noDescription: "Pas de description.",
      updatedPrefix: "Mis à jour",
      starsTitle: "Étoiles",
      forksTitle: "Forks",
    },
    contact: {
      annotation: "... /contact ...",
      title: "<em>Construisons quelque chose</em> ensemble.",
      description:
        "Ouvert aux postes full-time et au conseil stratégique. Écris-moi et on dessine le prochain produit.",
    },
    cmdk: {
      placeholder: "Chercher par section, projet ou action...",
      empty: "Aucun résultat trouvé.",
      navigate: "Naviguer",
      actions: "Actions",
      links: "Liens",
      sendEmail: "Envoyer un email",
      downloadCv: "Télécharger le CV",
      copyEmail: "Copier l'email",
      navHelp: "↑↓ naviguer",
      selectHelp: "↵ sélectionner",
      closeHelp: "esc fermer",
    },
    footer: { copyright: "© 2026 Vinícius. Fait avec soin.", backToTop: "Retour en haut ↑" },
    header: {
      homeAria: "Accueil",
      cmdkAria: "Ouvrir la palette de commandes",
      menuAria: "Ouvrir la navigation",
      langAria: "Sélectionner la langue",
    },
  },

  it: {
    nav: { about: "Chi sono", projects: "Progetti", skills: "Skills", work: "Carriera", contacts: "Contatti" },
    availability: {
      available: "Disponibile per progetti",
      busy: "Occupato al momento",
      unavailable: "Non disponibile",
    },
    hero: {
      eyebrow:
        "Il mio obiettivo è <em>scrivere codice pulito, affidabile e manutenibile</em> che scala bene in produzione.",
      titleLines: ["Software", "Engineer"],
      projectsBtn: "Progetti",
      projectsAria: "Vai ai progetti",
    },
    services: {
      annotation: "... /servizi ...",
      subtitle: "Progettare e rilasciare prodotti affidabili, scalabili e responsive.",
      items: [
        {
          title: "Backend Engineering",
          description:
            "API e servizi affidabili con architettura solida, data layer puliti e codice manutenibile al centro.",
          tags: ["REST & GraphQL", "Microservizi"],
        },
        {
          title: "Frontend Development",
          description:
            "Interfacce responsive con React, TypeScript e tooling moderno per esperienze veloci, coerenti e affidabili.",
          tags: ["React & Next.js", "Design systems"],
        },
        {
          title: "Performance & Scale",
          description:
            "Prodotti veloci e mobile-first ottimizzati per velocità, osservabilità e prestazioni affidabili sotto carico.",
          tags: ["Cache & code", "Osservabilità"],
        },
        {
          title: "Cloud & DevOps",
          description:
            "Setup cloud-native con pipeline automatizzate, containerizzazione e IaC per rilasci prevedibili e sicuri.",
          tags: ["AWS & Docker", "Pipeline CI/CD"],
        },
      ],
    },
    about: {
      annotation: "... /Chi sono ...",
      title:
        "Ciao! Sono Vinícius, <em>Software Engineer & Solutions Architect</em>. Più di <em>5 anni</em> di esperienza.",
      description:
        "Progetto e costruisco sistemi in produzione end-to-end, dall'architettura cloud all'esperienza frontend. Mi concentro sul rilascio di software affidabile che scala — semplice dove può esserlo, robusto dove deve esserlo.",
      statLabels: ["Anni di Esperienza", "Progetti Consegnati", "Clienti Serviti"],
    },
    skills: {
      annotation: "... /skills ...",
      title: "Skills",
      tail: "Alcune delle mie <em>tecnologie, argomenti e strumenti preferiti</em> con cui ho lavorato",
      groupTitles: ["Backend", "Frontend", "Cloud", "DevOps"],
    },
    work: {
      annotation: "... /carriera ...",
      title: "Carriera",
      totalLabel: "Totale",
      totalValue: "5+ anni",
      itemsExtras: [
        { periodSub: "1 anno+", role: "Solutions Architect" },
        { periodSub: "2 anni", role: "Software Engineer" },
        { periodSub: "2 anni", role: "Backend Developer" },
        { periodSub: "1 anno", role: "Junior Developer" },
      ],
    },
    projects: {
      annotation: "... /progetti ...",
      title: "Progetti",
      syncedWith: "Sincronizzato in tempo reale con",
      errorPrefix: "Non sono riuscito a caricare i repository ora (",
      errorSuffix: "). Riprova più tardi.",
      empty: "Ancora nessun repository pubblico.",
      noDescription: "Nessuna descrizione.",
      updatedPrefix: "Aggiornato",
      starsTitle: "Stelle",
      forksTitle: "Fork",
    },
    contact: {
      annotation: "... /contatti ...",
      title: "<em>Costruiamo qualcosa</em> insieme.",
      description:
        "Aperto a ruoli full-time e consulenza strategica. Mandami un messaggio e progettiamo il prossimo prodotto.",
    },
    cmdk: {
      placeholder: "Cerca per sezione, progetto o azione...",
      empty: "Nessun risultato trovato.",
      navigate: "Naviga",
      actions: "Azioni",
      links: "Link",
      sendEmail: "Invia email",
      downloadCv: "Scarica CV",
      copyEmail: "Copia email",
      navHelp: "↑↓ naviga",
      selectHelp: "↵ seleziona",
      closeHelp: "esc chiudi",
    },
    footer: { copyright: "© 2026 Vinícius. Fatto con cura.", backToTop: "Torna su ↑" },
    header: {
      homeAria: "Inizio",
      cmdkAria: "Apri palette comandi",
      menuAria: "Apri navigazione",
      langAria: "Seleziona lingua",
    },
  },
};
