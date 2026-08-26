import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Calendar, MapPin, CheckCircle2, TrendingUp, ShieldCheck, Database, Wrench } from "lucide-react";

const achievements = [
  {
    icon: <Wrench size={16} className="text-primary" />,
    text: "Conducted routine maintenance and precision calibration for 10+ laboratory instruments, ensuring peak measurement accuracy.",
  },
  {
    icon: <TrendingUp size={16} className="text-emerald-400" />,
    text: "Achieved a 25% reduction in equipment downtime through proactive scheduling and systematic preventative maintenance routines.",
    highlight: "25% Downtime Reduction",
  },
  {
    icon: <Database size={16} className="text-purple-400" />,
    text: "Executed statistical ANOVA and linear regression analysis supporting 5+ faculty research investigations.",
    highlight: "5+ Faculty Research Projects",
  },
  {
    icon: <CheckCircle2 size={16} className="text-blue-400" />,
    text: "Digitized experimental records with 100% data integrity across 50+ laboratory sessions involving 200+ undergraduate students.",
    highlight: "100% Data Accuracy",
  },
  {
    icon: <ShieldCheck size={16} className="text-green-400" />,
    text: "Enforced strict laboratory safety protocols and standard operating procedures, maintaining a zero-incident safety record across 12 months.",
    highlight: "Zero Incidents Recorded",
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
            Practical laboratory & research instrumentation background
          </p>
        </motion.div>

        {/* Experience Timeline Card */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            whileHover={{ y: -4 }}
            className="glass-card rounded-3xl p-8 md:p-10 border border-primary/20 relative overflow-hidden transition-all duration-300 hover:shadow-[0_20px_50px_rgba(139,92,246,0.15)]"
          >
            {/* Top accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-purple-500 to-emerald-500" />

            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6 pb-6 border-b border-white/5">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/15 text-primary border border-primary/30 mb-3">
                  <Calendar size={13} />
                  Feb 2025 – Feb 2026 (12 Months)
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                  Laboratory Technician
                </h3>
                <p className="text-lg font-medium text-primary mt-1">
                  Parul University
                </p>
                <div className="flex items-center gap-1.5 text-muted-foreground text-sm mt-1">
                  <MapPin size={14} />
                  <span>Vadodara, Gujarat, India</span>
                </div>
              </div>

              {/* Metric Highlights Pills */}
              <div className="flex flex-wrap md:flex-col gap-2 shrink-0">
                <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center gap-2">
                  <TrendingUp size={14} />
                  <span>+25% Uptime</span>
                </div>
                <div className="px-3.5 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 size={14} />
                  <span>100% Data Accuracy</span>
                </div>
                <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold flex items-center gap-2">
                  <ShieldCheck size={14} />
                  <span>Zero Incidents</span>
                </div>
              </div>
            </div>

            {/* Key Responsibilities & Achievements */}
            <div className="space-y-4">
              <h4 className="text-sm uppercase tracking-wider font-semibold text-muted-foreground">
                Key Contributions & Results
              </h4>
              <div className="grid gap-3.5">
                {achievements.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + idx * 0.08 }}
                    className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.05] hover:border-primary/30 transition-all text-sm leading-relaxed text-foreground/85"
                  >
                    <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      {item.icon}
                    </div>
                    <div>
                      <span>{item.text}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
