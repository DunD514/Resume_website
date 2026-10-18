import { ProjectCategoryKey } from "./projectCategories";

export interface CuratedProjectOverride {
  id: string; // matches repo name (slug) or synthetic id
  repoName?: string;
  isFeatured?: boolean;
  featuredOrder?: number;
  customTitle?: string;
  customTagline?: string;
  categoryOverride?: ProjectCategoryKey;
  additionalCategories?: ProjectCategoryKey[];
  tags?: string[];
  isPrivate?: boolean;
  demoUrl?: string;
  visualType?: "deepfake" | "dementia" | "sql" | "complisphere" | "aerospace" | "generic";
  caseStudy?: {
    problem: string;
    approach: string;
    architecture: string[];
    stack: string[];
    result?: string;
    limitations?: string;
    statusBadge?: "Production" | "Verified Prototype" | "Research" | "Experimental" | "Active Development";
  };
}

export const CURATED_PROJECT_OVERRIDES: Record<string, CuratedProjectOverride> = {
  "deepfake-video-detector": {
    id: "deepfake-video-detector",
    repoName: "Deepfake-Video-Detector",
    isFeatured: true,
    featuredOrder: 1,
    customTitle: "Deepfake Video Detector",
    customTagline: "Temporal transformer architecture fine-tuned on FaceForensics++ to catch subtle video manipulations.",
    categoryOverride: "computer-vision",
    additionalCategories: ["ml-dl"],
    visualType: "deepfake",
    tags: ["PyTorch", "VideoMAE", "FaceForensics++", "Temporal Transformers", "OpenCV", "Python"],
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
      statusBadge: "Verified Prototype",
      limitations:
        "Computationally intensive during frame preprocessing; inference throughput requires GPU acceleration for real-time video streaming.",
    },
  },

  satqueryai_endtoend: {
    id: "satqueryai_endtoend",
    repoName: "SatQueryAI_EndToEnd",
    isFeatured: true,
    featuredOrder: 2,
    customTitle: "SatQuery AI — Remote Sensing & Geospatial Analysis",
    customTagline: "Modular multi-modal pipeline for natural-language analysis of single-image, bi-temporal, and optical/SAR remote-sensing imagery.",
    categoryOverride: "robotics-simulation",
    additionalCategories: ["genai-llms", "computer-vision"],
    visualType: "aerospace",
    tags: ["Remote Sensing", "Optical/SAR", "GeoTIFF", "Bi-temporal", "VQA", "Python"],
    caseStudy: {
      problem:
        "Satellite and Earth-observation analysts face high overhead when parsing multimodal optical and synthetic aperture radar (SAR) imagery across temporal baselines without automated natural-language querying.",
      approach:
        "Architected an end-to-end modular prototype supporting single-image visual question answering (VQA), visual grounding, bi-temporal change analysis, and optical/SAR evidence fusion with tool routing.",
      architecture: [
        "GeoTIFF, TIFF, PNG, and JPEG multi-format ingestion engine",
        "Input compatibility checks & query classification router",
        "Single-image VQA & visual grounding reasoning baseline",
        "Bi-temporal optical/SAR change analysis with transparent activity summaries",
      ],
      stack: ["Python", "GeoTIFF", "Optical/SAR", "PyTorch", "Computer Vision", "Multimodal AI"],
      statusBadge: "Verified Prototype",
      limitations:
        "Initial prototype demonstrates architectural pipelines and tool routing; full inference scale requires distributed cluster ingestion for planetary-scale datasets.",
    },
  },

  "self-driving-car-simulation": {
    id: "self-driving-car-simulation",
    repoName: "Self-Driving-Car-Simulation",
    isFeatured: true,
    featuredOrder: 3,
    customTitle: "Self-Driving Car Simulation & Vision System",
    customTagline: "Real-time autonomous perception system detecting obstacles, vehicles, and pedestrians with reactive decision logic.",
    categoryOverride: "robotics-simulation",
    additionalCategories: ["computer-vision"],
    visualType: "generic",
    tags: ["YOLOv8", "Ultralytics", "OpenCV", "Python", "Autonomous Driving", "pyttsx3"],
    caseStudy: {
      problem:
        "Autonomous vehicle perception pipelines must evaluate high-frame-rate video feeds, distinguish critical dynamic obstacles (pedestrians, vehicles, stop signs), and issue deterministic velocity commands under latency constraints.",
      approach:
        "Constructed a vision-driven perception simulation utilizing YOLOv8 object detection on real-time video streams. Integrated obstacle proximity heuristics with a reactive decision engine (slow down, stop, yield) and auditory telemetry feedback.",
      architecture: [
        "YOLOv8 deep neural object detector targeting vehicles, pedestrians, and traffic signs",
        "Continuous OpenCV frame preprocessing and bounding-box tracking",
        "Proximity-based decision boundary evaluation engine",
        "Auditory feedback driver utilizing pyttsx3 for real-time operator alerts",
      ],
      stack: ["Python", "YOLOv8 (Ultralytics)", "OpenCV", "pyttsx3", "Computer Vision"],
      statusBadge: "Verified Prototype",
      limitations:
        "Evaluated on pre-recorded road telemetry and video inputs; does not model complex vehicle steering dynamics or CAN bus hardware integration.",
    },
  },

  "ai-powered-resume-optimizer": {
    id: "ai-powered-resume-optimizer",
    repoName: "AI-Powered-Resume-Optimizer",
    isFeatured: true,
    featuredOrder: 4,
    customTitle: "AI-Powered Resume Optimizer",
    customTagline: "Generative bullet point optimization engine matching candidate experience to target job descriptions using Gemini AI.",
    categoryOverride: "genai-llms",
    additionalCategories: ["ds-analytics"],
    visualType: "generic",
    tags: ["Gemini AI", "Streamlit", "NLTK", "scikit-learn", "Python", "DOCX Export"],
    caseStudy: {
      problem:
        "Job seekers struggle to align resume phrasing with applicant tracking systems (ATS) and specific job descriptions without losing technical specificity or inflating qualifications.",
      approach:
        "Engineered an interactive Streamlit application integrating Google Gemini AI and scikit-learn. Parses resumes alongside target job descriptions, computes keyword overlap metrics, and regenerates concise, high-impact bullet points.",
      architecture: [
        "Resume and job description text ingestion and tokenization",
        "scikit-learn TF-IDF and NLTK keyword match scoring module",
        "Structured Gemini API prompt orchestration for targeted bullet refinement",
        "Automated formatted DOCX document export engine",
      ],
      stack: ["Python", "Streamlit", "Google Gemini API", "scikit-learn", "NLTK", "python-docx"],
      statusBadge: "Verified Prototype",
      limitations:
        "Dependent on external Gemini API response latency; requires manual verification of domain-specific terminology before export.",
    },
  },

  "dementia-prediction-model": {
    id: "dementia-prediction-model",
    repoName: "Dementia-Prediction-Model",
    isFeatured: true,
    featuredOrder: 5,
    customTitle: "Dementia & Alzheimer's Progression Analysis",
    customTagline: "Predictive clinical modeling exploring longitudinal cognitive markers and patient transition states.",
    categoryOverride: "ml-dl",
    additionalCategories: ["ds-analytics"],
    visualType: "dementia",
    tags: ["scikit-learn", "Random Forest", "Longitudinal Data", "Feature Engineering", "Python"],
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
      statusBadge: "Verified Prototype",
      limitations:
        "Dataset size is constrained by clinical availability; requires external validation across multi-center cohorts.",
    },
  },

  "sql-project": {
    id: "sql-project",
    repoName: "sql-project",
    isFeatured: true,
    featuredOrder: 6,
    customTitle: "SQL Job Market Analytics & Columnar Engine",
    customTagline: "Analytical DuckDB and SQL project querying tens of thousands of postings to uncover skill-salary dynamics.",
    categoryOverride: "data-engineering",
    additionalCategories: ["ds-analytics"],
    visualType: "sql",
    tags: ["DuckDB", "Analytical SQL", "CTEs", "Window Functions", "Data Modeling", "Python"],
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
      statusBadge: "Verified Prototype",
      limitations:
        "Data source represents posted salaries which often differ from final compensated offers in negotiated roles.",
    },
  },

  truthlens: {
    id: "truthlens",
    repoName: "TruthLens",
    customTitle: "TruthLens — Interactive Deepfake Detector",
    customTagline: "Deepfake image classifier featuring an active learning feedback loop that fine-tunes on human corrections.",
    categoryOverride: "computer-vision",
    additionalCategories: ["ml-dl"],
    visualType: "deepfake",
    tags: ["Transformers", "Deepfake Detection", "Active Learning", "Python", "Computer Vision"],
    caseStudy: {
      problem:
        "Standard deepfake image detectors degrade rapidly when encountering newly published diffusion artifacts or generative model updates without expensive manual retraining.",
      approach:
        "Built an interactive web architecture utilizing a fine-tuned transformer classifier paired with a user feedback mechanism where misclassifications are logged into a dynamic calibration pool for continuous active refinement.",
      architecture: [
        "Transformer-based visual feature extraction pipeline",
        "Interactive inference web server for instant verification",
        "Feedback logging pipeline recording confidence scores and human corrections",
      ],
      stack: ["Python", "Hugging Face Transformers", "PyTorch", "OpenCV"],
      statusBadge: "Verified Prototype",
    },
  },

  f1guru: {
    id: "f1guru",
    repoName: "F1Guru",
    customTitle: "F1Guru — Voice-Enabled Formula 1 Assistant",
    customTagline: "Multimodal AI assistant pairing OpenAI Whisper speech recognition with Google Gemini and speech synthesis.",
    categoryOverride: "genai-llms",
    additionalCategories: ["agentic-automation"],
    visualType: "generic",
    tags: ["Whisper", "Gemini API", "Speech Recognition", "pyttsx3", "Python"],
    caseStudy: {
      problem:
        "Motorsport fans tracking fast-paced Grand Prix weekends require rapid, hands-free technical answers regarding telemetry, regulations, and race strategies.",
      approach:
        "Created an end-to-end voice assistant combining Whisper speech-to-text, Google Gemini context generation, and text-to-speech audio rendering with customizable beginner/expert personas.",
      architecture: [
        "Real-time audio microphone capture and Whisper transcription",
        "Domain-prompted Gemini reasoning engine with motorsport context",
        "Low-latency audio synthesis feedback pipeline",
      ],
      stack: ["Python", "OpenAI Whisper", "Google Gemini API", "pyttsx3"],
      statusBadge: "Verified Prototype",
    },
  },

  // Private research & CTO leadership projects
  "complisphere-pro": {
    id: "complisphere-pro",
    customTitle: "CompliSphere Pro",
    customTagline: "Production regulatory intelligence & document AI platform delivering sub-second legal compliance search.",
    categoryOverride: "agentic-automation",
    additionalCategories: ["web-apps", "genai-llms"],
    visualType: "complisphere",
    demoUrl: "https://github.com/tekkloom-a11y/compli-sphere-pro",
    tags: ["Next.js", "Document AI", "Semantic Search", "RAG", "TypeScript", "Tekkloom"],
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
      statusBadge: "Production",
      limitations:
        "Requires strict document formatting checks during parsing of scanned legacy government PDFs.",
    },
  },

  "aerospace-classification": {
    id: "aerospace-classification",
    customTitle: "Aerospace Event Classification Research",
    customTagline: "Multi-modal telemetry & geospatial sequence modeling for orbital trajectory and anomaly classification.",
    categoryOverride: "robotics-simulation",
    additionalCategories: ["ml-dl"],
    isPrivate: true,
    visualType: "aerospace",
    tags: ["Multi-Modal", "Time-Series", "PyTorch", "Geospatial", "Telemetry"],
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
      statusBadge: "Research",
      limitations:
        "Research repository is proprietary/private due to ongoing academic collaboration and licensing restrictions.",
    },
  },
};
