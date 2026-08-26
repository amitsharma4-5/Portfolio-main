import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, BookOpen, MapPin, Calendar, Award, CheckCircle2 } from "lucide-react";

const coursework = [
  "Data Structures & Algorithms",
  "Database Management Systems",
  "Operating Systems",
  "Object-Oriented Programming",
  "Computer Networks",
  "Machine Learning",
  "Software Engineering",
];

const EducationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="py-20 relative overflow-hidden" ref={ref}>
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 max-w-5xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ rotate: [0, -6, 6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 mb-6 mx-auto shadow-[0_0_20px_rgba(139,92,246,0.2)]"
          >
            <GraduationCap size={32} className="text-primary" />
          </motion.div>
          <h2 className="section-title">Education</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Academic background & computer science foundation
          </p>
        </motion.div>

        {/* Education Timeline Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          whileHover={{ y: -4 }}
          className="relative glass-card rounded-3xl p-8 md:p-10 border border-primary/25 overflow-hidden transition-all duration-300 hover:shadow-[0_20px_50px_rgba(139,92,246,0.15)]"
        >
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-purple-400 to-secondary" />

          {/* Decorative Corner Glow */}
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid lg:grid-cols-3 gap-8 items-start relative z-10">
            {/* Left Column: Degree & University */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-primary/15 text-primary border border-primary/30 flex items-center gap-1.5">
                  <Calendar size={13} />
                  2023 – 2027
                </span>
                <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
                  <Award size={13} />
                  Class of 2027
                </span>
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                  Bachelor of Technology in Computer Science & Engineering
                </h3>
                <div className="flex items-center gap-2 mt-2 text-primary font-medium text-lg">
                  <span>Parul University</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground text-sm mt-1">
                  <MapPin size={14} className="text-muted-foreground" />
                  <span>Vadodara, Gujarat, India</span>
                </div>
              </div>

              {/* Coursework Section */}
              <div className="pt-4 border-t border-white/5 space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <BookOpen size={16} className="text-primary" />
                  <span>Relevant Coursework:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {coursework.map((course) => (
                    <span
                      key={course}
                      className="px-3 py-1.5 text-xs font-medium rounded-xl bg-white/[0.04] border border-white/[0.08] text-foreground/80 hover:border-primary/40 hover:text-primary transition-colors flex items-center gap-1.5"
                    >
                      <CheckCircle2 size={12} className="text-primary shrink-0" />
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: CGPA & Highlights */}
            <div className="flex flex-col gap-4 bg-white/[0.02] p-6 rounded-2xl border border-white/[0.06]">
              <div className="text-center p-4 rounded-xl bg-primary/10 border border-primary/20 shadow-[0_0_20px_rgba(139,92,246,0.15)]">
                <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-1">
                  Cumulative GPA
                </div>
                <div className="text-4xl font-extrabold gradient-text">
                  8.67
                </div>
                <div className="text-xs text-muted-foreground/80 mt-1 font-medium">
                  Parul University Grading System
                </div>
              </div>

              <div className="space-y-2 text-xs text-muted-foreground leading-relaxed pt-2">
                <p className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Rigorous core curriculum in systems, algorithms, databases, and applied machine learning.</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Active competitive programmer and hands-on laboratory researcher.</span>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EducationSection;
