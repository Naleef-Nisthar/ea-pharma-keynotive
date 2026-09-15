/**
 * Every word, link and colour on this site lives here.
 *
 * Sections import what they need by name and map over it. Nothing else in the
 * codebase hardcodes copy, so a content change never means opening a
 * component. Colours are consumed by src/app/layout.tsx, which injects them as
 * CSS custom properties; globals.css only maps them onto Tailwind token names.
 *
 * Conventions
 *  - `{braces}` inside a headline render in the accent colour (renderEmphasis).
 *  - `\n` inside a headline forces a line break.
 *  - `icon: "flask"` is a string key resolved by src/components/icon.tsx.
 *  - `{year}` in footer.copyright is replaced at render time.
 *  - Copy is British English throughout: programme, organisation, optimise,
 *    characterisation, modelling. Keep it that way.
 */

/* ── 01 · Brand ─────────────────────────────────────────────────────────── */

const KEYNOTIVE = "https://keynotive.io";
const UTM =
  "?utm_source=pharmaforward&utm_medium=referral&utm_campaign=pharma_microsite";

export const brand = {
  name: "Pharma Forward",
  /** Sits under the wordmark in the header and footer. */
  parentLine: "An initiative by Keynotive",
  operator: "Keynotive Limited",

  links: {
    /** The primary conversion target. Used by every main CTA. */
    programmes: `${KEYNOTIVE}/pharmaceutical-programmes${UTM}`,
    allProgrammes: `${KEYNOTIVE}/all-programmes${UTM}`,
    inHouse: `${KEYNOTIVE}/corporate-in-house-training${UTM}`,
    operator: `${KEYNOTIVE}${UTM}`,
    contact: `${KEYNOTIVE}/contact${UTM}`,
    privacy: `${KEYNOTIVE}/privacy-policy${UTM}`,
    terms: `${KEYNOTIVE}/terms-and-conditions${UTM}`,
    email: "contact@keynotive.io",
  },

  address: {
    line1: "71–75 Shelton Street",
    line2: "Covent Garden",
    city: "London WC2H 9JQ",
    country: "United Kingdom",
  },

  /**
   * Cool laboratory white rather than warm paper. The ground carries a faint
   * blue-cyan chroma (hue 220-230) so the neutrals read as authored instrument
   * surfaces rather than dead greys — a flat #71717a secondary is the single
   * clearest tell of an unconsidered palette.
   */
  color: {
    light: {
      background: "oklch(0.988 0.0025 228)", // near-white, faintly cool
      foreground: "oklch(0.215 0.026 253)", // deep slate ink
      card: "oklch(1 0 0)", // raised surface
      cardForeground: "oklch(0.215 0.026 253)",
      muted: "oklch(0.967 0.005 228)", // sunken surface
      mutedForeground: "oklch(0.512 0.021 245)", // tinted, never pure grey
      border: "oklch(0.912 0.008 235)", // hairlines
      accent: "oklch(0.665 0.118 190)", // deep teal — FILLS ONLY
      accentForeground: "oklch(0.995 0 0)",
      /**
       * Teal as TEXT on a light ground. The fill tone above reaches only
       * ~2.9:1 on this background — under the 4.5:1 minimum — so small teal
       * text uses this darker tone: 4.8:1 on the page ground, 5.1:1 on white.
       * Same hue, so the two read as one colour.
       */
      accentText: "oklch(0.505 0.096 191)",
      ink: "oklch(0.215 0.030 254)", // inverted band ground
      inkForeground: "oklch(0.972 0.004 228)",
    },
    dark: {
      background: "oklch(0.183 0.022 254)",
      foreground: "oklch(0.958 0.004 228)",
      card: "oklch(0.224 0.024 254)",
      cardForeground: "oklch(0.958 0.004 228)",
      muted: "oklch(0.252 0.023 254)",
      mutedForeground: "oklch(0.722 0.018 245)",
      border: "oklch(0.322 0.021 252)",
      accent: "oklch(0.742 0.132 188)",
      accentForeground: "oklch(0.172 0.022 254)",
      /** On dark grounds the brighter teal already clears 7:1. */
      accentText: "oklch(0.788 0.128 187)",
      ink: "oklch(0.145 0.020 254)",
      inkForeground: "oklch(0.965 0.004 228)",
    },
  },
} as const;

/* ── 02 · SEO ───────────────────────────────────────────────────────────── */

export const seo = {
  title: "Pharma Forward | Specialist Pharma & Life Sciences Training",
  description:
    "Explore specialist training for pharmaceutical, biotechnology and life sciences professionals across CMC, analytical development, biologics, bioprocessing, quality, pharmacometrics and regulatory science.",
  ogDescription:
    "Explore specialist training for pharmaceutical, biotechnology and life sciences professionals across CMC, analytical development, biologics, bioprocessing, quality, pharmacometrics and regulatory science. An initiative by Keynotive Limited.",
  twitterDescription:
    "Specialist masterclasses for pharmaceutical, biotechnology and life sciences professionals worldwide. An initiative by Keynotive Limited.",
  url: "https://pharmaforward.io",
  locale: "en_GB",
  keywords: [
    "pharmaceutical training",
    "CMC training",
    "analytical development",
    "bioprocessing training",
    "digital twins bioprocessing",
    "ICH Q14",
    "pharmacometrics",
    "regulatory science",
    "pharmaceutical quality",
    "life sciences masterclass",
  ],
} as const;

/* ── 03 · Navigation ────────────────────────────────────────────────────── */

export const nav = {
  items: [
    { label: "Training areas", href: "#training-areas" },
    { label: "Programmes", href: "#programmes" },
    { label: "Digital bioprocessing", href: "#digital-bioprocessing" },
    { label: "Who it's for", href: "#who-its-for" },
    { label: "Insights", href: "#insights" },
    { label: "About", href: "#about-keynotive" },
  ],
  cta: "Explore programmes",
} as const;

/* ── 04 · Hero ──────────────────────────────────────────────────────────── */

export const hero = {
  eyebrow: "Specialist pharmaceutical masterclasses",
  headline:
    "Practical pharmaceutical masterclasses for {complex scientific challenges}.",
  body: "Pharma Forward delivers specialist training for scientists, engineers and regulatory professionals across pharmaceutical development, manufacturing and quality. Led by experienced practitioners, our programmes translate evolving science and regulation into defensible decisions.",
  primaryCta: "Explore programmes",
  secondaryCta: "Browse training areas",
  secondaryHref: "#training-areas",
  footnote:
    "Practitioner-led technical masterclasses for global biopharma.",
} as const;

/* ── 05 · Participant organisations ─────────────────────────────────────── */

export const trustedBy = {
  id: "participant-organisations",
  eyebrow: "Across science, industry & regions",
  title:
    "Professionals from leading life sciences organisations have joined our programmes.",
  body: "Our masterclasses bring together scientists, technical specialists, quality professionals, regulatory experts and development teams from pharmaceutical and biotechnology organisations around the world.",
  footnote: "Selected organisations represented by previous participants.",
  items: [
    { name: "Novartis", category: "Global Pharmaceuticals" },
    { name: "Roche", category: "Biotechnology & Diagnostics" },
    { name: "AstraZeneca", category: "Biopharmaceuticals" },
    { name: "GSK", category: "Global Healthcare" },
    { name: "Sanofi", category: "Biopharmaceuticals" },
    { name: "Lonza", category: "Global CDMO & Biologics" },
    { name: "Pfizer", category: "Biopharmaceuticals" },
    { name: "Novo Nordisk", category: "Diabetes & Rare Disease" },
    { name: "Takeda", category: "Global Biopharma" },
    { name: "Boehringer Ingelheim", category: "Biopharmaceuticals" },
    { name: "Merck KGaA", category: "Science & Technology" },
    { name: "Janssen", category: "Pharmaceutical Companies of J&J" },
  ],
} as const;

/* ── 06 · What is changing ──────────────────────────────────────────────── */

export const shift = {
  id: "industry-evolution",
  eyebrow: "What's changing",
  title: "The science does not {stand still}.",
  body: "New modalities, sophisticated analytical technologies, evolving regulatory expectations, digitalisation and pressure to improve development and manufacturing efficiency are reshaping pharmaceutical and biopharmaceutical development.",
  fromLabel: "Traditional baseline",
  toLabel: "Current direction",
  items: [
    {
      title: "Analytical methods",
      icon: "flask",
      from: "Static testing protocols and end-product release verification.",
      to: "Lifecycle method management (ICH Q14/Q2(R2)), enhanced development, and real-time analytical control.",
    },
    {
      title: "Bioprocessing",
      icon: "dna",
      from: "Fixed batch processing with empirical recipe-driven unit operations.",
      to: "Continuous bioprocessing, perfusion systems, and hybrid mechanistic modelling.",
    },
    {
      title: "Regulatory science",
      icon: "file-check",
      from: "Prescriptive static compliance and reactive deficiency responses.",
      to: "Science- and risk-based regulatory submissions, structured justification, and lifecycle agility.",
    },
    {
      title: "Quality & CMC",
      icon: "shield-check",
      from: "Retrospective deviation logging and compliance-oriented paper trails.",
      to: "Proactive Quality Risk Management (ICH Q9 R1), automated data integrity, and holistic PQS.",
    },
    {
      title: "Data & digital",
      icon: "binary",
      from: "Siloed spreadsheets and disconnected laboratory run data.",
      to: "Digital twins, soft sensors, PAT integration, and continuous data pipelines.",
    },
    {
      title: "Pharmacometrics",
      icon: "activity",
      from: "Empirical dose finding and trial-and-error clinical titration.",
      to: "Model-Informed Drug Development (MIDD), exposure-response simulation, and mechanistic PK/PD.",
    },
  ],
} as const;

/* ── 07 · Core training areas ───────────────────────────────────────────── */

export const pillars = {
  id: "training-areas",
  eyebrow: "Specialist knowledge across the product lifecycle",
  title: "Explore our core {training areas}.",
  body: "Deep, specialist curricula delivered by practitioners to address evolving science, regulation and technical operations.",
  topicsLabel: "Core subject areas",
  featuredLabel: "Featured emerging focus",
  items: [
    {
      id: "analytical-cmc",
      icon: "flask",
      title: "Analytical Development & CMC",
      body: "Build deeper expertise in the scientific and regulatory principles underpinning pharmaceutical product development, analytical control strategies and lifecycle management.",
      cta: "Explore analytical development",
      topics: [
        "ICH Q14",
        "ICH Q2(R2)",
        "Method Lifecycle",
        "Impurity Profiling",
        "Stability Testing",
        "Dissolution Testing",
        "Method Transfer",
        "Specification Setting",
      ],
    },
    {
      id: "biologics-biopharma",
      icon: "dna",
      title: "Biologics & Biopharmaceuticals",
      body: "Explore the scientific challenges associated with complex biological products, from molecular characterisation and formulation to stability, aggregation and product development.",
      cta: "Explore biopharma",
      topics: [
        "Upstream Processing",
        "Downstream Purification",
        "CQA Assessment",
        "Comparability",
        "Formulation Strategy",
        "Technology Transfer",
        "Viral Safety",
        "Process Characterisation",
      ],
    },
    {
      id: "digital-bioprocessing",
      icon: "cpu",
      title: "Digital Bioprocessing & Process Intensification",
      body: "Explore how process science, data science, modelling and advanced control strategies can improve bioprocess understanding, robustness, productivity and manufacturing performance.",
      cta: "Explore digital bioprocessing",
      featured: true,
      topics: [
        "Digital Twins",
        "Process Analytical Technology (PAT)",
        "Hybrid Modelling",
        "Soft Sensors",
        "DoE & Advanced Analytics",
        "Continuous Bioprocessing",
        "Process Intensification",
        "Control Strategies",
      ],
    },
    {
      id: "drug-development",
      icon: "line-chart",
      title: "Drug Development & Pharmacometrics",
      body: "Strengthen the quantitative capabilities used to support dose selection, clinical development and evidence-based drug development decisions.",
      cta: "Explore drug development",
      topics: [
        "Non-Clinical Strategy",
        "Clinical Pharmacology",
        "Dose Selection & MIDD",
        "CMC Integration",
        "Target Product Profiles",
        "PK/PD Modelling",
        "Clinical Trial Design",
        "Pediatric Formulation",
      ],
    },
    {
      id: "quality-compliance",
      icon: "shield-check",
      title: "Pharmaceutical Quality & Compliance",
      body: "Develop practical approaches to quality systems, risk management, investigations, data integrity and regulatory compliance across pharmaceutical operations.",
      cta: "Explore quality & compliance",
      topics: [
        "Pharmaceutical Quality Systems",
        "Quality Risk Management (ICH Q9 R1)",
        "Data Integrity",
        "Deviation & CAPA",
        "Audit Preparedness",
        "Contamination Control",
        "Lifecycle Validation",
        "Root Cause Analysis",
      ],
    },
    {
      id: "drug-safety-regulatory",
      icon: "layers",
      title: "Drug Safety, Regulatory Science & Emerging Technologies",
      body: "Explore specialist topics at the intersection of medicine safety, regulatory science and emerging life sciences technologies.",
      cta: "Explore regulatory & safety topics",
      topics: [
        "Regulatory Strategy",
        "IND / CTA Submissions",
        "NDA / BLA Filings",
        "Benefit-Risk Assessment",
        "Signal Detection",
        "Post-Market Surveillance",
        "Risk Management Plans",
        "Regulatory Interactions",
      ],
    },
  ],
} as const;

/* ── 08 · Professional outcomes ─────────────────────────────────────────── */

export const outcomes = {
  id: "professional-outcomes",
  eyebrow: "Beyond the guidance",
  title: "Turn scientific knowledge into {better decisions}.",
  body: "The objective is not simply to know what a guideline says. Strong pharmaceutical professionals understand the science behind the requirement, the risks it is designed to address and how to apply it within real development and manufacturing environments.",
  items: [
    {
      title: "Deepen technical expertise",
      body: "Build stronger understanding of complex scientific concepts and their practical applications.",
    },
    {
      title: "Interpret regulatory expectations",
      body: "Understand how scientific and regulatory principles translate into practical requirements.",
    },
    {
      title: "Strengthen development decisions",
      body: "Connect evidence, product knowledge and regulatory strategy more effectively.",
    },
    {
      title: "Manage risk more effectively",
      body: "Apply structured, science-based approaches to quality, development and manufacturing risks.",
    },
    {
      title: "Learn from specialists",
      body: "Explore difficult subjects with practitioners and experts experienced in the field.",
    },
    {
      title: "Stay current",
      body: "Keep pace with developments affecting pharmaceutical science, regulation and manufacturing.",
    },
  ],
} as const;

/* ── 09 · Science into practice ─────────────────────────────────────────── */

export const argument = {
  eyebrow: "Science into practice",
  title: "Knowing the guidance is one thing.\nKnowing {what to do with it} is another.",
  body: [
    "Regulatory guidance provides the framework. The difficult part is often interpreting what it means for a particular molecule, analytical method, manufacturing process or development programme.",
    "Pharma Forward programmes are designed to bridge that gap by combining scientific principles, regulatory expectations and practical application.",
  ],
  cta: "Explore upcoming masterclasses",
  panels: [
    {
      label: "Regulatory guidance",
      icon: "file-text",
      body: "Sets broad expectations and scientific principles across products and modalities.",
    },
    {
      label: "Pharma Forward approach",
      icon: "wrench",
      body: "Explores how those principles translate into defensible studies, risk assessments, analytical strategies and operational decisions.",
      footnote: "Case-based learning · Practitioner-led",
      highlight: true,
    },
  ],
} as const;

/* ── 10 · Digital bioprocessing ─────────────────────────────────────────── */

export const bioprocess = {
  id: "digital-bioprocessing",
  eyebrow: "From data to process performance",
  title: "Better bioprocesses start with {better process understanding}.",
  body: "Modern bioprocessing increasingly depends on connecting process science, data, modelling and control. Digital twins, advanced data science and process intensification are creating new ways to understand, optimise and control complex biological processes.",
  items: [
    {
      metric: "Process knowledge",
      icon: "workflow",
      title: "Understand the process",
      body: "Connect CQAs, KPIs, CPPs and raw material attributes.",
    },
    {
      metric: "Data science",
      icon: "database",
      title: "Improve the data",
      body: "Extract meaningful process signal using structured preprocessing and feature engineering.",
    },
    {
      metric: "Hybrid models",
      icon: "git-merge",
      title: "Model the process",
      body: "Apply mechanistic, data-driven and hybrid modelling approaches.",
    },
    {
      metric: "Intensification",
      icon: "sliders",
      title: "Evaluate intensification",
      body: "Assess when intensified or continuous processing makes scientific and commercial sense.",
    },
    {
      metric: "Closed-loop",
      icon: "cpu",
      title: "Improve control",
      body: "Move from monitoring toward prediction and closed-loop control.",
    },
    {
      metric: "Governance",
      icon: "shield-check",
      title: "Build the digital foundation",
      body: "Strengthen data governance and process-data readiness.",
    },
  ],
  callout: {
    title: "Tool-agnostic. Method-driven.",
    body: "Our bioprocessing programmes focus on process science, modelling approaches and decision-making rather than promoting a particular software or technology vendor.",
    cta: "Explore digital bioprocessing training",
  },
} as const;

/* ── 11 · Featured programmes ───────────────────────────────────────────── */

export const programmes = {
  id: "programmes",
  eyebrow: "Current & upcoming training",
  title: "Specialist programmes for {complex challenges}.",
  body: "Interactive technical masterclasses led by domain practitioners. Small cohort formats focused on real datasets and practical implementation.",
  directoryCta: "View full directory on Keynotive",
  filterLabel: "Filter by area",
  filters: [
    { id: "all", label: "All programmes" },
    { id: "digital-bioprocessing", label: "Digital bioprocessing" },
    { id: "analytical-cmc", label: "Analytical & CMC" },
    { id: "biologics-biopharma", label: "Biologics" },
    { id: "drug-development", label: "Drug development" },
    { id: "quality-compliance", label: "Quality & risk" },
    { id: "drug-safety-regulatory", label: "Safety & regulatory" },
  ],
  labels: {
    takeaways: "Key technical objectives",
    attend: "Who should attend",
    topics: "Covered modules",
    overview: "Curriculum overview",
    register: "View dates & register",
    details: "View programme details",
    close: "Close",
    hosted: "Schedules & cohort registrations hosted on Keynotive",
    empty: "No programmes match that filter.",
    reset: "Show all programmes",
  },
  items: [
    {
      id: "digital-twins-bioprocessing",
      title:
        "Robust Bioprocesses by Design: Digital Twins & Data Science in Bioprocessing",
      category: "Digital Bioprocessing",
      pillarId: "digital-bioprocessing",
      body: "Explore how data science, process modelling and digital twins can strengthen process understanding, control strategies and bioprocess robustness.",
      topics: [
        "Digital Twins",
        "Data Science",
        "QbD",
        "Feature Engineering",
        "Hybrid Models",
        "Closed-Loop Control",
      ],
      trainerName: "Christoph Herwig, PhD",
      trainerRole: "Former Professor of Biochemical Engineering, TU Wien",
      takeaways: [
        "Master data preprocessing and feature engineering for high-dimensional bioprocess data",
        "Formulate static and dynamic digital twins rooted in Quality by Design (QbD)",
        "Combine mechanistic first-principles with data-driven machine learning in hybrid models",
        "Establish reliable closed-loop control architectures and robust data governance",
      ],
      attend: [
        "Bioprocess Development Scientists",
        "Process Modelling & Data Scientists",
        "MSAT Engineers",
        "PAT Scientists",
        "Heads of Bioprocess Development",
      ],
      overview:
        "This masterclass is tool-agnostic and focuses on scientific methods, modelling practice and sound decision-making rather than promoting any proprietary platform. Participants explore the complete progression from raw sensor streams to validated digital twins that support regulatory submissions and operational control.",
      href: `${KEYNOTIVE}/programmes/digital-twins-bioprocessing${UTM}`,
    },
    {
      id: "continuous-intensified-bioprocessing",
      title:
        "Continuous & Intensified Bioprocessing: Strategy, Feasibility & Control",
      category: "Bioprocess Development",
      pillarId: "digital-bioprocessing",
      body: "Evaluate when continuous processing makes scientific and commercial sense and explore methods for improving productivity through process intensification.",
      topics: [
        "Continuous Processing",
        "Perfusion",
        "Cell Retention",
        "Productivity",
        "Model-Based Design",
        "Process Control",
      ],
      trainerName: "Christoph Herwig, PhD",
      trainerRole: "Former Professor of Biochemical Engineering, TU Wien",
      takeaways: [
        "Conduct rigorous techno-economic feasibility assessments for continuous unit operations",
        "Evaluate perfusion systems, hollow-fibre filtration and acoustic cell retention",
        "Implement model-based experimental design to accelerate process intensification",
        "Design MIMO control frameworks to maintain steady-state operations",
      ],
      attend: [
        "Upstream & Downstream Process Scientists",
        "Fermentation Specialists",
        "Process Development Engineers",
        "Technical Operations Directors",
        "CMC Leads",
      ],
      overview:
        "The programme deliberately focuses on whether continuous processing is appropriate for a particular product and business case rather than assuming it is always the preferred approach. Teams gain practical decision trees to evaluate risk, capital expenditure, facility fit and regulatory paths.",
      href: `${KEYNOTIVE}/programmes/continuous-intensified-bioprocessing${UTM}`,
    },
    {
      id: "analytical-method-lifecycle",
      title:
        "Analytical Method Lifecycle Excellence: ICH Q14, Validation & Continuous Verification",
      category: "Analytical Development",
      pillarId: "analytical-cmc",
      body: "Explore lifecycle approaches to analytical procedures, method performance, risk management and evolving regulatory expectations.",
      topics: [
        "ICH Q14",
        "Method Lifecycle",
        "ATP Formulation",
        "Validation",
        "Control Strategy",
        "Continuous Verification",
      ],
      takeaways: [
        "Formulate Analytical Target Profiles (ATPs) aligned with modern lifecycle guidance",
        "Apply risk-based approaches to method development, validation and transfer",
        "Navigate ICH Q2(R2) and ICH Q14 requirements with defensible documentation",
        "Establish continuous method performance monitoring protocols",
      ],
      attend: [
        "Analytical Development Scientists & Managers",
        "QC Managers & Specialists",
        "Validation Engineers",
        "CMC Regulatory Affairs Managers",
      ],
      overview:
        "Analytical procedures require structured lifecycle stewardship from inception to retirement. This programme equips technical teams to build defensible analytical control strategies that withstand regulatory scrutiny globally.",
      href: `${KEYNOTIVE}/programmes/analytical-method-lifecycle${UTM}`,
    },
    {
      id: "chemical-drug-specifications",
      title:
        "Chemical Drug Specifications: Setting, Justifying & Defending Acceptance Criteria",
      category: "CMC & Regulatory Science",
      pillarId: "analytical-cmc",
      body: "Develop stronger approaches to establishing and justifying pharmaceutical specifications throughout the product lifecycle.",
      topics: [
        "ICH Q6A",
        "Impurities & Degradants",
        "Acceptance Criteria",
        "Release vs Shelf-Life",
        "Statistical Justification",
        "Defensible Strategy",
      ],
      takeaways: [
        "Translate clinical batch data and stability trends into scientifically sound limits",
        "Apply ICH Q3A/B and ICH M7 principles to organic, inorganic and mutagenic impurities",
        "Justify differences between release and end-of-shelf-life specifications",
        "Address common deficiency letters from FDA, EMA and PMDA",
      ],
      attend: [
        "CMC Directors & Managers",
        "Formulation Scientists",
        "Regulatory Affairs Specialists",
        "Quality Assurance Leads",
      ],
      overview:
        "Specifications are critical regulatory commitments. This course walks through the mathematical, chemical and clinical justifications required to defend specifications across global health authorities.",
      href: `${KEYNOTIVE}/programmes/chemical-drug-specifications${UTM}`,
    },
    {
      id: "biopharm-analytical-characterisation",
      title:
        "Biopharmaceutical Analytical Characterisation: Structural & Physicochemical Attributes",
      category: "Biologics",
      pillarId: "biologics-biopharma",
      body: "Explore scientific and regulatory approaches to the characterisation of complex biological products.",
      topics: [
        "Higher-Order Structure",
        "Mass Spectrometry",
        "Glycosylation Profiles",
        "Aggregation & Particles",
        "Biosimilar Comparability",
        "ICH Q6B",
      ],
      takeaways: [
        "Select orthogonal analytical techniques for primary, secondary and tertiary structure",
        "Characterise post-translational modifications (PTMs) including charge and glycan variants",
        "Quantify sub-visible and sub-micron particulate matters in parenterals",
        "Establish biosimilar analytical comparability packages",
      ],
      attend: [
        "Biopharmaceutical Scientists",
        "Large-Molecule Analytical Teams",
        "Formulation Developers",
        "Characterisation Group Leaders",
      ],
      overview:
        "Biologics exhibit inherent heterogeneity. This programme provides direct, case-driven guidance on building a robust analytical characterisation package that connects physicochemical data with biological activity.",
      href: `${KEYNOTIVE}/programmes/biopharmaceutical-characterisation${UTM}`,
    },
    {
      id: "advanced-pharmacometrics",
      title:
        "Advanced Pharmacometric Simulation & Modelling: Dose Selection & MIDD",
      category: "Drug Development",
      pillarId: "drug-development",
      body: "Strengthen the use of modelling and simulation to support clinical development, dose selection and decision-making.",
      topics: [
        "PopPK",
        "PK/PD Modelling",
        "MIDD",
        "Exposure-Response",
        "Covariate Analysis",
        "Dose Optimisation",
      ],
      takeaways: [
        "Construct nonlinear mixed-effects population models for diverse clinical populations",
        "Apply exposure-response models to optimise Phase 2/3 dose selection",
        "Utilise Model-Informed Drug Development (MIDD) to streamline paediatric and special population trials",
        "Communicate pharmacometric outputs effectively to clinicians and regulators",
      ],
      attend: [
        "Pharmacokineticists",
        "Pharmacometricians",
        "Clinical Pharmacologists",
        "Clinical Development Managers",
      ],
      overview:
        "Modern clinical development relies on quantitative pharmacology to de-risk trials and accelerate approval. This masterclass bridges complex mathematical modelling with concrete clinical decision-making.",
      href: `${KEYNOTIVE}/programmes/advanced-pharmacometrics${UTM}`,
    },
    {
      id: "quality-risk-management",
      title: "Quality Risk Management: Practical Application of ICH Q9(R1)",
      category: "Pharmaceutical Quality",
      pillarId: "quality-compliance",
      body: "Translate quality risk management principles into practical approaches to pharmaceutical decision-making.",
      topics: [
        "ICH Q9(R1)",
        "Risk Formalities",
        "Subjectivity Reduction",
        "FMEA & HACCP",
        "CAPA Integration",
        "Supply Chain Risk",
      ],
      takeaways: [
        "Implement the revision points of ICH Q9(R1), focusing on formality and subjectivity",
        "Integrate risk-based principles into deviations, CAPAs, change controls and audits",
        "Build defensible risk assessments that withstand regulatory inspections",
        "Establish cross-functional risk governance without creating bureaucratic inertia",
      ],
      attend: [
        "QA & QC Managers",
        "Compliance Officers",
        "Manufacturing Operations Managers",
        "Regulatory Compliance Professionals",
      ],
      overview:
        "Moving beyond rigid risk matrices toward genuine, science-based risk reduction: this course guides participants through real-world scenarios in manufacturing, analytical and supply chain environments.",
      href: `${KEYNOTIVE}/programmes/quality-risk-management${UTM}`,
    },
    {
      id: "pharmacovigilance-excellence",
      title:
        "Pharmacovigilance Excellence: Signal Management, PBRERs & Benefit-Risk Evaluation",
      category: "Drug Safety",
      pillarId: "drug-safety-regulatory",
      body: "Explore advanced approaches to benefit-risk evaluation, periodic safety reporting and signal detection.",
      topics: [
        "Signal Management",
        "PBRERs & PSURs",
        "Benefit-Risk Assessment",
        "RMPs",
        "GVP Modules",
        "Post-Market Surveillance",
      ],
      takeaways: [
        "Apply quantitative and qualitative signal detection methodologies",
        "Draft compliant, high-quality Periodic Benefit-Risk Evaluation Reports (PBRERs)",
        "Structure Risk Management Plans (RMPs) with proportionate pharmacovigilance activities",
        "Align safety operations with updated EU GVP and FDA post-market regulations",
      ],
      attend: [
        "Drug Safety Specialists",
        "Pharmacovigilance Officers & Managers",
        "Medical Reviewers",
        "QPPVs and Deputies",
      ],
      overview:
        "Pharmacovigilance continues to transition toward continuous, proactive benefit-risk management. Participants master both the scientific evaluation of complex safety signals and the operational rigor required for global compliance.",
      href: `${KEYNOTIVE}/programmes/pharmacovigilance-excellence${UTM}`,
    },
  ],
} as const;

/* ── 12 · How programmes work ───────────────────────────────────────────── */

export const approach = {
  eyebrow: "Designed for specialists",
  title: "Technical training should go {beyond the slides}.",
  body: "Our learning architecture is structured specifically for experienced technical and scientific teams requiring real discussion, defensible rationales and applied practice.",
  items: [
    {
      title: "Specialist-led",
      body: "Learn from experienced scientific, regulatory and industry specialists with deep subject expertise.",
    },
    {
      title: "Small, interactive cohorts",
      body: "Deliberately limited group sizes allow for technical questions, meaningful discussion and participant interaction.",
    },
    {
      title: "Practical application",
      body: "Move beyond high-level theory to explore real-world implementation, practical examples and common industry pitfalls.",
    },
    {
      title: "Case-based learning",
      body: "Explore real-world scenarios, case studies and practical frameworks reflecting common industry challenges.",
    },
    {
      title: "Current regulatory context",
      body: "Understand how scientific topics connect with current and emerging ICH, FDA and EMA expectations.",
    },
    {
      title: "Peer exchange",
      body: "Compare approaches with professionals from pharmaceutical, biotechnology and CDMO organisations facing similar technical challenges.",
    },
  ],
} as const;

/* ── 13 · Who it's for ──────────────────────────────────────────────────── */

export const audience = {
  id: "who-its-for",
  eyebrow: "Built for life sciences professionals",
  title: "Specialist knowledge for {specialist roles}.",
  body: "Pharma Forward programmes are designed for professionals working across pharmaceutical and biopharmaceutical development, manufacturing, quality, regulatory affairs and drug safety.",
  rolesLabel: "Representative functions",
  items: [
    {
      category: "Development & science",
      body: "Analytical scientists, CMC scientists, formulation scientists, biopharmaceutical scientists, pharmacokineticists and pharmacometricians.",
      roles: [
        "Analytical scientists",
        "CMC scientists",
        "Formulation scientists",
        "Biopharmaceutical scientists",
        "Pharmacokineticists",
        "Pharmacometricians",
      ],
    },
    {
      category: "Bioprocess & manufacturing",
      body: "Bioprocess development scientists, process engineers, MSAT teams, upstream and downstream specialists, PAT scientists, process modellers and automation engineers.",
      roles: [
        "Bioprocess development scientists",
        "Process engineers",
        "MSAT teams",
        "Upstream and downstream specialists",
        "PAT scientists",
        "Process modellers",
        "Automation engineers",
      ],
    },
    {
      category: "Quality & regulatory",
      body: "QA professionals, QC scientists, validation specialists, regulatory affairs managers, CMC regulatory directors and quality compliance teams.",
      roles: [
        "QA professionals",
        "QC scientists",
        "Validation specialists",
        "Regulatory affairs managers",
        "CMC regulatory directors",
        "Quality compliance teams",
      ],
    },
    {
      category: "Clinical & safety",
      body: "For professionals working across quantitative dose selection, clinical development, benefit-risk evaluation and post-market surveillance.",
      roles: [
        "Clinical development professionals",
        "Clinical pharmacologists",
        "Pharmacovigilance specialists",
        "Drug safety scientists",
        "Medical reviewers",
      ],
    },
    {
      category: "Technical leadership",
      body: "Heads of analytical development, heads of CMC, heads of bioprocessing, technical directors and R&D leaders.",
      roles: [
        "Heads of analytical development",
        "Heads of CMC",
        "Heads of bioprocessing",
        "Technical directors",
        "R&D leaders",
      ],
    },
  ],
} as const;

/* ── 14 · Product lifecycle ─────────────────────────────────────────────── */

export const lifecycle = {
  id: "product-lifecycle",
  eyebrow: "The product lifecycle is connected",
  title: "Better decisions happen when {disciplines connect}.",
  body: "Analytical development cannot be separated from CMC strategy. Process development affects manufacturing performance. Quality decisions influence regulatory outcomes. Formulation affects stability. Digitalisation affects how quickly process knowledge can be generated and applied.",
  disciplinesLabel: "Interfacing disciplines",
  questionsLabel: "Critical cross-functional questions",
  footnote:
    "Pharma Forward masterclasses align directly with these cross-functional inflection points.",
  /** Stage 04 opens by default — it is where most programmes concentrate. */
  defaultStage: "process-dev",
  items: [
    {
      id: "discovery",
      name: "Discovery",
      summary:
        "Target validation, hit-to-lead identification and initial candidate screening.",
      disciplines: ["Medicinal Chemistry", "Biophysics", "Early DMPK"],
      questions: [
        "Are physicochemical properties compatible with developability?",
        "What are early bioavailability and metabolic liabilities?",
      ],
    },
    {
      id: "development",
      name: "Development",
      summary:
        "Preclinical formulation, preliminary PK/PD, route scouting and initial safety margins.",
      disciplines: ["Formulation Science", "Preclinical Safety", "Pharmacometrics"],
      questions: [
        "Can exposure be sustained in vivo across species?",
        "How do early formulation choices impact stability?",
      ],
    },
    {
      id: "characterisation",
      name: "Characterisation",
      summary:
        "Detailed physicochemical, structural and biological attribute mapping for small molecules and biologics.",
      disciplines: ["Analytical Development", "Mass Spectrometry", "CMC Strategy"],
      questions: [
        "What are the critical quality attributes (CQAs) of the molecule?",
        "How do post-translational modifications influence efficacy and immunogenicity?",
      ],
    },
    {
      id: "process-dev",
      name: "Process Development",
      summary:
        "Upstream cell culture, downstream purification, chemical synthesis optimisation and DoE.",
      disciplines: ["Bioprocess Science", "PAT Specialists", "Data Science"],
      questions: [
        "What critical process parameters (CPPs) control CQAs?",
        "Can digital twins accelerate parameter optimisation?",
      ],
    },
    {
      id: "scale-up",
      name: "Scale-Up",
      summary:
        "Pilot batch manufacturing, tech transfer, process intensification and shear evaluation.",
      disciplines: ["MSAT", "Process Engineering", "Pilot Operations"],
      questions: [
        "Does volumetric productivity hold across geometric scale transitions?",
        "Is continuous processing economically viable for this asset?",
      ],
    },
    {
      id: "manufacturing",
      name: "Manufacturing",
      summary:
        "Commercial cGMP production, closed-loop process control, batch release and continuous verification.",
      disciplines: [
        "Technical Operations",
        "Automation Engineers",
        "Manufacturing Science",
      ],
      questions: [
        "Are process control loops maintaining steady-state robustness?",
        "How do raw material variations affect batch performance?",
      ],
    },
    {
      id: "quality",
      name: "Quality",
      summary:
        "Quality risk management, data integrity, deviation management, CAPA and validation.",
      disciplines: ["QA", "QC", "Validation Teams"],
      questions: [
        "How is ICH Q9(R1) formality applied to process deviations?",
        "Is the analytical procedure lifecycle continuously monitored?",
      ],
    },
    {
      id: "regulatory",
      name: "Regulatory",
      summary:
        "Module 3 CMC dossiers, specification defense, clinical pharmacology summaries and agency interactions.",
      disciplines: ["Regulatory Affairs", "CMC Leads", "Clinical Pharmacology"],
      questions: [
        "Are specifications justified through sound statistical and clinical rationales?",
        "How are model-informed drug development arguments presented?",
      ],
    },
    {
      id: "post-market",
      name: "Post-Market",
      summary:
        "Pharmacovigilance, signal detection, life cycle management and post-approval manufacturing changes.",
      disciplines: ["Drug Safety", "PV Specialists", "CMC Lifecycle Managers"],
      questions: [
        "What signals emerge from real-world exposure registries?",
        "How do post-approval variations impact marketing authorisations?",
      ],
    },
  ],
} as const;

/* ── 15 · Faculty ───────────────────────────────────────────────────────── */

export const faculty = {
  id: "trainers",
  eyebrow: "Learn from specialists",
  title: "Expertise {matters}.",
  body: "Pharma Forward programmes are delivered by experienced scientific, pharmaceutical and regulatory specialists selected for their depth of expertise in the subject being taught.",
  bioLabel: "Faculty profile & background",
  expertiseLabel: "Specialist expertise",
  programmesLabel: "Programmes led",
  footnote:
    "Additional specialist faculty are confirmed across curriculum modules and announced through programme registration.",
  items: [
    {
      id: "christoph-herwig",
      name: "Christoph Herwig, PhD",
      credentials: "PhD, Biochemical Engineering",
      title: "Former Professor of Biochemical Engineering, TU Wien",
      expertise: [
        "Bioprocess Data Science",
        "Digital Twins",
        "PAT",
        "QbD",
        "Process Intensification",
      ],
      programmesLed:
        "Digital Twins & Data Science in Bioprocessing; Continuous & Intensified Bioprocessing",
      bio: "Christoph Herwig trained as a bioprocess engineer at RWTH Aachen and holds a PhD in bioprocess identification from EPFL. From 2008 to 2023, he was Professor of Biochemical Engineering at TU Wien, where his work focused on data science, PAT and QbD approaches for biopharmaceutical process development. His industrial experience includes Lonza, and he founded Exputec, which developed data-science solutions for the biopharma lifecycle.",
    },
  ],
} as const;

/* ── 16 · Peer learning ─────────────────────────────────────────────────── */

export const community = {
  eyebrow: "Peer learning",
  title:
    "Learn alongside professionals facing the {same scientific challenges}.",
  body: "One of the most valuable aspects of specialist training is the exchange of experience between peers. Our cohorts bring together scientists, engineers, quality specialists and regulatory professionals from across pharmaceutical, biotechnology and CDMO organisations.",
  items: [
    {
      label: "Interactive cohorts",
      icon: "messages",
      title: "Cross-functional dialogue",
      body: "Compare how different organisations approach the same technical and regulatory challenges.",
    },
    {
      label: "Applied scenarios",
      icon: "help-circle",
      title: "Practical problem-solving",
      body: "Discuss real-world scenarios, edge cases and implementation hurdles with peers.",
    },
    {
      label: "Global network",
      icon: "network",
      title: "Scientific exchange",
      body: "Connect with professionals working across discovery, development, CMC, manufacturing and quality.",
    },
  ],
} as const;

/* ── 17 · Insights ──────────────────────────────────────────────────────── */

export const insights = {
  id: "insights",
  eyebrow: "Pharma Forward insights",
  title:
    "Perspectives on pharmaceutical development, {science and regulation}.",
  body: "Technical commentary, scientific perspectives and practical reflections from our trainers, specialists and contributors across the life sciences industry.",
  pendingLabel: "Publication in preparation",
  items: [
    {
      id: "digital-twins",
      category: "Digital Bioprocessing",
      status: "Coming soon",
      title: "Where Digital Twins Add Real Value in Bioprocess Development",
      summary:
        "A technical exploration of model-based design, hybrid modelling and real-time bioprocess data integration.",
    },
    {
      id: "continuous-bioprocessing",
      category: "Continuous Processing",
      status: "Coming soon",
      title: "When Does Continuous Bioprocessing Actually Make Sense?",
      summary:
        "Evaluating technical feasibility, facility constraints and economic realities beyond industry hype.",
    },
    {
      id: "analytical-lifecycle",
      category: "Analytical & CMC",
      status: "Coming soon",
      title:
        "What Lifecycle Management Means for Modern Analytical Procedures",
      summary:
        "Navigating ICH Q14 and Q2(R2) expectations for analytical procedure design, validation and ongoing monitoring.",
    },
    {
      id: "defensible-specifications",
      category: "CMC Strategy",
      status: "Coming soon",
      title: "From Development Data to Defensible Pharmaceutical Specifications",
      summary:
        "Bridging scientific characterisation, clinical relevance and regulatory justification under ICH Q6A/B.",
    },
  ],
} as const;

/* ── 18 · In-house training ─────────────────────────────────────────────── */

export const inHouse = {
  id: "in-house-training",
  eyebrow: "For teams & organisations",
  title: "Bring specialist pharmaceutical training to {your team}.",
  body: "Many of our programmes can be delivered in-house for pharmaceutical, biotechnology, CDMO and life sciences organisations.",
  teamsLabel: "Suitable for cross-functional groups",
  teams: [
    "Analytical development teams",
    "CMC teams",
    "Bioprocess development",
    "Process engineering",
    "MSAT teams",
    "Manufacturing science",
    "QA/QC departments",
    "Regulatory affairs",
    "Pharmacovigilance",
    "Digital bioprocessing",
    "R&D leaders",
    "Cross-functional development teams",
  ],
  primaryCta: "Enquire about in-house training",
  secondaryCta: "Learn about Keynotive corporate delivery",
  benefits: {
    heading: "Private delivery benefits",
    items: [
      "Customised to your team's specific focus areas, molecules, analytical platforms or operational challenges.",
      "Delivered by recognised subject specialists.",
      "Confidential discussion of real technical and operational questions.",
      "Flexible delivery: live online or on-site.",
    ],
  },
  publicSector: {
    heading: "Public sector & research bodies",
    body: "Programmes may also be relevant to professionals working in public-sector research organisations, universities, regulatory environments and translational research centres.",
  },
} as const;

/* ── 19 · FAQ ───────────────────────────────────────────────────────────── */

export const faq = {
  id: "faq",
  eyebrow: "Frequently asked questions",
  title: "Common questions regarding {Pharma Forward}.",
  body: "Details regarding curriculum depth, participation criteria, delivery formats and registration.",
  /** These two open on load; the rest stay collapsed. */
  defaultOpen: ["faq-1", "faq-4"],
  items: [
    {
      id: "faq-1",
      question: "What types of pharmaceutical training does Pharma Forward cover?",
      answer:
        "Pharma Forward focuses on specialist areas including analytical development, CMC, biologics, bioprocessing, digital twins, continuous processing, pharmacokinetics, pharmacometrics, pharmaceutical quality, regulatory compliance, pharmacovigilance and emerging life sciences technologies.",
    },
    {
      id: "faq-2",
      question: "Who are the programmes designed for?",
      answer:
        "Programmes are designed primarily for professionals working in pharmaceutical, biotechnology and life sciences organisations across scientific, technical, manufacturing, quality, regulatory and drug development functions.",
    },
    {
      id: "faq-3",
      question: "Are these introductory pharmaceutical courses?",
      answer:
        "Many Pharma Forward programmes focus on specialist and advanced topics and are designed for professionals seeking deeper technical understanding and practical application rather than general industry introductions.",
    },
    {
      id: "faq-4",
      question: "Do you offer bioprocessing training?",
      answer:
        "Yes. Training includes areas such as bioprocess optimisation, digital twins, data science, process modelling, process intensification, continuous bioprocessing and advanced process control.",
    },
    {
      id: "faq-5",
      question: "Can training be delivered privately for a company?",
      answer:
        "Selected programmes can be delivered as tailored or in-house training for pharmaceutical and life sciences organisations.",
    },
    {
      id: "faq-6",
      question: "Who operates Pharma Forward?",
      answer:
        "Pharma Forward is a specialist professional training and knowledge initiative operated by Keynotive Limited.",
    },
  ],
} as const;

/* ── 20 · About Keynotive ───────────────────────────────────────────────── */

export const about = {
  id: "about-keynotive",
  eyebrow: "Operated by Keynotive Limited",
  title: "A specialist {training and knowledge} initiative.",
  body: [
    "Pharma Forward is an initiative operated by Keynotive Limited, providing high-quality professional training, executive education and technical masterclasses for the pharmaceutical, biotechnology and life sciences sectors.",
    "Keynotive brings together subject-matter specialists, industry practitioners and senior leaders to deliver focused programmes that address evolving scientific, regulatory, digital and operational challenges.",
  ],
  footnote:
    "Keynotive produces specialist conferences, masterclasses and corporate training programmes across technical and heavily regulated industries.",
  badges: [
    "Practitioner-led content",
    "Global participant reach",
    "Focus on highly regulated industries",
  ],
  primaryCta: "Visit Keynotive",
  secondaryCta: "View all Keynotive programmes",
  card: {
    heading: "Operator information",
    registration: "Registered in England & Wales",
    role: "Specialist professional training",
    reach: "UK / Worldwide",
  },
} as const;

/* ── 21 · Final CTA ─────────────────────────────────────────────────────── */

export const finalCta = {
  eyebrow: "Advance your pharmaceutical expertise",
  title: "Keep pace with the science, data and regulation {shaping pharma}.",
  body: "Explore our current schedule of specialist masterclasses or contact us to discuss tailored in-house training for your organisation.",
  primaryCta: "Explore pharma programmes",
  secondaryCta: "Discuss team training",
  footnote: "An initiative operated by Keynotive Limited",
} as const;

/* ── 22 · Footer ────────────────────────────────────────────────────────── */

export const footer = {
  tagline:
    "Pharmaceutical Science · Biopharma · Quality · Drug Development · Digital Bioprocessing",
  blurb:
    "A specialist professional training and knowledge initiative operated by Keynotive Limited.",
  columns: [
    {
      heading: "Navigation",
      links: [
        { label: "Training areas", href: "#training-areas" },
        { label: "Featured programmes", href: "#programmes" },
        { label: "Digital bioprocessing", href: "#digital-bioprocessing" },
        { label: "Insights", href: "#insights" },
        { label: "In-house training", href: "#in-house-training" },
        { label: "About Keynotive", href: "#about-keynotive" },
      ],
    },
    {
      heading: "Governance",
      links: [
        { label: "Privacy policy", href: brand.links.privacy },
        { label: "Terms & conditions", href: brand.links.terms },
        { label: "Contact", href: brand.links.contact },
      ],
    },
  ],
  contactHeading: "Contact",
  disclaimer:
    "Keynotive Limited is a company registered in England and Wales. Pharma Forward is a professional training initiative operated by Keynotive Limited. Pharma Forward is not a pharmaceutical manufacturing company, does not manufacture or sell medicinal products, does not provide medical advice or patient care, and does not sponsor or conduct clinical trials.",
  copyright:
    "© {year} Keynotive Limited. All rights reserved. Registered in England and Wales.",
} as const;
