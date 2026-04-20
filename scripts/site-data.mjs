// Replace the placeholder domain, support email, legal URLs, and App Store values
// before shipping so canonical tags, sitemap URLs, and the Apple smart banner
// point at the production destination.
export const siteConfig = {
  brandName: 'Fit3',
  defaultLocale: 'en',
  siteUrl: 'https://example.com',
  supportEmail: 'support@example.com',
  legal: {
    privacyUrl: '#',
    termsUrl: '#',
    contactUrl: 'mailto:support@example.com',
  },
  app: {
    appStoreId: '',
    appStoreUrl: '#',
    appArgument: '',
    iosAppStoreBadgeLabel: 'Download on the App Store',
  },
  seo: {
    ogImagePath: '/images/hero-bg.png',
    keywords: {
      en: 'fitness app, workout planner, nutrition tracker, personal trainer app, Apple Watch fitness, AI fitness coach',
      es: 'app fitness, planificador de entrenamientos, nutricion, entrenador personal, Apple Watch fitness, coach fitness con IA',
      fr: 'application fitness, programme entrainement, suivi nutrition, coach sportif, Apple Watch fitness, coach fitness IA',
      it: 'app fitness, programma allenamento, tracker nutrizione, personal trainer, Apple Watch fitness, coach fitness IA',
      de: 'fitness app, trainingsplaner, ernahrungstracker, personal trainer app, Apple Watch fitness, KI fitness coach',
      pt: 'app fitness, plano de treino, acompanhamento nutricional, personal trainer, Apple Watch fitness, coach fitness com IA',
      zh: '健身应用, 训练计划, 营养追踪, 私人教练应用, Apple Watch 健身, AI 健身教练',
    },
  },
};

const sharedStats = [
  { target: 1300, suffix: '+', label: { en: 'Exercises', es: 'Ejercicios', fr: 'Exercices', it: 'Esercizi', de: 'Ubungen', pt: 'Exercicios', zh: '动作' } },
  { target: 50, suffix: '+', label: { en: 'Workout Templates', es: 'Plantillas', fr: 'Programmes', it: 'Schede', de: 'Vorlagen', pt: 'Modelos', zh: '训练模板' } },
  { target: 5, suffix: '', label: { en: 'Star Rating', es: 'Puntuacion', fr: 'Note', it: 'Valutazione', de: 'Sterne', pt: 'Avaliacao', zh: '星级评分' } },
];

const sharedScreenshots = {
  workout: '/images/screenshot-workout-tracker.jpg',
  planner: '/images/screenshot-planner.jpg',
  nutrition: '/images/screenshot-nutrition.png',
  goals: '/images/screenshot-goals.jpg',
};

export const locales = {
  en: {
    code: 'en',
    localeTag: 'en_US',
    lang: 'en',
    path: '/',
    label: 'English',
    nativeLabel: 'English',
    dir: 'ltr',
    title: 'Fit3 — Your AI Personal Fitness Coach',
    description:
      'Fit3 is your all-in-one personal fitness coach with AI workout plans, nutrition tracking, progress analytics, and Apple Watch integration.',
    nav: {
      features: 'Features',
      howItWorks: 'How It Works',
      benefits: 'Benefits',
      download: 'Download Free',
      languageLabel: 'Language',
    },
    hero: {
      badge: 'Reach your goal in 3 months',
      titleTop: 'Your Personal',
      titleAccent: 'Fitness Coach',
      subtitle:
        'Personalized workout programs, intelligent nutrition tracking, and real-time progress analytics tailored to your body, goals, and equipment.',
      cta: 'Download on App Store',
    },
    sections: {
      featuresTag: 'Features',
      featuresTitle: 'Everything You Need to',
      featuresAccent: 'Transform',
      featuresSubtitle: 'Four powerful modules working together to build your best body.',
      howTag: 'How It Works',
      howTitle: 'Start in',
      howAccent: '3 Simple Steps',
      howSubtitle: 'From download to your first workout in minutes.',
      benefitsTag: 'Why Fit3',
      benefitsTitle: 'Built for',
      benefitsAccent: 'Real Results',
      benefitsSubtitle: 'Every feature is designed to remove guesswork from your fitness journey.',
      ctaTitle: 'Ready to Transform Your Body?',
      ctaSubtitle:
        "Join thousands who have already started their fitness journey with Fit3. Download for free and get your AI-powered plan today.",
      ctaNote: 'Free to download • No credit card required',
    },
    features: [
      {
        icon: '🏋️',
        title: 'Workout Tracker',
        description:
          'Real-time session tracking with exercise demos, set and rep logging, tempo control, and rest timers.',
        image: sharedScreenshots.workout,
        alt: 'Fit3 workout tracker showing sets, reps, and weight logging',
      },
      {
        icon: '📋',
        title: 'Workout Planner',
        description:
          'Personalized multi-week programs tailored to your goals, experience, and available equipment.',
        image: sharedScreenshots.planner,
        alt: 'Fit3 workout planner showing a personalized weekly training program',
      },
      {
        icon: '🥗',
        title: 'Nutrition Tracker',
        description:
          'Daily meal planning with calorie and macro tracking for each ingredient, all aligned with your goals.',
        image: sharedScreenshots.nutrition,
        alt: 'Fit3 nutrition tracker showing meal plans and calorie tracking',
      },
      {
        icon: '🎯',
        title: 'Goal Tracking',
        description:
          'Track body composition, strength gains, and long-term progress with clear weekly insights.',
        image: sharedScreenshots.goals,
        alt: 'Fit3 goal tracking screen showing body transformation progress',
      },
    ],
    steps: [
      {
        number: '01',
        icon: '🎯',
        title: 'Set Your Goals',
        description:
          'Tell Fit3 about your goals, body profile, experience, and equipment so the plan starts from your reality.',
      },
      {
        number: '02',
        icon: '⚡',
        title: 'Get Your Plan',
        description:
          'Receive a personalized workout program and nutrition plan calibrated to your body and lifestyle.',
      },
      {
        number: '03',
        icon: '📈',
        title: 'Track & Transform',
        description:
          'Log workouts and meals, then watch your progress through analytics, streaks, and performance trends.',
      },
    ],
    benefits: [
      ['🤖', 'AI Personalization', 'Plans adapt to your body type, goals, equipment, and experience level.'],
      ['🎬', 'Exercise Demos', 'Animated demonstrations and step-by-step guidance for every exercise.'],
      ['🍎', 'Smart Nutrition', 'Meal planning with calories and macros based on your dietary preferences.'],
      ['⌚', 'Apple Watch', 'Track workouts from your wrist with heart rate, calories, and live training data.'],
      ['📊', 'Progress Analytics', 'Charts for strength, body metrics, streaks, and training consistency.'],
      ['❤️', 'HealthKit Sync', 'Keep your fitness data aligned across iPhone, Apple Watch, and Apple Health.'],
    ],
    footer: {
      privacy: 'Privacy Policy',
      terms: 'Terms of Use',
      contact: 'Contact',
      copyright: '© 2026 Fit3. All rights reserved.',
    },
    schema: {
      appCategory: 'HealthApplication',
      operatingSystem: 'iOS, macOS, watchOS',
    },
  },
  es: {
    code: 'es',
    localeTag: 'es_ES',
    lang: 'es',
    path: '/es/',
    label: 'Spanish',
    nativeLabel: 'Español',
    dir: 'ltr',
    title: 'Fit3 — Tu entrenador personal de fitness con IA',
    description:
      'Fit3 es tu entrenador personal de fitness todo en uno con planes de entrenamiento con IA, seguimiento nutricional, analitica de progreso e integracion con Apple Watch.',
    nav: {
      features: 'Funciones',
      howItWorks: 'Como funciona',
      benefits: 'Ventajas',
      download: 'Descargar gratis',
      languageLabel: 'Idioma',
    },
    hero: {
      badge: 'Alcanza tu objetivo en 3 meses',
      titleTop: 'Tu entrenador',
      titleAccent: 'de fitness',
      subtitle:
        'Programas de entrenamiento personalizados, seguimiento nutricional inteligente y analitica en tiempo real adaptados a tu cuerpo, metas y equipo.',
      cta: 'Descargar en App Store',
    },
    sections: {
      featuresTag: 'Funciones',
      featuresTitle: 'Todo lo que necesitas para',
      featuresAccent: 'transformarte',
      featuresSubtitle: 'Cuatro modulos potentes trabajando juntos para ayudarte a progresar.',
      howTag: 'Como funciona',
      howTitle: 'Empieza en',
      howAccent: '3 pasos simples',
      howSubtitle: 'Desde la descarga hasta tu primera sesion en minutos.',
      benefitsTag: 'Por que Fit3',
      benefitsTitle: 'Disenado para',
      benefitsAccent: 'resultados reales',
      benefitsSubtitle: 'Cada funcion esta pensada para eliminar las dudas de tu camino fitness.',
      ctaTitle: 'Listo para transformar tu cuerpo?',
      ctaSubtitle:
        'Unete a miles de personas que ya empezaron su camino fitness con Fit3. Descargala gratis y consigue tu plan con IA hoy.',
      ctaNote: 'Descarga gratis • Sin tarjeta de credito',
    },
    features: [
      {
        icon: '🏋️',
        title: 'Seguimiento de entrenos',
        description:
          'Registro en tiempo real con demostraciones, series y repeticiones, control de tempo y descansos.',
        image: sharedScreenshots.workout,
        alt: 'Pantalla de Fit3 para registrar series, repeticiones y peso',
      },
      {
        icon: '📋',
        title: 'Planificador de entrenos',
        description:
          'Programas de varias semanas adaptados a tus objetivos, experiencia y material disponible.',
        image: sharedScreenshots.planner,
        alt: 'Plan de entrenamiento semanal personalizado en Fit3',
      },
      {
        icon: '🥗',
        title: 'Seguimiento nutricional',
        description:
          'Planificacion diaria de comidas con calorias y macros por ingrediente, alineada con tus metas.',
        image: sharedScreenshots.nutrition,
        alt: 'Plan de comidas y seguimiento de calorias en Fit3',
      },
      {
        icon: '🎯',
        title: 'Seguimiento de objetivos',
        description:
          'Controla composicion corporal, fuerza y progreso semanal con datos faciles de entender.',
        image: sharedScreenshots.goals,
        alt: 'Pantalla de progreso y transformacion corporal en Fit3',
      },
    ],
    steps: [
      {
        number: '01',
        icon: '🎯',
        title: 'Define tus metas',
        description:
          'Cuéntale a Fit3 tus objetivos, perfil corporal, experiencia y equipo para empezar desde tu contexto real.',
      },
      {
        number: '02',
        icon: '⚡',
        title: 'Recibe tu plan',
        description:
          'Obtén un programa de entrenamiento y nutrición personalizado para tu cuerpo y tu estilo de vida.',
      },
      {
        number: '03',
        icon: '📈',
        title: 'Sigue y mejora',
        description:
          'Registra entrenos y comidas y visualiza tu avance con analítica, rachas y tendencias.',
      },
    ],
    benefits: [
      ['🤖', 'Personalizacion con IA', 'Los planes se adaptan a tu cuerpo, metas, equipo y experiencia.'],
      ['🎬', 'Demostraciones', 'Guias animadas y explicaciones paso a paso para cada ejercicio.'],
      ['🍎', 'Nutricion inteligente', 'Comidas con calorias y macros segun tus preferencias alimentarias.'],
      ['⌚', 'Apple Watch', 'Entrena desde tu muñeca con pulso, calorias y datos en tiempo real.'],
      ['📊', 'Analitica de progreso', 'Graficos de fuerza, medidas, rachas y constancia.'],
      ['❤️', 'Sincronizacion con HealthKit', 'Tus datos de salud y fitness unidos entre iPhone y Apple Watch.'],
    ],
    footer: {
      privacy: 'Politica de privacidad',
      terms: 'Condiciones de uso',
      contact: 'Contacto',
      copyright: '© 2026 Fit3. Todos los derechos reservados.',
    },
    schema: {
      appCategory: 'HealthApplication',
      operatingSystem: 'iOS, macOS, watchOS',
    },
  },
  fr: {
    code: 'fr',
    localeTag: 'fr_FR',
    lang: 'fr',
    path: '/fr/',
    label: 'French',
    nativeLabel: 'Français',
    dir: 'ltr',
    title: 'Fit3 — Votre coach fitness personnel avec IA',
    description:
      'Fit3 est votre coach fitness tout-en-un avec programmes IA, suivi nutritionnel, analyses de progression et integration Apple Watch.',
    nav: {
      features: 'Fonctionnalites',
      howItWorks: 'Comment ca marche',
      benefits: 'Avantages',
      download: 'Telecharger',
      languageLabel: 'Langue',
    },
    hero: {
      badge: 'Atteignez votre objectif en 3 mois',
      titleTop: 'Votre coach',
      titleAccent: 'fitness personnel',
      subtitle:
        'Des programmes personnalises, un suivi nutritionnel intelligent et des analyses en temps reel adaptes a votre corps, vos objectifs et votre materiel.',
      cta: "Telecharger sur l'App Store",
    },
    sections: {
      featuresTag: 'Fonctionnalites',
      featuresTitle: 'Tout ce qu il vous faut pour',
      featuresAccent: 'progresser',
      featuresSubtitle: 'Quatre modules puissants pour construire votre meilleure routine.',
      howTag: 'Comment ca marche',
      howTitle: 'Commencez en',
      howAccent: '3 etapes simples',
      howSubtitle: 'Du telechargement a votre premiere seance en quelques minutes.',
      benefitsTag: 'Pourquoi Fit3',
      benefitsTitle: 'Concu pour',
      benefitsAccent: 'des resultats concrets',
      benefitsSubtitle: 'Chaque fonctionnalite est pensee pour enlever le doute de votre progression.',
      ctaTitle: 'Pret a transformer votre corps ?',
      ctaSubtitle:
        'Rejoignez des milliers de personnes qui ont deja commence leur parcours fitness avec Fit3. Telechargez gratuitement et recevez votre plan IA.',
      ctaNote: 'Telechargement gratuit • Sans carte bancaire',
    },
    features: [
      {
        icon: '🏋️',
        title: 'Suivi des seances',
        description:
          'Suivi en temps reel avec demos, journal des series et repetitions, tempo et temps de repos.',
        image: sharedScreenshots.workout,
        alt: 'Suivi des exercices Fit3 avec charges, series et repetitions',
      },
      {
        icon: '📋',
        title: 'Planification entrainement',
        description:
          'Programmes sur plusieurs semaines adaptes a vos objectifs, votre niveau et votre equipement.',
        image: sharedScreenshots.planner,
        alt: 'Programme hebdomadaire personnalise dans Fit3',
      },
      {
        icon: '🥗',
        title: 'Suivi nutritionnel',
        description:
          'Planification quotidienne des repas avec calories et macros par ingredient.',
        image: sharedScreenshots.nutrition,
        alt: 'Suivi nutritionnel Fit3 avec repas et calories',
      },
      {
        icon: '🎯',
        title: 'Suivi des objectifs',
        description:
          'Suivez la composition corporelle, la force et les progres a long terme avec des insights clairs.',
        image: sharedScreenshots.goals,
        alt: 'Ecran de progression physique et objectifs dans Fit3',
      },
    ],
    steps: [
      {
        number: '01',
        icon: '🎯',
        title: 'Definissez vos objectifs',
        description:
          'Indiquez vos objectifs, votre profil, votre niveau et votre materiel pour partir de votre situation reelle.',
      },
      {
        number: '02',
        icon: '⚡',
        title: 'Recevez votre plan',
        description:
          'Obtenez un programme d entrainement et de nutrition personnalise pour votre corps et votre mode de vie.',
      },
      {
        number: '03',
        icon: '📈',
        title: 'Suivez et transformez',
        description:
          'Enregistrez vos seances et vos repas puis visualisez votre progression avec analyses et tendances.',
      },
    ],
    benefits: [
      ['🤖', 'Personnalisation IA', 'Les plans s adaptent a votre corps, vos objectifs, votre materiel et votre niveau.'],
      ['🎬', 'Demos exercice', 'Animations et explications pas a pas pour chaque mouvement.'],
      ['🍎', 'Nutrition intelligente', 'Repas, calories et macros selon vos preferences alimentaires.'],
      ['⌚', 'Apple Watch', 'Suivez vos entrainements au poignet avec frequence cardiaque et calories.'],
      ['📊', 'Analyses de progression', 'Graphiques pour la force, les mesures, les series et la regularite.'],
      ['❤️', 'Synchronisation HealthKit', 'Vos donnees fitness reunies entre iPhone, Apple Watch et Apple Health.'],
    ],
    footer: {
      privacy: 'Confidentialite',
      terms: 'Conditions d utilisation',
      contact: 'Contact',
      copyright: '© 2026 Fit3. Tous droits reserves.',
    },
    schema: {
      appCategory: 'HealthApplication',
      operatingSystem: 'iOS, macOS, watchOS',
    },
  },
  it: {
    code: 'it',
    localeTag: 'it_IT',
    lang: 'it',
    path: '/it/',
    label: 'Italian',
    nativeLabel: 'Italiano',
    dir: 'ltr',
    title: 'Fit3 — Il tuo personal fitness coach con IA',
    description:
      'Fit3 e il tuo fitness coach all-in-one con programmi IA, tracking nutrizionale, analisi dei progressi e integrazione Apple Watch.',
    nav: {
      features: 'Funzioni',
      howItWorks: 'Come funziona',
      benefits: 'Vantaggi',
      download: 'Scarica gratis',
      languageLabel: 'Lingua',
    },
    hero: {
      badge: 'Raggiungi il tuo obiettivo in 3 mesi',
      titleTop: 'Il tuo coach',
      titleAccent: 'fitness personale',
      subtitle:
        'Programmi di allenamento personalizzati, tracking nutrizionale intelligente e analisi in tempo reale adattati al tuo corpo, ai tuoi obiettivi e alla tua attrezzatura.',
      cta: 'Scarica su App Store',
    },
    sections: {
      featuresTag: 'Funzioni',
      featuresTitle: 'Tutto cio che ti serve per',
      featuresAccent: 'migliorare',
      featuresSubtitle: 'Quattro moduli potenti che lavorano insieme per costruire il tuo percorso.',
      howTag: 'Come funziona',
      howTitle: 'Inizia in',
      howAccent: '3 semplici passi',
      howSubtitle: 'Dal download al primo allenamento in pochi minuti.',
      benefitsTag: 'Perche Fit3',
      benefitsTitle: 'Pensato per',
      benefitsAccent: 'risultati reali',
      benefitsSubtitle: 'Ogni funzione e progettata per togliere incertezza dal tuo percorso fitness.',
      ctaTitle: 'Pronto a trasformare il tuo corpo?',
      ctaSubtitle:
        'Unisciti a migliaia di persone che hanno gia iniziato il loro percorso con Fit3. Scarica gratis e ottieni il tuo piano con IA.',
      ctaNote: 'Download gratuito • Nessuna carta richiesta',
    },
    features: [
      {
        icon: '🏋️',
        title: 'Tracker allenamenti',
        description:
          'Monitoraggio in tempo reale con demo esercizi, serie, ripetizioni, tempo di esecuzione e recuperi.',
        image: sharedScreenshots.workout,
        alt: 'Tracker allenamenti Fit3 con serie, ripetizioni e carichi',
      },
      {
        icon: '📋',
        title: 'Pianificatore allenamenti',
        description:
          'Programmi personalizzati di piu settimane in base a obiettivi, esperienza e attrezzatura.',
        image: sharedScreenshots.planner,
        alt: 'Programma settimanale personalizzato in Fit3',
      },
      {
        icon: '🥗',
        title: 'Tracker nutrizione',
        description:
          'Pianificazione giornaliera dei pasti con calorie e macro per ingrediente, in linea con i tuoi obiettivi.',
        image: sharedScreenshots.nutrition,
        alt: 'Tracking nutrizionale Fit3 con pasti e calorie',
      },
      {
        icon: '🎯',
        title: 'Obiettivi e progressi',
        description:
          'Tieni sotto controllo composizione corporea, forza e progresso nel tempo con dati chiari.',
        image: sharedScreenshots.goals,
        alt: 'Schermata progressi e trasformazione corporea in Fit3',
      },
    ],
    steps: [
      {
        number: '01',
        icon: '🎯',
        title: 'Imposta i tuoi obiettivi',
        description:
          'Racconta a Fit3 obiettivi, profilo fisico, esperienza e attrezzatura per partire dal tuo contesto reale.',
      },
      {
        number: '02',
        icon: '⚡',
        title: 'Ricevi il tuo piano',
        description:
          'Ottieni un programma di allenamento e nutrizione personalizzato sul tuo corpo e sul tuo stile di vita.',
      },
      {
        number: '03',
        icon: '📈',
        title: 'Monitora e trasforma',
        description:
          'Registra allenamenti e pasti e osserva i progressi con analisi, streak e trend.',
      },
    ],
    benefits: [
      ['🤖', 'Personalizzazione IA', 'I piani si adattano al tuo corpo, ai tuoi obiettivi, alla tua esperienza e alla tua attrezzatura.'],
      ['🎬', 'Demo esercizi', 'Animazioni e istruzioni passo passo per ogni esercizio.'],
      ['🍎', 'Nutrizione intelligente', 'Pasti, calorie e macro in base alle tue preferenze alimentari.'],
      ['⌚', 'Apple Watch', 'Monitora gli allenamenti dal polso con frequenza cardiaca e calorie.'],
      ['📊', 'Analisi dei progressi', 'Grafici su forza, metriche corporee, costanza e andamento.'],
      ['❤️', 'Sync con HealthKit', 'Dati fitness sincronizzati tra iPhone, Apple Watch e Apple Health.'],
    ],
    footer: {
      privacy: 'Privacy',
      terms: 'Termini di utilizzo',
      contact: 'Contatti',
      copyright: '© 2026 Fit3. Tutti i diritti riservati.',
    },
    schema: {
      appCategory: 'HealthApplication',
      operatingSystem: 'iOS, macOS, watchOS',
    },
  },
  de: {
    code: 'de',
    localeTag: 'de_DE',
    lang: 'de',
    path: '/de/',
    label: 'German',
    nativeLabel: 'Deutsch',
    dir: 'ltr',
    title: 'Fit3 — Dein persoenlicher Fitness Coach mit KI',
    description:
      'Fit3 ist dein All-in-one Fitness Coach mit KI-Trainingsplaenen, Ernaehrungstracking, Fortschrittsanalysen und Apple Watch Integration.',
    nav: {
      features: 'Funktionen',
      howItWorks: 'So funktioniert es',
      benefits: 'Vorteile',
      download: 'Kostenlos laden',
      languageLabel: 'Sprache',
    },
    hero: {
      badge: 'Erreiche dein Ziel in 3 Monaten',
      titleTop: 'Dein persoenlicher',
      titleAccent: 'Fitness Coach',
      subtitle:
        'Personalisierte Trainingsplaene, intelligentes Ernaehrungstracking und Echtzeit-Analysen passend zu deinem Koerper, deinen Zielen und deinem Equipment.',
      cta: 'Im App Store laden',
    },
    sections: {
      featuresTag: 'Funktionen',
      featuresTitle: 'Alles, was du brauchst, um dich zu',
      featuresAccent: 'verbessern',
      featuresSubtitle: 'Vier starke Module, die gemeinsam deinen Fortschritt aufbauen.',
      howTag: 'So funktioniert es',
      howTitle: 'Starte in',
      howAccent: '3 einfachen Schritten',
      howSubtitle: 'Vom Download bis zum ersten Workout in wenigen Minuten.',
      benefitsTag: 'Warum Fit3',
      benefitsTitle: 'Gemacht fuer',
      benefitsAccent: 'echte Resultate',
      benefitsSubtitle: 'Jede Funktion wurde entwickelt, um Unsicherheit aus deiner Fitnessroutine zu nehmen.',
      ctaTitle: 'Bereit, deinen Koerper zu veraendern?',
      ctaSubtitle:
        'Schliesse dich Tausenden an, die ihre Fitnessreise mit Fit3 bereits begonnen haben. Kostenlos herunterladen und deinen KI-Plan erhalten.',
      ctaNote: 'Kostenloser Download • Keine Kreditkarte noetig',
    },
    features: [
      {
        icon: '🏋️',
        title: 'Workout Tracker',
        description:
          'Training in Echtzeit verfolgen mit Uebungen, Satz- und Wiederholungsprotokoll, Tempo und Pausenzeiten.',
        image: sharedScreenshots.workout,
        alt: 'Fit3 Workout Tracker mit Saetzen, Wiederholungen und Gewichten',
      },
      {
        icon: '📋',
        title: 'Trainingsplaner',
        description:
          'Personalisierte Mehrwochenplaene passend zu deinen Zielen, deinem Level und deinem Equipment.',
        image: sharedScreenshots.planner,
        alt: 'Personalisierter Wochenplan im Fit3 Trainingsplaner',
      },
      {
        icon: '🥗',
        title: 'Ernaehrungstracking',
        description:
          'Taegliche Mahlzeitenplanung mit Kalorien und Makros pro Zutat, abgestimmt auf dein Ziel.',
        image: sharedScreenshots.nutrition,
        alt: 'Fit3 Ernaehrungstracker mit Mahlzeiten und Kalorien',
      },
      {
        icon: '🎯',
        title: 'Ziele & Fortschritt',
        description:
          'Behalte Koerperwerte, Kraftzuwachs und langfristige Entwicklung mit klaren Insights im Blick.',
        image: sharedScreenshots.goals,
        alt: 'Fit3 Ansicht fuer Koerperveraenderung und Fortschritt',
      },
    ],
    steps: [
      {
        number: '01',
        icon: '🎯',
        title: 'Setze deine Ziele',
        description:
          'Teile Fit3 deine Ziele, deinen Koerperstatus, dein Level und dein Equipment mit.',
      },
      {
        number: '02',
        icon: '⚡',
        title: 'Erhalte deinen Plan',
        description:
          'Bekomme einen personalisierten Trainings- und Ernaehrungsplan fuer deinen Alltag und deinen Koerper.',
      },
      {
        number: '03',
        icon: '📈',
        title: 'Tracke & verwandle dich',
        description:
          'Protokolliere Workouts und Mahlzeiten und verfolge deine Entwicklung mit Analysen und Trends.',
      },
    ],
    benefits: [
      ['🤖', 'KI-Personalisierung', 'Plaene passen sich deinem Koerper, deinen Zielen, deinem Level und deinem Equipment an.'],
      ['🎬', 'Uebungsdemos', 'Animierte Erklaerungen und Schritt-fuer-Schritt Anleitungen fuer jede Uebung.'],
      ['🍎', 'Smarte Ernaehrung', 'Mahlzeiten, Kalorien und Makros passend zu deinen Ernaehrungsvorlieben.'],
      ['⌚', 'Apple Watch', 'Workouts direkt am Handgelenk mit Herzfrequenz, Kalorien und Live-Daten tracken.'],
      ['📊', 'Fortschrittsanalyse', 'Diagramme fuer Kraft, Koerperwerte, Serien und Trainingskonstanz.'],
      ['❤️', 'HealthKit Sync', 'Deine Gesundheits- und Fitnessdaten bleiben ueber iPhone und Apple Watch synchron.'],
    ],
    footer: {
      privacy: 'Datenschutz',
      terms: 'Nutzungsbedingungen',
      contact: 'Kontakt',
      copyright: '© 2026 Fit3. Alle Rechte vorbehalten.',
    },
    schema: {
      appCategory: 'HealthApplication',
      operatingSystem: 'iOS, macOS, watchOS',
    },
  },
  pt: {
    code: 'pt',
    localeTag: 'pt_PT',
    lang: 'pt',
    path: '/pt/',
    label: 'Portuguese',
    nativeLabel: 'Português',
    dir: 'ltr',
    title: 'Fit3 — O teu personal trainer com IA',
    description:
      'A Fit3 é o teu coach de fitness tudo-em-um com planos de treino por IA, acompanhamento nutricional, analise de progresso e integracao com Apple Watch.',
    nav: {
      features: 'Funcionalidades',
      howItWorks: 'Como funciona',
      benefits: 'Vantagens',
      download: 'Descarregar gratis',
      languageLabel: 'Idioma',
    },
    hero: {
      badge: 'Atinge o teu objetivo em 3 meses',
      titleTop: 'O teu coach',
      titleAccent: 'de fitness',
      subtitle:
        'Planos de treino personalizados, acompanhamento nutricional inteligente e analise em tempo real adaptados ao teu corpo, objetivos e equipamento.',
      cta: 'Descarregar na App Store',
    },
    sections: {
      featuresTag: 'Funcionalidades',
      featuresTitle: 'Tudo o que precisas para',
      featuresAccent: 'evoluir',
      featuresSubtitle: 'Quatro modulos poderosos a trabalhar em conjunto para melhorar o teu percurso.',
      howTag: 'Como funciona',
      howTitle: 'Comeca em',
      howAccent: '3 passos simples',
      howSubtitle: 'Do download ao primeiro treino em poucos minutos.',
      benefitsTag: 'Porque Fit3',
      benefitsTitle: 'Criada para',
      benefitsAccent: 'resultados reais',
      benefitsSubtitle: 'Cada funcionalidade foi pensada para remover a indecisao do teu percurso fitness.',
      ctaTitle: 'Pronto para transformar o teu corpo?',
      ctaSubtitle:
        'Junta-te a milhares de pessoas que ja comecaram a sua jornada com a Fit3. Descarrega gratis e recebe hoje o teu plano com IA.',
      ctaNote: 'Descarregamento gratuito • Sem cartao de credito',
    },
    features: [
      {
        icon: '🏋️',
        title: 'Registo de treinos',
        description:
          'Acompanha cada sessao em tempo real com demonstracoes, series, repeticoes, controlo de ritmo e descansos.',
        image: sharedScreenshots.workout,
        alt: 'Registo de treino da Fit3 com series, repeticoes e carga',
      },
      {
        icon: '📋',
        title: 'Planeador de treinos',
        description:
          'Programas personalizados de varias semanas adaptados aos teus objetivos, experiencia e equipamento.',
        image: sharedScreenshots.planner,
        alt: 'Plano semanal personalizado no planeador de treinos da Fit3',
      },
      {
        icon: '🥗',
        title: 'Acompanhamento nutricional',
        description:
          'Planeamento diario de refeicoes com calorias e macros por ingrediente, alinhado com as tuas metas.',
        image: sharedScreenshots.nutrition,
        alt: 'Acompanhamento nutricional da Fit3 com refeicoes e calorias',
      },
      {
        icon: '🎯',
        title: 'Objetivos e progresso',
        description:
          'Segue composicao corporal, ganhos de forca e evolucao a longo prazo com dados claros.',
        image: sharedScreenshots.goals,
        alt: 'Ecra de objetivos e progresso corporal na Fit3',
      },
    ],
    steps: [
      {
        number: '01',
        icon: '🎯',
        title: 'Define os teus objetivos',
        description:
          'Partilha com a Fit3 os teus objetivos, perfil corporal, experiencia e equipamento para comecar do teu contexto real.',
      },
      {
        number: '02',
        icon: '⚡',
        title: 'Recebe o teu plano',
        description:
          'Recebe um plano de treino e nutricao personalizado para o teu corpo e estilo de vida.',
      },
      {
        number: '03',
        icon: '📈',
        title: 'Acompanha e transforma',
        description:
          'Regista treinos e refeicoes e acompanha a tua evolucao com analise, streaks e tendencias.',
      },
    ],
    benefits: [
      ['🤖', 'Personalizacao com IA', 'Os planos adaptam-se ao teu corpo, objetivos, experiencia e equipamento.'],
      ['🎬', 'Demonstracoes de exercicios', 'Animacoes e orientacoes passo a passo para cada exercicio.'],
      ['🍎', 'Nutricao inteligente', 'Refeicoes, calorias e macros ajustados as tuas preferencias alimentares.'],
      ['⌚', 'Apple Watch', 'Acompanha os treinos no pulso com frequencia cardiaca, calorias e dados em tempo real.'],
      ['📊', 'Analise de progresso', 'Graficos para forca, metricas corporais, consistencia e rendimento.'],
      ['❤️', 'Integracao com HealthKit', 'Os teus dados de saude e fitness ficam sincronizados entre iPhone e Apple Watch.'],
    ],
    footer: {
      privacy: 'Politica de privacidade',
      terms: 'Termos de utilizacao',
      contact: 'Contacto',
      copyright: '© 2026 Fit3. Todos os direitos reservados.',
    },
    schema: {
      appCategory: 'HealthApplication',
      operatingSystem: 'iOS, macOS, watchOS',
    },
  },
  zh: {
    code: 'zh',
    localeTag: 'zh_CN',
    lang: 'zh',
    path: '/zh/',
    label: 'Chinese',
    nativeLabel: '中文',
    dir: 'ltr',
    title: 'Fit3 — 你的 AI 私人健身教练',
    description:
      'Fit3 是一款一体化健身应用，提供 AI 训练计划、营养追踪、进度分析，以及 Apple Watch 集成。',
    nav: {
      features: '功能',
      howItWorks: '使用方式',
      benefits: '优势',
      download: '免费下载',
      languageLabel: '语言',
    },
    hero: {
      badge: '3 个月内更接近目标',
      titleTop: '你的专属',
      titleAccent: '健身教练',
      subtitle:
        '个性化训练计划、智能营养追踪和实时进度分析，根据你的身体情况、目标和器械条件进行调整。',
      cta: '在 App Store 下载',
    },
    sections: {
      featuresTag: '功能',
      featuresTitle: '你需要的一切来',
      featuresAccent: '持续进步',
      featuresSubtitle: '四大核心模块协同工作，帮助你建立更高效的健身体系。',
      howTag: '使用方式',
      howTitle: '只需',
      howAccent: '3 个简单步骤',
      howSubtitle: '从下载到开始第一次训练，只需几分钟。',
      benefitsTag: '为什么选择 Fit3',
      benefitsTitle: '专为',
      benefitsAccent: '真实结果',
      benefitsSubtitle: '每一项功能都旨在减少你的试错成本，让训练更明确。',
      ctaTitle: '准备开始改变身材了吗？',
      ctaSubtitle:
        '加入已经使用 Fit3 开启健身旅程的用户。立即免费下载，获得你的 AI 个性化计划。',
      ctaNote: '免费下载 • 无需信用卡',
    },
    features: [
      {
        icon: '🏋️',
        title: '训练记录',
        description:
          '实时记录每次训练，包含动作演示、组数与次数、节奏控制和休息计时。',
        image: sharedScreenshots.workout,
        alt: 'Fit3 训练记录页面，显示组数、次数和重量',
      },
      {
        icon: '📋',
        title: '训练计划',
        description:
          '根据你的目标、经验和器械条件，生成多周个性化训练方案。',
        image: sharedScreenshots.planner,
        alt: 'Fit3 个性化每周训练计划页面',
      },
      {
        icon: '🥗',
        title: '营养追踪',
        description:
          '每日饮食规划，按食材追踪热量和宏量营养素，与你的目标保持一致。',
        image: sharedScreenshots.nutrition,
        alt: 'Fit3 营养追踪页面，显示餐食和热量',
      },
      {
        icon: '🎯',
        title: '目标与进度',
        description:
          '清晰追踪体成分、力量提升和长期变化，持续看到真实进步。',
        image: sharedScreenshots.goals,
        alt: 'Fit3 目标与进度页面，显示身体变化趋势',
      },
    ],
    steps: [
      {
        number: '01',
        icon: '🎯',
        title: '设定目标',
        description:
          '告诉 Fit3 你的目标、身体情况、经验水平和器械条件，从你的真实起点开始。',
      },
      {
        number: '02',
        icon: '⚡',
        title: '获取计划',
        description:
          '获得根据你的身体和生活方式定制的训练与营养方案。',
      },
      {
        number: '03',
        icon: '📈',
        title: '记录并蜕变',
        description:
          '记录训练和饮食，通过分析、连续打卡和趋势图持续优化进展。',
      },
    ],
    benefits: [
      ['🤖', 'AI 个性化', '训练计划会根据你的身体、目标、经验和器械条件自动调整。'],
      ['🎬', '动作演示', '每个动作都配有动画演示和分步指导。'],
      ['🍎', '智能营养', '餐食、热量和宏量营养素依据你的饮食偏好来规划。'],
      ['⌚', 'Apple Watch', '直接在手腕上追踪训练、心率、热量和实时数据。'],
      ['📊', '进度分析', '通过图表查看力量、身体指标、训练稳定性和趋势。'],
      ['❤️', 'HealthKit 同步', '在 iPhone、Apple Watch 和 Apple Health 之间保持健康数据同步。'],
    ],
    footer: {
      privacy: '隐私政策',
      terms: '使用条款',
      contact: '联系我们',
      copyright: '© 2026 Fit3. 保留所有权利。',
    },
    schema: {
      appCategory: 'HealthApplication',
      operatingSystem: 'iOS, macOS, watchOS',
    },
  },
};

export const languageOrder = ['en', 'es', 'fr', 'it', 'de', 'pt', 'zh'];

export function getStatsForLocale(localeCode) {
  return sharedStats.map((stat) => ({
    target: stat.target,
    suffix: stat.suffix,
    label: stat.label[localeCode],
  }));
}
