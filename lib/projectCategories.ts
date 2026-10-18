export type ProjectCategoryKey =
  | "ml-dl"
  | "ds-analytics"
  | "computer-vision"
  | "genai-llms"
  | "agentic-automation"
  | "data-engineering"
  | "web-apps"
  | "robotics-simulation"
  | "other";

export interface CategoryDefinition {
  key: ProjectCategoryKey;
  label: string;
  shortLabel: string;
  description: string;
  accentColor: string;
  orbitalRadius: number;
  inclination: number;
}

export const PROJECT_CATEGORIES: Record<ProjectCategoryKey, CategoryDefinition> = {
  "computer-vision": {
    key: "computer-vision",
    label: "Computer Vision",
    shortLabel: "Vision",
    description: "Video transformers, spatio-temporal modeling, face tracking, and real-time object detection.",
    accentColor: "#ff7a1a",
    orbitalRadius: 4.6,
    inclination: Math.PI / 6,
  },
  "ml-dl": {
    key: "ml-dl",
    label: "Machine Learning and Deep Learning",
    shortLabel: "ML / DL",
    description: "Supervised and unsupervised models, neural architectures, clinical prediction, and training pipelines.",
    accentColor: "#f59e0b",
    orbitalRadius: 5.2,
    inclination: -Math.PI / 8,
  },
  "genai-llms": {
    key: "genai-llms",
    label: "Generative AI and LLMs",
    shortLabel: "GenAI & LLMs",
    description: "Large language model integrations, multi-modal speech, voice AI, and intelligent generation.",
    accentColor: "#a855f7",
    orbitalRadius: 5.8,
    inclination: Math.PI / 4,
  },
  "agentic-automation": {
    key: "agentic-automation",
    label: "Agentic AI and Automation",
    shortLabel: "Agentic AI",
    description: "Autonomous reasoning agents, tool routing, conversational workflows, and operational automation.",
    accentColor: "#ec4899",
    orbitalRadius: 6.4,
    inclination: -Math.PI / 5,
  },
  "data-engineering": {
    key: "data-engineering",
    label: "Data Engineering and Databases",
    shortLabel: "Data Eng",
    description: "Columnar analytical SQL engines, DuckDB, ETL pipelines, schema design, and window analytics.",
    accentColor: "#38bdf8",
    orbitalRadius: 7.0,
    inclination: 0,
  },
  "ds-analytics": {
    key: "ds-analytics",
    label: "Data Science and Analytics",
    shortLabel: "Data Science",
    description: "Exploratory statistical analysis, longitudinal cohort metrics, visual intelligence, and business insights.",
    accentColor: "#10b981",
    orbitalRadius: 7.6,
    inclination: Math.PI / 7,
  },
  "robotics-simulation": {
    key: "robotics-simulation",
    label: "Robotics and Simulation",
    shortLabel: "Robotics & Sim",
    description: "Autonomous vehicle simulation, trajectory modeling, telemetry parsing, and remote sensing.",
    accentColor: "#ef4444",
    orbitalRadius: 8.2,
    inclination: -Math.PI / 3,
  },
  "web-apps": {
    key: "web-apps",
    label: "Web Development and Applications",
    shortLabel: "Web & Systems",
    description: "Production Next.js applications, TypeScript services, interactive 3D graphics, and responsive UIs.",
    accentColor: "#6366f1",
    orbitalRadius: 8.8,
    inclination: Math.PI / 5,
  },
  other: {
    key: "other",
    label: "Other Projects",
    shortLabel: "Other",
    description: "Foundational experiments, academic coursework, and utility scripts.",
    accentColor: "#71717a",
    orbitalRadius: 9.4,
    inclination: 0,
  },
};

export const CATEGORY_KEYS = Object.keys(PROJECT_CATEGORIES) as ProjectCategoryKey[];

/**
 * Deterministic category classification based on repository name, description,
 * topics, readme keywords, and language signals.
 *
 * Safeguards:
 * - Language alone never determines the category.
 * - Multi-factor scoring handles ambiguous cases.
 * - Defaults to 'other' when evidence is insufficient.
 */
export function classifyRepository(repo: {
  name: string;
  description?: string | null;
  topics?: string[];
  language?: string | null;
  readmeExcerpt?: string | null;
}): {
  primaryCategory: ProjectCategoryKey;
  categories: ProjectCategoryKey[];
  inferredTags: string[];
} {
  const text = [
    repo.name,
    repo.description || "",
    (repo.topics || []).join(" "),
    repo.readmeExcerpt || "",
  ]
    .join(" ")
    .toLowerCase();

  const scores: Record<ProjectCategoryKey, number> = {
    "computer-vision": 0,
    "ml-dl": 0,
    "genai-llms": 0,
    "agentic-automation": 0,
    "data-engineering": 0,
    "ds-analytics": 0,
    "robotics-simulation": 0,
    "web-apps": 0,
    other: 0,
  };

  const detectedTags = new Set<string>();

  // 1. Computer Vision rules
  if (/(deepfake|videomae|faceforensics|opencv|yolo|vision|image classification|facial|video manipulation|changeformer)/i.test(text)) {
    scores["computer-vision"] += 6;
    detectedTags.add("Computer Vision");
  }

  // 2. Machine Learning and Deep Learning rules
  if (/(pytorch|scikit-learn|random forest|classifier|dementia|alzheimer|foml|neural network|deep learning|transformer model|training|loss function)/i.test(text)) {
    scores["ml-dl"] += 5;
    detectedTags.add("Machine Learning");
  }

  // 3. Generative AI and LLMs
  if (/(gemini|whisper|llm|generative|speech-to-text|text-to-speech|nlp|prompt|f1guru|resume-optimizer|botpress|chatbot)/i.test(text)) {
    scores["genai-llms"] += 5;
    detectedTags.add("Generative AI");
  }

  // 4. Agentic AI and Automation
  if (/(agentic|autonomous agent|tool routing|multi-agent|workflow automation|orchestration|venturemate|busibot|markov)/i.test(text)) {
    scores["agentic-automation"] += 5;
    detectedTags.add("Agentic AI");
  }

  // 5. Data Engineering and Databases
  if (/(duckdb|sql|database|queries|cte|window functions|etl|data pipeline|columnar|data modeling)/i.test(text)) {
    scores["data-engineering"] += 6;
    detectedTags.add("Data Engineering");
  }

  // 6. Data Science and Analytics
  if (/(analytics|dashboard|power bi|excel|pandas|data analysis|salary analysis|exploratory|matplotlib|seaborn)/i.test(text)) {
    scores["ds-analytics"] += 5;
    detectedTags.add("Data Analytics");
  }

  // 7. Robotics and Simulation
  if (/(self-driving|simulation|remote-sensing|satellite|optical\/sar|telemetry|track-architect|geospatial|vehicle|obstacle detection|satquery)/i.test(text)) {
    scores["robotics-simulation"] += 6;
    detectedTags.add("Simulation");
  }

  // 8. Web Development and Applications
  if (/(next\.js|react|typescript|tailwindcss|frontend|portfolio|web app|html|full-stack|rest api)/i.test(text)) {
    scores["web-apps"] += 4;
    detectedTags.add("Web Applications");
  }

  // Specific overrides for known repos
  const lowerName = repo.name.toLowerCase();
  if (lowerName === "deepfake-video-detector" || lowerName === "truthlens") {
    scores["computer-vision"] += 15;
    scores["ml-dl"] += 8;
  } else if (lowerName === "satqueryai_endtoend") {
    scores["robotics-simulation"] += 15;
    scores["genai-llms"] += 6;
  } else if (lowerName === "self-driving-car-simulation") {
    scores["robotics-simulation"] += 12;
    scores["computer-vision"] += 10;
  } else if (lowerName === "ai-powered-resume-optimizer" || lowerName === "f1guru") {
    scores["genai-llms"] += 15;
  } else if (lowerName === "dementia-prediction-model") {
    scores["ml-dl"] += 15;
    scores["ds-analytics"] += 8;
  } else if (lowerName.includes("sql") || lowerName === "data_engineering_sql") {
    scores["data-engineering"] += 15;
  } else if (lowerName.includes("agentic") || lowerName.includes("busibot")) {
    scores["agentic-automation"] += 12;
  } else if (lowerName.includes("power-bi") || lowerName.includes("data_analytics") || lowerName.includes("salary-dashboard")) {
    scores["ds-analytics"] += 12;
  } else if (lowerName === "resume_website" || lowerName.includes("portfolio")) {
    scores["web-apps"] += 12;
  }

  // Sort categories by score
  const sortedCategories = (Object.keys(scores) as ProjectCategoryKey[])
    .filter((k) => k !== "other" && scores[k] > 0)
    .sort((a, b) => scores[b] - scores[a]);

  const primaryCategory: ProjectCategoryKey = sortedCategories.length > 0 ? sortedCategories[0] : "other";
  const categories: ProjectCategoryKey[] = sortedCategories.length > 0 ? sortedCategories.slice(0, 3) : ["other"];

  // Add primary language to tags if available
  if (repo.language) {
    detectedTags.add(repo.language);
  }

  // Add repo topics
  (repo.topics || []).forEach((t) => detectedTags.add(t));

  return {
    primaryCategory,
    categories,
    inferredTags: Array.from(detectedTags),
  };
}
