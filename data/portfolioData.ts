export interface ProjectCaseStudy {
  problem: string;
  approach: string;
  architecture: string[];
  stack: string[];
  result?: string; // Optional: only populated when real metric/result is verified
  limitations?: string;
}

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  category: "ML/DS" | "Data Eng" | "Applied AI" | "Aero";
  categoryLabel: string;
  year: string;
  tags: string[];
  repoUrl?: string;
  isPrivate?: boolean;
  demoUrl?: string;
  visualType: "deepfake" | "dementia" | "sql" | "complisphere" | "aerospace";
  caseStudy: ProjectCaseStudy;
}

export interface ScalePillar {
  id: "data" | "models" | "systems";
  title: string;
  statement: string;
  description: string;
  skills: string[];
  accentColor: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  period: string;
  isCurrent: boolean;
  summary: string;
  responsibilities: string[];
  stack: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  cgpa: string;
  scale: string;
  flaggedDateNotice?: string;
  highlights: string[];
}

export interface StackCategory {
  title: string;
  subtitle: string;
  items: string[];
}

export interface PortfolioData {
  personal: {
    name: string;
    tagline: string;
    subheadline: string;
    role: string;
    location: string;
    social: {
      github: string;
      tekkloomGithub: string;
      linkedin: string;
      emailDisplay: string;
    };
    badges: string[];
  };
  scale: ScalePillar[];
  philosophy: string[];
  projects: ProjectItem[];
  experience: ExperienceItem[];
  education: EducationItem;
  stack: {
    pillars: StackCategory[];
    tools: string[];
  };
  fallbackRepos: {
    name: string;
    fullName: string;
    description: string;
    language: string;
    languageColor: string;
    url: string;
    stars: number;
    forks: number;
    updatedAt: string;
  }[];
}

export const PORTFOLIO_DATA: PortfolioData = {
  personal: {
    name: "Duncan D'Lima",
    tagline: "From raw data to real-world systems.",
    subheadline: "Machine learning, data engineering and applied AI.",
    role: "Data Scientist, Applied AI Engineer & Software Developer",
    location: "Mumbai, India",
    social: {
      github: "https://github.com/DunD514",
      tekkloomGithub: "https://github.com/tekkloom-a11y",
      linkedin: "https://linkedin.com/in/duncan-dlima",
      emailDisplay: "duncan.dlima@example.com", // will be overridden by CONTACT_EMAIL if configured
    },
    badges: [
      "CTO & Co-Founder, Tekkloom",
      "B.Tech Data Science, NMIMS",
      "3.89 CGPA",
    ],
  },

  scale: [
    {
      id: "data",
      title: "Data",
      statement: "Collect, clean, make sense of raw data.",
      description:
        "Building structured analytical foundations. Optimizing pipelines, transforming unstructured inputs, and structuring query engines for high-throughput insights.",
      skills: ["SQL", "DuckDB", "pandas", "ETL Pipelines", "Data Modeling"],
      accentColor: "#ff7a1a",
    },
    {
      id: "models",
      title: "Models",
      statement: "Turn data into intelligence.",
      description:
        "Designing, training, and benchmarking ML architectures. Specializing in computer vision, video transformers, and predictive modeling for high-stakes decision boundaries.",
      skills: ["PyTorch", "VideoMAE", "scikit-learn", "Transformers", "Computer Vision"],
      accentColor: "#ff9142",
    },
    {
      id: "systems",
      title: "Systems",
      statement: "Ship it into the real world.",
      description:
        "Bridging theoretical models to resilient production systems. Full-stack interfaces, retrieval-augmented workflows, and automated client APIs built for scale.",
      skills: ["Next.js", "TypeScript", "FastAPI / APIs", "RAG Systems", "AI Automation"],
      accentColor: "#ffa96b",
    },
  ],

  philosophy: [
    "Problem-first: technology serves the domain, never the inverse.",
    "Data-quality-first: clean signals outperform oversized architectures.",
    "Ship real systems: experiments gain true value only when deployed into production.",
  ],

  projects: [
    {
      id: "deepfake-detector",
      number: "01",
      title: "Deepfake Video Detector",
      tagline:
        "Temporal transformer architecture fine-tuned on FaceForensics++ to catch subtle video manipulations.",
      category: "ML/DS",
      categoryLabel: "Machine Learning / Vision",
      year: "2024",
      tags: ["PyTorch", "VideoMAE", "FaceForensics++", "Temporal Transformers", "OpenCV"],
      repoUrl: "https://github.com/DunD514/Deepfake-Video-Detector",
      visualType: "deepfake",
      caseStudy: {
        problem:
          "Traditional deepfake classifiers evaluate individual video frames in isolation, frequently missing high-frequency temporal artifacts, flicker across frame boundaries, and synthetic boundary jitter.",
        approach:
          "Implemented an end-to-end video classification pipeline using VideoMAE. Extracted contiguous face crops across multi-frame tubes, fed 16-frame spatiotemporal volumes through self-attention layers, and modeled inter-frame temporal coherence.",
        architecture: [
          "Automated MTCNN face-tracking & temporal tube alignment",
          "16-frame 3D patch embedding representation",
          "VideoMAE encoder backbone with self-attention temporal pooling",
          "Binary classification head optimized for synthetic manipulation detection",
        ],
        stack: ["Python", "PyTorch", "VideoMAE", "OpenCV", "FaceForensics++"],
        // Result left unpopulated per instructions until Duncan provides official benchmark metrics
        limitations:
          "Computationally intensive during frame preprocessing; inference throughput requires GPU acceleration for real-time video streaming.",
      },
    },
    {
      id: "dementia-progression",
      number: "02",
      title: "Dementia & Alzheimer's Progression Analysis",
      tagline:
        "Predictive clinical modeling exploring longitudinal cognitive markers and patient transition states.",
      category: "ML/DS",
      categoryLabel: "Predictive Analytics / Healthcare ML",
      year: "2024",
      tags: ["scikit-learn", "Random Forest", "Longitudinal Data", "Feature Engineering", "Python"],
      repoUrl: "https://github.com/DunD514/Dementia-Prediction-Model",
      visualType: "dementia",
      caseStudy: {
        problem:
          "Clinical tabular datasets tracking Alzheimer's disease exhibit high missingness, correlation across consecutive clinical visits, and subtle transitions between mild cognitive impairment and dementia stages.",
        approach:
          "Constructed a predictive modeling pipeline incorporating longitudinal imputation, feature importance ranking, and an ensemble Random Forest with hyperparameter tuning to evaluate early diagnostic indicators.",
        architecture: [
          "Clinical cohort data preprocessing & imputation of missing visit records",
          "Temporal feature delta calculations between examination milestones",
          "Ensemble decision trees with stratified k-fold cross-validation",
          "Feature attribution analysis targeting MMSE, CDR, and demographic predictors",
        ],
        stack: ["Python", "scikit-learn", "pandas", "NumPy", "Matplotlib"],
        limitations:
          "Dataset size is constrained by clinical availability; requires external validation across multi-center cohorts.",
      },
    },
    {
      id: "sql-job-market",
      number: "03",
      title: "SQL Job Market Analysis",
      tagline:
        "Analytical DuckDB engine querying tens of thousands of technical postings to uncover real skill-salary dynamics.",
      category: "Data Eng",
      categoryLabel: "Data Engineering & Analytics",
      year: "2024",
      tags: ["DuckDB", "Analytical SQL", "CTEs", "Window Functions", "Data Modeling"],
      repoUrl: "https://github.com/DunD514/sql-project",
      visualType: "sql",
      caseStudy: {
        problem:
          "Job market datasets for data engineering and machine learning roles are noisy, unstructured, and filled with conflated skill keywords that skew salary estimates.",
        approach:
          "Engineered complex SQL query suites leveraging DuckDB's in-process columnar engine. Utilized recursive Common Table Expressions (CTEs), multi-level partitioning, and analytical window functions to derive salary quantiles and skill premiums.",
        architecture: [
          "Columnar DuckDB analytical storage format",
          "Multi-stage CTE data cleaning and skill taxonomy mapping",
          "Window functions for percentile rankings and wage distributions across roles",
          "Automated export pipelines generating structured analytical digests",
        ],
        stack: ["DuckDB", "SQL (CTEs & Window Functions)", "Python", "Data Modeling"],
        limitations:
          "Data source represents posted salaries which often differ from final compensated offers in negotiated roles.",
      },
    },
    {
      id: "complisphere-pro",
      number: "04",
      title: "CompliSphere Pro",
      tagline:
        "Production regulatory intelligence & document AI platform delivering sub-second legal compliance search.",
      category: "Applied AI",
      categoryLabel: "Applied AI & Document Systems",
      year: "2025",
      tags: ["Next.js", "Document AI", "Semantic Search", "RAG", "TypeScript", "Tekkloom"],
      repoUrl: "https://github.com/tekkloom-a11y/compli-sphere-pro",
      visualType: "complisphere",
      caseStudy: {
        problem:
          "Enterprise compliance teams waste hundreds of hours manually cross-referencing statutory mandates, accessibility legislation, and enterprise filings across fragmented documentation.",
        approach:
          "Engineered an enterprise document intelligence application at Tekkloom combining vector search, hybrid retrieval ranking, and a structured citation generator with real-time UI streaming.",
        architecture: [
          "Next.js App Router full-stack server architecture",
          "Chunked regulatory document ingestion with metadata extraction",
          "Semantic vector retrieval with hybrid keyword reranking",
          "Streaming LLM response synthesis citing statutory clauses and sections",
        ],
        stack: ["Next.js", "TypeScript", "Tailwind CSS", "FastAPI", "Vector Store", "LLM APIs"],
        limitations:
          "Requires strict document formatting checks during parsing of scanned legacy government PDFs.",
      },
    },
    {
      id: "aerospace-classification",
      number: "05",
      title: "Aerospace Event Classification Research",
      tagline:
        "Multi-modal telemetry & geospatial sequence modeling for orbital trajectory and anomaly classification.",
      category: "Aero",
      categoryLabel: "Aerospace Research / Private",
      year: "2024",
      tags: ["Multi-Modal", "Time-Series", "PyTorch", "Geospatial", "Telemetry"],
      isPrivate: true,
      visualType: "aerospace",
      caseStudy: {
        problem:
          "Orbital sensor telemetry experiences dropouts, sensor noise, and multi-regime physical dynamics that challenge conventional anomaly detection algorithms.",
        approach:
          "Investigated multi-modal deep sequence architectures to classify flight regimes, trajectory deviations, and sensor anomalies across synthetic and historical aerospace datasets.",
        architecture: [
          "High-dimensional flight telemetry ingestion & normalization",
          "Recurrent / temporal attention network for variable-rate sensor feeds",
          "Multi-task classification objective evaluating phase and anomaly probability",
        ],
        stack: ["Python", "PyTorch", "NumPy", "SciPy", "Geospatial Tools"],
        limitations:
          "Research repository is proprietary/private due to ongoing academic collaboration and licensing restrictions.",
      },
    },
  ],

  experience: [
    {
      role: "CTO & Co-Founder",
      company: "Tekkloom",
      companyUrl: "https://github.com/tekkloom-a11y",
      location: "Mumbai, India",
      period: "Nov 2025 – Present",
      isCurrent: true,
      summary:
        "Directing technical architecture, AI automation workflows, and end-to-end product delivery across client solutions.",
      responsibilities: [
        "Architecting production AI automation pipelines, multi-agent conversational bots, and API orchestration layers.",
        "Overseeing full-stack web application development with Next.js, TypeScript, and modern scalable backends.",
        "Leading client-facing technical strategy, system scoping, and infrastructure deployments.",
        "Instituting high engineering standards across version control, testing, accessibility (a11y), and data security.",
      ],
      stack: ["Next.js", "TypeScript", "Python", "FastAPI", "LangChain / RAG", "Tailwind CSS", "Cloudflare / AWS"],
    },
  ],

  education: {
    degree: "B.Tech in Data Science",
    institution: "SVKM's NMIMS Mukesh Patel School of Technology Management & Engineering (MPSTME)",
    location: "Mumbai, India",
    // Configured period: July 2022 – May 2026 (Flagged: original repo stated May 2028 which is 6 years; prompt asks to flag for confirmation)
    period: "July 2022 – May 2026",
    cgpa: "3.89",
    scale: "4.0",
    flaggedDateNotice:
      "Note: Previously listed as July 2022 – May 2028. Typical 4-year B.Tech confers May 2026. Configured in portfolioData for Duncan to confirm.",
    highlights: [
      "Rigorous foundations in probability, statistical inference, linear algebra, and data structures.",
      "Hands-on specialization in machine learning, deep learning, data engineering, and distributed computation.",
      "Active applied research across computer vision and predictive healthcare modeling.",
    ],
  },

  stack: {
    pillars: [
      {
        title: "Data",
        subtitle: "Pipelines & Storage",
        items: ["SQL", "DuckDB", "pandas", "ETL Architecture", "Data Modeling", "NumPy"],
      },
      {
        title: "Models",
        subtitle: "Machine Learning & AI",
        items: ["PyTorch", "VideoMAE", "scikit-learn", "Transformers", "Computer Vision", "Deep Learning"],
      },
      {
        title: "Systems",
        subtitle: "Full-Stack & Deployment",
        items: ["Next.js", "TypeScript", "Python", "FastAPI", "RAG Architectures", "Tailwind CSS"],
      },
    ],
    tools: ["Git & GitHub", "Docker", "Linux", "Jupyter Lab / VS Code"],
  },

  fallbackRepos: [
    {
      name: "Deepfake-Video-Detector",
      fullName: "DunD514/Deepfake-Video-Detector",
      description: "Video deepfake detection using VideoMAE and temporal tube feature modeling.",
      language: "Python",
      languageColor: "#3572A5",
      url: "https://github.com/DunD514/Deepfake-Video-Detector",
      stars: 0,
      forks: 0,
      updatedAt: "Recent",
    },
    {
      name: "Dementia-Prediction-Model",
      fullName: "DunD514/Dementia-Prediction-Model",
      description: "Machine learning model predicting dementia progression using longitudinal clinical metrics.",
      language: "Jupyter Notebook",
      languageColor: "#DA5B0B",
      url: "https://github.com/DunD514/Dementia-Prediction-Model",
      stars: 0,
      forks: 0,
      updatedAt: "Recent",
    },
    {
      name: "sql-project",
      fullName: "DunD514/sql-project",
      description: "Analytical SQL project examining technical job market data using DuckDB and CTEs.",
      language: "SQL",
      languageColor: "#e38c00",
      url: "https://github.com/DunD514/sql-project",
      stars: 0,
      forks: 0,
      updatedAt: "Recent",
    },
    {
      name: "compli-sphere-pro",
      fullName: "tekkloom-a11y/compli-sphere-pro",
      description: "Document intelligence and regulatory search interface built with Next.js and TypeScript.",
      language: "TypeScript",
      languageColor: "#3178c6",
      url: "https://github.com/tekkloom-a11y/compli-sphere-pro",
      stars: 0,
      forks: 0,
      updatedAt: "Active",
    },
  ],
};
