import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ChevronDown,
  FileText,
  Globe2,
  Handshake,
  Landmark,
  Languages,
  Leaf,
  Mail,
  Menu,
  Network,
  Ship,
  ShieldCheck,
  UsersRound,
  X,
} from "lucide-react";
import "./styles.css";

type Locale = "fr" | "en";

const content = {
  fr: {
    nav: ["Accueil", "Solutions", "Secteurs", "Méthode", "Partenariats", "Contact"],
    cta: "Demander une consultation",
    heroEyebrow: "Conseil, mise en oeuvre et transformation digitale",
    heroTitle: "KCI structure et déploie des projets utiles, fiables et durables.",
    heroBody:
      "Karibo Consulting & Implementation accompagne les institutions, entreprises et partenaires internationaux dans la conception, la digitalisation et l'exécution opérationnelle de projets complexes.",
    heroPrimary: "Découvrir nos expertises",
    heroSecondary: "Présenter un projet",
    proof: ["Ancrage local", "Approche terrain", "Solutions digitales", "Transfert de compétences"],
    sections: {
      solutions: "Expertises",
      sectors: "Secteurs d'intervention",
      method: "Méthode projet",
      partnerships: "Partenariats",
      contact: "Contact",
    },
    intro:
      "Une offre intégrée pour sécuriser les décisions, fluidifier l'exécution et rendre les équipes autonomes après le déploiement.",
    solutions: [
      {
        title: "Conseil stratégique",
        text: "Cadrage, diagnostic, structuration de projets, feuille de route et aide à la décision pour directions générales et institutions.",
      },
      {
        title: "Implémentation terrain",
        text: "Coordination opérationnelle, conduite du changement, déploiement multi-acteurs et suivi des engagements jusqu'à la mise en service.",
      },
      {
        title: "Solutions digitales",
        text: "Conception de systèmes d'information, digitalisation de processus, tableaux de bord et intégrations adaptées aux contraintes métier.",
      },
      {
        title: "Solutions humaines",
        text: "Organisation RH, portage salarial, administration du personnel, paie externalisée et transfert de compétences.",
      },
    ],
    logisticsTitle: "Solutions portuaires, transport et chaînes logistiques",
    logisticsText:
      "KCI accompagne les acteurs publics et privés dans la modernisation des flux portuaires, documentaires et logistiques avec des plateformes traçables et interopérables.",
    modules: ["Guichet unique maritime", "Port Community System", "Gestion des escales", "Documents et laissez-passer", "Tableaux de bord", "Décarbonation"],
    sectors: [
      {
        title: "Secteur public",
        text: "Modernisation administrative, systèmes d'information métier, gouvernance de données et services centrés sur l'usager.",
      },
      {
        title: "Secteur privé",
        text: "Optimisation des processus internes, digitalisation RH, pilotage opérationnel et accompagnement des directions métiers.",
      },
      {
        title: "Partenaires internationaux",
        text: "Appui aux programmes, consortiums, ONG, bailleurs et acteurs de développement nécessitant un relais local fiable.",
      },
    ],
    method: [
      ["Diagnostiquer", "Comprendre le contexte, les risques, les acteurs et les contraintes réelles."],
      ["Structurer", "Définir la trajectoire, les responsabilités, les livrables et les indicateurs."],
      ["Déployer", "Piloter l'exécution avec des points de contrôle, des arbitrages et une traçabilité claire."],
      ["Pérenniser", "Former les équipes, documenter les pratiques et installer les mécanismes de suivi."],
    ],
    partnershipsText:
      "KCI crée des ponts entre expertise internationale et réalités locales à Madagascar, avec une attention particulière à la conformité, à la faisabilité et à l'impact mesurable.",
    contactTitle: "Vous avez un projet à cadrer ou à déployer ?",
    contactText:
      "Décrivez votre besoin. Le message ouvrira votre client email avec les informations saisies, sans stockage de données sur ce site statique.",
    form: {
      name: "Nom",
      email: "Email",
      organization: "Organisation",
      message: "Besoin",
      send: "Préparer l'email",
      success: "Votre email est prêt dans votre client de messagerie.",
    },
    footer: "Karibo Consulting & Implementation. Conseil stratégique et mise en oeuvre opérationnelle.",
  },
  en: {
    nav: ["Home", "Solutions", "Sectors", "Method", "Partnerships", "Contact"],
    cta: "Request a consultation",
    heroEyebrow: "Advisory, implementation and digital transformation",
    heroTitle: "KCI structures and delivers useful, reliable and lasting projects.",
    heroBody:
      "Karibo Consulting & Implementation supports institutions, companies and international partners in designing, digitizing and operationally delivering complex projects.",
    heroPrimary: "Explore our expertise",
    heroSecondary: "Submit a project",
    proof: ["Local grounding", "Field execution", "Digital solutions", "Skills transfer"],
    sections: {
      solutions: "Expertise",
      sectors: "Sectors",
      method: "Project method",
      partnerships: "Partnerships",
      contact: "Contact",
    },
    intro:
      "An integrated offer to secure decisions, streamline delivery and make teams autonomous after implementation.",
    solutions: [
      {
        title: "Strategic advisory",
        text: "Scoping, diagnosis, project structuring, roadmaps and decision support for executive teams and institutions.",
      },
      {
        title: "Field implementation",
        text: "Operational coordination, change management, multi-stakeholder rollout and commitment tracking through go-live.",
      },
      {
        title: "Digital solutions",
        text: "Information systems design, process digitization, dashboards and integrations aligned with business constraints.",
      },
      {
        title: "Human solutions",
        text: "HR organization, employer-of-record support, personnel administration, outsourced payroll and capability transfer.",
      },
    ],
    logisticsTitle: "Port, transport and logistics chain solutions",
    logisticsText:
      "KCI supports public and private operators in modernizing port, document and logistics flows with traceable and interoperable platforms.",
    modules: ["Maritime single window", "Port Community System", "Port call management", "Documents and passes", "Dashboards", "Decarbonization"],
    sectors: [
      {
        title: "Public sector",
        text: "Administrative modernization, business information systems, data governance and user-centered services.",
      },
      {
        title: "Private sector",
        text: "Internal process optimization, HR digitization, operational steering and support for business departments.",
      },
      {
        title: "International partners",
        text: "Support for programs, consortiums, NGOs, donors and development actors requiring a reliable local partner.",
      },
    ],
    method: [
      ["Diagnose", "Understand the context, risks, stakeholders and real constraints."],
      ["Structure", "Define the roadmap, responsibilities, deliverables and indicators."],
      ["Deliver", "Drive execution with checkpoints, arbitration and clear traceability."],
      ["Sustain", "Train teams, document practices and install monitoring mechanisms."],
    ],
    partnershipsText:
      "KCI bridges international expertise and local realities in Madagascar, with strong attention to compliance, feasibility and measurable impact.",
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
    footer: "Karibo Consulting & Implementation. Strategic advisory and operational delivery.",
  },
};

const solutionIcons = [Handshake, BriefcaseBusiness, Network, UsersRound];
const sectorIcons = [Landmark, Building2, Globe2];
const methodIcons = [ShieldCheck, FileText, Ship, BadgeCheck];

function App() {
  const [locale, setLocale] = useState<Locale>("fr");
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const t = content[locale];

  const navLinks = useMemo(
    () => [
      ["#home", t.nav[0]],
      ["#solutions", t.nav[1]],
      ["#sectors", t.nav[2]],
      ["#method", t.nav[3]],
      ["#partnerships", t.nav[4]],
      ["#contact", t.nav[5]],
    ],
    [t.nav],
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`KCI - ${String(form.get("organization") || "Nouveau projet")}`);
    const body = encodeURIComponent(
      [
        `${t.form.name}: ${form.get("name") || ""}`,
        `${t.form.email}: ${form.get("email") || ""}`,
        `${t.form.organization}: ${form.get("organization") || ""}`,
        "",
        `${t.form.message}:`,
        form.get("message") || "",
      ].join("\n"),
    );
    window.location.href = `mailto:contact@soozey.com?subject=${subject}&body=${body}`;
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
          <button className="lang-switch" type="button" onClick={() => setLocale(locale === "fr" ? "en" : "fr")}>
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
          <div className="hero-visual" aria-label="KCI operational strategy visual">
            <div className="visual-panel">
              <img src="/assets/partnerships.png" alt="KCI partnership strategy interface preview" />
            </div>
          </div>
        </section>

        <section className="proof-strip" aria-label="KCI strengths">
          {t.proof.map((item) => (
            <span key={item}>
              <CheckCircle2 size={18} /> {item}
            </span>
          ))}
        </section>

        <section className="section" id="solutions">
          <div className="section-heading">
            <p className="eyebrow">{t.sections.solutions}</p>
            <h2>{t.intro}</h2>
          </div>
          <div className="grid four">
            {t.solutions.map((item, index) => {
              const Icon = solutionIcons[index];
              return (
                <article className="card" key={item.title}>
                  <Icon size={28} aria-hidden="true" />
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="feature section">
          <div>
            <p className="eyebrow">{locale === "fr" ? "Focus métier" : "Business focus"}</p>
            <h2>{t.logisticsTitle}</h2>
            <p>{t.logisticsText}</p>
            <div className="module-list">
              {t.modules.map((module) => (
                <span key={module}>{module}</span>
              ))}
            </div>
          </div>
          <img src="/assets/logistics-platform.png" alt="KCI port and logistics digital solution preview" />
        </section>

        <section className="section" id="sectors">
          <div className="section-heading compact">
            <p className="eyebrow">{t.sections.sectors}</p>
            <h2>{locale === "fr" ? "Des interventions adaptées aux environnements exigeants." : "Services adapted to demanding environments."}</h2>
          </div>
          <div className="grid three">
            {t.sectors.map((item, index) => {
              const Icon = sectorIcons[index];
              return (
                <article className="card sector-card" key={item.title}>
                  <Icon size={28} aria-hidden="true" />
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="method section" id="method">
          <div className="section-heading compact">
            <p className="eyebrow">{t.sections.method}</p>
            <h2>{locale === "fr" ? "Une trajectoire claire du diagnostic à l'autonomie." : "A clear path from diagnosis to autonomy."}</h2>
          </div>
          <div className="timeline">
            {t.method.map(([title, text], index) => {
              const Icon = methodIcons[index];
              return (
                <article key={title}>
                  <div className="step-number">0{index + 1}</div>
                  <Icon size={24} aria-hidden="true" />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="partnership section" id="partnerships">
          <img src="/assets/public-sector.png" alt="KCI institutional and public sector preview" />
          <div>
            <p className="eyebrow">{t.sections.partnerships}</p>
            <h2>{locale === "fr" ? "Un relais local pour les projets nationaux et internationaux." : "A local bridge for national and international projects."}</h2>
            <p>{t.partnershipsText}</p>
            <a className="button button-primary" href="#contact">
              {locale === "fr" ? "Proposer un partenariat" : "Propose a partnership"} <ArrowRight size={18} />
            </a>
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
              <textarea name="message" required rows={5} />
            </label>
            <button className="button button-dark" type="submit">
              {t.form.send}
            </button>
            {sent && <p className="form-status">{t.form.success}</p>}
          </form>
        </section>
      </main>

      <footer>
        <div>
          <strong>KCI</strong>
          <p>{t.footer}</p>
        </div>
        <div className="footer-links">
          <a href="#solutions">{t.nav[1]}</a>
          <a href="#partnerships">{t.nav[4]}</a>
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
