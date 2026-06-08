import React, { useMemo, useState } from "react";
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
    roles: ["Ancrage local", "Coordination institutionnelle", "Structuration de projet", "Intégration fonctionnelle", "Suivi terrain", "Partenariats internationaux"],
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
        ["Je veux moderniser un port", "Projet portuaire / maritime / logistique"],
        ["Je cherche un partenaire local à Madagascar", "Partenariat ou consortium international"],
        ["Je veux digitaliser une procédure", "Solution digitale ou workflow administratif"],
        ["Je souhaite structurer un projet public", "Conseil, cadrage et déploiement institutionnel"],
        ["Je veux parler à KCI", "Demande de consultation"],
      ],
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
    roles: ["Local anchoring", "Institutional coordination", "Project structuring", "Functional integration", "Field monitoring", "International partnerships"],
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
        ["I want to modernize a port", "Port / maritime / logistics project"],
        ["I need a local partner in Madagascar", "Partnership or international consortium"],
        ["I want to digitize a procedure", "Digital solution or administrative workflow"],
        ["I need to structure a public project", "Advisory, scoping and institutional delivery"],
        ["I want to speak with KCI", "Consultation request"],
      ],
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

function App() {
  const [locale, setLocale] = useState<Locale>("fr");
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [activeModuleId, setActiveModuleId] = useState(portModules.fr[0].id);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatChoice, setChatChoice] = useState("");
  const t = content[locale];
  const modules = portModules[locale];
  const activeModule = modules.find((module) => module.id === activeModuleId) ?? modules[0];
  const ActiveModuleIcon = moduleIcons[Math.max(0, modules.findIndex((module) => module.id === activeModule.id))];

  const navLinks = useMemo(
    () => [
      ["#home", t.nav[0]],
      ["#solutions", t.nav[1]],
      ["#port", t.nav[2]],
      ["#sectors", t.nav[3]],
      ["#method", t.nav[4]],
      ["#contact", t.nav[5]],
    ],
    [t.nav],
  );

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
        <a className="brand" href="#home" aria-label="KCI home">
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
          <a className="button button-dark" href="#contact">
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
            <a href="#contact" onClick={() => setMenuOpen(false)}>
              {t.cta}
            </a>
          </nav>
        )}
      </header>

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
                    <p className="eyebrow">{locale === "fr" ? "Module actif" : "Active module"}</p>
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
              return (
                <article className="role-card" key={role}>
                  <Icon size={24} aria-hidden="true" />
                  <strong>{role}</strong>
                </article>
              );
            })}
          </div>
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
              {t.chatbot.choices.map(([label, value]) => (
                <button
                  key={label}
                  type="button"
                  className={chatChoice === value ? "active" : ""}
                  onClick={() => setChatChoice(value)}
                >
                  {label}
                </button>
              ))}
            </div>
            <a className="button button-primary" href="#contact" onClick={() => setChatOpen(false)}>
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
          <a href="#solutions">{t.nav[1]}</a>
          <a href="#port">{t.nav[2]}</a>
          <a href="#contact">{t.nav[5]}</a>
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
