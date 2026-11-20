import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Github, ExternalLink, Sparkles, Cpu, Layers, CheckCircle2, Zap } from "lucide-react";

interface ProjectDetail {
  id: string;
  tabTitle: string;
  tabBadge: string;
  title: string;
  category: string;
  tagline: string;
  problem: string;
  solution: string;
  architecture: string[];
  techStack: string[];
  keyMetrics: { label: string; value: string; icon?: string }[];
  github: string;
  live?: string;
  gradient: string;
  borderColor: string;
  badgeColor: string;
  glowColor: string;
}

const projects: ProjectDetail[] = [
  {
    id: "voicecare-ai",
    tabTitle: "VoiceCare AI",
    tabBadge: "Go / AI",
    title: "VoiceCare AI — Real-Time Clinical Consultation & Workflow App",
    category: "Agentic AI • Speech & NLP • Distributed Systems • Go",
    tagline: "Multilingual voice-first clinical consultation engine orchestrating real-time clinical notes",
    problem:
      "Healthcare professionals spend over 40% of their workday typing repetitive EHR documentation and medical intake forms, creating severe clinical burnout and critical delays in patient consultations.",
    solution:
      "Built a high-performance clinical consultation platform featuring a Go backend microservice and modern React frontend that captures live audio streams and orchestrates agentic AI/NLP processing to generate structured clinical notes automatically.",
    architecture: [
      "Agentic workflow & real-time automation capturing live audio streams and orchestrating AI/NLP processing to generate structured clinical notes automatically.",
      "DevOps & independent deployment independently architecting, deploying, and maintaining both frontend (Vercel) and backend (Render) services, managing CORS and API uptime.",
      "High-concurrency Go microservice delivering low-latency audio stream ingestion, RESTful endpoint orchestration, and secure payload handling.",
      "Multilingual clinical intake enabling patients to describe symptoms naturally using voice across regional languages, completely eliminating paper forms.",
    ],
    techStack: ["React", "Vite", "Go", "REST APIs", "Agentic AI", "NLP", "Vercel", "Render", "Tailwind CSS"],
    keyMetrics: [
      { label: "Agentic AI", value: "Real-Time" },
      { label: "Backend Core", value: "Go / Golang" },
      { label: "Clinical Notes", value: "100% Automated" },
      { label: "Frontend Cloud", value: "Vercel" },
      { label: "Backend Cloud", value: "Render" },
    ],
    github: "https://github.com/amitsharma4-5/VoiceCare-Ai",
    live: "https://voice-care-ai-psi.vercel.app",
    gradient: "from-cyan-500/20 via-blue-900/10 to-transparent",
    borderColor: "border-cyan-500/30",
    badgeColor: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
    glowColor: "rgba(6,182,212,0.25)",
  },
  {
    id: "wewithu-ai",
    tabTitle: "WeWithU AI",
    tabBadge: "Full-Stack AI",
    title: "WeWithU AI — Interview & Placement Preparation Platform",
    category: "Full-Stack AI • Placement Prep • Career Automation",
    tagline: "AI-assisted candidate scoring, voice mock interviews & automated ATS resume analytics",
    problem:
      "Engineering students and job candidates struggle with recruitment readiness due to a lack of realistic mock interview practice, objective technical evaluation, and actionable ATS resume feedback.",
    solution:
      "Engineered an end-to-end placement preparation platform combining voice-assisted mock interviews, multi-test placement assessments, and an automated AI resume evaluation pipeline delivering comprehensive PDF analytics reports.",
    architecture: [
      "Automated AI evaluation & orchestration independently engineering an AI candidate scoring and resume evaluation pipeline generating structured PDF analytics reports, reducing manual evaluation effort by 80%.",
      "Full-stack execution building modular assessment workflows, automated progress trackers, and scalable backend APIs to deliver an end-to-end placement preparation system.",
      "Interactive voice-assisted mock interview simulator with speech recognition, timed question prompts, and real-time contextual behavioral/technical feedback.",
      "Multi-test mock placement exams with automated grading, percentile tracking, and Firebase cloud data synchronization.",
    ],
    techStack: ["React", "Node.js", "Firebase", "AI Automation", "REST APIs", "Tailwind CSS"],
    keyMetrics: [
      { label: "Manual Effort Reduction", value: "80%" },
      { label: "ATS Resume Analysis", value: "Real-Time" },
      { label: "Evaluation Delivery", value: "Instant PDF" },
      { label: "Mock Interviews", value: "Voice-Assisted" },
      { label: "Cloud Backend", value: "Firebase / Node" },
    ],
    github: "https://github.com/amitsharma4-5/WeWithyou",
    gradient: "from-violet-500/20 via-purple-900/10 to-transparent",
    borderColor: "border-violet-500/30",
    badgeColor: "bg-violet-500/15 text-violet-400 border-violet-500/30",
    glowColor: "rgba(139,92,246,0.25)",
  },
  {
    id: "ai-healthcare-opd",
    tabTitle: "AI Healthcare OPD",
    tabBadge: "Full-Stack / OCR",
    title: "AI Healthcare & OPD Management System",
    category: "Full-Stack Web • Document OCR • Hospital Operations",
    tagline: "OCR-driven medical report extraction, digital health records & automated OPD queue management",
    problem:
      "Traditional outpatient departments (OPDs) face extreme crowding, manual paper registration delays, and unstructured diagnostic records that impair clinical decision-making.",
    solution:
      "Architected a centralized digital hospital and OPD management system featuring automated OCR extraction for patient medical reports, appointment scheduling, and role-based access control.",
    architecture: [
      "Automated document parsing & data accuracy: Built an OCR-driven extraction pipeline to convert unstructured medical reports into structured MySQL and MongoDB records with high consistency and accuracy.",
      "Workflow orchestration: Designed an OPD appointment and queue management platform with role-based access across patients, doctors, and administrators to eliminate scheduling bottlenecks.",
      "Hybrid database architecture utilizing MongoDB for unstructured diagnostic history and MySQL for relational transaction consistency.",
      "Role-based secure authentication ensuring patient confidentiality and verified clinical audit trails.",
    ],
    techStack: ["React.js", "Node.js", "MongoDB", "MySQL", "OCR", "Express.js", "REST APIs", "Tailwind CSS"],
    keyMetrics: [
      { label: "Data Consistency", value: "High Accuracy" },
      { label: "Document Ingestion", value: "Automated OCR" },
      { label: "Scheduling Bottlenecks", value: "Eliminated" },
      { label: "Architecture", value: "Hybrid DB" },
      { label: "RBAC Security", value: "Patient/Doc/Admin" },
    ],
    github: "https://github.com/amitsharma4-5/AI-Healthcare-OPD-Management-System",
    gradient: "from-emerald-500/20 via-teal-900/10 to-transparent",
    borderColor: "border-emerald-500/30",
    badgeColor: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    glowColor: "rgba(16,185,129,0.25)",
  },
  {
    id: "crop-health",
    tabTitle: "Crop Health AI",
    tabBadge: "CV / ML",
    title: "AI-Powered Crop Health Diagnosis System",
    category: "Machine Learning • Computer Vision • Agritech",
    tagline: "Automated multi-class deficiency classification & fertilizer prescription engine",
    problem:
      "Rural farmers face severe crop yield losses due to unaddressed Nitrogen (N), Phosphorus (P), and Potassium (K) soil nutrient deficiencies, often diagnosed too late without specialized agronomy expertise.",
    solution:
      "Engineered an automated end-to-end computer vision and machine learning diagnosis pipeline that classifies crop leaf imagery into specific deficiency categories and dynamically provides targeted chemical and organic fertilizer recommendations.",
    architecture: [
      "OpenCV image preprocessing pipeline with adaptive color equalization, background masking, and Gaussian filtering (+12% generalization gain).",
      "Feature extraction aggregating color histograms, texture metrics (GLCM), and edge descriptors across 5,000+ leaf images.",
      "Dual model training comparing Support Vector Machines (SVM) and optimized Random Forest classifiers.",
      "Rule-based agronomical expert engine mapping identified deficiencies to actionable soil-treatment prescriptions.",
    ],
    techStack: ["Python", "scikit-learn", "OpenCV", "NumPy", "Pandas", "Random Forest", "SVM", "Matplotlib"],
    keyMetrics: [
      { label: "Classification Accuracy", value: "87%" },
      { label: "Dataset Processed", value: "5,000+ Images" },
      { label: "Model F1-Score", value: "0.84" },
      { label: "False Negative Reduction", value: "15%" },
      { label: "Generalization Gain", value: "+12%" },
    ],
    github: "https://github.com/amitsharma4-5/AI-Crop-Health-Diagnosis",
    gradient: "from-green-500/20 via-emerald-900/10 to-transparent",
    borderColor: "border-green-500/30",
    badgeColor: "bg-green-500/15 text-green-400 border-green-500/30",
    glowColor: "rgba(34,197,94,0.25)",
  },
  {
    id: "rural-health",
    tabTitle: "Smart Health IoT",
    tabBadge: "IoT / Edge",
    title: "Smart Rural Health & AI-IoT Medical Guidance System",
    category: "AI & NLP • IoT Embedded Systems • Edge Computing",
    tagline: "Offline-resilient vital telemetry & symptom triage engine deployed on Raspberry Pi",
    problem:
      "Remote primary health centers lack constant broadband internet and on-site specialized doctors, creating critical delays in vital health triaging and disease symptom assessment.",
    solution:
      "Designed a localized edge healthcare system combining hardware sensor telemetry (temperature, blood pressure) with a lightweight NLP disease classification model and Dialogflow assistant, secured by AES-256 encryption.",
    architecture: [
      "IoT hardware integration interfacing real-time digital temperature and blood pressure sensors with a Raspberry Pi microcomputer.",
      "Flask REST API backend executing local inference with sub-2-second latency in fully offline environments.",
      "Multi-label NLP symptom classification model trained across 10,000+ medical records covering 15 disease categories.",
      "Conversational Dialogflow user interface backed by AES-256 encrypted patient log storage ensuring HIPAA-grade data privacy.",
    ],
    techStack: ["Python", "TensorFlow", "Flask", "IoT", "NLP", "Dialogflow", "Raspberry Pi", "AES-256", "REST API"],
    keyMetrics: [
      { label: "Diagnostic Accuracy", value: "82%" },
      { label: "Disease Categories", value: "15 Classes" },
      { label: "Training Records", value: "10,000+" },
      { label: "Inference Latency", value: "< 2 Seconds" },
      { label: "Security Protocol", value: "AES-256" },
    ],
    github: "https://github.com/amitsharma4-5/Smart-Rural-Health-AI-IoT",
    gradient: "from-blue-500/20 via-indigo-900/10 to-transparent",
    borderColor: "border-blue-500/30",
    badgeColor: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    glowColor: "rgba(59,130,246,0.25)",
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState<string>("voicecare-ai");

  const selectedProject = projects.find((p) => p.id === activeTab) || projects[0];

  return (
    <section id="projects" className="py-20 relative overflow-hidden" ref={ref}>
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-4">
            <Sparkles size={13} />
            <span>Engineered Systems</span>
          </div>
          <h2 className="section-title">Featured Projects</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Production-grade agentic AI, full-stack microservices, computer vision, and IoT edge architectures
          </p>
        </motion.div>

        {/* Project Selector Switcher */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {projects.map((p) => {
            const isActive = p.id === activeTab;
            return (
              <button
                key={p.id}
                onClick={() => setActiveTab(p.id)}
                className={`px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-300 flex items-center gap-2.5 ${
                  isActive
                    ? "bg-primary text-white shadow-[0_0_25px_rgba(139,92,246,0.4)] scale-105"
                    : "glass-card border border-white/10 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
              >
                <span>{p.tabTitle}</span>
                <span className={`text-[11px] px-2 py-0.5 rounded-full ${isActive ? "bg-white/20 text-white" : "bg-white/5 text-muted-foreground"}`}>
                  {p.tabBadge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Project Comprehensive Architectural Card */}
        <motion.div
          key={selectedProject.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`glass-card rounded-3xl border ${selectedProject.borderColor} overflow-hidden shadow-2xl relative`}
          style={{ boxShadow: `0 20px 60px ${selectedProject.glowColor}` }}
        >
          {/* Top Gradient Line */}
          <div className="h-1.5 w-full bg-gradient-to-r from-primary via-purple-400 to-secondary" />

          {/* Inner Header */}
          <div className="p-6 md:p-10 space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-white/5">
              <div className="space-y-2 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border mb-2 uppercase tracking-wider" style={{ background: "rgba(255,255,255,0.03)" }}>
                  <Layers size={13} className="text-primary" />
                  <span>{selectedProject.category}</span>
                </div>
                <h3 className="text-2xl md:text-4xl font-bold text-foreground tracking-tight">
                  {selectedProject.title}
                </h3>
                <p className="text-muted-foreground font-medium text-sm md:text-base">
                  {selectedProject.tagline}
                </p>
              </div>

              {/* GitHub & Live Demo Buttons */}
              <div className="shrink-0 flex flex-wrap items-center gap-3">
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-xs md:text-sm bg-primary/15 hover:bg-primary/25 border border-primary/40 text-primary shadow-[0_0_15px_rgba(139,92,246,0.2)] transition-all hover:scale-105"
                >
                  <Github size={16} />
                  <span>GitHub Repository</span>
                  <ExternalLink size={14} />
                </a>
                {selectedProject.live && (
                  <a
                    href={selectedProject.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-xs md:text-sm bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all hover:scale-105"
                  >
                    <ExternalLink size={16} />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>

            {/* Key Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {selectedProject.keyMetrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center flex flex-col justify-center items-center hover:border-primary/30 transition-colors"
                >
                  <div className="text-xl md:text-2xl font-extrabold gradient-text">
                    {metric.value}
                  </div>
                  <div className="text-[11px] font-medium text-muted-foreground mt-0.5">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Problem & Solution Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold text-red-400 uppercase tracking-wider">
                  <Zap size={16} />
                  <span>Problem Statement</span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {selectedProject.problem}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold text-emerald-400 uppercase tracking-wider">
                  <CheckCircle2 size={16} />
                  <span>Engineered Solution</span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {selectedProject.solution}
                </p>
              </div>
            </div>

            {/* Technical Architecture Deep-Dive */}
            <div className="p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-foreground uppercase tracking-wider">
                <Cpu size={16} className="text-primary" />
                <span>Architecture & Implementation Highlights</span>
              </div>
              <div className="grid md:grid-cols-2 gap-3.5 pt-1">
                {selectedProject.architecture.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs md:text-sm text-foreground/85 leading-relaxed">
                    <div className="w-5 h-5 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                      0{i + 1}
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Pills */}
            <div className="space-y-3 pt-2">
              <div className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                Technologies & Tools Applied
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedProject.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs font-medium text-foreground/90 hover:border-primary/40 hover:text-primary transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
