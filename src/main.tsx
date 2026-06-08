import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Anchor,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Blocks,
  Bot,
  Building2,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  Factory,
  FileText,
  Globe2,
  Handshake,
  Languages,
  Landmark,
  Leaf,
  Mail,
  Menu,
  MessageCircle,
  Network,
  Sailboat,
  Send,
  ShieldCheck,
  Ship,
  UsersRound,
  Workflow,
  X,
} from "lucide-react";
import "./styles.css";

type Locale = "fr" | "en";

type PortModule = {
  id: string;
  title: string;
  text: string;
  features: string[];
  note: string;
};

type RoleItem = {
  title: string;
  text: string;
  points: string[];
};

type ChatChoice = {
  label: string;
  value: string;
  response: string;
};

type BlogCategory = {
  slug: string;
  title: string;
  description: string;
};

type ArticleSeed = {
  title: string;
  slug: string;
  category: string;
  tags: string[];
  solutionSlugs: string[];
  focus: string;
  references?: { label: string; url: string }[];
};

type BlogArticle = ArticleSeed & {
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  readTime: string;
  image: string;
  sections: { title: string; paragraphs: string[] }[];
};

type Solution = {
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  sector: string;
  sectorKey: "public" | "prive" | "deux";
  status: string;
  problem: string;
  description: string;
  features: string[];
  benefits: string[];
  cta: string;
  relatedArticleSlugs: string[];
};

const portModules: Record<Locale, PortModule[]> = {
  fr: [
    {
      id: "single-window",
      title: "Guichet unique maritime",
      text: "Plateforme centralisée permettant de dématérialiser, simplifier et coordonner les formalités maritimes et portuaires entre les autorités, les opérateurs, les usagers et les administrations concernées.",
      features: [
        "Dépôt et suivi des formalités",
        "Gestion des déclarations et documents réglementaires",
        "Traçabilité des validations",
        "Réduction des délais de traitement",
        "Interconnexion possible avec les systèmes existants",
        "Appui à la conformité avec les exigences internationales applicables",
      ],
      note: "KCI peut accompagner la structuration, la coordination locale et le déploiement de ce type de solution avec des partenaires techniques internationaux.",
    },
    {
      id: "pcs",
      title: "Port Community System",
      text: "Système numérique de coordination destiné à fluidifier les échanges d’informations entre les acteurs publics et privés de l’écosystème portuaire.",
      features: [
        "Coordination entre autorités portuaires, douanes, transitaires, armateurs, consignataires et opérateurs logistiques",
        "Suivi des flux documentaires et opérationnels",
        "Réduction des doublons et traitements manuels",
        "Amélioration de la transparence",
        "Meilleure visibilité sur les opérations portuaires",
        "Interopérabilité avec les systèmes existants",
      ],
      note: "KCI peut intervenir comme acteur d’ancrage local, intégrateur fonctionnel et coordinateur de consortium avec des partenaires techniques internationaux.",
    },
    {
      id: "calls",
      title: "Gestion des escales",
      text: "Solution permettant de planifier, suivre et coordonner les arrivées, séjours et départs des navires.",
      features: [
        "Planification des escales",
        "Suivi des demandes d’autorisation",
        "Gestion des priorités",
        "Notifications aux parties prenantes",
        "Historique des opérations",
        "Indicateurs de performance",
        "Meilleure coordination entre port, armateurs, consignataires et autorités",
      ],
      note: "Cette solution vise à renforcer la coordination opérationnelle entre les autorités, les opérateurs portuaires et les usagers.",
    },
    {
      id: "passes",
      title: "Documents et laissez-passer",
      text: "Module de gestion documentaire et de contrôle des accès destiné aux zones portuaires, logistiques ou administratives sensibles.",
      features: [
        "Émission et suivi de laissez-passer",
        "Gestion des badges et autorisations",
        "Validation numérique des documents",
        "QR code ou contrôle d’authenticité",
        "Traçabilité des accès",
        "Archivage et historique des demandes",
        "Séparation claire des droits d’accès selon les rôles",
        "Gestion des parkings et des zones de stationnement autorisées pour véhicules, camions, visiteurs, prestataires et opérateurs portuaires",
        "Attribution de places ou zones autorisées, contrôle entrée / sortie et historique des accès véhicules",
      ],
      note: "La solution peut être adaptée aux procédures locales et aux exigences de sécurité des autorités compétentes.",
    },
    {
      id: "dashboards",
      title: "Tableaux de bord et pilotage",
      text: "Outils d’aide à la décision permettant aux responsables de suivre les flux, les délais, les volumes, les recettes, les anomalies et les performances.",
      features: [
        "Indicateurs opérationnels",
        "Statistiques portuaires",
        "Suivi des délais",
        "Reporting pour décideurs",
        "Alertes sur anomalies",
        "Export Excel/PDF",
        "Visualisation des tendances",
        "Suivi de la performance des opérations",
      ],
      note: "KCI privilégie des tableaux de bord simples, lisibles et utiles aux décideurs, sans surcharge technique.",
    },
    {
      id: "carbon",
      title: "Décarbonation et performance environnementale",
      text: "Module destiné à accompagner les ports et opérateurs dans le suivi environnemental, l’optimisation des flux et la réduction progressive de l’empreinte carbone.",
      features: [
        "Suivi des indicateurs environnementaux",
        "Réduction des files d’attente et temps d’immobilisation",
        "Optimisation des flux logistiques",
        "Reporting ESG",
        "Suivi des déchets ou consommations selon les besoins",
        "Aide à la préparation de projets finançables",
        "Appui à la transition énergétique portuaire",
      ],
      note: "KCI peut structurer ces solutions avec des partenaires internationaux spécialisés dans la modernisation portuaire, la transition énergétique et la transformation numérique.",
    },
    {
      id: "isps",
      title: "Sûreté portuaire et conformité ISPS",
      text: "Accompagnement des ports dans la mise à niveau de leur sûreté, la conformité ISPS et la sécurisation des zones sensibles.",
      features: [
        "Audit de sûreté portuaire",
        "Appui PFSA / PFSP selon les besoins",
        "Contrôle d’accès",
        "Vidéosurveillance",
        "Zones restreintes",
        "Procédures d’alerte et de gestion d’incidents",
        "Formation et sensibilisation des équipes",
        "Centre de supervision",
      ],
      note: "KCI intervient avec des experts et partenaires spécialisés afin d’aider les ports à atteindre un niveau de sûreté compatible avec leurs obligations et leur vocation économique.",
    },
    {
      id: "operations",
      title: "Digitalisation des opérations portuaires",
      text: "Solutions permettant de réduire les traitements manuels, améliorer la traçabilité et faciliter la coordination entre les services portuaires, les autorités et les opérateurs.",
      features: [
        "Suivi des opérations",
        "Formulaires numériques",
        "Workflow de validation",
        "Notifications",
        "Historique des actions",
        "Traçabilité des intervenants",
        "Supervision multi-acteurs",
        "Reporting automatique",
      ],
      note: "KCI privilégie des solutions simples, robustes et adaptées aux réalités locales, notamment pour les utilisateurs peu habitués aux outils numériques.",
    },
    {
      id: "rehab",
      title: "Réhabilitation et modernisation portuaire",
      text: "Appui à la structuration de projets de réhabilitation, d’aménagement et de modernisation des ports, en lien avec des partenaires techniques spécialisés.",
      features: [
        "Diagnostic des besoins",
        "Structuration de projets",
        "Coordination locale",
        "Appui à la recherche de partenaires",
        "Réhabilitation d’infrastructures",
        "Dragage, ouvrages, quais, clôtures, bâtiments et équipements selon les partenaires mobilisés",
        "Suivi terrain et reporting projet",
      ],
      note: "KCI ne se substitue pas aux entreprises de travaux spécialisées, mais peut agir comme acteur local de coordination, de structuration et de suivi avec des partenaires qualifiés.",
    },
    {
      id: "international",
      title: "Partenariats internationaux et consortiums",
      text: "KCI accompagne les partenaires internationaux souhaitant intervenir à Madagascar en leur apportant un ancrage local, une compréhension institutionnelle et une capacité de coordination terrain.",
      features: [
        "Identification d’opportunités",
        "Coordination institutionnelle",
        "Appui à la structuration de consortiums",
        "Suivi local",
        "Compréhension du contexte malgache",
        "Relation avec les parties prenantes",
        "Appui à la préparation de propositions",
      ],
      note: "KCI vise des collaborations durables, transparentes et structurées avec des partenaires techniques reconnus.",
    },
  ],
  en: [
    {
      id: "single-window",
      title: "Maritime single window",
      text: "A centralized platform to digitize, simplify and coordinate maritime and port formalities between authorities, operators, users and relevant administrations.",
      features: [
        "Submission and tracking of formalities",
        "Regulatory declarations and document management",
        "Validation traceability",
        "Shorter processing times",
        "Possible interconnection with existing systems",
        "Support for applicable international compliance requirements",
      ],
      note: "KCI can support scoping, local coordination and deployment with international technical partners.",
    },
    {
      id: "pcs",
      title: "Port Community System",
      text: "A digital coordination system designed to streamline information flows between public and private stakeholders in the port ecosystem.",
      features: [
        "Coordination between port authorities, customs, freight forwarders, shipowners, agents and logistics operators",
        "Document and operational flow tracking",
        "Reduction of duplicates and manual processing",
        "Improved transparency",
        "Better visibility on port operations",
        "Interoperability with existing systems",
      ],
      note: "KCI can act as a local anchor, functional integrator and consortium coordinator with international technical partners.",
    },
    {
      id: "calls",
      title: "Port call management",
      text: "A solution to plan, monitor and coordinate vessel arrivals, stays and departures.",
      features: [
        "Port call planning",
        "Authorization request tracking",
        "Priority management",
        "Stakeholder notifications",
        "Operational history",
        "Performance indicators",
        "Better coordination between ports, shipowners, agents and authorities",
      ],
      note: "This solution strengthens operational coordination between authorities, port operators and users.",
    },
    {
      id: "passes",
      title: "Documents and access passes",
      text: "Document management and access control for sensitive port, logistics or administrative areas.",
      features: [
        "Pass issuance and tracking",
        "Badge and authorization management",
        "Digital document validation",
        "QR code or authenticity control",
        "Access traceability",
        "Archiving and request history",
        "Clear role-based access separation",
        "Parking and authorized parking-zone management for vehicles, trucks, visitors, contractors and port operators",
        "Allocation of authorized spaces or zones, entry / exit control and vehicle access history",
      ],
      note: "The solution can be adapted to local procedures and competent authority security requirements.",
    },
    {
      id: "dashboards",
      title: "Dashboards and steering",
      text: "Decision-support tools helping managers monitor flows, delays, volumes, revenues, anomalies and performance.",
      features: [
        "Operational indicators",
        "Port statistics",
        "Delay tracking",
        "Executive reporting",
        "Anomaly alerts",
        "Excel/PDF exports",
        "Trend visualization",
        "Operational performance tracking",
      ],
      note: "KCI favors simple, readable dashboards useful for decision-makers without technical overload.",
    },
    {
      id: "carbon",
      title: "Decarbonization and environmental performance",
      text: "A module supporting ports and operators in environmental tracking, flow optimization and progressive carbon footprint reduction.",
      features: [
        "Environmental indicator tracking",
        "Queue and idle-time reduction",
        "Logistics flow optimization",
        "ESG reporting",
        "Waste or consumption tracking as needed",
        "Support for bankable project preparation",
        "Support for port energy transition",
      ],
      note: "KCI can structure these solutions with international partners specialized in port modernization, energy transition and digital transformation.",
    },
    {
      id: "isps",
      title: "Port security and ISPS compliance",
      text: "Support for ports upgrading security, ISPS compliance and protection of sensitive areas.",
      features: [
        "Port security audit",
        "PFSA / PFSP support as needed",
        "Access control",
        "Video surveillance",
        "Restricted areas",
        "Alert and incident procedures",
        "Team training and awareness",
        "Supervision center",
      ],
      note: "KCI works with specialized experts and partners to help ports reach a security level compatible with their obligations and economic role.",
    },
    {
      id: "operations",
      title: "Digitization of port operations",
      text: "Solutions that reduce manual processing, improve traceability and facilitate coordination between port services, authorities and operators.",
      features: [
        "Operations tracking",
        "Digital forms",
        "Validation workflows",
        "Notifications",
        "Action history",
        "Stakeholder traceability",
        "Multi-actor supervision",
        "Automated reporting",
      ],
      note: "KCI favors simple, robust solutions adapted to local realities, especially for users less familiar with digital tools.",
    },
    {
      id: "rehab",
      title: "Port rehabilitation and modernization",
      text: "Support for structuring port rehabilitation, development and modernization projects with specialized technical partners.",
      features: [
        "Needs assessment",
        "Project structuring",
        "Local coordination",
        "Partner search support",
        "Infrastructure rehabilitation",
        "Dredging, works, quays, fences, buildings and equipment depending on mobilized partners",
        "Field monitoring and project reporting",
      ],
      note: "KCI does not replace specialized construction companies, but can act as a local coordination, structuring and monitoring partner with qualified partners.",
    },
    {
      id: "international",
      title: "International partnerships and consortiums",
      text: "KCI supports international partners seeking to operate in Madagascar by providing local anchoring, institutional understanding and field coordination capacity.",
      features: [
        "Opportunity identification",
        "Institutional coordination",
        "Consortium structuring support",
        "Local follow-up",
        "Understanding of the Malagasy context",
        "Stakeholder relations",
        "Proposal preparation support",
      ],
      note: "KCI seeks lasting, transparent and structured collaborations with recognized technical partners.",
    },
  ],
};

const content = {
  fr: {
    nav: ["Accueil", "Solutions", "Portuaire", "Secteurs", "Méthode", "Contact"],
    cta: "Demander une consultation",
    heroEyebrow: "Conseil, implémentation et ancrage local",
    heroTitle: "KCI – Conseil, implémentation et solutions stratégiques pour Madagascar",
    heroBody:
      "Nous accompagnons les institutions, entreprises et partenaires internationaux dans la structuration, la digitalisation et le déploiement de projets à fort impact, avec un ancrage local fort et des partenaires techniques spécialisés.",
    heroPrimary: "Explorer les capacités KCI",
    heroSecondary: "Présenter un projet",
    heroBadges: [
      "Projets publics",
      "Digitalisation",
      "Portuaire & maritime",
      "Solutions humaines",
      "Partenariats internationaux",
      "Implémentation locale",
    ],
    heroMetrics: [
      ["6", "piliers d’intervention"],
      ["Public / privé", "acteurs accompagnés"],
      ["Madagascar", "ancrage local"],
    ],
    sections: {
      solutions: "Piliers KCI",
      port: "Solutions portuaires, maritimes et logistiques",
      problems: "Ce que nous résolvons",
      role: "Le rôle de KCI",
      sectors: "Secteurs d’intervention",
      method: "Méthode projet",
      contact: "Contact",
    },
    intro:
      "KCI agit comme cabinet de conseil, d’implémentation et de coordination pour relier stratégie, terrain, outils digitaux et partenaires techniques.",
    solutions: [
      ["Conseil et partenariats", "Diagnostic, cadrage, stratégie, structuration de projets et mobilisation de partenaires adaptés."],
      ["Implémentation de projets", "Coordination terrain, suivi des jalons, conduite du changement et transfert de compétences."],
      ["Solutions digitales", "Systèmes d’information, workflows, tableaux de bord, intégrations et digitalisation de procédures."],
      ["Solutions humaines", "Organisation RH, paie externalisée, portage salarial et administration du personnel."],
      ["Portuaire, maritime et logistique", "Modernisation des ports, conformité, sûreté, traçabilité, PCS et guichets uniques."],
      ["Consortiums internationaux", "Ancrage local, coordination institutionnelle et appui aux partenaires techniques internationaux."],
    ],
    portSubtitle:
      "KCI accompagne la mise en conformité, la digitalisation et la modernisation des ports, en coordination avec les autorités locales et des partenaires techniques internationaux.",
    portIntro:
      "Les ports malgaches font face à des enjeux majeurs : conformité internationale, sécurité, sûreté, fluidité des formalités, interopérabilité, traçabilité des opérations, modernisation des infrastructures et amélioration de la performance logistique. KCI intervient comme partenaire local d’implémentation, de coordination et d’intégration fonctionnelle pour accompagner ces transformations.",
    problems: [
      "Formalités dispersées et lenteur administrative",
      "Multiplication des documents papier",
      "Faible traçabilité des opérations",
      "Manque de visibilité pour les décideurs",
      "Difficultés de coordination entre acteurs",
      "Besoin de conformité internationale",
      "Sûreté et sécurité insuffisamment digitalisées",
      "Données non centralisées ou difficilement exploitables",
      "Infrastructures nécessitant réhabilitation et suivi",
      "Difficulté pour les partenaires internationaux à s’ancrer localement",
    ],
    roleText:
      "KCI intervient comme cabinet local de conseil, d’implémentation et de coordination. Nous aidons à structurer les projets, mobiliser les bons partenaires, faciliter la coordination institutionnelle, suivre l’exécution et assurer l’alignement entre besoins locaux, exigences techniques et standards internationaux.",
    roles: [
      {
        title: "Ancrage local",
        text: "KCI accompagne les partenaires, institutions et entreprises dans la compréhension du contexte malgache, l’identification des bons interlocuteurs et l’adaptation des projets aux réalités locales.",
        points: [
          "Lecture du contexte institutionnel",
          "Relation avec les acteurs locaux",
          "Adaptation aux réalités administratives",
          "Présence terrain",
          "Accompagnement des partenaires internationaux",
        ],
      },
      {
        title: "Coordination institutionnelle",
        text: "KCI facilite la coordination entre les autorités, les partenaires techniques, les bailleurs, les opérateurs et les bénéficiaires afin d’éviter les blocages et d’accélérer la mise en œuvre.",
        points: [
          "Préparation des échanges",
          "Suivi des décisions",
          "Coordination des réunions",
          "Appui aux démarches administratives",
          "Clarification des responsabilités",
        ],
      },
      {
        title: "Structuration de projet",
        text: "KCI aide à transformer une idée ou une opportunité en projet structuré, avec périmètre, objectifs, calendrier, partenaires, budget indicatif, risques et livrables.",
        points: [
          "Cadrage du besoin",
          "Identification des parties prenantes",
          "Phasage",
          "Modèle de gouvernance",
          "Préparation de notes, présentations et dossiers",
        ],
      },
      {
        title: "Intégration fonctionnelle",
        text: "KCI veille à ce que les solutions proposées répondent réellement aux besoins métiers, aux procédures locales et aux contraintes des utilisateurs.",
        points: [
          "Traduction des besoins métiers",
          "Coordination entre équipes techniques et utilisateurs",
          "Simplification des parcours",
          "Interopérabilité fonctionnelle",
          "Validation des usages",
        ],
      },
      {
        title: "Suivi terrain",
        text: "KCI assure un suivi de proximité pour vérifier l’avancement, remonter les difficultés, coordonner les acteurs et sécuriser l’exécution locale.",
        points: [
          "Visites terrain",
          "Reporting",
          "Suivi des engagements",
          "Remontée des alertes",
          "Appui à la résolution des blocages",
        ],
      },
      {
        title: "Partenariats internationaux",
        text: "KCI accompagne les partenaires internationaux souhaitant intervenir à Madagascar dans une logique de consortium, de représentation locale ou de collaboration durable.",
        points: [
          "Identification d’opportunités",
          "Représentation locale sous accord préalable",
          "Appui à la structuration de consortiums",
          "Coordination avec partenaires techniques",
          "Suivi local des projets",
        ],
      },
    ] satisfies RoleItem[],
    sectors: [
      "Secteur public",
      "Secteur privé",
      "Ports, maritime et transport",
      "Logistique et chaînes d’approvisionnement",
      "Ressources humaines",
      "Digitalisation administrative",
      "Données et tableaux de bord",
      "Partenariats internationaux",
    ],
    method: [
      ["Diagnostiquer", "Comprendre le contexte, les risques, les acteurs et les contraintes réelles."],
      ["Structurer", "Définir la trajectoire, les responsabilités, les livrables et les indicateurs."],
      ["Déployer", "Piloter l’exécution avec des points de contrôle, des arbitrages et une traçabilité claire."],
      ["Pérenniser", "Former les équipes, documenter les pratiques et installer les mécanismes de suivi."],
    ],
    contactTitle: "Vous avez un projet à cadrer ou à déployer ?",
    contactText:
      "Décrivez votre besoin. Le message ouvrira votre client email avec les informations saisies, sans stockage de données sur ce site statique.",
    form: {
      name: "Nom",
      email: "Email",
      organization: "Organisation",
      message: "Besoin",
      send: "Préparer l’email",
      success: "Votre email est prêt dans votre client de messagerie.",
    },
    chatbot: {
      title: "Orientation KCI",
      intro: "Choisissez votre besoin pour préparer un message adapté.",
      open: "Ouvrir l’assistant KCI",
      close: "Fermer l’assistant",
      contact: "Contacter KCI",
      choices: [
        {
          label: "Je veux moderniser un port",
          value: "Projet portuaire / maritime / logistique",
          response:
            "KCI peut vous accompagner dans la structuration d’un projet portuaire : diagnostic, réhabilitation, sûreté ISPS, digitalisation, supervision, coordination locale et mobilisation de partenaires techniques. Vous pouvez nous présenter le port concerné et le niveau d’urgence.",
        },
        {
          label: "Je cherche un partenaire local à Madagascar",
          value: "Partenariat ou consortium international",
          response:
            "KCI agit comme partenaire d’ancrage local pour les organisations internationales souhaitant intervenir à Madagascar. Nous accompagnons la coordination institutionnelle, le suivi terrain, la structuration de consortiums et l’adaptation au contexte local.",
        },
        {
          label: "Je veux digitaliser une procédure",
          value: "Solution digitale ou workflow administratif",
          response:
            "KCI peut vous aider à transformer une procédure manuelle en parcours numérique simple : formulaires, validation, traçabilité, notifications, tableaux de bord et archivage. Nous privilégions des outils compréhensibles par les utilisateurs non techniques.",
        },
        {
          label: "Je cherche une solution digitale",
          value: "Catalogue de solutions digitales",
          response:
            "Le catalogue présente les solutions KCI/Soozey par secteur, statut et besoin traité : RH, portuaire, santé, justice, finance, transport, IA et données. Vous pouvez préciser la solution ou le problème métier à traiter.",
        },
        {
          label: "Je veux lire les articles du blog",
          value: "Blog KCI/Soozey",
          response:
            "Le blog rassemble des analyses sur la digitalisation, les ports, l’IA, la GovTech, les RH, la santé, la justice, la finance et les projets financés. Vous pouvez consulter les catégories ou demander un échange sur un article.",
        },
        {
          label: "Je veux demander une démo",
          value: "Demande de démonstration",
          response:
            "Indiquez la solution qui vous intéresse, votre organisation, le contexte d’usage et vos contraintes de calendrier. KCI pourra qualifier le besoin et proposer un échange adapté.",
        },
        {
          label: "Je cherche une solution RH",
          value: "Solution RH",
          response:
            "KCI peut cadrer une solution RH autour des dossiers du personnel, absences, paie, documents, tableaux de bord et assistance documentaire selon le niveau de maturité souhaité.",
        },
        {
          label: "Je souhaite structurer un projet public",
          value: "Conseil, cadrage et déploiement institutionnel",
          response:
            "KCI accompagne la structuration de projets publics : cadrage, parties prenantes, modèle de gouvernance, partenaires, calendrier, livrables, risques et suivi d’exécution.",
        },
        {
          label: "Je veux parler à KCI",
          value: "Demande de consultation",
          response:
            "Vous pouvez contacter KCI pour présenter votre besoin, demander une consultation ou proposer un partenariat. Utilisez le bouton de contact ou le formulaire prévu sur le site.",
        },
      ] satisfies ChatChoice[],
    },
    footer: "Karibo Consulting & Implementation. Conseil stratégique, implémentation terrain et ancrage local.",
  },
  en: {
    nav: ["Home", "Solutions", "Ports", "Sectors", "Method", "Contact"],
    cta: "Request a consultation",
    heroEyebrow: "Advisory, implementation and local anchoring",
    heroTitle: "KCI – Advisory, implementation and strategic solutions for Madagascar",
    heroBody:
      "We support institutions, companies and international partners in structuring, digitizing and delivering high-impact projects, with strong local grounding and specialized technical partners.",
    heroPrimary: "Explore KCI capabilities",
    heroSecondary: "Submit a project",
    heroBadges: ["Public projects", "Digitization", "Ports & maritime", "Human solutions", "International partnerships", "Local implementation"],
    heroMetrics: [
      ["6", "intervention pillars"],
      ["Public / private", "stakeholders supported"],
      ["Madagascar", "local grounding"],
    ],
    sections: {
      solutions: "KCI pillars",
      port: "Port, maritime and logistics solutions",
      problems: "What we help solve",
      role: "KCI’s role",
      sectors: "Sectors",
      method: "Project method",
      contact: "Contact",
    },
    intro:
      "KCI acts as an advisory, implementation and coordination firm connecting strategy, field delivery, digital tools and technical partners.",
    solutions: [
      ["Advisory and partnerships", "Diagnosis, scoping, strategy, project structuring and partner mobilization."],
      ["Project implementation", "Field coordination, milestone tracking, change management and skills transfer."],
      ["Digital solutions", "Information systems, workflows, dashboards, integrations and procedure digitization."],
      ["Human solutions", "HR organization, outsourced payroll, employer-of-record support and personnel administration."],
      ["Ports, maritime and logistics", "Port modernization, compliance, security, traceability, PCS and single windows."],
      ["International consortiums", "Local anchoring, institutional coordination and support for international technical partners."],
    ],
    portSubtitle:
      "KCI supports port compliance, digitization and modernization in coordination with local authorities and international technical partners.",
    portIntro:
      "Malagasy ports face major challenges: international compliance, safety, security, smoother formalities, interoperability, operational traceability, infrastructure modernization and improved logistics performance. KCI acts as a local implementation, coordination and functional integration partner to support these transformations.",
    problems: [
      "Scattered formalities and slow administration",
      "Too many paper documents",
      "Limited operational traceability",
      "Poor visibility for decision-makers",
      "Coordination difficulties between stakeholders",
      "Need for international compliance",
      "Security insufficiently digitized",
      "Data not centralized or hard to use",
      "Infrastructure requiring rehabilitation and monitoring",
      "International partners needing local anchoring",
    ],
    roleText:
      "KCI acts as a local advisory, implementation and coordination firm. We help structure projects, mobilize the right partners, facilitate institutional coordination, monitor execution and align local needs, technical requirements and international standards.",
    roles: [
      {
        title: "Local anchoring",
        text: "KCI helps partners, institutions and companies understand the Malagasy context, identify the right stakeholders and adapt projects to local realities.",
        points: [
          "Institutional context reading",
          "Relations with local stakeholders",
          "Adaptation to administrative realities",
          "Field presence",
          "Support for international partners",
        ],
      },
      {
        title: "Institutional coordination",
        text: "KCI facilitates coordination between authorities, technical partners, donors, operators and beneficiaries to avoid bottlenecks and accelerate implementation.",
        points: [
          "Preparation of exchanges",
          "Decision follow-up",
          "Meeting coordination",
          "Administrative support",
          "Clarification of responsibilities",
        ],
      },
      {
        title: "Project structuring",
        text: "KCI helps turn an idea or opportunity into a structured project with scope, objectives, schedule, partners, indicative budget, risks and deliverables.",
        points: [
          "Needs scoping",
          "Stakeholder identification",
          "Phasing",
          "Governance model",
          "Preparation of notes, presentations and files",
        ],
      },
      {
        title: "Functional integration",
        text: "KCI ensures that proposed solutions truly match business needs, local procedures and user constraints.",
        points: [
          "Translation of business needs",
          "Coordination between technical teams and users",
          "Journey simplification",
          "Functional interoperability",
          "Usage validation",
        ],
      },
      {
        title: "Field monitoring",
        text: "KCI provides close field follow-up to check progress, report difficulties, coordinate stakeholders and secure local execution.",
        points: [
          "Field visits",
          "Reporting",
          "Commitment tracking",
          "Alert escalation",
          "Support for resolving bottlenecks",
        ],
      },
      {
        title: "International partnerships",
        text: "KCI supports international partners seeking to operate in Madagascar through consortiums, local representation or long-term collaboration.",
        points: [
          "Opportunity identification",
          "Local representation under prior agreement",
          "Consortium structuring support",
          "Coordination with technical partners",
          "Local project follow-up",
        ],
      },
    ] satisfies RoleItem[],
    sectors: [
      "Public sector",
      "Private sector",
      "Ports, maritime and transport",
      "Logistics and supply chains",
      "Human resources",
      "Administrative digitization",
      "Data and dashboards",
      "International partnerships",
    ],
    method: [
      ["Diagnose", "Understand the context, risks, stakeholders and real constraints."],
      ["Structure", "Define the roadmap, responsibilities, deliverables and indicators."],
      ["Deliver", "Drive execution with checkpoints, arbitration and clear traceability."],
      ["Sustain", "Train teams, document practices and install monitoring mechanisms."],
    ],
    contactTitle: "Do you have a project to scope or deliver?",
    contactText:
      "Describe your need. The form opens your email client with the entered information, with no data stored on this static site.",
    form: {
      name: "Name",
      email: "Email",
      organization: "Organization",
      message: "Need",
      send: "Prepare email",
      success: "Your email is ready in your mail client.",
    },
    chatbot: {
      title: "KCI orientation",
      intro: "Choose your need to prepare a relevant message.",
      open: "Open KCI assistant",
      close: "Close assistant",
      contact: "Contact KCI",
      choices: [
        {
          label: "I want to modernize a port",
          value: "Port / maritime / logistics project",
          response:
            "KCI can support port project structuring: diagnosis, rehabilitation, ISPS security, digitization, supervision, local coordination and mobilization of technical partners. You can share the port concerned and the urgency level.",
        },
        {
          label: "I need a local partner in Madagascar",
          value: "Partnership or international consortium",
          response:
            "KCI acts as a local anchoring partner for international organizations seeking to operate in Madagascar. We support institutional coordination, field follow-up, consortium structuring and adaptation to the local context.",
        },
        {
          label: "I want to digitize a procedure",
          value: "Digital solution or administrative workflow",
          response:
            "KCI can help transform a manual procedure into a simple digital journey: forms, validation, traceability, notifications, dashboards and archiving. We prioritize tools understandable by non-technical users.",
        },
        {
          label: "I need a digital solution",
          value: "Digital solutions catalog",
          response:
            "The catalog presents KCI/Soozey solutions by sector, status and business need: HR, ports, health, justice, finance, transport, AI and data. You can specify the solution or issue to address.",
        },
        {
          label: "I want to read the blog",
          value: "KCI/Soozey blog",
          response:
            "The blog gathers analyses on digitization, ports, AI, GovTech, HR, health, justice, finance and donor-funded projects. You can browse categories or request a discussion around an article.",
        },
        {
          label: "I want to request a demo",
          value: "Demo request",
          response:
            "Share the solution you are interested in, your organization, the usage context and timing constraints. KCI can qualify the need and propose a relevant discussion.",
        },
        {
          label: "I need an HR solution",
          value: "HR solution",
          response:
            "KCI can scope an HR solution around personnel files, leave, payroll, documents, dashboards and documentary assistance depending on the maturity level expected.",
        },
        {
          label: "I need to structure a public project",
          value: "Advisory, scoping and institutional delivery",
          response:
            "KCI supports public project structuring: scoping, stakeholders, governance model, partners, schedule, deliverables, risks and execution monitoring.",
        },
        {
          label: "I want to speak with KCI",
          value: "Consultation request",
          response:
            "You can contact KCI to present your need, request a consultation or propose a partnership. Use the contact button or the form available on the site.",
        },
      ] satisfies ChatChoice[],
    },
    footer: "Karibo Consulting & Implementation. Strategic advisory, field implementation and local anchoring.",
  },
};

const solutionIcons = [Handshake, Blocks, Workflow, UsersRound, Anchor, Globe2];
const sectorIcons = [Landmark, Building2, Ship, Factory, UsersRound, FileText, BarChart3, Globe2];
const roleIcons = [MapPinIcon, Landmark, ClipboardCheck, Network, BadgeCheck, Handshake];
const moduleIcons = [Sailboat, Network, Ship, FileText, BarChart3, Leaf, ShieldCheck, Workflow, Building2, Globe2];
const problemIcons = [FileText, ClipboardCheck, Workflow, BarChart3, Network, ShieldCheck, BadgeCheck, Blocks, Building2, Globe2];

function MapPinIcon({ size = 24 }: { size?: number }) {
  return <Globe2 size={size} aria-hidden="true" />;
}

const blogCategories: BlogCategory[] = [
  {
    slug: "ports-maritime-logistique",
    title: "Ports, maritime & logistique",
    description: "Guichet unique maritime, Port Community System, escales, accès, flux et performance portuaire.",
  },
  {
    slug: "transformation-digitale-systemes-information",
    title: "Transformation digitale & systèmes d’information",
    description: "Procédures, GED, workflows, interopérabilité, cybersécurité de base et plateformes métiers.",
  },
  {
    slug: "intelligence-artificielle-donnees",
    title: "Intelligence artificielle & données",
    description: "IA appliquée, assistants métiers, RAG, qualité des données, automatisation et décision.",
  },
  {
    slug: "secteur-public-govtech",
    title: "Secteur public & GovTech",
    description: "Modernisation administrative, services aux citoyens, pilotage public et inclusion numérique.",
  },
  {
    slug: "solutions-humaines-organisation",
    title: "Solutions humaines & organisation",
    description: "RH, portage salarial, administration du personnel, conduite du changement et performance.",
  },
  {
    slug: "gestion-projets-bailleurs",
    title: "Gestion de projets & bailleurs",
    description: "AMI, REOI, appels d’offres, consortiums, suivi-évaluation, ancrage local et exécution terrain.",
  },
  {
    slug: "sante-justice-secteurs-reglementes",
    title: "Santé, justice & secteurs réglementés",
    description: "SIH, MediLibre, LawMate, PenaLink, audiences, dossiers sensibles et traçabilité.",
  },
  {
    slug: "finance-comptabilite-pilotage",
    title: "Finance, comptabilité & pilotage",
    description: "Comptabilia, tableaux de bord financiers, contrôle interne, saisie et automatisation administrative.",
  },
];

const solutionsCatalog: Solution[] = [
  {
    slug: "trackfuel360",
    name: "TrackFuel360",
    category: "Transport, logistique et flotte",
    categorySlug: "transport-mobilite",
    sector: "Public et privé",
    sectorKey: "deux",
    status: "Prototype démontrable",
    problem: "Suivre les consommations, trajets, anomalies et performances d’un parc de véhicules.",
    description: "Solution de suivi du carburant, des consommations, des trajets, des anomalies et de la performance des véhicules.",
    features: ["Suivi des pleins", "Consommation par véhicule", "Alertes anomalies", "Gestion flotte", "Tableaux de bord", "Export Excel/PDF", "Suivi conducteurs"],
    benefits: ["Réduction des écarts non expliqués", "Meilleure visibilité opérationnelle", "Décisions appuyées par des données consolidées"],
    cta: "Auditer votre consommation carburant",
    relatedArticleSlugs: ["comment-reduire-les-couts-caches-lies-aux-processus-manuels"],
  },
  {
    slug: "siirh-sirhia",
    name: "SIIRH / SIRHia",
    category: "Ressources humaines",
    categorySlug: "ressources-humaines",
    sector: "Public et privé",
    sectorKey: "deux",
    status: "Développement sur mesure",
    problem: "Centraliser les dossiers RH, documents, absences, paie, carrières et indicateurs.",
    description: "Solution de gestion RH, dossiers du personnel, paie, absence, documents RH, évaluations, carrière et tableaux de bord.",
    features: ["Dossiers agents/salariés", "Paie et variables", "Congés et absences", "Documents RH", "Tableaux de bord RH", "IA d’aide documentaire selon besoin"],
    benefits: ["Dossiers mieux tenus", "Suivi RH plus fiable", "Moins de dépendance aux fichiers dispersés"],
    cta: "Moderniser votre gestion RH",
    relatedArticleSlugs: ["rh-et-digitalisation-pourquoi-lhumain-doit-rester-au-centre", "administration-du-personnel-pourquoi-la-rigueur-documentaire-protege-lentreprise"],
  },
  {
    slug: "eam-gmao-sur-mesure",
    name: "EAM / GMAO sur mesure",
    category: "Maintenance, actifs et infrastructures",
    categorySlug: "secteur-prive",
    sector: "Public et privé",
    sectorKey: "deux",
    status: "Développement sur mesure",
    problem: "Structurer les actifs, interventions, stocks et indicateurs de maintenance.",
    description: "Solution de gestion des actifs, équipements, maintenance préventive, curative, stocks, pièces et interventions.",
    features: ["Référentiel actifs", "Planning maintenance", "Bons d’intervention", "Stocks pièces", "Incidents", "Indicateurs"],
    benefits: ["Maintenance mieux planifiée", "Traçabilité des interventions", "Meilleure maîtrise des coûts"],
    cta: "Structurer votre maintenance",
    relatedArticleSlugs: ["la-digitalisation-ne-consiste-pas-seulement-a-creer-un-logiciel"],
  },
  {
    slug: "comptabilia",
    name: "Comptabilia",
    category: "Finance et comptabilité",
    categorySlug: "finance-comptabilite",
    sector: "Privé, associations, PME, projets",
    sectorKey: "prive",
    status: "En cours d’amélioration",
    problem: "Mieux suivre les pièces, dépenses, journaux, validations et tableaux de bord financiers.",
    description: "Solution de gestion comptable, suivi dépenses, journaux, pièces, reporting, tableaux de bord et contrôle interne.",
    features: ["Saisie comptable", "Pièces justificatives", "Suivi dépenses", "Tableaux de bord", "Export", "Rôles utilisateurs"],
    benefits: ["Pilotage financier plus clair", "Contrôles renforcés", "Données consolidées pour la décision"],
    cta: "Améliorer votre pilotage financier",
    relatedArticleSlugs: ["comptabilia-pourquoi-les-pme-ont-besoin-dun-meilleur-pilotage-comptable", "tableaux-de-bord-financiers-ce-que-les-dirigeants-doivent-suivre"],
  },
  {
    slug: "digitalisation-procedures-administratives",
    name: "Digitalisation de procédures administratives",
    category: "Secteur public / GovTech",
    categorySlug: "secteur-public",
    sector: "Public",
    sectorKey: "public",
    status: "Développement sur mesure",
    problem: "Transformer des procédures manuelles en parcours numériques traçables et exploitables.",
    description: "Solution sur mesure pour digitaliser les demandes, validations, documents, rendez-vous, paiements, décisions et notifications.",
    features: ["Dépôt de dossier", "Workflow de validation", "GED", "Notifications", "Récépissés", "Tableaux de bord", "Historique"],
    benefits: ["Délais mieux suivis", "Moins de dossiers perdus", "Expérience usager plus claire"],
    cta: "Digitaliser une procédure",
    relatedArticleSlugs: ["comment-reussir-la-digitalisation-dune-procedure-administrative", "modernisation-administrative-pourquoi-les-citoyens-attendent-des-services-plus-simples"],
  },
  {
    slug: "gestion-des-audiences",
    name: "Gestion des audiences",
    category: "Justice et administration",
    categorySlug: "justice-juridique",
    sector: "Public",
    sectorKey: "public",
    status: "Concept structurable",
    problem: "Planifier, suivre et documenter les audiences, dossiers, décisions et notifications.",
    description: "Solution de planification, suivi, reporting et traçabilité des audiences, dossiers, décisions et notifications.",
    features: ["Planning audiences", "Suivi dossiers", "Notifications", "Décisions", "Statistiques", "Export"],
    benefits: ["Meilleure visibilité des calendriers", "Traçabilité renforcée", "Reporting plus simple"],
    cta: "Structurer la gestion des audiences",
    relatedArticleSlugs: ["gestion-des-audiences-pourquoi-la-planification-et-la-tracabilite-sont-essentielles"],
  },
  {
    slug: "lawmate",
    name: "LawMate",
    category: "Juridique et conformité",
    categorySlug: "justice-juridique",
    sector: "Public et privé",
    sectorKey: "deux",
    status: "Concept structurable",
    problem: "Organiser textes, modèles, dossiers juridiques et recherches documentaires.",
    description: "Assistant et plateforme juridique pour organiser les textes, procédures, dossiers, modèles de documents et recherches.",
    features: ["Base documentaire", "Recherche intelligente", "Modèles de documents", "Suivi dossiers", "Assistance IA selon besoin"],
    benefits: ["Recherche plus rapide", "Documentation mieux structurée", "Moins de dispersion des modèles"],
    cta: "Organiser vos ressources juridiques",
    relatedArticleSlugs: ["lawmate-comment-la-technologie-peut-aider-les-professionnels-du-droit"],
  },
  {
    slug: "gestion-parc-auto",
    name: "Gestion de parc auto",
    category: "Transport et flotte",
    categorySlug: "transport-mobilite",
    sector: "Public et privé",
    sectorKey: "deux",
    status: "Développement sur mesure",
    problem: "Centraliser véhicules, affectations, documents, entretiens, conducteurs, carburant et incidents.",
    description: "Solution de gestion des véhicules, affectations, entretiens, documents, conducteurs, carburant et incidents.",
    features: ["Fiches véhicules", "Entretiens", "Assurances", "Affectations", "Carburant", "Incidents", "Tableaux de bord"],
    benefits: ["Parc mieux maîtrisé", "Documents suivis", "Alertes opérationnelles plus fiables"],
    cta: "Piloter votre parc automobile",
    relatedArticleSlugs: ["comment-passer-dexcel-a-un-vrai-systeme-dinformation-metier"],
  },
  {
    slug: "mobilispro",
    name: "Gestion taxibrousse / MobilisPro",
    category: "Transport et mobilité",
    categorySlug: "transport-mobilite",
    sector: "Public, transporteurs, gares routières",
    sectorKey: "deux",
    status: "Concept structurable",
    problem: "Suivre lignes, rotations, véhicules, chauffeurs, billets, contrôles et recettes.",
    description: "Solution de gestion des rotations, lignes, véhicules, chauffeurs, billets, contrôles et recettes dans le transport routier.",
    features: ["Lignes et rotations", "Billetterie", "Contrôle billets", "Suivi véhicules", "Statistiques", "Recettes"],
    benefits: ["Contrôle plus lisible", "Recettes mieux suivies", "Données utiles aux opérateurs"],
    cta: "Moderniser la gestion du transport",
    relatedArticleSlugs: ["pourquoi-les-systemes-dinformation-doivent-etre-penses-pour-les-utilisateurs"],
  },
  {
    slug: "penalink",
    name: "PenaLink",
    category: "Justice et administration pénitentiaire",
    categorySlug: "justice-juridique",
    sector: "Public",
    sectorKey: "public",
    status: "Concept structurable",
    problem: "Améliorer les échanges et alertes entre juridictions et établissements pénitentiaires.",
    description: "Solution de communication et de suivi entre juridictions et établissements pénitentiaires pour améliorer la traçabilité des décisions et alertes.",
    features: ["Suivi détenus", "Alertes échéances", "Décisions", "Notifications", "Statistiques", "Historique"],
    benefits: ["Échéances mieux suivies", "Communication plus traçable", "Moins de ruptures d’information"],
    cta: "Renforcer la traçabilité judiciaire",
    relatedArticleSlugs: ["penalink-ameliorer-la-communication-entre-justice-et-etablissements-penitentiaires"],
  },
  {
    slug: "medilibre",
    name: "MediLibre",
    category: "Santé",
    categorySlug: "sante",
    sector: "Public et privé",
    sectorKey: "deux",
    status: "Concept structurable",
    problem: "Organiser dossiers, actes, rendez-vous et documents selon les besoins d’une structure de santé.",
    description: "Solution d’organisation des dossiers, actes, rendez-vous et informations médicales selon les besoins des structures de santé.",
    features: ["Dossiers patients", "Rendez-vous", "Actes", "Documents", "Tableaux de bord", "Historique"],
    benefits: ["Dossiers plus accessibles", "Suivi des actes plus clair", "Traçabilité adaptée au contexte"],
    cta: "Digitaliser une structure de santé",
    relatedArticleSlugs: ["medilibre-vers-une-meilleure-organisation-des-dossiers-et-actes-medicaux"],
  },
  {
    slug: "sih-sur-mesure",
    name: "SIH sur mesure",
    category: "Santé",
    categorySlug: "sante",
    sector: "Public et privé",
    sectorKey: "deux",
    status: "Développement sur mesure",
    problem: "Structurer admissions, services, dossiers patients, actes, pharmacie selon besoin et indicateurs.",
    description: "Système d’information hospitalier adaptable aux besoins des établissements de santé.",
    features: ["Admissions", "Dossiers patients", "Services", "Actes", "Pharmacie selon besoin", "Statistiques", "Rôles utilisateurs"],
    benefits: ["Processus hospitaliers mieux documentés", "Données plus fiables", "Pilotage progressif par service"],
    cta: "Structurer un SIH",
    relatedArticleSlugs: ["sih-pourquoi-les-etablissements-de-sante-ont-besoin-de-donnees-fiables"],
  },
  {
    slug: "solutions-portuaires",
    name: "Solutions portuaires",
    category: "Ports, maritime et logistique",
    categorySlug: "ports-logistique",
    sector: "Public et privé",
    sectorKey: "deux",
    status: "Développement sur mesure",
    problem: "Structurer guichet unique maritime, PCS, escales, documents, laissez-passer et tableaux de bord.",
    description: "Solutions pour guichet unique maritime, Port Community System, gestion des escales, documents, laissez-passer, tableaux de bord et décarbonation.",
    features: ["Formalités portuaires", "Documents", "Acteurs portuaires", "Flux", "Autorisations", "Dashboards", "Interopérabilité"],
    benefits: ["Coordination renforcée", "Traçabilité des opérations", "Préparation plus crédible des projets portuaires"],
    cta: "Présenter un besoin portuaire",
    relatedArticleSlugs: ["guichet-unique-maritime-une-obligation-internationale-devenue-strategique-depuis-2024", "pourquoi-les-ports-ont-besoin-dun-port-community-system"],
  },
  {
    slug: "ia-documentaire-assistant-metier",
    name: "IA documentaire / assistant métier",
    category: "IA et données",
    categorySlug: "ia-donnees",
    sector: "Public et privé",
    sectorKey: "deux",
    status: "Développement sur mesure",
    problem: "Rechercher, résumer et exploiter des documents internes avec droits et citations.",
    description: "Assistant intelligent permettant de rechercher, résumer et exploiter des documents internes, textes, procédures ou bases de connaissance.",
    features: ["Recherche documentaire", "Réponses contextualisées", "Citations internes", "Génération de synthèses", "Modèles de courriers", "Gestion des droits"],
    benefits: ["Documents plus utiles", "Décision mieux informée", "Réponses cadrées par le corpus interne"],
    cta: "Créer un assistant métier",
    relatedArticleSlugs: ["assistants-metiers-et-rag-comment-rendre-les-documents-utiles-aux-decideurs", "comment-preparer-une-organisation-a-utiliser-lia-sans-risque"],
  },
  {
    slug: "infostracker",
    name: "Veille automatisée / InfosTracker",
    category: "IA, données et veille",
    categorySlug: "ia-donnees",
    sector: "Public et privé",
    sectorKey: "deux",
    status: "Concept structurable",
    problem: "Surveiller appels d’offres, textes, opportunités, actualités sectorielles et signaux stratégiques.",
    description: "Solution de veille automatisée sur appels d’offres, textes, opportunités, actualités sectorielles et informations stratégiques.",
    features: ["Sources à surveiller", "Alertes", "Classement", "Résumé", "Tableau de bord", "Export"],
    benefits: ["Moins d’opportunités manquées", "Veille mieux organisée", "Synthèses partageables"],
    cta: "Mettre en place une veille",
    relatedArticleSlugs: ["ami-reoi-appel-doffres-comment-preparer-une-organisation-a-repondre", "pourquoi-les-donnees-sont-devenues-un-actif-strategique"],
  },
];

const articleSeeds: ArticleSeed[] = [
  ["Pourquoi les ports ont besoin d’un Port Community System", "ports-maritime-logistique", ["Port Community System", "interopérabilité", "logistique"], ["solutions-portuaires"], "la coordination entre autorités, opérateurs privés et acteurs logistiques"],
  ["Guichet unique maritime : une obligation internationale devenue stratégique depuis 2024", "ports-maritime-logistique", ["guichet unique maritime", "FAL", "IMO", "ports"], ["solutions-portuaires"], "la conformité FAL et l’échange centralisé des informations d’arrivée, de séjour et de départ des navires", [{ label: "IMO - Maritime Single Window", url: "https://www.imo.org/en/OurWork/Facilitation/Pages/MaritimeSingleWindow-default.aspx" }, { label: "IMO - Convention FAL", url: "https://www.imo.org/en/About/Conventions/Pages/Convention-on-Facilitation-of-International-Maritime-Traffic-%28FAL%29.aspx" }]],
  ["Comment digitaliser la gestion des escales portuaires", "ports-maritime-logistique", ["escales", "planification", "port"], ["solutions-portuaires"], "la planification des arrivées, séjours et départs de navires"],
  ["Documents, laissez-passer et contrôle d’accès portuaire : pourquoi la traçabilité devient essentielle", "ports-maritime-logistique", ["contrôle d’accès", "laissez-passer", "sûreté"], ["solutions-portuaires"], "la gestion documentaire et les accès aux zones sensibles"],
  ["Tableaux de bord portuaires : piloter les flux, les délais et les recettes", "ports-maritime-logistique", ["dashboard", "indicateurs", "recettes"], ["solutions-portuaires"], "le pilotage des flux, délais, recettes et anomalies"],
  ["Décarbonation portuaire : comment la digitalisation peut réduire les temps d’attente et améliorer les flux", "ports-maritime-logistique", ["décarbonation", "flux", "performance"], ["solutions-portuaires"], "l’optimisation des temps d’attente et des flux logistiques"],
  ["Port Community System et Guichet Unique Maritime : quelle différence ?", "ports-maritime-logistique", ["PCS", "MSW", "interopérabilité"], ["solutions-portuaires"], "la différence entre conformité maritime et coordination communautaire portuaire"],
  ["Comment préparer un projet de modernisation portuaire finançable par des partenaires internationaux", "ports-maritime-logistique", ["bailleurs", "modernisation portuaire", "consortium"], ["solutions-portuaires"], "la structuration de projets portuaires crédibles pour les partenaires"],
  ["La digitalisation ne consiste pas seulement à créer un logiciel", "transformation-digitale-systemes-information", ["digitalisation", "processus", "conduite du changement"], ["digitalisation-procedures-administratives", "eam-gmao-sur-mesure"], "l’alignement entre procédures, utilisateurs et outils"],
  ["Comment réussir la digitalisation d’une procédure administrative", "transformation-digitale-systemes-information", ["procédure", "workflow", "GED"], ["digitalisation-procedures-administratives"], "le passage d’un parcours papier à un workflow exploitable"],
  ["GED, workflow et traçabilité : les bases d’une administration moderne", "transformation-digitale-systemes-information", ["GED", "workflow", "traçabilité"], ["digitalisation-procedures-administratives"], "la gestion documentaire et l’historique des décisions"],
  ["Pourquoi les systèmes d’information doivent être pensés pour les utilisateurs", "transformation-digitale-systemes-information", ["UX", "SI métier", "adoption"], ["mobilispro"], "l’adoption par les équipes métier et les usagers"],
  ["Les erreurs fréquentes dans les projets de digitalisation", "transformation-digitale-systemes-information", ["risques projet", "digitalisation", "gouvernance"], ["digitalisation-procedures-administratives"], "les pièges de cadrage, de gouvernance et de données"],
  ["Interopérabilité : pourquoi les logiciels publics et privés doivent mieux communiquer", "transformation-digitale-systemes-information", ["interopérabilité", "API", "données"], ["solutions-portuaires", "ia-documentaire-assistant-metier"], "les échanges fiables entre systèmes métiers"],
  ["Comment passer d’Excel à un vrai système d’information métier", "transformation-digitale-systemes-information", ["Excel", "SI métier", "reporting"], ["gestion-parc-auto", "comptabilia"], "la sortie progressive des fichiers isolés"],
  ["Pourquoi les données sont devenues un actif stratégique", "intelligence-artificielle-donnees", ["données", "pilotage", "stratégie"], ["infostracker", "ia-documentaire-assistant-metier"], "la valeur des données fiables pour décider"],
  ["Pourquoi les organisations doivent investir dans la qualité des données", "intelligence-artificielle-donnees", ["qualité des données", "gouvernance", "fiabilité"], ["ia-documentaire-assistant-metier"], "les règles de saisie, validation et consolidation"],
  ["Intelligence artificielle : opportunité réelle ou effet de mode ?", "intelligence-artificielle-donnees", ["IA", "stratégie", "risques"], ["ia-documentaire-assistant-metier"], "l’usage pragmatique de l’IA dans les organisations"],
  ["L’intelligence artificielle dans les administrations publiques", "intelligence-artificielle-donnees", ["IA publique", "GovTech", "données"], ["ia-documentaire-assistant-metier", "digitalisation-procedures-administratives"], "les cas d’usage publics encadrés et utiles"],
  ["Comment préparer une organisation à utiliser l’IA sans risque", "intelligence-artificielle-donnees", ["IA responsable", "sécurité", "gouvernance"], ["ia-documentaire-assistant-metier"], "les prérequis de sécurité, données et conduite du changement"],
  ["Assistants métiers et RAG : comment rendre les documents utiles aux décideurs", "intelligence-artificielle-donnees", ["RAG", "assistant métier", "documents"], ["ia-documentaire-assistant-metier"], "la recherche contextualisée dans les documents internes"],
  ["Automatisation : comment réduire les tâches répétitives sans déshumaniser le travail", "intelligence-artificielle-donnees", ["automatisation", "organisation", "RH"], ["siirh-sirhia", "digitalisation-procedures-administratives"], "l’automatisation des tâches à faible valeur ajoutée"],
  ["Modernisation administrative : pourquoi les citoyens attendent des services plus simples", "secteur-public-govtech", ["service public", "citoyen", "modernisation"], ["digitalisation-procedures-administratives"], "la simplification des démarches publiques"],
  ["Comment les tableaux de bord peuvent aider les décideurs publics", "secteur-public-govtech", ["tableaux de bord", "pilotage public", "indicateurs"], ["digitalisation-procedures-administratives"], "la consolidation d’indicateurs utiles aux décideurs"],
  ["Digitaliser sans exclure : penser les usagers peu à l’aise avec l’informatique", "secteur-public-govtech", ["inclusion", "UX", "service public"], ["digitalisation-procedures-administratives"], "l’accessibilité des services numériques"],
  ["Pourquoi les projets publics doivent intégrer la conduite du changement dès le départ", "secteur-public-govtech", ["conduite du changement", "projet public", "adoption"], ["digitalisation-procedures-administratives"], "l’adhésion des agents et bénéficiaires"],
  ["Services publics numériques : les critères d’une solution réellement utilisable", "secteur-public-govtech", ["GovTech", "utilisabilité", "procédures"], ["digitalisation-procedures-administratives"], "la simplicité, la fiabilité et le support utilisateur"],
  ["L’importance de la conduite du changement dans les projets", "solutions-humaines-organisation", ["changement", "organisation", "adoption"], ["siirh-sirhia"], "l’accompagnement humain des transformations"],
  ["RH et digitalisation : pourquoi l’humain doit rester au centre", "solutions-humaines-organisation", ["RH", "digitalisation", "expérience collaborateur"], ["siirh-sirhia"], "la digitalisation RH au service des équipes"],
  ["Externalisation RH : quand et pourquoi l’envisager", "solutions-humaines-organisation", ["externalisation RH", "organisation", "PME"], ["siirh-sirhia"], "les besoins RH que l’organisation ne peut pas toujours absorber seule"],
  ["Portage salarial : une solution flexible pour les entreprises et les projets", "solutions-humaines-organisation", ["portage salarial", "projet", "flexibilité"], ["siirh-sirhia"], "la mobilisation flexible de compétences"],
  ["Gestion des conflits sociaux : prévenir avant de réparer", "solutions-humaines-organisation", ["relations sociales", "prévention", "RH"], ["siirh-sirhia"], "la prévention par la documentation et le dialogue"],
  ["Administration du personnel : pourquoi la rigueur documentaire protège l’entreprise", "solutions-humaines-organisation", ["administration du personnel", "documents RH", "conformité"], ["siirh-sirhia"], "la tenue fiable des dossiers du personnel"],
  ["Comment réussir un projet financé par un bailleur", "gestion-projets-bailleurs", ["bailleurs", "gestion de projet", "reporting"], ["infostracker"], "la gouvernance, le suivi et la justification des résultats"],
  ["Pourquoi l’ancrage local est déterminant dans les projets internationaux", "gestion-projets-bailleurs", ["ancrage local", "consortium", "Madagascar"], ["infostracker"], "la connaissance du terrain et des parties prenantes"],
  ["Consortiums : comment structurer une réponse crédible à un appel d’offres", "gestion-projets-bailleurs", ["consortium", "appel d’offres", "partenariat"], ["infostracker"], "la répartition claire des rôles et références"],
  ["AMI, REOI, appel d’offres : comment préparer une organisation à répondre", "gestion-projets-bailleurs", ["AMI", "REOI", "appel d’offres"], ["infostracker"], "la veille, les pièces administratives et la capacité de réponse"],
  ["Suivi-évaluation : pourquoi les indicateurs doivent être pensés avant le projet", "gestion-projets-bailleurs", ["suivi-évaluation", "indicateurs", "projet"], ["digitalisation-procedures-administratives"], "les indicateurs dès la conception du projet"],
  ["Comment réduire les coûts cachés liés aux processus manuels", "gestion-projets-bailleurs", ["coûts cachés", "processus", "automatisation"], ["trackfuel360", "comptabilia"], "les pertes de temps et erreurs des processus non structurés"],
  ["Digitaliser un hôpital : par où commencer ?", "sante-justice-secteurs-reglementes", ["santé", "hôpital", "SIH"], ["sih-sur-mesure", "medilibre"], "la priorisation des flux hospitaliers et données patients"],
  ["SIH : pourquoi les établissements de santé ont besoin de données fiables", "sante-justice-secteurs-reglementes", ["SIH", "données santé", "pilotage"], ["sih-sur-mesure"], "la fiabilité des données hospitalières"],
  ["MediLibre : vers une meilleure organisation des dossiers et actes médicaux", "sante-justice-secteurs-reglementes", ["MediLibre", "dossier patient", "santé"], ["medilibre"], "l’organisation des dossiers et actes médicaux"],
  ["LawMate : comment la technologie peut aider les professionnels du droit", "sante-justice-secteurs-reglementes", ["LawMate", "juridique", "documents"], ["lawmate"], "l’organisation documentaire juridique"],
  ["Gestion des audiences : pourquoi la planification et la traçabilité sont essentielles", "sante-justice-secteurs-reglementes", ["audiences", "justice", "traçabilité"], ["gestion-des-audiences"], "la planification judiciaire et la traçabilité des décisions"],
  ["PenaLink : améliorer la communication entre justice et établissements pénitentiaires", "sante-justice-secteurs-reglementes", ["PenaLink", "justice", "pénitentiaire"], ["penalink"], "les échanges entre juridictions et établissements pénitentiaires"],
  ["Comptabilia : pourquoi les PME ont besoin d’un meilleur pilotage comptable", "finance-comptabilite-pilotage", ["Comptabilia", "PME", "comptabilité"], ["comptabilia"], "le pilotage comptable des PME et projets"],
  ["Automatiser la comptabilité sans perdre le contrôle", "finance-comptabilite-pilotage", ["comptabilité", "automatisation", "contrôle"], ["comptabilia"], "l’automatisation encadrée des traitements comptables"],
  ["Tableaux de bord financiers : ce que les dirigeants doivent suivre", "finance-comptabilite-pilotage", ["tableaux de bord", "finance", "dirigeants"], ["comptabilia"], "les indicateurs financiers utiles aux dirigeants"],
  ["Données financières : pourquoi la qualité de saisie détermine la qualité des décisions", "finance-comptabilite-pilotage", ["données financières", "saisie", "décision"], ["comptabilia"], "la qualité des écritures et pièces justificatives"],
  ["Contrôle interne : comment les outils numériques réduisent les erreurs et les oublis", "finance-comptabilite-pilotage", ["contrôle interne", "outils numériques", "finance"], ["comptabilia"], "la réduction des erreurs par les workflows et contrôles"],
].map(([title, category, tags, solutionSlugs, focus, references]) => ({
  title: title as string,
  slug: slugify(title as string),
  category: category as string,
  tags: tags as string[],
  solutionSlugs: solutionSlugs as string[],
  focus: focus as string,
  references: references as ArticleSeed["references"],
}));

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, "et")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

function buildArticle(seed: ArticleSeed, index: number): BlogArticle {
  const category = blogCategories.find((item) => item.slug === seed.category);
  const relatedSolutions = solutionsCatalog.filter((solution) => seed.solutionSlugs.includes(solution.slug));
  const solutionText = relatedSolutions.map((solution) => solution.name).join(", ") || "les solutions KCI/Soozey";
  const intro = `${seed.title} est un sujet concret pour les organisations qui veulent sécuriser leurs opérations, gagner en lisibilité et préparer des projets crédibles. L’enjeu n’est pas seulement technique : il touche aux procédures, aux responsabilités, aux données et à l’adoption par les équipes.`;
  const risk = seed.references
    ? "Depuis le 1er janvier 2024, l’Organisation Maritime Internationale indique que les États membres doivent utiliser un Maritime Single Window pour l’échange électronique des informations liées à l’arrivée, au séjour et au départ des navires. Une modernisation tardive peut entraîner des retards administratifs, réduire la compétitivité portuaire, compliquer l’interopérabilité et limiter la traçabilité."
    : `Ignorer ${seed.focus} peut créer des délais, des doubles saisies, des erreurs de suivi et une perte de confiance dans les informations disponibles. Les équipes finissent souvent par compenser avec des fichiers parallèles, ce qui rend les contrôles et les décisions plus fragiles.`;

  return {
    ...seed,
    metaTitle: `${seed.title} | KCI Soozey`,
    metaDescription: `Analyse KCI/Soozey sur ${seed.focus}, avec une approche pratique pour structurer, digitaliser et piloter les projets.`,
    excerpt: `Une lecture pratique pour comprendre ${seed.focus} et préparer une réponse structurée, progressive et exploitable.`,
    readTime: `${index % 3 === 0 ? 7 : index % 3 === 1 ? 6 : 5} min`,
    image: `linear-gradient(135deg, ${index % 2 === 0 ? "#eaf0ff, #e9f7ef" : "#f5f7fb, #dce9ff"})`,
    sections: [
      {
        title: "Pourquoi ce sujet est important",
        paragraphs: [
          intro,
          `Pour les décideurs publics, privés ou partenaires internationaux, ${seed.focus} doit être traité comme un élément de gouvernance. Une solution utile clarifie les rôles, standardise les informations et donne une base commune pour suivre les résultats.`,
        ],
      },
      {
        title: "Les risques si le sujet est ignoré",
        paragraphs: [
          risk,
          "Le risque principal est de confondre activité et maîtrise. Une organisation peut traiter beaucoup de dossiers sans disposer d’une vision fiable sur les délais, les responsabilités, les pièces manquantes ou les points de blocage.",
        ],
      },
      {
        title: "Les bénéfices d’une solution structurée",
        paragraphs: [
          "Une approche structurée permet de cartographier les procédures, de sécuriser les validations, de conserver l’historique et de produire des indicateurs utiles. Elle réduit la dépendance aux personnes clés et facilite la continuité de service.",
          "La digitalisation doit rester progressive. Le bon périmètre initial est celui qui apporte rapidement de la valeur sans fragiliser les équipes : formulaires clairs, droits adaptés, tableaux de bord lisibles, exports fiables et support opérationnel.",
        ],
      },
      {
        title: "Comment KCI/Soozey peut accompagner",
        paragraphs: [
          `KCI peut intervenir de la conception à l’implémentation : cadrage du besoin, analyse des procédures, structuration des données, coordination locale, suivi du déploiement et articulation avec ${solutionText}.`,
          "L’objectif est de proposer une solution honnête sur son niveau de maturité, adaptée au terrain et maintenable. KCI privilégie des parcours compréhensibles, des données vérifiables et des décisions appuyées par des éléments traçables.",
        ],
      },
    ],
  };
}

const blogArticles = articleSeeds.map(buildArticle);

const solutionCategories = [
  ["secteur-public", "Secteur public"],
  ["secteur-prive", "Secteur privé"],
  ["ressources-humaines", "Ressources humaines"],
  ["ports-logistique", "Ports & logistique"],
  ["sante", "Santé"],
  ["justice-juridique", "Justice & juridique"],
  ["finance-comptabilite", "Finance & comptabilité"],
  ["transport-mobilite", "Transport & mobilité"],
  ["ia-donnees", "IA & données"],
];

function setMeta(title: string, description: string, path: string, image = "/og-kci-soozey.png") {
  document.title = title;
  const metaDescription = document.querySelector('meta[name="description"]');
  metaDescription?.setAttribute("content", description);
  const ensure = (selector: string, attr: "property" | "name", key: string, content: string) => {
    let tag = document.querySelector(selector) as HTMLMetaElement | null;
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute(attr, key);
      document.head.appendChild(tag);
    }
    tag.setAttribute("content", content);
  };
  ensure('meta[property="og:title"]', "property", "og:title", title);
  ensure('meta[property="og:description"]', "property", "og:description", description);
  ensure('meta[property="og:type"]', "property", "og:type", path.startsWith("/blog/") ? "article" : "website");
  ensure('meta[property="og:image"]', "property", "og:image", image);
  ensure('meta[property="og:url"]', "property", "og:url", `https://www.soozey.com${path}`);
}

function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="breadcrumbs" aria-label="Fil d’Ariane">
      <a href="/">Accueil</a>
      {items.map((item) => (
        <React.Fragment key={item.label}>
          <span>/</span>
          {item.href ? <a href={item.href}>{item.label}</a> : <strong>{item.label}</strong>}
        </React.Fragment>
      ))}
    </nav>
  );
}

function BlogCard({ article }: { article: BlogArticle }) {
  const category = blogCategories.find((item) => item.slug === article.category);
  return (
    <article className="content-card">
      <a className="article-visual" style={{ background: article.image }} href={`/blog/${article.slug}`} aria-label={article.title}>
        <FileText size={30} aria-hidden="true" />
      </a>
      <div className="content-card-body">
        <div className="card-meta">
          <a className="badge" href={`/blog/categorie/${category?.slug ?? article.category}`}>
            {category?.title ?? article.category}
          </a>
          <span>{article.readTime}</span>
        </div>
        <h3>
          <a href={`/blog/${article.slug}`}>{article.title}</a>
        </h3>
        <p>{article.excerpt}</p>
        <div className="tag-row">
          {article.tags.slice(0, 3).map((tag) => (
            <a key={tag} href={`/blog/tag/${slugify(tag)}`}>
              #{tag}
            </a>
          ))}
        </div>
        <a className="text-link" href={`/blog/${article.slug}`}>
          Lire l’article <ArrowRight size={16} />
        </a>
      </div>
    </article>
  );
}

function BlogPage({ path }: { path: string }) {
  const [query, setQuery] = useState("");
  const [categorySlug, setCategorySlug] = useState("all");
  const parts = path.split("/").filter(Boolean);
  const articleSlug = parts[0] === "blog" && parts.length === 2 ? parts[1] : "";
  const routeCategory = parts[1] === "categorie" ? parts[2] : "";
  const routeTag = parts[1] === "tag" ? parts[2] : "";
  const article = blogArticles.find((item) => item.slug === articleSlug);

  useEffect(() => {
    if (article) {
      setMeta(article.metaTitle, article.metaDescription, `/blog/${article.slug}`);
      return;
    }
    const category = blogCategories.find((item) => item.slug === routeCategory);
    const tag = routeTag ? routeTag.replace(/-/g, " ") : "";
    const title = category ? `${category.title} | Blog KCI Soozey` : tag ? `Articles sur ${tag} | Blog KCI Soozey` : "Analyses & publications | KCI Soozey";
    const description = category?.description ?? "Digitalisation, intelligence artificielle, transformation publique, ports, RH, logistique et solutions métiers.";
    setMeta(title, description, path);
  }, [article, path, routeCategory, routeTag]);

  if (article) {
    const relatedSolutions = solutionsCatalog.filter((solution) => article.solutionSlugs.includes(solution.slug));
    const recommended = blogArticles.filter((item) => item.slug !== article.slug && (item.category === article.category || item.tags.some((tag) => article.tags.includes(tag)))).slice(0, 3);
    const category = blogCategories.find((item) => item.slug === article.category);
    const schema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: article.title,
      description: article.metaDescription,
      mainEntityOfPage: `https://www.soozey.com/blog/${article.slug}`,
      publisher: { "@type": "Organization", name: "KCI - Karibo Consulting & Implementation" },
    };

    return (
      <main className="page-main">
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
        <section className="section article-layout">
          <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: category?.title ?? "Article", href: `/blog/categorie/${article.category}` }, { label: article.title }]} />
          <article className="article-content">
            <div className="article-kicker">
              <span className="badge">{category?.title}</span>
              <span>{article.readTime}</span>
            </div>
            <h1>{article.title}</h1>
            <p className="lead">{article.excerpt}</p>
            {article.sections.map((section) => (
              <section key={section.title}>
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}
            {article.references && (
              <section>
                <h2>Références utiles</h2>
                <ul className="reference-list">
                  {article.references.map((reference) => (
                    <li key={reference.url}>
                      <a href={reference.url} target="_blank" rel="noreferrer">
                        {reference.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            <div className="article-cta">
              <h2>Vous souhaitez structurer un projet similaire ?</h2>
              <p>KCI peut vous accompagner de la conception à l’implémentation, avec une approche sobre, progressive et adaptée au terrain.</p>
              <a className="button button-primary" href="/#contact">
                Demander une consultation <Send size={18} />
              </a>
            </div>
          </article>
          <aside className="article-side">
            <h2>Solutions associées</h2>
            {relatedSolutions.map((solution) => (
              <a className="side-link" key={solution.slug} href={`/solutions/${solution.slug}`}>
                <strong>{solution.name}</strong>
                <span>{solution.status}</span>
              </a>
            ))}
            <h2>Articles recommandés</h2>
            {recommended.map((item) => (
              <a className="side-link" key={item.slug} href={`/blog/${item.slug}`}>
                <strong>{item.title}</strong>
                <span>{item.readTime}</span>
              </a>
            ))}
          </aside>
        </section>
      </main>
    );
  }

  const activeCategory = routeCategory || categorySlug;
  const filtered = blogArticles.filter((item) => {
    const matchesSearch = `${item.title} ${item.excerpt} ${item.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = activeCategory === "all" || !activeCategory ? true : item.category === activeCategory;
    const matchesTag = routeTag ? item.tags.some((tag) => slugify(tag) === routeTag) : true;
    return matchesSearch && matchesCategory && matchesTag;
  });
  const pageTitle = routeCategory ? blogCategories.find((item) => item.slug === routeCategory)?.title ?? "Catégorie" : routeTag ? `Tag : ${routeTag.replace(/-/g, " ")}` : "Analyses & publications";

  return (
    <main className="page-main">
      <section className="section page-hero">
        <Breadcrumbs items={[{ label: "Blog" }]} />
        <p className="eyebrow">Blog KCI / Soozey</p>
        <h1>{pageTitle}</h1>
        <p className="lead">Digitalisation, intelligence artificielle, transformation publique, ports, RH, logistique et solutions métiers.</p>
        <div className="filter-bar">
          <label>
            <span>Recherche</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher un article" />
          </label>
          <label>
            <span>Catégorie</span>
            <select value={activeCategory || "all"} onChange={(event) => setCategorySlug(event.target.value)}>
              <option value="all">Toutes les catégories</option>
              {blogCategories.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.title}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>
      <section className="section content-grid">
        {filtered.map((item) => (
          <BlogCard key={item.slug} article={item} />
        ))}
        {filtered.length === 0 && <p className="empty-state">Aucun article ne correspond à votre recherche.</p>}
      </section>
      <section className="section recommended-band">
        <div>
          <p className="eyebrow">Articles recommandés</p>
          <h2>Approfondir les sujets liés aux solutions KCI/Soozey</h2>
        </div>
        <div className="mini-list">
          {blogArticles.slice(0, 4).map((item) => (
            <a key={item.slug} href={`/blog/${item.slug}`}>
              {item.title}
            </a>
          ))}
        </div>
      </section>
      <section className="section cta-band">
        <h2>Vous avez un projet ? Parlons-en.</h2>
        <p>Présentez votre besoin à KCI pour cadrer une solution humaine, digitale ou opérationnelle.</p>
        <a className="button button-dark" href="/#contact">
          Demander une consultation
        </a>
      </section>
    </main>
  );
}

function SolutionCard({ solution }: { solution: Solution }) {
  return (
    <article className="solution-card" id={solution.slug}>
      <div className="solution-card-head">
        <span className="badge">{solution.status}</span>
        <span>{solution.sector}</span>
      </div>
      <h3>
        <a href={`/solutions/${solution.slug}`}>{solution.name}</a>
      </h3>
      <p>{solution.description}</p>
      <div className="feature-list compact">
        {solution.features.slice(0, 4).map((feature) => (
          <span key={feature}>
            <CheckCircle2 size={15} /> {feature}
          </span>
        ))}
      </div>
      <div className="solution-actions">
        <a className="button button-primary" href={`/#contact?solution=${solution.slug}`}>
          Demander une démo
        </a>
        <a className="button button-secondary" href={`/#contact?need=${solution.slug}`}>
          Discuter du besoin
        </a>
      </div>
    </article>
  );
}

function SolutionsPage({ path }: { path: string }) {
  const [query, setQuery] = useState("");
  const [sector, setSector] = useState("all");
  const [category, setCategory] = useState("all");
  const parts = path.split("/").filter(Boolean);
  const routeSlug = parts.length === 2 ? parts[1] : "";
  const routeCategory = solutionCategories.some(([slug]) => slug === routeSlug) ? routeSlug : "";
  const detail = routeSlug && !routeCategory ? solutionsCatalog.find((solution) => solution.slug === routeSlug) : undefined;

  useEffect(() => {
    if (detail) {
      setMeta(`${detail.name} | Catalogue KCI Soozey`, detail.description, `/solutions/${detail.slug}`);
      return;
    }
    const categoryLabel = solutionCategories.find(([slug]) => slug === routeCategory)?.[1];
    setMeta(categoryLabel ? `${categoryLabel} | Solutions KCI Soozey` : "Catalogue de solutions digitales | KCI Soozey", "Catalogue de solutions digitales, humaines et opérationnelles pour institutions, entreprises et partenaires internationaux.", path);
  }, [detail, path, routeCategory]);

  if (detail) {
    const relatedArticles = blogArticles.filter((article) => detail.relatedArticleSlugs.includes(article.slug)).slice(0, 4);
    return (
      <main className="page-main">
        <section className="section solution-detail">
          <Breadcrumbs items={[{ label: "Solutions", href: "/solutions" }, { label: detail.name }]} />
          <div>
            <p className="eyebrow">{detail.category}</p>
            <h1>{detail.name}</h1>
            <p className="lead">{detail.description}</p>
            <div className="card-meta">
              <span className="badge">{detail.status}</span>
              <span>{detail.sector}</span>
            </div>
          </div>
          <div className="detail-grid">
            <article>
              <h2>Problème traité</h2>
              <p>{detail.problem}</p>
            </article>
            <article>
              <h2>Bénéfices</h2>
              <ul>
                {detail.benefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
            </article>
            <article>
              <h2>Fonctionnalités principales</h2>
              <ul>
                {detail.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </article>
            <article>
              <h2>Articles associés</h2>
              {relatedArticles.map((article) => (
                <a className="side-link" key={article.slug} href={`/blog/${article.slug}`}>
                  <strong>{article.title}</strong>
                  <span>{article.readTime}</span>
                </a>
              ))}
            </article>
          </div>
          <div className="article-cta">
            <h2>{detail.cta}</h2>
            <p>Échangeons sur votre contexte, le niveau de maturité attendu et les contraintes de déploiement.</p>
            <a className="button button-primary" href="/#contact">
              Demander une démo <Send size={18} />
            </a>
          </div>
        </section>
      </main>
    );
  }

  const activeCategory = routeCategory || category;
  const filtered = solutionsCatalog.filter((solution) => {
    const matchesSearch = `${solution.name} ${solution.description} ${solution.category}`.toLowerCase().includes(query.toLowerCase());
    const matchesSector = sector === "all" || solution.sectorKey === sector || (sector === "deux" && solution.sectorKey === "deux");
    const matchesCategory = activeCategory === "all" || !activeCategory ? true : solution.categorySlug === activeCategory;
    return matchesSearch && matchesSector && matchesCategory;
  });

  return (
    <main className="page-main">
      <section className="section page-hero">
        <Breadcrumbs items={[{ label: "Solutions" }]} />
        <p className="eyebrow">Catalogue KCI / Soozey</p>
        <h1>Catalogue de solutions digitales</h1>
        <p className="lead">Solutions humaines, digitales et opérationnelles pour prospects publics, privés et internationaux.</p>
        <div className="filter-bar">
          <label>
            <span>Recherche</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher une solution" />
          </label>
          <label>
            <span>Secteur</span>
            <select value={sector} onChange={(event) => setSector(event.target.value)}>
              <option value="all">Tous</option>
              <option value="public">Public</option>
              <option value="prive">Privé</option>
              <option value="deux">Public et privé</option>
            </select>
          </label>
          <label>
            <span>Catégorie</span>
            <select value={activeCategory || "all"} onChange={(event) => setCategory(event.target.value)}>
              <option value="all">Toutes les catégories</option>
              {solutionCategories.map(([slug, label]) => (
                <option key={slug} value={slug}>
                  {label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="category-links">
          {solutionCategories.map(([slug, label]) => (
            <a key={slug} href={`/solutions/${slug}`}>
              {label}
            </a>
          ))}
        </div>
      </section>
      <section className="section solutions-grid">
        {filtered.map((solution) => (
          <SolutionCard key={solution.slug} solution={solution} />
        ))}
        {filtered.length === 0 && <p className="empty-state">Aucune solution ne correspond à votre recherche.</p>}
      </section>
      <section className="section cta-band">
        <h2>Vous ne trouvez pas votre besoin ?</h2>
        <p>KCI conçoit aussi des solutions sur mesure, à partir des procédures réelles et des contraintes terrain.</p>
        <a className="button button-dark" href="/#contact">
          Discuter du besoin
        </a>
      </section>
    </main>
  );
}

function App() {
  const [locale, setLocale] = useState<Locale>("fr");
  const [path, setPath] = useState(window.location.pathname);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [activeModuleId, setActiveModuleId] = useState(portModules.fr[0].id);
  const [activeRoleIndex, setActiveRoleIndex] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatChoice, setChatChoice] = useState("");
  const [activeChatIndex, setActiveChatIndex] = useState<number | null>(null);
  const t = content[locale];
  const modules = portModules[locale];
  const activeModule = modules.find((module) => module.id === activeModuleId) ?? modules[0];
  const ActiveModuleIcon = moduleIcons[Math.max(0, modules.findIndex((module) => module.id === activeModule.id))];
  const activeRole = t.roles[activeRoleIndex] ?? t.roles[0];
  const activeChat = activeChatIndex === null ? null : t.chatbot.choices[activeChatIndex];
  const isBlogRoute = path === "/blog" || path.startsWith("/blog/");
  const isSolutionsRoute = path === "/solutions" || path.startsWith("/solutions/");

  const navLinks = useMemo(
    () => [
      ["/#home", t.nav[0]],
      ["/solutions", "Catalogue"],
      ["/blog", "Blog"],
      ["/#port", t.nav[2]],
      ["/#sectors", t.nav[3]],
      ["/#contact", t.nav[5]],
    ],
    [t.nav],
  );

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    if (!isBlogRoute && !isSolutionsRoute) {
      setMeta(
        "KCI - Karibo Consulting & Implementation",
        "KCI accompagne les organisations publiques, privées et internationales dans le conseil, l’implémentation et la transformation digitale.",
        path,
      );
    }
  }, [isBlogRoute, isSolutionsRoute, path]);

  function switchLocale() {
    setLocale(locale === "fr" ? "en" : "fr");
    const fallbackModule = portModules[locale === "fr" ? "en" : "fr"].find((module) => module.id === activeModuleId);
    if (!fallbackModule) setActiveModuleId(portModules[locale === "fr" ? "en" : "fr"][0].id);
  }

  function prepareMail(subjectSeed: string, messageSeed = "") {
    const subject = encodeURIComponent(`KCI - ${subjectSeed}`);
    const body = encodeURIComponent(messageSeed);
    window.location.href = `mailto:contact@soozey.com?subject=${subject}&body=${body}`;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = String(form.get("organization") || "Nouveau projet");
    const body = [
      `${t.form.name}: ${form.get("name") || ""}`,
      `${t.form.email}: ${form.get("email") || ""}`,
      `${t.form.organization}: ${form.get("organization") || ""}`,
      "",
      `${t.form.message}:`,
      form.get("message") || "",
    ].join("\n");
    prepareMail(subject, body);
    setSent(true);
  }

  return (
    <>
      <header className="site-header">
        <a className="brand" href="/#home" aria-label="KCI home">
          <span>KCI</span>
          <small>Karibo Consulting & Implementation</small>
        </a>
        <nav className="desktop-nav" aria-label="Navigation principale">
          {navLinks.map(([href, label]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <button className="lang-switch" type="button" onClick={switchLocale}>
            <Languages size={16} aria-hidden="true" />
            {locale === "fr" ? "EN" : "FR"}
          </button>
          <a className="button button-dark" href="/#contact">
            {t.cta}
          </a>
          <button className="menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {menuOpen && (
          <nav className="mobile-nav" aria-label="Navigation mobile">
            {navLinks.map(([href, label]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}>
                {label}
              </a>
            ))}
            <a href="/#contact" onClick={() => setMenuOpen(false)}>
              {t.cta}
            </a>
          </nav>
        )}
      </header>

      {isBlogRoute ? (
        <BlogPage path={path} />
      ) : isSolutionsRoute ? (
        <SolutionsPage path={path} />
      ) : (
      <main id="home">
        <section className="hero section">
          <div className="hero-copy">
            <p className="eyebrow">{t.heroEyebrow}</p>
            <h1>{t.heroTitle}</h1>
            <p className="lead">{t.heroBody}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#solutions">
                {t.heroPrimary} <ArrowRight size={18} />
              </a>
              <a className="button button-secondary" href="#contact">
                {t.heroSecondary}
              </a>
            </div>
          </div>
          <div className="capability-panel" aria-label="Synthèse des capacités KCI">
            <div className="panel-header">
              <span>KCI</span>
              <small>{locale === "fr" ? "Capacités opérationnelles" : "Operational capabilities"}</small>
            </div>
            <div className="capability-grid">
              {t.heroBadges.map((badge, index) => {
                const Icon = solutionIcons[index % solutionIcons.length];
                return (
                  <a key={badge} href={index === 2 ? "#port" : "#solutions"} className="capability-card">
                    <Icon size={22} aria-hidden="true" />
                    <span>{badge}</span>
                  </a>
                );
              })}
            </div>
            <div className="metric-row">
              {t.heroMetrics.map(([value, label]) => (
                <div key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="solutions">
          <div className="section-heading">
            <p className="eyebrow">{t.sections.solutions}</p>
            <h2>{t.intro}</h2>
          </div>
          <div className="grid six">
            {t.solutions.map(([title, text], index) => {
              const Icon = solutionIcons[index];
              return (
                <article className="card" key={title}>
                  <Icon size={28} aria-hidden="true" />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="port-section" id="port">
          <div className="section port-inner">
            <div className="section-heading wide">
              <p className="eyebrow">{locale === "fr" ? "Focus métier" : "Business focus"}</p>
              <h2>{t.sections.port}</h2>
              <p>{t.portSubtitle}</p>
              <p>{t.portIntro}</p>
            </div>
            <div className="port-workbench">
              <div className="module-tabs" aria-label={t.sections.port}>
                {modules.map((module, index) => {
                  const Icon = moduleIcons[index];
                  const active = module.id === activeModule.id;
                  return (
                    <button
                      key={module.id}
                      type="button"
                      className={active ? "active" : ""}
                      onClick={() => setActiveModuleId(module.id)}
                      aria-pressed={active}
                    >
                      <Icon size={18} aria-hidden="true" />
                      {module.title}
                    </button>
                  );
                })}
              </div>
              <article className="module-detail">
                <div className="module-detail-header">
                  <div className="module-icon">
                    <ActiveModuleIcon size={30} aria-hidden="true" />
                  </div>
                  <div>
                    <h3>{activeModule.title}</h3>
                  </div>
                </div>
                <p>{activeModule.text}</p>
                <div className="feature-list">
                  {activeModule.features.map((feature) => (
                    <span key={feature}>
                      <CheckCircle2 size={16} aria-hidden="true" />
                      {feature}
                    </span>
                  ))}
                </div>
                <div className="module-note">
                  <ShieldCheck size={20} aria-hidden="true" />
                  <p>{activeModule.note}</p>
                </div>
                <button
                  className="button button-primary"
                  type="button"
                  onClick={() =>
                    prepareMail(
                      activeModule.title,
                      `${locale === "fr" ? "Bonjour KCI,\n\nJe souhaite échanger sur le sujet suivant : " : "Hello KCI,\n\nI would like to discuss: "}${activeModule.title}`,
                    )
                  }
                >
                  {locale === "fr" ? "Échanger sur ce sujet" : "Discuss this topic"} <Send size={18} />
                </button>
              </article>
            </div>
          </div>
        </section>

        <section className="section" id="problems">
          <div className="section-heading compact">
            <p className="eyebrow">{t.sections.problems}</p>
            <h2>{locale === "fr" ? "Des irritants concrets, traités avec méthode." : "Concrete issues handled with method."}</h2>
          </div>
          <div className="problem-grid">
            {t.problems.map((problem, index) => {
              const Icon = problemIcons[index % problemIcons.length];
              return (
                <article key={problem}>
                  <Icon size={22} aria-hidden="true" />
                  <p>{problem}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="role-section section" id="role">
          <div className="section-heading wide">
            <p className="eyebrow">{t.sections.role}</p>
            <h2>{locale === "fr" ? "Une position claire : conseil, coordination et implémentation locale." : "A clear position: advisory, coordination and local implementation."}</h2>
            <p>{t.roleText}</p>
          </div>
          <div className="grid six">
            {t.roles.map((role, index) => {
              const Icon = roleIcons[index];
              const active = index === activeRoleIndex;
              return (
                <button
                  className={active ? "role-card active" : "role-card"}
                  key={role.title}
                  type="button"
                  onClick={() => setActiveRoleIndex(index)}
                  aria-pressed={active}
                >
                  <Icon size={24} aria-hidden="true" />
                  <strong>{role.title}</strong>
                </button>
              );
            })}
          </div>
          <article className="role-detail">
            <div>
              <p className="eyebrow">{locale === "fr" ? "Détail du rôle" : "Role detail"}</p>
              <h3>{activeRole.title}</h3>
              <p>{activeRole.text}</p>
            </div>
            <div className="role-points">
              {activeRole.points.map((point) => (
                <span key={point}>
                  <CheckCircle2 size={16} aria-hidden="true" />
                  {point}
                </span>
              ))}
            </div>
          </article>
        </section>

        <section className="section" id="sectors">
          <div className="section-heading compact">
            <p className="eyebrow">{t.sections.sectors}</p>
            <h2>{locale === "fr" ? "Des interventions adaptées aux environnements exigeants." : "Services adapted to demanding environments."}</h2>
          </div>
          <div className="sector-list">
            {t.sectors.map((sector, index) => {
              const Icon = sectorIcons[index % sectorIcons.length];
              return (
                <a key={sector} href={index === 2 || index === 3 ? "#port" : "#contact"}>
                  <Icon size={22} aria-hidden="true" />
                  <span>{sector}</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </section>

        <section className="method section" id="method">
          <div className="section-heading compact">
            <p className="eyebrow">{t.sections.method}</p>
            <h2>{locale === "fr" ? "Une trajectoire claire du diagnostic à l’autonomie." : "A clear path from diagnosis to autonomy."}</h2>
          </div>
          <div className="timeline">
            {t.method.map(([title, text], index) => (
              <article key={title}>
                <div className="step-number">0{index + 1}</div>
                <BadgeCheck size={24} aria-hidden="true" />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="contact section" id="contact">
          <div>
            <p className="eyebrow">{t.sections.contact}</p>
            <h2>{t.contactTitle}</h2>
            <p>{t.contactText}</p>
            <div className="contact-line">
              <Mail size={18} />
              <a href="mailto:contact@soozey.com">contact@soozey.com</a>
            </div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              {t.form.name}
              <input name="name" required autoComplete="name" />
            </label>
            <label>
              {t.form.email}
              <input name="email" type="email" required autoComplete="email" />
            </label>
            <label>
              {t.form.organization}
              <input name="organization" required autoComplete="organization" />
            </label>
            <label>
              {t.form.message}
              <textarea key={chatChoice} name="message" required rows={5} defaultValue={chatChoice} />
            </label>
            <button className="button button-dark" type="submit">
              {t.form.send}
            </button>
            {sent && <p className="form-status">{t.form.success}</p>}
          </form>
        </section>
      </main>
      )}

      <aside className={`chatbot ${chatOpen ? "open" : ""}`} aria-live="polite">
        <button className="chat-toggle" type="button" onClick={() => setChatOpen(!chatOpen)} aria-expanded={chatOpen}>
          {chatOpen ? <X size={22} /> : <MessageCircle size={22} />}
          <span>{chatOpen ? t.chatbot.close : t.chatbot.open}</span>
        </button>
        {chatOpen && (
          <div className="chat-panel">
            <div className="chat-heading">
              <Bot size={22} aria-hidden="true" />
              <div>
                <strong>{t.chatbot.title}</strong>
                <p>{t.chatbot.intro}</p>
              </div>
            </div>
            <div className="chat-options">
              {t.chatbot.choices.map((choice, index) => (
                <button
                  key={choice.label}
                  type="button"
                  className={activeChatIndex === index ? "active" : ""}
                  onClick={() => {
                    setActiveChatIndex(index);
                    setChatChoice(`${choice.value}\n\n${choice.response}`);
                  }}
                >
                  {choice.label}
                </button>
              ))}
            </div>
            {activeChat && (
              <div className="chat-response">
                <strong>{activeChat.value}</strong>
                <p>{activeChat.response}</p>
              </div>
            )}
            <a className="button button-primary" href="/#contact" onClick={() => setChatOpen(false)}>
              {t.chatbot.contact} <ChevronDown size={18} />
            </a>
          </div>
        )}
      </aside>

      <footer>
        <div>
          <strong>KCI</strong>
          <p>{t.footer}</p>
        </div>
        <div className="footer-links">
          <a href="/solutions">Catalogue</a>
          <a href="/blog">Blog</a>
          <a href="/#contact">{t.nav[5]}</a>
        </div>
        <span>© 2026 KCI. Tous droits réservés.</span>
      </footer>
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
