import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Calendar, MapPin, CheckCircle2, TrendingUp, ShieldCheck, Code2, Users, Wrench } from "lucide-react";

interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  accentGradient: string;
  pills: { icon: any; text: string; color: string; border: string; bg: string }[];
  contributions: {
    icon: any;
    title: string;
    text: string;
  }[];
}

const experiences: ExperienceItem[] = [
  {
    period: "Jun 2026 – Sep 2026",
    role: "Peer Learning Trainer",
    company: "Parul University",
    location: "Vadodara, Gujarat, India",
    accentGradient: "bg-gradient-to-r from-blue-500 via-primary to-purple-500",
    pills: [
      {
        icon: <Code2 size={14} />,
        text: "DSA & CS Fundamentals",
        color: "text-blue-400",
        border: "border-blue-500/20",
        bg: "bg-blue-500/10",
      },
      {
        icon: <Users size={14} />,
        text: "Cohort Mentorship",
        color: "text-primary",
        border: "border-primary/20",
        bg: "bg-primary/10",
      },
      {
        icon: <CheckCircle2 size={14} />,
        text: "Problem Solving",
        color: "text-emerald-400",
        border: "border-emerald-500/20",
        bg: "bg-emerald-500/10",
      },
    ],
    contributions: [
      {
        icon: <Code2 size={16} className="text-primary" />,
        title: "Algorithms & CS Fundamentals",
        text: "Planned and led structured training cohorts in Data Structures and Algorithms, breaking down complex algorithmic concepts to improve peer coding proficiency.",
      },
      {
        icon: <Users size={16} className="text-purple-400" />,
        title: "Technical Mentorship & Execution",
        text: "Tracked student progress, debugged algorithmic bottlenecks, and drove consistent hands-on problem-solving across diverse engineering cohorts.",
      },
    ],
  },
  {
    period: "Feb 2025 – Feb 2026",
    role: "IT Support Intern",
    company: "Parul University",
    location: "Vadodara, Gujarat, India",
    accentGradient: "bg-gradient-to-r from-primary via-purple-500 to-emerald-500",
    pills: [
      {
        icon: <TrendingUp size={14} />,
        text: "3,500+ Systems",
        color: "text-emerald-400",
        border: "border-emerald-500/20",
        bg: "bg-emerald-500/10",
      },
      {
        icon: <CheckCircle2 size={14} />,
        text: "+25% Uptime",
        color: "text-blue-400",
        border: "border-blue-500/20",
        bg: "bg-blue-500/10",
      },
      {
        icon: <ShieldCheck size={14} />,
        text: "Zero Incidents",
        color: "text-purple-400",
        border: "border-purple-500/20",
        bg: "bg-purple-500/10",
      },
    ],
    contributions: [
      {
        icon: <TrendingUp size={16} className="text-emerald-400" />,
        title: "Infrastructure & Operations Reliability",
        text: "Managed system diagnostics, incident tracking, and uptime across 3,500+ university systems, applying systematic root-cause analysis to resolve recurring failures.",
      },
      {
        icon: <CheckCircle2 size={16} className="text-blue-400" />,
        title: "Cross-Functional Technical Delivery",
        text: "Coordinated with lab teams, faculty, and exam administrators to maintain uninterrupted infrastructure operations during university-wide examinations and events.",
      },
      {
        icon: <Wrench size={16} className="text-primary" />,
        title: "Hardware Precision & Calibration",
        text: "Conducted routine maintenance and calibration for laboratory equipment, reducing downtime by 25% while maintaining 100% data integrity across academic sessions.",
      },
    ],
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-20 relative overflow-hidden" ref={ref}>
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 max-w-5xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 mb-6 mx-auto shadow-[0_0_20px_rgba(139,92,246,0.2)]"
          >
            <Briefcase size={32} className="text-primary" />
          </motion.div>
          <h2 className="section-title">Experience</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Technical mentorship, algorithmic training, and systems engineering background
          </p>
        </motion.div>

        {/* Experience Timeline Cards Stack */}
        <div className="space-y-8 relative">
          {experiences.map((exp, expIdx) => (
            <motion.div
              key={expIdx}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + expIdx * 0.15 }}
              whileHover={{ y: -4 }}
              className="glass-card rounded-3xl p-8 md:p-10 border border-primary/20 relative overflow-hidden transition-all duration-300 hover:shadow-[0_20px_50px_rgba(139,92,246,0.15)]"
            >
              {/* Top accent line */}
              <div className={`absolute top-0 left-0 right-0 h-1 ${exp.accentGradient}`} />

              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6 pb-6 border-b border-white/5">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/15 text-primary border border-primary/30 mb-3">
                    <Calendar size={13} />
                    {exp.period}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                    {exp.role}
                  </h3>
                  <p className="text-lg font-medium text-primary mt-1">
                    {exp.company}
                  </p>
                  <div className="flex items-center gap-1.5 text-muted-foreground text-sm mt-1">
                    <MapPin size={14} />
                    <span>{exp.location}</span>
                  </div>
                </div>

                {/* Metric Highlights Pills */}
                <div className="flex flex-wrap md:flex-col gap-2 shrink-0">
                  {exp.pills.map((pill, pIdx) => (
                    <div
                      key={pIdx}
                      className={`px-3.5 py-1.5 rounded-xl ${pill.bg} border ${pill.border} ${pill.color} text-xs font-semibold flex items-center gap-2`}
                    >
                      {pill.icon}
                      <span>{pill.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Responsibilities & Achievements */}
              <div className="space-y-4">
                <h4 className="text-sm uppercase tracking-wider font-semibold text-muted-foreground">
                  Key Responsibilities & Deliverables
                </h4>
                <div className="grid gap-3.5">
                  {exp.contributions.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.05] hover:border-primary/30 transition-all text-sm leading-relaxed text-foreground/85"
                    >
                      <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        {item.icon}
                      </div>
                      <div>
                        <strong className="text-foreground font-semibold mr-1">{item.title}:</strong>
                        <span>{item.text}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
