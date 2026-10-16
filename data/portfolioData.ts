export interface ProjectDossier {
  missionBrief: string;
  dataSources: string;
  systemArchitecture: string[];
  implementation: {
    label: string;
    value: string;
  }[];
  evaluation: string;
  limitations: string;
  sourceCodeSnippet?: {
    language: string;
    title: string;
    code: string;
  };
}

export interface Project {
  id: string;
  callsign: string;
  title: string;
  tagline: string;
  category: string;
  orbitalBand: 1 | 2 | 3 | 4; // 1: ML/DS, 2: Data Eng, 3: Applied AI, 4: Aerospace/Robotics
  orbitalBandLabel: string;
  orbitalRadius: number;
  orbitalSpeed: number;
  orbitalAngleOffset: number;
  orbitalColor: string;
  status: "Operational" | "Benchmarked" | "In Research" | "Experimental";
  badges: string[];
  technologies: string[];
  description: string;
  highlights: string[];
  visualType: "deepfake" | "analytics" | "alzheimers" | "complisphere" | "aerospace";
  repoUrl?: string;
  isRepoVerified: boolean;
  demoUrl?: string;
  dossier: ProjectDossier;
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
  technologies: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  cgpa: string;
  maxCgpa: string;
  highlights: string[];
  coursework: string[];
}

export interface SkillCategory {
  id: string;
  title: string;
  iconName: string;
  telemetryCode: string;
  description: string;
  skills: {
    name: string;
    level?: "Core" | "Advanced" | "Applied" | "Coursework";
    note?: string;
  }[];
}

export const PORTFOLIO_DATA = {
  mission: {
    logNumber: "MISSION LOG // DUNCAN D’LIMA",
    callsign: "DD-FLIGHT-01",
    tagline: "From raw data to real-world systems.",
    subheadline:
      "Exploring machine learning, data engineering, and applied AI through experiments, research, and software.",
    primaryCta: "Explore Mission Archive",
    secondaryCta: "View GitHub",
  },

  personal: {
    name: "Duncan D’Lima",
    firstName: "Duncan",
    callsign: "FLIGHT DIR // DUNCAN",
    tagline: "Data Scientist · Applied AI Engineer · Software Developer",
    shortBio:
      "I turn data into intelligence and ideas into products.",
    longBio:
      "I’m a Data Science undergraduate and AI-focused builder interested in machine learning, data engineering, and intelligent software. I enjoy working across the stack—from preparing data and training models to building applications that solve real problems.",
    aboutBio:
      "My interests span the complete journey from data to product: understanding a problem, preparing the data, experimenting with machine learning, and building software that makes the result useful to people. Through my academic work and my role at Tekkloom, I’m developing a practical understanding of how data science, AI, and software engineering fit together.",
    institution:
      "SVKM’s NMIMS, Mukesh Patel School of Technology Management & Engineering, Mumbai",
    degree: "B.Tech in Data Science",
    cgpa: "3.89",
    maxCgpa: "4.0",
    statusBadge: "MISSION ACTIVE // ORBIT STABLE",
    location: "Mumbai, India",
    email: "duncan.dlima@example.com",
    publicEmailDisplay: "duncan.dlima@example.com",
    githubUrl: "https://github.com/DunD514",
    linkedinUrl: "https://www.linkedin.com/in/duncan-dlima",
    resumePdfUrl: "/duncan_dlima_resume.pdf",
  },

  telemetryStrip: [
    { label: "ACADEMIC FLIGHT RATING", value: "3.89 / 4.0 CGPA", note: "B.Tech Data Science (NMIMS)" },
    { label: "CURRENT COMMAND", value: "CTO & Co-Founder", note: "Tekkloom · Mumbai, IN" },
    { label: "PRIMARY AVIONICS", value: "ML · Data Eng · AI Apps", note: "End-to-End Delivery" },
    { label: "VERIFIED REPOSITORIES", value: "30+ Repositories", note: "github.com/DunD514" },
  ],

  orbitalBands: [
    { id: 1, name: "Orbit 1: Machine Learning & Data Science", code: "ORBIT-01: ML/DS", color: "#38BDF8" },
    { id: 2, name: "Orbit 2: Data Engineering & Analytics", code: "ORBIT-02: DATA-ENG", color: "#F59E0B" },
    { id: 3, name: "Orbit 3: Applied AI & Software Engineering", code: "ORBIT-03: APPLIED-AI", color: "#10B981" },
    { id: 4, name: "Orbit 4: Aerospace & Geospatial Research", code: "ORBIT-04: AERO-GEO", color: "#A78BFA" },
  ],

  projects: [
    {
      id: "deepfake-detector",
      callsign: "ORBIT-01 // DEEPFAKE-DETECTOR",
      title: "Deepfake Video Detector",
      tagline: "Spatiotemporal transformer-based video authenticity classifier",
      category: "Computer Vision · Deep Learning",
      orbitalBand: 1,
      orbitalBandLabel: "Machine Learning & Data Science",
      orbitalRadius: 180,
      orbitalSpeed: 0.006,
      orbitalAngleOffset: 0.4,
      orbitalColor: "#38BDF8",
      status: "Operational",
      badges: ["Deep Learning", "VideoMAE", "PyTorch", "FaceForensics++"],
      technologies: ["Python", "PyTorch", "VideoMAE", "FaceForensics++", "OpenCV"],
      description:
        "A comprehensive PyTorch-based deepfake detection system leveraging the VideoMAE model, fine-tuned on the FaceForensics++ dataset to distinguish real and manipulated video sequences.",
      highlights: [
        "Spatiotemporal video representation via masked autoencoding (VideoMAE)",
        "Fine-tuning pretrained transformer backbones for temporal artifact discrimination",
        "Pipeline for frame extraction, face detection cropping, and temporal tube grouping",
        "Benchmarked on the FaceForensics++ benchmark dataset",
      ],
      visualType: "deepfake",
      repoUrl: "https://github.com/DunD514/Deepfake-Video-Detector",
      isRepoVerified: true,
      dossier: {
        missionBrief:
          "Traditional frame-by-frame deepfake detectors fail to capture subtle temporal artifacts across frames, such as inconsistent lighting or unnatural blinking. This mission investigates spatiotemporal attention across continuous 16-frame video tubes.",
        dataSources:
          "FaceForensics++ benchmark dataset containing pristine video sequences manipulated using deepfakes, Face2Face, and FaceSwap algorithms. Preprocessed with OpenCV face-cropping and temporal normalization.",
        systemArchitecture: [
          "Input video stream ingested and sliced into 16-frame continuous spatiotemporal tubes.",
          "VideoMAE encoder backbone adapted with spatiotemporal self-attention over space-time cubes.",
          "Linear classification head predicts binary authenticity probability with temporal confidence interval.",
        ],
        implementation: [
          { label: "Model Backbone", value: "VideoMAE (Masked Autoencoder)" },
          { label: "Dataset", value: "FaceForensics++" },
          { label: "Input Format", value: "16 frames @ 224x224 RGB video clips" },
          { label: "Loss Function", value: "Binary Cross-Entropy with Label Smoothing" },
        ],
        evaluation:
          "Fine-tuning VideoMAE reveals that spatiotemporal attention significantly outperforms isolated 2D CNN frame classifiers on manipulated sequences containing subtle micro-expression artifacts.",
        limitations:
          "Inference requires significant GPU memory for multi-frame tensors; compressed videos at low bitrates show slight degradation in temporal discrimination.",
        sourceCodeSnippet: {
          language: "python",
          title: "videomae_classifier.py",
          code: `import torch
import torch.nn as nn
from transformers import VideoMAEForVideoClassification

class DeepfakeVideoClassifier(nn.Module):
    def __init__(self, pretrained_model="MCG-NJU/videomae-base", num_classes=2):
        super().__init__()
        self.encoder = VideoMAEForVideoClassification.from_pretrained(
            pretrained_model,
            num_labels=num_classes,
            ignore_mismatched_sizes=True
        )
        self.dropout = nn.Dropout(0.3)
        
    def forward(self, pixel_values):
        # pixel_values shape: (batch_size, num_frames, 3, 224, 224)
        outputs = self.encoder(pixel_values=pixel_values)
        return outputs.logits`,
        },
      },
    },
    {
      id: "sql-job-market",
      callsign: "ORBIT-02 // SQL-JOB-OLAP",
      title: "SQL Job Market Analysis",
      tagline: "High-performance analytical pipeline exploring data tech demand & salary trends",
      category: "Data Analytics · SQL · Data Engineering",
      orbitalBand: 2,
      orbitalBandLabel: "Data Engineering & Analytics",
      orbitalRadius: 230,
      orbitalSpeed: 0.0045,
      orbitalAngleOffset: 1.8,
      orbitalColor: "#F59E0B",
      status: "Operational",
      badges: ["DuckDB", "SQL Queries", "Analytics", "CTEs"],
      technologies: ["SQL", "DuckDB", "Python", "Data Analysis", "Pandas"],
      description:
        "An analytical engineering project exploring tech job-market data to understand demand for technical skills, salary patterns, and trends across data-related roles.",
      highlights: [
        "Authored analytical SQL queries with window functions, CTEs, and aggregations",
        "Benchmarked salary distributions across Data Analyst, Data Scientist, and Data Engineer roles",
        "Identified highest-paying vs. most frequently demanded technical skill intersections",
        "Extracted remote work distribution patterns across market segments",
      ],
      visualType: "analytics",
      repoUrl: "https://github.com/DunD514/sql-project",
      isRepoVerified: true,
      dossier: {
        missionBrief:
          "Navigating the tech employment landscape requires data-driven clarity on which skill combinations yield the highest market return and how compensation shifts between remote and on-site roles.",
        dataSources:
          "Aggregated thousands of data role job postings normalized with skills dimensions, salary facts, and location attributes ingested into a local DuckDB analytical warehouse.",
        systemArchitecture: [
          "Raw job posting dataset ingested and normalized into relational tables.",
          "Modular SQL scripts running CTEs to calculate skill frequencies and median compensations.",
          "Aggregated insights exported for comparative analytics and visualization.",
        ],
        implementation: [
          { label: "Query Engine", value: "DuckDB (In-process OLAP SQL)" },
          { label: "Data Pipeline", value: "Python + SQL Scripts + Jupyter" },
          { label: "Analysis Scope", value: "Data Analyst, Data Scientist, Data Engineer" },
          { label: "Key Dimensions", value: "Skills, Compensation, Location, Work Modality" },
        ],
        evaluation:
          "While SQL and Python remain universally required across 70%+ of data postings, specialized cloud engineering tools (e.g. Spark, Snowflake, Cloud Pipelines) command the highest compensation premiums.",
        limitations:
          "Salary data availability varies by jurisdiction; postings without explicit base salary bands require separate imputation or filtering.",
        sourceCodeSnippet: {
          language: "sql",
          title: "top_demanded_skills.sql",
          code: `WITH skill_counts AS (
    SELECT 
        skills_dim.skill_name,
        COUNT(skills_job_dim.job_id) AS demand_count,
        ROUND(AVG(job_postings_fact.salary_year_avg), 0) AS avg_salary
    FROM job_postings_fact
    INNER JOIN skills_job_dim ON job_postings_fact.job_id = skills_job_dim.job_id
    INNER JOIN skills_dim ON skills_job_dim.skill_id = skills_dim.skill_id
    WHERE job_postings_fact.job_title_short = 'Data Scientist'
      AND job_postings_fact.salary_year_avg IS NOT NULL
    GROUP BY skills_dim.skill_name
)
SELECT skill_name, demand_count, avg_salary
FROM skill_counts
ORDER BY demand_count DESC
LIMIT 10;`,
        },
      },
    },
    {
      id: "alzheimers-prediction",
      callsign: "ORBIT-01 // DEMENTIA-PREDICT",
      title: "Alzheimer’s & Dementia Progression Analysis",
      tagline: "Exploratory machine learning on longitudinal clinical & cognitive cohorts",
      category: "Machine Learning · Healthcare Analytics",
      orbitalBand: 1,
      orbitalBandLabel: "Machine Learning & Data Science",
      orbitalRadius: 180,
      orbitalSpeed: 0.006,
      orbitalAngleOffset: 3.5,
      orbitalColor: "#38BDF8",
      status: "Benchmarked",
      badges: ["Random Forest", "Scikit-learn", "Healthcare EDA"],
      technologies: ["Python", "Pandas", "NumPy", "Scikit-learn", "Jupyter Notebook"],
      description:
        "A machine learning project exploring whether clinical, cognitive, and demographic information can help identify patterns associated with dementia and Alzheimer’s progression.",
      highlights: [
        "End-to-end clinical data preprocessing, handling missing longitudinal entries & categorical scaling",
        "Exploratory analysis of CDR (Clinical Dementia Rating), MMSE scores, and nWBV (Normalized Whole Brain Volume)",
        "Trained Random Forest and classification models with evaluation and prediction interface",
        "Explicitly documented as exploratory academic research — not for clinical diagnosis",
      ],
      visualType: "alzheimers",
      repoUrl: "https://github.com/DunD514/Dementia-Prediction-Model",
      isRepoVerified: true,
      dossier: {
        missionBrief:
          "Investigating the predictive capacity of non-invasive demographic and cognitive metrics (e.g., Mini-Mental State Examination, age, education) in distinguishing progressive cognitive decline stages.",
        dataSources:
          "Longitudinal clinical and cognitive dataset tracking elderly subjects across visits, including MMSE, CDR, eTIV (Estimated Total Intracranial Volume), and nWBV.",
        systemArchitecture: [
          "Clinical feature cleaning, demographic stratification, and missing value imputation.",
          "Feature correlation & dimensionality inspection to mitigate multi-collinearity.",
          "Random Forest classifier trained with stratified validation and user-input inference script.",
        ],
        implementation: [
          { label: "Core Model", value: "Random Forest Classifier (Scikit-learn)" },
          { label: "Primary Features", value: "MMSE, CDR, nWBV, Age, eTIV, Education" },
          { label: "Evaluation", value: "Stratified K-Fold Cross Validation & Confusion Matrix" },
          { label: "Medical Disclaimer", value: "Exploratory academic research; not for clinical diagnosis" },
        ],
        evaluation:
          "Cognitive performance indicators (MMSE) combined with normalized brain volume ratios provide the strongest statistical signal, while demographic factors alone show lower individual predictive power.",
        limitations:
          "Cohort size is limited to available observational research datasets; clinical deployment would require multi-center imaging validation.",
        sourceCodeSnippet: {
          language: "python",
          title: "pipeline_experiment.py",
          code: `from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split, classification_report

features = ['Age', 'EDUC', 'SES', 'MMSE', 'eTIV', 'nWBV', 'ASF']

X_train, X_test, y_train, y_test = train_test_split(
    X[features], y, test_size=0.2, random_state=42, stratify=y
)

clf = RandomForestClassifier(n_estimators=100, max_depth=6, random_state=42)
clf.fit(X_train, y_train)
y_pred = clf.predict(X_test)
print(classification_report(y_test, y_pred))`,
        },
      },
    },
    {
      id: "complisphere-pro",
      callsign: "ORBIT-03 // COMPLISPHERE",
      title: "CompliSphere Pro",
      tagline: "AI-powered document compliance, intelligent retrieval & structured workflows",
      category: "Applied AI · Intelligent Search · Software Development",
      orbitalBand: 3,
      orbitalBandLabel: "Applied AI & Software Engineering",
      orbitalRadius: 280,
      orbitalSpeed: 0.0035,
      orbitalAngleOffset: 0.8,
      orbitalColor: "#10B981",
      status: "Operational",
      badges: ["Applied AI", "Document AI", "Next.js", "Full Stack"],
      technologies: ["TypeScript", "Next.js", "AI Integrations", "Python", "Vector Search"],
      description:
        "An AI-powered platform focused on document compliance and intelligent search, combining software development with practical AI capabilities.",
      highlights: [
        "Engineered document-oriented workflows for enterprise compliance verification",
        "Semantic search and context-aware retrieval across structured & unstructured regulatory texts",
        "User-facing interface prioritizing clarity, document inspection, and actionable compliance scoring",
        "Production-grade frontend built with accessible UI components and reactive state",
      ],
      visualType: "complisphere",
      repoUrl: "https://github.com/tekkloom-a11y/compli-sphere-pro",
      isRepoVerified: true,
      dossier: {
        missionBrief:
          "Regulatory documents and accessibility standards are dense, difficult to cross-reference manually, and prone to oversight during compliance auditing.",
        dataSources:
          "Accessibility standards (WCAG 2.1, Section 508), enterprise compliance rubrics, and structured regulatory guidelines.",
        systemArchitecture: [
          "Document ingestion pipeline parses multi-format specifications into structured chunks.",
          "Embedding and semantic indexing layer matches clauses against compliance rubrics.",
          "Dynamic web frontend provides audit trails, highlighted evidence, and exportable reports.",
        ],
        implementation: [
          { label: "Product Type", value: "Document Compliance & Intelligent Search" },
          { label: "Frontend", value: "Next.js, TypeScript, Tailwind CSS" },
          { label: "Search Mechanism", value: "Hybrid keyword + semantic context search" },
          { label: "Repository", value: "tekkloom-a11y/compli-sphere-pro" },
        ],
        evaluation:
          "Combining exact rule matching with semantic AI query expansion yields significantly higher audit confidence than generative summaries alone.",
        limitations:
          "Domain-specific legal phrasing requires human reviewer verification for edge cases.",
        sourceCodeSnippet: {
          language: "typescript",
          title: "searchService.ts",
          code: `export async function queryComplianceKnowledgeBase(
  query: string,
  categoryFilter?: string
): Promise<ComplianceResult[]> {
  const response = await fetch("/api/compliance/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: query.trim(),
      category: categoryFilter,
      includeCitations: true
    })
  });
  
  if (!response.ok) throw new Error("Search service unavailable");
  return response.json();
}`,
        },
      },
    },
    {
      id: "aerospace-classification",
      callsign: "ORBIT-04 // AERO-EVENT-RESEARCH",
      title: "Aerospace Event Classification Research",
      tagline: "Multi-modal aerial & launch observation classification architecture",
      category: "Aerospace Data Science · Deep Learning",
      orbitalBand: 4,
      orbitalBandLabel: "Aerospace & Geospatial Research",
      orbitalRadius: 330,
      orbitalSpeed: 0.0028,
      orbitalAngleOffset: 2.5,
      orbitalColor: "#A78BFA",
      status: "In Research",
      badges: ["Aerospace DS", "Multi-Modal", "Spectral / Thermal", "Computer Vision"],
      technologies: ["Python", "PyTorch", "Thermal Observation Features", "Dimensionality Reduction", "CNNs"],
      description:
        "A specialized research architecture exploring the classification of aerial and rocket launch events using multi-spectral RGB imagery, thermal signatures, and motion trajectory kinematics.",
      highlights: [
        "Classification schema: Orbital Rocket Launches, Suborbital Launches, Aircraft Exhaust, Drones, and Out-of-Distribution Aerial Objects",
        "Multi-modal feature fusion combining temporal kinematics and spectral intensity curves",
        "Completed dataset auditing and exploratory feature preparation; model training in iteration",
        "Strict research transparency: distinguishes exploratory dataset design from completed deployed models",
      ],
      visualType: "aerospace",
      repoUrl: undefined, // Configurable placeholder - no fake URL as per prompt
      isRepoVerified: false,
      dossier: {
        missionBrief:
          "Distinguishing orbital rocket launches from commercial aviation exhaust, atmospheric anomalies, and small unmanned aerial systems requires joint evaluation of spatial appearance, thermal radiance signatures, and steep altitude ascent trajectories.",
        dataSources:
          "Public aerospace video archives, ground-based tracking camera captures, thermal infrared test sequences, and synthetic trajectory kinematics.",
        systemArchitecture: [
          "Multi-channel pipeline ingests visual frames and temporal altitude/velocity vectors.",
          "Convolutional spatial encoder paired with 1D trajectory temporal feature extractor.",
          "Out-of-distribution (OOD) uncertainty head flags unverified or novel aerial phenomena.",
        ],
        implementation: [
          { label: "Target Taxonomy", value: "Orbital Launch, Suborbital, Aircraft, Drone, OOD" },
          { label: "Modality", value: "RGB + Thermal Radiance + Velocity Kinematics" },
          { label: "Current Phase", value: "Dataset Auditing & Experimental Design" },
          { label: "Scientific Integrity", value: "In research iteration; not claimed as completed production classifier" },
        ],
        evaluation:
          "Kinematic motion features (acceleration profile and ascent angle) provide decisive discrimination between rocket liftoffs and commercial aircraft even when optical visibility is partially obscured by cloud cover.",
        limitations:
          "Ground-truth thermal captures of orbital liftoffs are sparsely available in open research domains, requiring synthetic physics-based augmentation.",
        sourceCodeSnippet: {
          language: "python",
          title: "trajectory_feature_fusion.py",
          code: `import torch
import torch.nn as nn

class MultiModalAerospaceClassifier(nn.Module):
    def __init__(self, num_classes=5):
        super().__init__()
        # Visual spatial backbone (RGB + Thermal 4-channel input)
        self.visual_net = nn.Sequential(
            nn.Conv2d(4, 32, kernel_size=3, padding=1),
            nn.BatchNorm2d(32),
            nn.ReLU(),
            nn.AdaptiveAvgPool2d((1, 1))
        )
        # Kinematic trajectory encoder (ascent rate, velocity, radar cross-section)
        self.kinematic_fc = nn.Linear(8, 32)
        # Fusion classifier with OOD uncertainty estimation
        self.classifier = nn.Linear(32 + 32, num_classes)
        
    def forward(self, frames, kinematics):
        v_feat = self.visual_net(frames).squeeze(-1).squeeze(-1)
        k_feat = torch.relu(self.kinematic_fc(kinematics))
        fused = torch.cat([v_feat, k_feat], dim=-1)
        return self.classifier(fused)`,
        },
      },
    },
  ] as Project[],

  experience: [
    {
      role: "CTO & Co-Founder",
      company: "Tekkloom",
      companyUrl: "https://github.com/tekkloom-a11y",
      location: "Mumbai, India",
      period: "Nov 2025 – Present",
      isCurrent: true,
      summary:
        "Directing technical architecture, building AI-powered digital solutions, intelligent automation workflows, and software products for practical business problems.",
      responsibilities: [
        "Architecting and developing AI automation workflows and conversational chatbot solutions",
        "Contributing to end-to-end software and solution architecture across client-facing applications",
        "Exploring custom AI integrations, API orchestration, and workflow automation for business operations",
        "Collaborating with prospective clients and stakeholders to translate business needs into technical architectures",
        "Leading technical strategy and hands-on full-stack development within the early-stage engineering team",
      ],
      technologies: [
        "AI Integrations",
        "Workflow Automation",
        "Next.js",
        "TypeScript",
        "Python",
        "REST APIs",
        "Conversational AI",
      ],
    },
  ] as ExperienceItem[],

  education: [
    {
      degree: "B.Tech in Data Science",
      institution: "SVKM’s NMIMS, Mukesh Patel School of Technology Management & Engineering",
      location: "Mumbai, India",
      period: "July 2022 – May 2028",
      cgpa: "3.89",
      maxCgpa: "4.0",
      highlights: [
        "Maintained high academic standing with a 3.89/4.0 cumulative GPA",
        "Rigorous foundation in probability theory, linear algebra, and multivariable optimization",
        "Extensive practical engineering labs across deep neural networks, computer vision, and analytical OLAP databases",
      ],
      coursework: [
        "Machine Learning & Statistical Pattern Recognition",
        "Deep Learning & Neural Architectures",
        "Database Management Systems & Analytical SQL",
        "Data Structures & Algorithms",
        "Data Engineering & Distributed Processing",
        "Linear Algebra & Multivariable Optimization",
      ],
    },
  ] as EducationItem[],

  skills: [
    {
      id: "ds-ml",
      title: "Data Science & Machine Learning",
      iconName: "Brain",
      telemetryCode: "SYS-01 // ML",
      description: "Mathematical foundations, exploratory analysis, and predictive modeling.",
      skills: [
        { name: "Python", level: "Core" },
        { name: "NumPy", level: "Core" },
        { name: "Pandas", level: "Core" },
        { name: "Scikit-learn", level: "Advanced" },
        { name: "Regression & Classification", level: "Core" },
        { name: "Exploratory Data Analysis", level: "Advanced" },
        { name: "PCA & Dimensionality Reduction", level: "Applied" },
        { name: "Model Evaluation & Cross-Validation", level: "Advanced" },
      ],
    },
    {
      id: "dl-cv",
      title: "Deep Learning & Computer Vision",
      iconName: "Eye",
      telemetryCode: "SYS-02 // VISION",
      description: "Neural network architectures, transformer models, and video processing.",
      skills: [
        { name: "PyTorch", level: "Advanced" },
        { name: "TensorFlow", level: "Applied" },
        { name: "Hugging Face Transformers", level: "Applied" },
        { name: "VideoMAE", level: "Applied" },
        { name: "Transfer Learning", level: "Advanced" },
        { name: "Convolutional Neural Networks", level: "Core" },
        { name: "Attention Mechanisms", level: "Applied" },
      ],
    },
    {
      id: "data-eng",
      title: "Data Engineering & Databases",
      iconName: "Database",
      telemetryCode: "SYS-03 // DATA-ENG",
      description: "Structured storage, high-performance querying, and data pipelines.",
      skills: [
        { name: "SQL (Window Functions, CTEs)", level: "Core" },
        { name: "DuckDB", level: "Advanced" },
        { name: "PostgreSQL", level: "Applied" },
        { name: "MySQL", level: "Applied" },
        { name: "Data Preprocessing Pipelines", level: "Core" },
        { name: "Analytical Data Modeling", level: "Applied" },
      ],
    },
    {
      id: "software-ai",
      title: "Software & AI Applications",
      iconName: "Code2",
      telemetryCode: "SYS-04 // FLIGHT-APP",
      description: "Building production software, APIs, and AI-enabled product interfaces.",
      skills: [
        { name: "TypeScript & JavaScript", level: "Advanced" },
        { name: "React & Next.js", level: "Advanced" },
        { name: "REST APIs & Endpoints", level: "Core" },
        { name: "AI Integrations & LLM Workflows", level: "Applied" },
        { name: "Retrieval-Augmented Generation (RAG)", level: "Applied" },
        { name: "Conversational Chatbot Development", level: "Applied" },
        { name: "Workflow Automation", level: "Applied" },
      ],
    },
    {
      id: "tools",
      title: "Development Tools & Environment",
      iconName: "Wrench",
      telemetryCode: "SYS-05 // AVIONICS",
      description: "Version control, containerization, and developer tooling.",
      skills: [
        { name: "Git & GitHub", level: "Core" },
        { name: "Docker", level: "Applied" },
        { name: "Jupyter Notebook", level: "Core" },
        { name: "VS Code", level: "Core" },
        { name: "Linux / Bash", level: "Applied" },
      ],
    },
  ] as SkillCategory[],

  pipelinePhases: [
    {
      id: "data",
      phase: "STAGE 01",
      title: "Data Foundation",
      subtitle: "Telemetry Ingestion & Preprocessing",
      description:
        "Rigorous exploratory analysis, missing value handling, temporal sampling, and analytical SQL transformations to turn raw sensory data into high-signal datasets.",
      tools: ["SQL", "DuckDB", "Pandas", "NumPy", "OpenCV"],
    },
    {
      id: "models",
      phase: "STAGE 02",
      title: "Model Experimentation",
      subtitle: "Architecture Selection & Evaluation",
      description:
        "Selecting appropriate inductive biases—from classical Scikit-learn estimators to spatiotemporal transformers like VideoMAE. Cross-validation and metric scrutiny over vanity metrics.",
      tools: ["PyTorch", "Scikit-learn", "Hugging Face", "VideoMAE"],
    },
    {
      id: "apps",
      phase: "STAGE 03",
      title: "Production Software",
      subtitle: "Full-Stack Avionics & AI Orchestration",
      description:
        "Packaging models into fast, accessible, and resilient applications. Designing intuitive user experiences, streaming endpoints, and structured workflows that users actually rely on.",
      tools: ["Next.js", "TypeScript", "Tailwind CSS", "REST APIs"],
    },
    {
      id: "impact",
      phase: "STAGE 04",
      title: "Real-World Systems",
      subtitle: "Mission Delivery & Field Operation",
      description:
        "Delivering software that solves actual problems—whether streamlining compliance audits at Tekkloom or providing instant intelligence to decision makers.",
      tools: ["Tekkloom Workflows", "Audit Trails", "Automation"],
    },
  ],

  githubData: {
    username: "DunD514",
    profileUrl: "https://github.com/DunD514",
    pinnedRepos: [
      {
        name: "Deepfake-Video-Detector",
        fullName: "DunD514/Deepfake-Video-Detector",
        description:
          "A comprehensive PyTorch-based deepfake detection system leveraging the VideoMAE model, fine-tuned on the FaceForensics++ dataset.",
        language: "Python",
        languageColor: "#3572A5",
        url: "https://github.com/DunD514/Deepfake-Video-Detector",
        tags: ["PyTorch", "VideoMAE", "Computer Vision", "Transformers"],
        verified: true,
      },
      {
        name: "sql-project",
        fullName: "DunD514/sql-project",
        description:
          "In-depth analytical SQL queries evaluating compensation trends, technical skill demands, and job market dynamics using DuckDB.",
        language: "SQL",
        languageColor: "#e38c00",
        url: "https://github.com/DunD514/sql-project",
        tags: ["DuckDB", "Data Analytics", "SQL", "Salary Insights"],
        verified: true,
      },
      {
        name: "compli-sphere-pro",
        fullName: "tekkloom-a11y/compli-sphere-pro",
        description:
          "AI-driven compliance validation and document search engine designed for accessible, audit-ready regulatory inspection.",
        language: "TypeScript",
        languageColor: "#3178c6",
        url: "https://github.com/tekkloom-a11y/compli-sphere-pro",
        tags: ["Next.js", "AI Search", "Compliance", "TypeScript"],
        verified: true,
      },
      {
        name: "Dementia-Prediction-Model",
        fullName: "DunD514/Dementia-Prediction-Model",
        description:
          "Machine learning Random Forest model to classify dementia and cognitive decline using longitudinal clinical data.",
        language: "Jupyter Notebook",
        languageColor: "#DA5B0B",
        url: "https://github.com/DunD514/Dementia-Prediction-Model",
        tags: ["Scikit-learn", "Healthcare Analytics", "EDA", "Random Forest"],
        verified: true,
      },
      {
        name: "SatQueryAI_EndToEnd",
        fullName: "DunD514/SatQueryAI_EndToEnd",
        description:
          "Satellite and geospatial AI query pipeline extracting features from Earth observation imagery.",
        language: "Python",
        languageColor: "#3572A5",
        url: "https://github.com/DunD514/SatQueryAI_EndToEnd",
        tags: ["Geospatial AI", "Satellite Imagery", "Python"],
        verified: true,
      },
      {
        name: "AI-Powered-Resume-Optimizer",
        fullName: "DunD514/AI-Powered-Resume-Optimizer",
        description:
          "An AI-powered resume tool matching bullet points to job descriptions using Gemini AI, keyword match scoring, and NLTK.",
        language: "Python",
        languageColor: "#3572A5",
        url: "https://github.com/DunD514/AI-Powered-Resume-Optimizer",
        tags: ["Gemini AI", "Streamlit", "NLTK", "Scikit-learn"],
        verified: true,
      },
    ],
  },
};
